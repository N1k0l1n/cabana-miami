// app/api/quickbooks/callback/route.js
import { NextResponse } from 'next/server';
import { tokenStore } from '../../../../lib/quickbooks';
import { Buffer } from 'buffer';

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const authCode = url.searchParams.get('code');
    const realmId = url.searchParams.get('realmId');
    const error = url.searchParams.get('error');


    if (error) {
      throw new Error(`QuickBooks error: ${error}`);
    }
    if (!authCode || !realmId) {
      return NextResponse.json(
        { error: 'Missing authorization code or realm ID' },
        { status: 400 }
      );
    }

    // Compute the redirect URI based on the environment
    const redirectUri = process.env.NODE_ENV === 'production'
      ? process.env.QUICKBOOKS_REDIRECT_URI_PROD
      : process.env.QUICKBOOKS_REDIRECT_URI_DEV;

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
          redirect_uri: redirectUri,
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
