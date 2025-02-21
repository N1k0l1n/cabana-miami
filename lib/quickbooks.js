// lib/quickbooks.js
import OAuthClient from 'intuit-oauth';
import { tokenStore } from './tokenStore';


const oauthClient = new OAuthClient({
  clientId: process.env.QUICKBOOKS_CLIENT_ID,
  clientSecret: process.env.QUICKBOOKS_CLIENT_SECRET,
  environment: process.env.QUICKBOOKS_ENVIRONMENT || 'sandbox',
  redirectUri: process.env.QUICKBOOKS_REDIRECT_URI,
});


export { OAuthClient,oauthClient, tokenStore };