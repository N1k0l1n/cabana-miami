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
    console.log("Confirming payment:", paymentId)
    const { paymentId } = await request.json()

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

    const url = `https://${process.env.QUICKBOOKS_ENVIRONMENT === "sandbox" ? "sandbox-" : ""}quickbooks.api.intuit.com/v3/company/9341454100680311/payment?operation=update`
    console.log("QuickBooks API URL:", url)

    const paymentBody = {
      Id: paymentId,
      SyncToken: "0",
      sparse: true,
      CreditCardPayment: {
        Status: "Completed",
      },
    }

    console.log("Sending payment confirmation request to QuickBooks")
    const response = await oauthClient.makeApiCall({ url, method: "POST", body: JSON.stringify(paymentBody) })

    console.log("Received response from QuickBooks")
    const contentType = response.getHeader("content-type")
    console.log("Response content type:", contentType)

    if (!contentType || !contentType.includes("application/json")) {
      console.error("Received non-JSON response:", await response.text())
      return NextResponse.json({ error: "Received non-JSON response from QuickBooks API" }, { status: 500 })
    }

    const responseJson = response.getJson()
    console.log("QuickBooks API response:", JSON.stringify(responseJson, null, 2))

    if (!responseJson.Payment) {
      console.error("Invalid response structure:", responseJson)
      return NextResponse.json({ error: "Invalid response from QuickBooks API" }, { status: 500 })
    }

    return NextResponse.json({ success: true, paymentId: responseJson.Payment.Id })
  } catch (error) {
    console.error("Error confirming QuickBooks payment:", error)
    console.error("Error details:", JSON.stringify(error, Object.getOwnPropertyNames(error)))
    return NextResponse.json({ error: error.message || "Failed to confirm payment" }, { status: 500 })
  }
}

