"use client"

import { useState } from "react"
import { useCart } from "../contexts/CartContext"
import { LuxuryHeader } from "@/components/luxury-header"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Minus, Plus, Trash2 } from "lucide-react"
import { QuickCheckoutPopup } from "@/components/quick-checkout-popup"

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, total } = useCart()
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const handleCheckout = () => {
    setIsCheckoutOpen(true)
  }

  return (
    <div className="min-h-screen bg-ocean-light">
      <LuxuryHeader />
      <main className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-serif text-luxury-700 mb-8">Your Cart</h1>
        {cart.length === 0 ? (
          <div className="text-center">
            <p className="text-xl text-luxury-500 mb-4">Your cart is empty</p>
            <Link
              href="/shop"
              className="inline-block bg-gold text-white px-6 py-3 rounded-full hover:bg-luxury-600 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-4"
                >
                  <div className="flex items-center">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded-md mr-4"
                    />
                    <div>
                      <h2 className="text-lg font-semibold text-luxury-700">{item.name}</h2>
                      <p className="text-luxury-500">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="text-luxury-500 hover:text-luxury-700"
                    >
                      <Minus size={20} />
                    </button>
                    <span className="mx-2 text-luxury-700">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="text-luxury-500 hover:text-luxury-700"
                    >
                      <Plus size={20} />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-4 text-luxury-500 hover:text-luxury-700"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="md:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-serif text-luxury-700 mb-4">Order Summary</h2>
                <div className="flex justify-between mb-4">
                  <span className="text-luxury-500">Subtotal</span>
                  <span className="text-luxury-700">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-luxury-500">Shipping</span>
                  <span className="text-luxury-700">Free</span>
                </div>
                <div className="border-t border-luxury-200 my-4"></div>
                <div className="flex justify-between mb-4">
                  <span className="text-luxury-700 font-semibold">Total</span>
                  <span className="text-luxury-700 font-semibold">${total.toFixed(2)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="block w-full bg-gold text-luxury-700 text-center px-6 py-3 rounded-full hover:bg-soft-gold transition-colors"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <QuickCheckoutPopup isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </div>
  )
}

