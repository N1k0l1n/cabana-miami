"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { LuxuryHeader } from "@/components/luxury-header"
import { ArrowRight, Leaf, PenToolIcon as Tool, Recycle } from "lucide-react"
import Link from "next/link"

export default function About() {
  return (
    <div className="bg-luxury-100 min-h-screen">
      <LuxuryHeader />
      <main>
        {/* Hero Video Section */}
        <section className="relative overflow-hidden h-[600px]">
          <video
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20250205_1932_Tropical%20Retreat%20Living%20Space_simple_compose_01jkcar42kefqvb08kbq79c8d5-MJ6WMEtrAQKqZ5qUvihpgZbDwVJ4IW.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 h-full flex items-center justify-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-serif text-4xl md:text-5xl lg:text-7xl text-white text-center"
            >
              Our Story
            </motion.h1>
          </div>
        </section>

        {/* Welcome Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-xl lg:text-2xl mb-8 max-w-2xl mx-auto text-center text-luxury-500"
              >
                Where artistry meets craftsmanship, and sustainability drives innovation.
              </motion.p>
              <h2 className="font-serif text-3xl md:text-4xl text-luxury-700 mb-6">Welcome to Cabana Miami</h2>
              <p className="text-luxury-500 text-lg">
                We specialize in transforming creative visions into stunning, custom-made furniture for hotels, bars,
                beach resorts, restaurants, interior designers, architects, and discerning individual clients. At Cabana
                Miami, we seamlessly blend the timeless beauty of wood with rattan, bamboo, iron, aluminum, stainless
                steel, natural stone, granite, and other premium materials to craft unique pieces that inspire and
                captivate.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Crafting Exceptional Spaces */}
        <section className="py-16 md:py-24 bg-luxury-200">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="font-serif text-3xl md:text-4xl text-luxury-700 mb-6">Crafting Exceptional Spaces</h2>
                <p className="text-luxury-500 mb-6">
                  With years of experience, our team partners closely with hospitality leaders, designers, and
                  architects to bring one-of-a-kind furniture concepts to life. We understand that every project is
                  personal, and each piece plays a role in shaping unforgettable experiences.
                </p>
                <p className="text-luxury-500">
                  From elegant hotel suites to vibrant bar interiors, our creations enhance ambiance, reflect
                  personality, and elevate the essence of any space.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pini1._set_of_sofas_2_pieces_of_a_single_sofa_one_unit_2_seats__8688774c-15d2-4dee-9631-8c398a7890d6-40D4cChFGaVI10UduVNjXVKwcKxKno.png"
                  alt="Crafted furniture in a luxurious setting"
                  width={600}
                  height={400}
                  className="rounded-xl shadow-lg"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Sustainability Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h2 className="font-serif text-3xl md:text-4xl text-luxury-700 mb-6">Sustainability at Heart</h2>
              <p className="text-luxury-500 text-lg">
                At Cabana Miami, sustainability isn't just a practice – it's a promise. We prioritize environmentally
                responsible techniques, incorporating recycled, upcycled, and reclaimed materials into our designs.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Leaf className="w-12 h-12 text-gold mb-4" />,
                  title: "Eco-Friendly Materials",
                  description:
                    "We use reclaimed steel and wood whenever possible, striving to minimize waste and reduce our carbon footprint.",
                },
                {
                  icon: <Recycle className="w-12 h-12 text-gold mb-4" />,
                  title: "FSC Standards",
                  description:
                    "Our products meet the Forest Stewardship Council (FSC) standards, ensuring that our materials are sourced responsibly.",
                },
                {
                  icon: <Tool className="w-12 h-12 text-gold mb-4" />,
                  title: "Green Practices",
                  description:
                    "By choosing eco-friendly solutions, we not only preserve natural resources but also contribute to a healthier planet and a more sustainable future.",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="text-center p-6 bg-luxury-100 rounded-xl shadow-lg"
                >
                  {item.icon}
                  <h3 className="font-serif text-xl text-luxury-700 mb-4">{item.title}</h3>
                  <p className="text-luxury-500">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 md:py-24 bg-luxury-200">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-serif text-3xl md:text-4xl text-luxury-700 text-center mb-12"
            >
              Why Choose Cabana Miami?
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Tailored Design",
                  description:
                    "We bring your ideas to life, offering bespoke furniture solutions that align with your unique vision and specifications.",
                },
                {
                  title: "Precision & Detail",
                  description:
                    "Every detail matters. Our artisans meticulously craft each piece, ensuring flawless execution and exceptional quality.",
                },
                {
                  title: "Masterful Craftsmanship",
                  description:
                    "With passion and expertise, our skilled makers deliver durable, timeless furniture that stands the test of time.",
                },
                {
                  title: "Eco-Conscious Approach",
                  description:
                    "Sustainability drives our process, from material selection to final creation. By working with us, you champion environmentally responsible design.",
                },
                {
                  title: "Personal Projects & Special Requests",
                  description:
                    "We create handmade personal items and accept special commissions based on individual client needs. No project is too small or unique.",
                },
                {
                  title: "Collaborative Spirit",
                  description:
                    "We believe the best results come from strong partnerships. Our team values open communication and works closely with clients to exceed expectations.",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-lg"
                >
                  <h3 className="font-serif text-xl text-luxury-700 mb-4">{item.title}</h3>
                  <p className="text-luxury-500">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif text-3xl md:text-4xl text-luxury-700 mb-6">Let's Create Together</h2>
              <p className="text-luxury-500 text-lg mb-8 max-w-2xl mx-auto">
                Are you ready to transform your space with thoughtfully crafted, sustainable furniture? We'd love to
                hear from you. Get in touch today to discuss your project!
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Link
                  href="mailto:sales@cabana-miami.com"
                  className="inline-flex items-center gap-2 bg-gold text-luxury-700 px-6 py-3 rounded-full text-base font-semibold hover:bg-luxury-300 transition-colors"
                >
                  Email Us
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="tel:305-965-8026"
                  className="inline-flex items-center gap-2 bg-luxury-700 text-white px-6 py-3 rounded-full text-base font-semibold hover:bg-luxury-600 transition-colors"
                >
                  Call Us
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}

