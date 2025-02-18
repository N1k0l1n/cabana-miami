"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface OrderItemProps {
  name: string
  price: number
  quantity: number
  image: string
}

export function OrderItem({ name, price, quantity, image }: OrderItemProps) {
  return (
    <motion.div
      className="flex items-center justify-between py-2 border-b border-luxury-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center">
        <Image src={image || "/placeholder.svg"} alt={name} width={50} height={50} className="rounded-md mr-4" />
        <div>
          <h3 className="text-luxury-700 font-medium">{name}</h3>
          <p className="text-luxury-500 text-sm">Quantity: {quantity}</p>
        </div>
      </div>
      <span className="text-luxury-700 font-semibold">${(price * quantity).toFixed(2)}</span>
    </motion.div>
  )
}

