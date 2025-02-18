"use client"

import type React from "react"
import { motion } from "framer-motion"

interface LuxuryInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export function LuxuryInput({ label, error, ...props }: LuxuryInputProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-4"
    >
      <label className="block text-luxury-700 mb-2 font-serif" htmlFor={props.id}>
        {label}
      </label>
      <input
        {...props}
        className={`w-full px-4 py-2 bg-white border ${
          error ? "border-red-500" : "border-luxury-300"
        } rounded-md focus:outline-none focus:ring-2 focus:ring-gold transition-all duration-300 text-luxury-700`}
      />
      {error && <p className="mt-1 text-red-500 text-sm">{error}</p>}
    </motion.div>
  )
}

