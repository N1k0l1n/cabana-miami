"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { useCart } from "../../contexts/CartContext"
import { useParams } from 'next/navigation'; 

interface Product {
  id: string
  name: string
  description: string
  price: number
  salePrice: number | null
  images: string[]
  categories: string[]
  stockQuantity: number
  materials?: string
  dimensions?: string
}

export default function ProductPage() {
  const { productId } = useParams(); 
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { addToCart } = useCart()

  useEffect(() => {
    if (!productId) return

    const fetchProduct = async () => {
      try {
        const response = await fetch(`/products1.json`)
        if (!response.ok) {
          throw new Error("Failed to fetch product")
        }
        const data = await response.json()
        
        const productData = data.find((p: any) => p.ID.toString() === productId)
        if (!productData) {
          throw new Error("Product not found")
        }

        const transformedProduct = {
          id: productData.ID.toString(),
          name: productData.Name,
          description: productData.Description,
          price: parseFloat(productData["Regular price"]) || 0,
          salePrice: productData["Sale price"] ? parseFloat(productData["Sale price"]) : null,
          images: productData.Images ? [productData.Images] : ["/placeholder.svg"],
          categories: productData.Categories ? productData.Categories.split(",").map((cat: string) => cat.trim()) : [],
          stockQuantity: parseInt(productData.Stock) || 0,
          materials: productData.Materials,
          dimensions: productData.Dimensions
        }

        setProduct(transformedProduct)
      } catch (err: any) {
        console.error("Error fetching product:", err)
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

  const handleAddToCart = () => {
    if (!product) return
    addToCart({
      id: product.id,
      name: product.name,
      price: product.salePrice || product.price,
      quantity: 1,
      image: product.images[0]
    })
  }

  const handleGoBack = () => {
    window.history.back()
  }
  

  if (isLoading) return <div className="text-center text-xl">Loading...</div>
  if (error) return <div className="text-center text-xl text-red-500">Error: {error}</div>

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {product && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex justify-center items-center">
            <Image
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              width={600}
              height={600}
              className="object-contain"
            />
          </div>

          <button
            onClick={handleGoBack}
            className="absolute top-8 left-8 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
          >
            Go Back
          </button>

          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-xl text-gray-700 mb-4">{product.description}</p>

            <div className="mb-4">
              {product.salePrice ? (
                <div className="flex items-center space-x-4">
                  <span className="text-2xl font-semibold text-red-600">
                    ${product.salePrice.toLocaleString()}
                  </span>
                  <span className="text-sm line-through text-gray-500">
                    ${product.price.toLocaleString()}
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-semibold text-gray-800">
                  ${product.price.toLocaleString()}
                </span>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-yellow-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition"
            >
              Add to Cart
            </button>

            <div className="mt-6">
              {product.materials && (
                <p className="text-gray-600">
                  <strong>Materials:</strong> {product.materials}
                </p>
              )}
              {product.dimensions && (
                <p className="text-gray-600">
                  <strong>Dimensions:</strong> {product.dimensions}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
