"use client"

import { motion } from "framer-motion"
import { ShoppingCart } from "lucide-react"

interface CartIconProps {
  itemCount: number
  onClick: () => void
}

export function CartIcon({ itemCount, onClick }: CartIconProps) {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-4 right-4 z-50 bg-white text-luxury-700 p-3 rounded-full shadow-lg hover:bg-soft-gold transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <ShoppingCart size={24} />
      {itemCount > 0 && (
        <motion.span
          key={itemCount}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center"
        >
          {itemCount}
        </motion.span>
      )}
    </motion.button>
  )
}

