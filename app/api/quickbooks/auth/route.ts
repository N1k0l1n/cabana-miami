import { NextResponse } from "next/server"
import OAuthClient from "intuit-oauth"

const oauthClient = new OAuthClient({
  clientId: "AByGoYcFB8GW5Rd18uM29agxEUGHNNSE6oJgOTgVWI2byozVi7",
  clientSecret: "U6JqQc17hWXt8vHU3TAkzMlLV9hOAIDZQdPhqpTE",
  environment: process.env.QUICKBOOKS_ENVIRONMENT,
  redirectUri: process.env.QUICKBOOKS_REDIRECT_URI,
})

export async function GET() {
  try {
    const authUri = oauthClient.authorizeUri({
      scope: [OAuthClient.scopes.Accounting, OAuthClient.scopes.Payment],
      state: "teststate",
    })

    return NextResponse.redirect(authUri)
  } catch (error) {
    console.error("Error initializing OAuth:", error)
    return NextResponse.json({ error: "Failed to initialize OAuth" }, { status: 500 })
  }
}

