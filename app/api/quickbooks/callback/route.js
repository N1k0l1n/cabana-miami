// app/api/quickbooks/callback/route.js
import { NextResponse } from 'next/server';
import { tokenStore } from '../../../../lib/quickbooks';
import { Buffer } from 'buffer'; // Ensure Buffer is available (polyfill if needed)

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const authCode = url.searchParams.get('code');
    const realmId = url.searchParams.get('realmId');
    const error = url.searchParams.get('error');

    // Log received parameters for debugging
    console.log('Authorization code:', authCode);
    console.log('Realm ID:', realmId);
    console.log('Error:', error);

    if (error) {
      throw new Error(`QuickBooks error: ${error}`);
    }
    if (!authCode || !realmId) {
      return NextResponse.json(
        { error: 'Missing authorization code or realm ID' },
        { status: 400 }
      );
    }

    // Manually exchange auth code for tokens using the correct endpoint and POST body
    const base64Credentials = Buffer.from(
      `${process.env.QUICKBOOKS_CLIENT_ID}:${process.env.QUICKBOOKS_CLIENT_SECRET}`
    ).toString('base64');

    const tokenResponse = await fetch(
      'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
          Authorization: `Basic ${base64Credentials}`,
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code: authCode,
          redirect_uri: process.env.QUICKBOOKS_REDIRECT_URI_PROD || process.env.QUICKBOOKS_REDIRECT_URI_DEV,
        }),
      }
    );

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      throw new Error(`${tokenResponse.status} ${tokenResponse.statusText}: ${errorText}`);
    }

    const tokenJson = await tokenResponse.json();
    console.log('OAuth response:', tokenJson);

    const tokenData = { ...tokenJson, realmId };
    console.log('Token data:', tokenData);

    // Store tokens for later use
    await tokenStore.setToken(tokenData);

    return NextResponse.redirect(new URL('/success', req.url));
  } catch (error) {
    console.error('OAuth callback error:', error);
    return NextResponse.json(
      { error: error.message || 'Authentication failed' },
      { status: 500 }
    );
  }
}
