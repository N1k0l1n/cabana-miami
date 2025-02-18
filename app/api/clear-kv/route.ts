import { kv } from "@vercel/kv"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    await kv.del("products")
    console.log("Successfully cleared products from Vercel KV")
    return NextResponse.json({ message: "Products cleared successfully" })
  } catch (error) {
    console.error("Error clearing products from KV:", error)
    return NextResponse.json({ error: "Failed to clear products", details: error.message }, { status: 500 })
  }
}

