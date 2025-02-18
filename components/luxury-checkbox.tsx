"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

interface LuxuryCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export function LuxuryCheckbox({ label, ...props }: LuxuryCheckboxProps) {
  return (
    <label className="flex items-center space-x-3 cursor-pointer">
      <motion.div
        className="w-6 h-6 border-2 border-gold rounded-md flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <input type="checkbox" className="hidden" {...props} />
        {props.checked && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <Check className="w-4 h-4 text-gold" />
          </motion.div>
        )}
      </motion.div>
      <span className="text-luxury-700">{label}</span>
    </label>
  )
}

