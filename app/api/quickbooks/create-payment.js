import OAuthClient from "intuit-oauth"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"

const oauthClient = new OAuthClient({
  clientId: "AByGoYcFB8GW5Rd18uM29agxEUGHNNSE6oJgOTgVWI2byozVi7",
  clientSecret: "U6JqQc17hWXt8vHU3TAkzMlLV9hOAIDZQdPhqpTE",
  environment: process.env.QUICKBOOKS_ENVIRONMENT,
  redirectUri: process.env.QUICKBOOKS_REDIRECT_URI,
  token: {
    access_token: "AB11739829670fHZxewzXiHfQZiIoSyBYqkxNKd1B9gafUyeQP",
    token_type: "bearer",
  },
})

export async function POST(request) {
  try {
    console.log("Creating payment: ", { amount, currency, email })
    const { amount, currency, email, cardNumber, cardExpiry, cardCVC } = await request.json()

    const cookieStore = cookies()
    const accessToken = cookieStore.get("qb_access_token")

    if (!accessToken) {
      console.log("No access token found")
      return NextResponse.json({ error: "Access token is required" }, { status: 400 })
    }

    console.log("Access token found, setting up oauthClient")
    oauthClient.setToken({
      access_token: accessToken.value,
      refresh_token: cookieStore.get("qb_refresh_token")?.value,
    })

    const url = `https://${process.env.QUICKBOOKS_ENVIRONMENT === "sandbox" ? "sandbox-" : ""}quickbooks.api.intuit.com/v3/company/${process.env.QUICKBOOKS_COMPANY_ID}/payment`
    console.log("QuickBooks API URL:", url)

    const [expiryMonth, expiryYear] = cardExpiry.split("/")

    const paymentBody = {
      PaymentType: "CreditCard",
      TotalAmt: amount,
      CurrencyRef: {
        value: currency,
      },
      CustomerRef: {
        value: "1", // You would typically have a customer ID here
      },
      CreditCardPayment: {
        CreditChargeInfo: {
          Amount: amount,
          CcExpiryMonth: Number.parseInt(expiryMonth),
          CcExpiryYear: Number.parseInt(expiryYear),
          NameOnCard: "Test Name",
          CcAccountNumber: cardNumber,
          CCTruncated: cardNumber.slice(-4),
          CommercialCardCode: "0",
          CCTxnMode: "0",
          ProcessPayment: true,
        },
      },
    }

    console.log("Sending payment request to QuickBooks")
    const response = await oauthClient.makeApiCall({ url, method: "POST", body: JSON.stringify(paymentBody) })

    console.log("Received response from QuickBooks")
    const contentType = response.getHeader("content-type")
    console.log("Response content type:", contentType)

    if (!contentType || !contentType.includes("application/json")) {
      const responseText = await response.text()
      console.error("Received non-JSON response:", responseText)
      return NextResponse.json(
        { error: "Received non-JSON response from QuickBooks API", details: responseText },
        { status: 500 },
      )
    }

    const responseJson = response.getJson()
    console.log("QuickBooks API response:", JSON.stringify(responseJson, null, 2))

    if (!responseJson.Payment) {
      console.error("Invalid response structure:", responseJson)
      return NextResponse.json(
        { error: "Invalid response from QuickBooks API", details: JSON.stringify(responseJson) },
        { status: 500 },
      )
    }

    return NextResponse.json({ paymentId: responseJson.Payment.Id })
  } catch (error) {
    console.error("Error creating QuickBooks payment:", error)
    console.error("Error details:", JSON.stringify(error, Object.getOwnPropertyNames(error)))
    return NextResponse.json(
      {
        error: error.message || "Failed to create payment",
        details: JSON.stringify(error, Object.getOwnPropertyNames(error)),
      },
      { status: 500 },
    )
  }
}

