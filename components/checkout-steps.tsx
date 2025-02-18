"use client"

import React from "react"
import { motion } from "framer-motion"

interface CheckoutStepsProps {
  currentStep: number
  steps: string[]
}

export function CheckoutSteps({ currentStep, steps }: CheckoutStepsProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <motion.div
            className={`flex flex-col items-center ${index <= currentStep ? "text-gold" : "text-luxury-300"}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mb-2 ${
                index <= currentStep ? "border-gold bg-gold text-white" : "border-luxury-300"
              }`}
            >
              {index + 1}
            </div>
            <span className="text-sm font-medium">{step}</span>
          </motion.div>
          {index < steps.length - 1 && (
            <motion.div
              className={`flex-1 h-0.5 mx-2 ${index < currentStep ? "bg-gold" : "bg-luxury-300"}`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

