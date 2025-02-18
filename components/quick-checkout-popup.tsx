"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useCart } from "../app/contexts/CartContext"
import { X, Lock } from "lucide-react"

interface QuickCheckoutPopupProps {
  isOpen: boolean
  onClose: () => void
}

export function QuickCheckoutPopup({ isOpen, onClose }: QuickCheckoutPopupProps) {
  const { cart, total, clearCart } = useCart()
  const [formData, setFormData] = useState({
    email: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically process the payment
    console.log("Processing payment:", formData)
    clearCart()
    onClose()
    alert("Thank you for your purchase!")
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg p-8 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif text-luxury-700">Quick Checkout</h2>
              <button onClick={onClose} className="text-luxury-500 hover:text-luxury-700">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              {/* Form fields go here */}
              <button
                type="submit"
                className="w-full bg-gold text-luxury-700 px-6 py-3 rounded-full hover:bg-soft-gold transition-colors flex items-center justify-center mt-6"
              >
                Pay ${total.toFixed(2)}
                <Lock className="ml-2" size={18} />
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

