import { NextResponse } from "next/server"
import OAuthClient from "intuit-oauth"
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

export async function GET() {
  try {
    // Check environment variables
    const envVars = {
      clientId: process.env.QUICKBOOKS_CLIENT_ID ? "Set" : "Missing",
      clientSecret: process.env.QUICKBOOKS_CLIENT_SECRET ? "Set" : "Missing",
      redirectUri: process.env.QUICKBOOKS_REDIRECT_URI ? "Set" : "Missing",
      companyId: process.env.QUICKBOOKS_COMPANY_ID ? "Set" : "Missing",
      environment: process.env.QUICKBOOKS_ENVIRONMENT || "Missing",
    }

    // Check access token
    const cookieStore = cookies()
    const accessToken = cookieStore.get("qb_access_token")

    if (!accessToken) {
      return NextResponse.json({ error: "No access token found" }, { status: 401 })
    }

    oauthClient.setToken({
      access_token: accessToken.value,
      refresh_token: cookieStore.get("qb_refresh_token")?.value,
    })

    // Test API call
    const url = `https://${process.env.QUICKBOOKS_ENVIRONMENT === "sandbox" ? "sandbox-" : ""}quickbooks.api.intuit.com/v3/company/9341454100680311/companyinfo/9341454100680311`
    const response = await oauthClient.makeApiCall({ url, method: "GET" })

    const contentType = response.getHeader("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      console.error("Received non-JSON response:", await response.text())
      return NextResponse.json({ error: "Received non-JSON response from QuickBooks API" }, { status: 500 })
    }

    const companyInfo = response.getJson().CompanyInfo

    return NextResponse.json({
      status: "OK",
      environment: envVars,
      companyName: companyInfo.CompanyName,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error in QuickBooks test endpoint:", error)
    return NextResponse.json(
      {
        error: "Test failed",
        message: error.message,
        details: JSON.stringify(error, Object.getOwnPropertyNames(error)),
      },
      { status: 500 },
    )
  }
}

