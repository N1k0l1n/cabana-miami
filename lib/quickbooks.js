// lib/quickbooks.js
import OAuthClient from 'intuit-oauth';
import { tokenStore } from './tokenStore';

const redirectUri = process.env.NODE_ENV === 'production'
  ? process.env.QUICKBOOKS_REDIRECT_URI_PROD
  : process.env.QUICKBOOKS_REDIRECT_URI_DEV;

const oauthClient = new OAuthClient({
  clientId: process.env.QUICKBOOKS_CLIENT_ID,
  clientSecret: process.env.QUICKBOOKS_CLIENT_SECRET,
  environment: process.env.QUICKBOOKS_ENVIRONMENT || 'sandbox',
  redirectUri,
});

export { OAuthClient, oauthClient, tokenStore };
