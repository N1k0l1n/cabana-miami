"use client"

import type React from "react"
import { motion } from "framer-motion"

interface BenefitItemProps {
  icon: React.ReactNode
  text: string
}

export function BenefitItem({ icon, text }: BenefitItemProps) {
  return (
    <motion.div
      className="flex items-center space-x-3 mb-2"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-gold">{icon}</div>
      <span className="text-luxury-500">{text}</span>
    </motion.div>
  )
}

