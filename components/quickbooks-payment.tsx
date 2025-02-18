"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CreditCard, DollarSign } from "lucide-react"

interface QuickBooksPaymentProps {
  total: number
  onPaymentComplete: (transactionId: string) => void
}

export function QuickBooksPayment({ total, onPaymentComplete }: QuickBooksPaymentProps) {
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = async () => {
    setIsProcessing(true)
    try {
      // This is where you would integrate with your backend API
      // which would then communicate with QuickBooks Payments API
      const response = await fetch("/api/process-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: total }),
      })

      if (!response.ok) {
        throw new Error("Payment failed")
      }

      const { transactionId } = await response.json()
      onPaymentComplete(transactionId)
    } catch (error) {
      console.error("Payment error:", error)
      alert("There was an error processing your payment. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-serif text-luxury-700 mb-4 flex items-center">
        <DollarSign className="w-6 h-6 text-gold mr-2" />
        QuickBooks Secure Payment
      </h2>
      <p className="text-luxury-500 mb-4">Your payment will be securely processed through QuickBooks Payments.</p>
      <div className="flex justify-between items-center mb-6">
        <span className="text-luxury-700 font-semibold">Total Amount:</span>
        <span className="text-2xl text-luxury-700 font-bold">${total.toFixed(2)}</span>
      </div>
      <motion.button
        onClick={handlePayment}
        disabled={isProcessing}
        className={`w-full bg-gold text-luxury-700 px-6 py-3 rounded-full hover:bg-soft-gold transition-colors flex items-center justify-center ${
          isProcessing ? "opacity-50 cursor-not-allowed" : ""
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isProcessing ? (
          "Processing..."
        ) : (
          <>
            Pay Securely
            <CreditCard className="ml-2 w-5 h-5" />
          </>
        )}
      </motion.button>
    </motion.div>
  )
}

