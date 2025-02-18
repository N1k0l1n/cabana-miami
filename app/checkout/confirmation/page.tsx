"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { LuxuryHeader } from "@/components/luxury-header"
import { motion } from "framer-motion"
import Link from "next/link"
import { CheckCircle } from "lucide-react"

export default function ConfirmationPage() {
  const router = useRouter()

  useEffect(() => {
    // If the cart is not empty, redirect to the cart page
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    if (cart.length > 0) {
      router.push("/cart")
    }
  }, [router])

  return (
    <div className="min-h-screen bg-ocean-light">
      <LuxuryHeader />
      <main className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <CheckCircle className="w-24 h-24 text-gold mx-auto mb-8" />
          <h1 className="text-4xl font-serif text-luxury-700 mb-4">Thank You for Your Order!</h1>
          <p className="text-xl text-luxury-500 mb-8">
            Your order has been successfully placed. We'll send you an email with the order details and tracking
            information once your items have shipped.
          </p>
          <Link
            href="/"
            className="inline-block bg-gold text-white px-8 py-3 rounded-full hover:bg-luxury-600 transition-colors"
          >
            Continue Shopping
          </Link>
        </motion.div>
      </main>
    </div>
  )
}

