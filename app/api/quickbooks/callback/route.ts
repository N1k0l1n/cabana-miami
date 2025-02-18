import { NextResponse } from "next/server"
import OAuthClient from "intuit-oauth"
import { cookies } from "next/headers"

const oauthClient = new OAuthClient({
  clientId: "AByGoYcFB8GW5Rd18uM29agxEUGHNNSE6oJgOTgVWI2byozVi7",
  clientSecret: "U6JqQc17hWXt8vHU3TAkzMlLV9hOAIDZQdPhqpTE",
  environment: process.env.QUICKBOOKS_ENVIRONMENT,
  redirectUri: process.env.QUICKBOOKS_REDIRECT_URI,
})

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code")
  const realmId = searchParams.get("realmId")

  if (!code || !realmId) {
    return NextResponse.json({ error: "Missing code or realmId" }, { status: 400 })
  }

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

    cookies().set("qb_realm_id", realmId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60, // 24 hours
    })

    // Redirect to the shop page or wherever you want after successful authentication
    return NextResponse.redirect(new URL("/shop", request.url))
  } catch (error) {
    console.error("Error during QuickBooks authentication:", error)
    return NextResponse.redirect(new URL("/auth-error", request.url))
  }
}

