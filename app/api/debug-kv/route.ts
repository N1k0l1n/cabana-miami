import { kv } from "@vercel/kv"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    console.log("Testing Vercel KV connection")

    // Test setting a value
    await kv.set("test_key", "test_value")
    console.log("Successfully set test value in Vercel KV")

    // Test getting the value
    const testValue = await kv.get("test_key")
    console.log("Retrieved test value from Vercel KV:", testValue)

    if (testValue !== "test_value") {
      throw new Error("Test value mismatch")
    }

    // Test deleting the value
    await kv.del("test_key")
    console.log("Successfully deleted test value from Vercel KV")

    return NextResponse.json({ status: "OK", message: "Vercel KV connection is working properly" })
  } catch (error) {
    console.error("Error testing Vercel KV connection:", error)
    return NextResponse.json({ error: "Vercel KV connection test failed", details: error.message }, { status: 500 })
  }
}

