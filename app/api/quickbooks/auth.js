import OAuthClient from "intuit-oauth"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"

const oauthClient = new OAuthClient({
  clientId: process.env.QUICKBOOKS_CLIENT_ID,
  clientSecret: process.env.QUICKBOOKS_CLIENT_SECRET,
  environment: process.env.QUICKBOOKS_ENVIRONMENT,
  redirectUri: process.env.QUICKBOOKS_REDIRECT_URI,
})

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code")
  const realmId = searchParams.get("realmId")

  if (code && realmId) {
    try {
      const authResponse = await oauthClient.createToken(request.url)
      const { access_token, refresh_token } = authResponse.getJson()

      // Store tokens in cookies (in production, use a more secure method)
      cookies().set("qb_access_token", access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 3600, // 1 hour
      })

      cookies().set("qb_refresh_token", refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60, // 24 hours
      })

      return NextResponse.redirect(new URL("/shop", request.url))
    } catch (error) {
      console.error("Error during QuickBooks authentication:", error)
      return NextResponse.redirect(new URL("/auth-error", request.url))
    }
  }

  const authUri = oauthClient.authorizeUri({
    scope: [OAuthClient.scopes.Accounting, OAuthClient.scopes.Payment],
    state: "teststate",
  })

  return NextResponse.redirect(authUri)
}

