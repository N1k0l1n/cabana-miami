import { NextResponse } from "next/server"
import Papa from "papaparse"
import fs from "fs"
import path from "path"

export async function GET() {
  console.log("API route called: /api/products")
  try {
    const filePath = path.join(process.cwd(), "public", "products.csv")
    console.log("Attempting to read CSV file from:", filePath)

    if (!fs.existsSync(filePath)) {
      console.error("CSV file not found:", filePath)
      return NextResponse.json({ error: "Products file not found", filePath }, { status: 404 })
    }

    const fileContent = fs.readFileSync(filePath, "utf8")
    console.log("CSV file read successfully. First 100 characters:", fileContent.substring(0, 100))

    // Parse the CSV data
    const { data, errors } = Papa.parse(fileContent, {
      header: true,
      skipEmptyLines: true,
    })

    if (errors.length > 0) {
      console.error("CSV parsing errors:", errors)
      return NextResponse.json({ error: "Failed to parse CSV", details: errors }, { status: 500 })
    }

    console.log(`Parsed ${data.length} rows from CSV`)

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

    console.log(`Successfully processed ${products.length} products`)
    return NextResponse.json({ products })
  } catch (error) {
    console.error("Error in products API route:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch or process products",
        details: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 },
    )
  }
}

