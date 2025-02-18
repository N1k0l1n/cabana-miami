"use client"

import type React from "react"
import { motion } from "framer-motion"

interface LuxuryFormSectionProps {
  title: string
  children: React.ReactNode
}

export function LuxuryFormSection({ title, children }: LuxuryFormSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <h2 className="text-2xl font-serif text-luxury-700 mb-4 border-b border-gold pb-2">{title}</h2>
      {children}
    </motion.div>
  )
}

