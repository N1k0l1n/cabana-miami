"use client"

import { motion } from "framer-motion"
import { ShoppingCart } from "lucide-react"

interface AnimatedAddToCartButtonProps {
  onClick: () => void
  className?: string
}

export function AnimatedAddToCartButton({ onClick, className = "" }: AnimatedAddToCartButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`bg-gold text-luxury-700 px-4 py-2 rounded-full flex items-center text-sm hover:bg-soft-gold transition-colors ${className}`}
      whileTap={{ scale: 0.95 }}
    >
      Add to Cart
      <ShoppingCart className="ml-2 w-4 h-4" />
    </motion.button>
  )
}

