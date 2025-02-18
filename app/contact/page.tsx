"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { LuxuryHeader } from "@/components/luxury-header"
import { Mail, Phone, MapPin, ArrowRight, Clock, Instagram, Facebook, Linkedin, ChevronRight } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setFormData({ name: "", email: "", phone: "", message: "" })
  }

  return (
    <div className="bg-ocean-light min-h-screen">
      <LuxuryHeader />

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pini1._A_set_of_sofas_2_pieces_of_a_single_sofa_one_unit_2_seat_c17263ef-cb5b-4ebf-8139-5651cf60c81b-1-buSx6vTTxr2s5w8ZqhWYDoZAaECLtV.png"
          alt="Luxury Furniture"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-5xl md:text-6xl mb-4"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl"
          >
            Let's create your dream space together
          </motion.p>
        </div>
      </section>

      <main>
        {/* Contact Form and Information Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-serif text-4xl md:text-5xl text-luxury-700 text-center mb-12"
            >
              Get in Touch
            </motion.h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-ocean-light p-8 rounded-xl shadow-lg"
              >
                <h3 className="font-serif text-2xl text-luxury-700 mb-6">Send us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-luxury-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-luxury-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold text-luxury-700"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-luxury-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-luxury-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold text-luxury-700"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-luxury-700 mb-2">
                      Phone (optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-luxury-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold text-luxury-700"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-luxury-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-2 border border-luxury-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold text-luxury-700"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gold text-luxury-700 px-6 py-3 rounded-full text-lg font-semibold hover:bg-soft-gold transition-colors flex items-center justify-center"
                  >
                    Send Message
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </form>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-luxury-700 text-white p-8 rounded-xl shadow-lg"
              >
                <h3 className="font-serif text-2xl mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-center">
                    <Mail className="w-6 h-6 text-gold mr-4" />
                    <p>sales@cabana-miami.com</p>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-6 h-6 text-gold mr-4" />
                    <p>305-965-8026</p>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-6 h-6 text-gold mr-4" />
                    <p>260 NW 36 St, Miami, FL 33127</p>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-6 h-6 text-gold mr-4" />
                    <p>Mon-Fri: 9am-6pm, Sat: 10am-4pm</p>
                  </div>
                </div>
                <div className="mt-8">
                  <h4 className="font-serif text-xl mb-4">Follow Us</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="text-gold hover:text-soft-gold transition-colors">
                      <Instagram className="w-6 h-6" />
                    </a>
                    <a href="#" className="text-gold hover:text-soft-gold transition-colors">
                      <Facebook className="w-6 h-6" />
                    </a>
                    <a href="#" className="text-gold hover:text-soft-gold transition-colors">
                      <Linkedin className="w-6 h-6" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-ocean-light">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-3xl text-luxury-700 text-center mb-12">Frequently Asked Questions</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  question: "Do you offer custom designs?",
                  answer:
                    "Yes, we specialize in custom furniture designs tailored to your specific needs and preferences.",
                },
                {
                  question: "What is your delivery timeframe?",
                  answer:
                    "Delivery times vary depending on the item and customization. Typically, it ranges from 4-8 weeks.",
                },
                {
                  question: "Do you ship internationally?",
                  answer:
                    "Yes, we offer international shipping. Please contact us for specific shipping rates and details.",
                },
                {
                  question: "What materials do you use?",
                  answer:
                    "We use a variety of high-quality, sustainable materials including reclaimed wood, natural rattan, and eco-friendly fabrics.",
                },
                {
                  question: "Do you offer installation services?",
                  answer:
                    "Yes, we provide professional installation services for all our furniture pieces in the Miami area.",
                },
                {
                  question: "What is your return policy?",
                  answer: "We offer a 30-day return policy for stock items. Custom pieces are non-returnable.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-md"
                >
                  <h3 className="font-serif text-xl text-luxury-700 mb-2">{faq.question}</h3>
                  <p className="text-luxury-500">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-serif text-3xl text-luxury-700 text-center mb-12"
            >
              Visit Our Showroom
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3592.688392422351!2d-80.20210668498386!3d25.805630983614047!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b6b8a2939fed%3A0x9e4e6c1f8b7c1f2e!2s260%20NW%2036th%20St%2C%20Miami%2C%20FL%2033127!5e0!3m2!1sen!2sus!4v1620847108284!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                ></iframe>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-4"
              >
                <h3 className="font-serif text-2xl text-luxury-700">Experience Luxury in Person</h3>
                <p className="text-luxury-500">
                  Visit our showroom to see and feel the quality of our furniture firsthand. Our expert staff is ready
                  to assist you in finding the perfect pieces for your space.
                </p>
                <div className="flex items-center text-gold">
                  <MapPin className="w-5 h-5 mr-2" />
                  <p>260 NW 36 St, Miami, FL 33127</p>
                </div>
                <div className="flex items-center text-gold">
                  <Clock className="w-5 h-5 mr-2" />
                  <p>Mon-Fri: 9am-6pm, Sat: 10am-4pm</p>
                </div>
                <a href="#" className="inline-flex items-center text-luxury-700 hover:text-gold transition-colors">
                  Get Directions
                  <ChevronRight className="ml-2 w-4 h-4" />
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 md:py-24 bg-ocean-light">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="font-serif text-3xl text-luxury-700 mb-6"
              >
                Stay Informed
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-luxury-500 mb-8"
              >
                Subscribe to our newsletter for exclusive offers, design tips, and first looks at new collections.
              </motion.p>
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-2 rounded-full border border-luxury-300 focus:outline-none focus:ring-2 focus:ring-gold text-luxury-700"
                  required
                />
                <button
                  type="submit"
                  className="bg-gold text-luxury-700 px-6 py-2 rounded-full font-semibold hover:bg-soft-gold transition-colors"
                >
                  Subscribe
                </button>
              </motion.form>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

