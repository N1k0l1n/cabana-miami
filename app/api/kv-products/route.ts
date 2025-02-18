import { kv } from "@vercel/kv"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    console.log("Attempting to fetch products from Vercel KV")
    const products = await kv.get("products")

    if (!products) {
      console.log("No products found in Vercel KV")
      return NextResponse.json({ error: "No products found" }, { status: 404 })
    }

    console.log(`Successfully fetched ${Array.isArray(products) ? products.length : 0} products from Vercel KV`)
    return NextResponse.json({ products })
  } catch (error) {
    console.error("Error fetching products from KV:", error)
    return NextResponse.json({ error: "Failed to fetch products", details: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const products = await request.json()
    console.log(`Attempting to save ${products.length} products to Vercel KV`)
    await kv.set("products", products)
    console.log("Products saved successfully to Vercel KV")
    return NextResponse.json({ message: "Products saved successfully" })
  } catch (error) {
    console.error("Error saving products to KV:", error)
    return NextResponse.json({ error: "Failed to save products", details: error.message }, { status: 500 })
  }
}

