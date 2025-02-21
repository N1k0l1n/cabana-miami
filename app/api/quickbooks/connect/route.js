// app/api/quickbooks/connect/route.js
import { NextResponse } from 'next/server';
import { OAuthClient, oauthClient } from '../../../../lib/quickbooks';
import crypto from 'crypto';

export async function GET() {
  try {
    // Verify environment variables
    if (!process.env.QUICKBOOKS_CLIENT_ID || !process.env.QUICKBOOKS_CLIENT_SECRET) {
      throw new Error('Missing QuickBooks environment variables');
    }

    // Generate CSRF protection token
    const stateToken = crypto.randomBytes(16).toString('hex');
    console.log('Generated state token:', stateToken);
    
    // Generate authorization URI with correct scope reference
    const authUri = oauthClient.authorizeUri({
      scope: [OAuthClient.scopes.Accounting], // Use the class reference
      state: stateToken
    });

    console.log('Generated authorization URI:', authUri);

    return NextResponse.redirect(authUri);
    
  } catch (error) {
    console.error('Connection initiation error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to initiate OAuth flow',
        details: error.message 
      },
      { status: 500 }
    );
  }
}