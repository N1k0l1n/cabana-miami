"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface UpsellProductProps {
  name: string
  price: number
  image: string
  onAdd: () => void
}

export function UpsellProduct({ name, price, image, onAdd }: UpsellProductProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-4 rounded-lg shadow-md"
    >
      <Image src={image || "/placeholder.svg"} alt={name} width={100} height={100} className="mx-auto mb-2" />
      <h3 className="text-lg font-semibold text-luxury-700 mb-1">{name}</h3>
      <p className="text-luxury-500 mb-2">${price.toFixed(2)}</p>
      <button
        onClick={onAdd}
        className="w-full bg-gold text-luxury-700 px-4 py-2 rounded-full hover:bg-soft-gold transition-colors"
      >
        Add to Order
      </button>
    </motion.div>
  )
}

