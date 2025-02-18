import { NextResponse } from "next/server"
import Papa from "papaparse"

export async function GET() {
  try {
    console.log("Fetching CSV file...")
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wc-product-export-17-2-2025-1739768739378-fLxzCAGimNjt68QUzYzr1pw17Dqj2o.csv",
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const csvText = await response.text()
    console.log("CSV file fetched successfully")

    console.log("Parsing CSV data...")
    const { data, errors } = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
    })

    if (errors.length > 0) {
      console.error("CSV parsing errors:", errors)
      return NextResponse.json({ error: "Failed to parse CSV", details: errors }, { status: 500 })
    }

    console.log("CSV data parsed successfully")

    // Process the data and format it to match our Product interface
    const products = data.map((row: any) => ({
      Id: row.id,
      Name: row.name,
      Description: row.description,
      UnitPrice: Number.parseFloat(row.regular_price) || 0,
      Type: row.type || "Unknown",
      QtyOnHand: Number.parseInt(row.stock_quantity) || 0,
      image: row.images ? JSON.parse(row.images)[0]?.src || "/placeholder.svg" : "/placeholder.svg",
    }))

    console.log(`Processed ${products.length} products`)

    return NextResponse.json({ products })
  } catch (error) {
    console.error("Error in import-products API route:", error)
    return NextResponse.json({ error: "Failed to import products", details: error.message }, { status: 500 })
  }
}

