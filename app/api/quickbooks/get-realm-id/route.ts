import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {
  const cookieStore = cookies()
  const realmId = cookieStore.get("qb_realm_id")

  if (!realmId) {
    return NextResponse.json(
      { error: "No Realm ID found. Please authenticate with QuickBooks first." },
      { status: 404 },
    )
  }

  return NextResponse.json({ realmId: realmId.value })
}

