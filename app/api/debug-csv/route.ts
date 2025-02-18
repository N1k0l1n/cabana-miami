import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "products.csv")
    console.log("Attempting to read CSV file from:", filePath)

    if (!fs.existsSync(filePath)) {
      console.error("CSV file not found:", filePath)
      return NextResponse.json({ error: "Products file not found", filePath }, { status: 404 })
    }

    const fileContent = fs.readFileSync(filePath, "utf8")
    const firstLine = fileContent.split("\n")[0]

    return NextResponse.json({
      message: "CSV file found and read successfully",
      filePath,
      firstLine,
      fileSize: fileContent.length,
    })
  } catch (error) {
    console.error("Error in debug-csv API route:", error)
    return NextResponse.json(
      {
        error: "Failed to read CSV file",
        details: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 },
    )
  }
}

