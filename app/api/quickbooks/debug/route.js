import { NextResponse } from "next/server"
import OAuthClient from "intuit-oauth"
import { cookies } from "next/headers"

const oauthClient = new OAuthClient({
  clientId: process.env.QUICKBOOKS_CLIENT_ID,
  clientSecret: process.env.QUICKBOOKS_CLIENT_SECRET,
  environment: process.env.QUICKBOOKS_ENVIRONMENT,
  redirectUri: process.env.QUICKBOOKS_REDIRECT_URI,
})

export async function GET() {
  try {
    console.log("Debug endpoint called")
    const cookieStore = cookies()
    const accessToken = cookieStore.get("qb_access_token")
    const refreshToken = cookieStore.get("qb_refresh_token")
    const realmId = cookieStore.get("qb_realm_id")

    const debugInfo = {
      environment: process.env.QUICKBOOKS_ENVIRONMENT,
      clientIdSet: !!process.env.QUICKBOOKS_CLIENT_ID,
      clientSecretSet: !!process.env.QUICKBOOKS_CLIENT_SECRET,
      redirectUriSet: !!process.env.QUICKBOOKS_REDIRECT_URI,
      accessTokenSet: !!accessToken,
      refreshTokenSet: !!refreshToken,
      realmIdSet: !!realmId,
    }

    if (accessToken && refreshToken && realmId) {
      oauthClient.setToken({
        access_token: accessToken.value,
        refresh_token: refreshToken.value,
        realmId: realmId.value,
      })

      debugInfo.accessTokenValid = oauthClient.isAccessTokenValid()

      // Make a test API call
      try {
        const url = `https://${process.env.QUICKBOOKS_ENVIRONMENT === "sandbox" ? "sandbox-" : ""}quickbooks.api.intuit.com/v3/company/${realmId.value}/companyinfo/${realmId.value}`
        const response = await oauthClient.makeApiCall({ url, method: "GET" })
        const companyInfo = response.getJson().CompanyInfo
        debugInfo.companyName = companyInfo.CompanyName
        debugInfo.testApiCallSuccess = true
      } catch (apiError) {
        debugInfo.testApiCallSuccess = false
        debugInfo.testApiCallError = apiError.message
      }
    }

    console.log("Debug info:", debugInfo)
    return NextResponse.json(debugInfo)
  } catch (error) {
    console.error("Error in debug endpoint:", error)
    return NextResponse.json(
      {
        error: "Debug failed",
        details: error.message,
        stack: error.stack,
      },
      { status: 500 },
    )
  }
}

