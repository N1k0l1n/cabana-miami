import { NextResponse } from 'next/server';
import axios from 'axios';
import { oauthClient, tokenStore } from '../../../../lib/quickbooks';

async function getValidToken() {
  const tokenData = await tokenStore.getToken();
  console.log('Token data:', tokenData);

  if (!tokenData?.access_token) {
    throw new Error('No QuickBooks access token found');
  }

  oauthClient.setToken(tokenData);

  if (!oauthClient.isAccessTokenValid()) {
    try {
      const authResponse = await oauthClient.refresh();
      const newToken = authResponse.getJson();
      await tokenStore.setToken({ ...newToken, realmId: tokenData.realmId });
      return newToken.access_token;
    } catch (error) {
      console.error('Token refresh failed:', error);
      throw new Error('Failed to refresh access token');
    }
  }

  return tokenData.access_token;
}

export async function GET(req) {
  try {
    const tokenData = await tokenStore.getToken();
    if (!tokenData) {
      return NextResponse.json({ error: "Not authenticated with QuickBooks" }, { status: 401 });
    }

    const accessToken = await getValidToken();
    const realmId = tokenData.realmId;
    const query = "SELECT * FROM Item";
    const url = `https://sandbox-quickbooks.api.intuit.com/v3/company/${realmId}/query?query=${encodeURIComponent(query)}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });
    console.log("QuickBooks API Response:", response.data);

    const items = response.data.QueryResponse.Item || [];
    const products = items.map((item) => ({
      id: item.Id.toString(),
      name: item.Name,
      description: item.Description || "",
      price: parseFloat(item.UnitPrice) || 0,
      salePrice: null,
      images: [item.ImageUrl || "/placeholder.svg"],
      categories: item.ClassRef ? [item.ClassRef.name] : [],
      stockQuantity: item.QtyOnHand || 0,
    }));

    return NextResponse.json(products);
  } catch (error) {
    console.error("QuickBooks API Error:", error.response ? error.response.data : error.message);
    return NextResponse.json({ error: "Failed to fetch products from QuickBooks" }, { status: 500 });
  }
}