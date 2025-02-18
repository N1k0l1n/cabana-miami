import { NextResponse } from "next/server"

export async function GET() {
  const testProduct = {
    Id: "test-product-1",
    Name: "Test Product ($1)",
    Description: "This is a $1 test product for payment testing",
    UnitPrice: 1,
    Type: "NonInventory",
    QtyOnHand: 999,
    image: "/placeholder.svg",
  }

  return NextResponse.json({ product: testProduct })
}

