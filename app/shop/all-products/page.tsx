"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronDown, X, Search } from "lucide-react"
import { LuxuryHeader } from "@/components/luxury-header"
import { AnimatedAddToCartButton } from "@/components/animated-add-to-cart-button"
import { CartIcon } from "@/components/cart-icon"
import { QuickCheckoutPopup } from "@/components/quick-checkout-popup"
import { useCart } from "../../contexts/CartContext"

interface Product {
  id: string
  name: string
  description: string
  price: number
  salePrice: number | null
  type: string
  categories: string[]
  images: string[]
  stockQuantity: number
  sku: string
}

export default function AllProductsShop() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("featured")
  const [searchTerm, setSearchTerm] = useState("")
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [addedToCart, setAddedToCart] = useState<string | null>(null)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const { cart, addToCart, total } = useCart()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/quickbooks/products")
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch products")
        }

        if (!Array.isArray(data.products)) {
          console.error("Invalid products data:", data)
          throw new Error("Invalid products data received")
        }

        setProducts(data.products)
        setError(null)
      } catch (err) {
        console.error("Error fetching products:", err)
        if (err instanceof Error) {
          setError(`Failed to load products: ${err.message}`)
        } else {
          setError("Failed to load products")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const categories = ["All", ...new Set(products.flatMap((product) => product.categories))]

  const filteredProducts = products
    .filter(
      (product) =>
        (selectedCategory === "All" || product.categories.includes(selectedCategory)) &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === "priceLowHigh") return a.price - b.price
      if (sortBy === "priceHighLow") return b.price - a.price
      return 0 // featured
    })

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.salePrice || product.price,
      quantity: 1,
      image: product.images[0] || "/placeholder.svg",
    })
    setAddedToCart(product.id)
    setTimeout(() => setAddedToCart(null), 2000)
  }

  const handleBuyNow = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.salePrice || product.price,
      quantity: 1,
      image: product.images[0] || "/placeholder.svg",
    })
    setIsCheckoutOpen(true)
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="text-red-500">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-gold text-white rounded-full hover:bg-soft-gold transition-colors"
        >
          Retry Loading Products
        </button>
      </div>
    )
  }

  return (
    <div className="bg-ocean-light min-h-screen">
      <LuxuryHeader />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-4xl md:text-5xl text-luxury-700 text-center mb-8">All Products</h1>

          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="relative w-full md:w-64 mb-4 md:mb-0">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-luxury-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gold text-luxury-700"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-luxury-500" size={20} />
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none bg-white border border-luxury-300 text-luxury-700 py-2 pl-4 pr-8 rounded-full focus:outline-none focus:ring-2 focus:ring-gold"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-luxury-500"
                  size={20}
                />
              </div>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-luxury-300 text-luxury-700 py-2 pl-4 pr-8 rounded-full focus:outline-none focus:ring-2 focus:ring-gold"
                >
                  <option value="featured">Featured</option>
                  <option value="priceLowHigh">Price: Low to High</option>
                  <option value="priceHighLow">Price: High to Low</option>
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-luxury-500"
                  size={20}
                />
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="relative h-64">
                  <Image
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                  />
                  {addedToCart === product.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="absolute top-4 right-4 bg-gold text-white px-4 py-2 rounded-full"
                    >
                      Added to Cart!
                    </motion.div>
                  )}
                </div>
                <div className="p-4">
                  <h2 className="font-serif text-xl text-luxury-700 mb-2">{product.name}</h2>
                  <p className="text-luxury-500 mb-2 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      {product.salePrice ? (
                        <>
                          <span className="text-lg font-bold text-red-500">${product.salePrice.toLocaleString()}</span>
                          <span className="text-sm text-luxury-500 line-through ml-2">
                            ${product.price.toLocaleString()}
                          </span>
                        </>
                      ) : (
                        <span className="text-lg font-bold text-ocean-dark">${product.price.toLocaleString()}</span>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <AnimatedAddToCartButton onClick={() => handleAddToCart(product)} />
                      <motion.button
                        onClick={() => handleBuyNow(product)}
                        className="bg-gold text-luxury-700 px-4 py-2 rounded-full flex items-center text-sm hover:bg-soft-gold transition-colors"
                        whileTap={{ scale: 0.95 }}
                      >
                        Buy Now
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Shopping Cart */}
      <div className="fixed bottom-4 right-4 z-50">
        <CartIcon
          itemCount={cart.reduce((total, item) => total + item.quantity, 0)}
          onClick={() => setIsCartOpen(!isCartOpen)}
        />
      </div>

      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-lg z-50 overflow-y-auto"
            id="shopping-cart"
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-serif text-2xl text-luxury-700">Your Cart</h2>
                <button onClick={() => setIsCartOpen(false)} className="text-luxury-500 hover:text-luxury-700">
                  <X size={24} />
                </button>
              </div>
              {cart.length === 0 ? (
                <p className="text-luxury-500">Your cart is empty</p>
              ) : (
                <>
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between py-2 border-b border-luxury-200">
                      <div className="flex items-center">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={50}
                          height={50}
                          className="rounded"
                        />
                        <div className="ml-4">
                          <h3 className="font-serif text-luxury-700">{item.name}</h3>
                          <p className="text-sm text-luxury-500">
                            ${item.price.toLocaleString()} x {item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="mt-4">
                    <p className="text-xl font-bold text-luxury-700">Total: ${total.toLocaleString()}</p>
                    <button
                      onClick={() => {
                        setIsCartOpen(false)
                        setIsCheckoutOpen(true)
                      }}
                      className="w-full mt-4 bg-gold text-luxury-700 py-3 rounded-full hover:bg-soft-gold transition-colors text-lg font-semibold"
                    >
                      Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <QuickCheckoutPopup isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </div>
  )
}

