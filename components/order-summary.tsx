"use client"

import { motion } from "framer-motion"
import { ShoppingBag } from "lucide-react"

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface OrderSummaryProps {
  items: OrderItem[]
  total: number
}

export function OrderSummary({ items, total }: OrderSummaryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-md"
    >
      <div className="flex items-center mb-4">
        <ShoppingBag className="w-6 h-6 text-gold mr-2" />
        <h2 className="text-2xl font-serif text-luxury-700">Order Summary</h2>
      </div>
      {items.map((item) => (
        <div key={item.id} className="flex justify-between py-2 border-b border-luxury-200">
          <span className="text-luxury-500">
            {item.name} x {item.quantity}
          </span>
          <span className="text-luxury-700">${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      ))}
      <div className="mt-4 flex justify-between items-center">
        <span className="text-luxury-700 font-semibold">Total</span>
        <span className="text-2xl text-luxury-700 font-bold">${total.toFixed(2)}</span>
      </div>
    </motion.div>
  )
}

