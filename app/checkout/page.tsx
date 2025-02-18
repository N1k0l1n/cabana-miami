"use client"

import type React from "react"
import { useState } from "react"
import { useCart } from "../contexts/CartContext"
import { LuxuryHeader } from "@/components/luxury-header"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { CheckoutSteps } from "@/components/checkout-steps"
import { LuxuryFormField } from "@/components/luxury-form-field"
import { OrderItem } from "@/components/order-item"
import { Lock, CreditCard, Truck, Package, Gift, ArrowRight, ArrowLeft } from "lucide-react"

const steps = ["Information", "Shipping", "Payment"]

export default function CheckoutPage() {
  const { cart, total, clearCart } = useCart()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    country: "",
    zipCode: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const validateStep = () => {
    const newErrors: { [key: string]: string } = {}
    const fieldsToValidate = [
      ["firstName", "lastName", "email"],
      ["address", "city", "country", "zipCode"],
      ["cardNumber", "cardExpiry", "cardCVC"],
    ][currentStep]

    fieldsToValidate.forEach((field) => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
    }
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateStep()) {
      // Here you would typically send the order to your backend
      console.log("Order submitted:", { ...formData, cart, total })

      // Simulate order processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      clearCart()
      router.push("/checkout/confirmation")
    }
  }

  return (
    <div className="min-h-screen bg-ocean-light">
      <LuxuryHeader />
      <main className="container mx-auto px-4 py-24">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-serif text-luxury-700 mb-8 text-center"
        >
          Secure Checkout
        </motion.h1>
        <CheckoutSteps currentStep={currentStep} steps={steps} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
              {currentStep === 0 && (
                <>
                  <h2 className="text-2xl font-serif text-luxury-700 mb-6">Your Information</h2>
                  <LuxuryFormField
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                  />
                  <LuxuryFormField
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                  />
                  <LuxuryFormField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                  />
                </>
              )}
              {currentStep === 1 && (
                <>
                  <h2 className="text-2xl font-serif text-luxury-700 mb-6">Shipping Address</h2>
                  <LuxuryFormField
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    error={errors.address}
                  />
                  <LuxuryFormField
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    error={errors.city}
                  />
                  <LuxuryFormField
                    label="Country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    error={errors.country}
                  />
                  <LuxuryFormField
                    label="Zip Code"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    error={errors.zipCode}
                  />
                </>
              )}
              {currentStep === 2 && (
                <>
                  <h2 className="text-2xl font-serif text-luxury-700 mb-6">Payment Details</h2>
                  <LuxuryFormField
                    label="Card Number"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    error={errors.cardNumber}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <LuxuryFormField
                      label="Expiry Date"
                      name="cardExpiry"
                      placeholder="MM/YY"
                      value={formData.cardExpiry}
                      onChange={handleChange}
                      error={errors.cardExpiry}
                    />
                    <LuxuryFormField
                      label="CVC"
                      name="cardCVC"
                      value={formData.cardCVC}
                      onChange={handleChange}
                      error={errors.cardCVC}
                    />
                  </div>
                </>
              )}
              <div className="flex justify-between mt-8">
                {currentStep > 0 && (
                  <motion.button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center text-luxury-700 hover:text-gold transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ArrowLeft className="mr-2" />
                    Back
                  </motion.button>
                )}
                <motion.button
                  type={currentStep === steps.length - 1 ? "submit" : "button"}
                  onClick={currentStep === steps.length - 1 ? undefined : handleNext}
                  className="bg-gold text-luxury-700 px-6 py-3 rounded-full hover:bg-soft-gold transition-colors flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {currentStep === steps.length - 1 ? "Place Order" : "Continue"}
                  <ArrowRight className="ml-2" />
                </motion.button>
              </div>
            </form>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-serif text-luxury-700 mb-6">Order Summary</h2>
              {cart.map((item) => (
                <OrderItem
                  key={item.id}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  image={item.image || "/placeholder.svg"}
                />
              ))}
              <div className="mt-4 flex justify-between items-center border-t border-luxury-200 pt-4">
                <span className="text-luxury-700 font-semibold">Total</span>
                <span className="text-2xl text-luxury-700 font-bold">${total.toFixed(2)}</span>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 bg-white p-6 rounded-lg shadow-md"
            >
              <h2 className="text-2xl font-serif text-luxury-700 mb-4">Our Promises</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Lock className="text-gold mr-2" />
                  <span className="text-luxury-500">Secure Checkout</span>
                </div>
                <div className="flex items-center">
                  <CreditCard className="text-gold mr-2" />
                  <span className="text-luxury-500">Encrypted Payment</span>
                </div>
                <div className="flex items-center">
                  <Truck className="text-gold mr-2" />
                  <span className="text-luxury-500">Free Shipping</span>
                </div>
                <div className="flex items-center">
                  <Package className="text-gold mr-2" />
                  <span className="text-luxury-500">30-Day Returns</span>
                </div>
                <div className="flex items-center">
                  <Gift className="text-gold mr-2" />
                  <span className="text-luxury-500">Gift Wrapping</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

