// csv-products/route.ts
import { NextResponse } from "next/server"
import Papa from "papaparse"

export async function GET() {
  try {
    console.log("Fetching CSV file...")
    const response = await fetch(
      "./products.json",
    )

    console.log("CSV file ", response)

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
      id: row.id,
      name: row.name,
      description: row.description,
      price: Number.parseFloat(row.regular_price) || 0,
      salePrice: Number.parseFloat(row.sale_price) || null,
      type: row.type || "simple",
      categories: row.categories ? row.categories.split(",").map((cat: string) => cat.trim()) : [],
      images: row.images ? JSON.parse(row.images).map((img: any) => img.src) : [],
      stockQuantity: Number.parseInt(row.stock_quantity) || 0,
      sku: row.sku,
    }))

    console.log(`Processed ${products.length} products`)

    return NextResponse.json({ products })
  } catch (error) {
    console.error("Error in csv-products API route:", error)
    return NextResponse.json({ error: "Failed to fetch or process products", details: (error as Error).message }, { status: 500 })
  }
}

