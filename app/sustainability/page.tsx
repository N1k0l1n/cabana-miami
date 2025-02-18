"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Leaf, Recycle, Wind, Trees, Shirt, Cog, Mountain } from "lucide-react"
import { LuxuryHeader } from "@/components/luxury-header"

export default function Sustainability() {
  return (
    <div className="bg-luxury-100 min-h-screen">
      <LuxuryHeader />
      {/* Hero Video Section */}
      <section className="relative overflow-hidden h-[600px]">
        <video
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20250207_1501_Luxurious%20Coastal%20Living_simple_compose_01jkh0200bevvvhqbz65ycpfdb-Q1pPfZp4Lg3M15058AiWuS3YI4VHl5.mp4"
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
            className="font-serif text-4xl md:text-5xl text-white text-center"
          >
            Our Commitment to Sustainability
          </motion.h1>
        </div>
      </section>
      <main>
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-luxury-500 text-center max-w-2xl mx-auto mb-16"
            >
              At Cabana Miami, sustainability isn't just a buzzword—it's the foundation of everything we do. Discover
              how we're working to create a more sustainable future through our practices and products.
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="font-serif text-3xl text-luxury-700 mb-6">Our Sustainable Practices</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Leaf className="w-6 h-6 text-gold mr-4 mt-1" />
                    <div>
                      <h3 className="font-serif text-xl text-luxury-700 mb-2">Reclaimed Materials</h3>
                      <p className="text-luxury-500">
                        We breathe new life into discarded materials, transforming them into stunning pieces of
                        furniture.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Recycle className="w-6 h-6 text-gold mr-4 mt-1" />
                    <div>
                      <h3 className="font-serif text-xl text-luxury-700 mb-2">Eco-Friendly Finishes</h3>
                      <p className="text-luxury-500">
                        Our finishes are non-toxic and low-VOC, ensuring the health of both our artisans and our
                        customers.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Wind className="w-6 h-6 text-gold mr-4 mt-1" />
                    <div>
                      <h3 className="font-serif text-xl text-luxury-700 mb-2">Responsible Sourcing</h3>
                      <p className="text-luxury-500">
                        We work closely with local communities to source our materials ethically and sustainably.
                      </p>
                    </div>
                  </li>
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pini1._A_teak_root_table_in_a_luxury_yacht_at_sea_many_details__f1d1f328-030a-4255-bd14-da1c5d94e1b9-jzAtOV9pGVoyzEHihhZy3ObPFCJf63.png"
                  alt="Sustainable luxury furniture"
                  width={600}
                  height={400}
                  className="rounded-xl shadow-lg"
                />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-luxury-200">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-3xl md:text-4xl text-luxury-700 text-center mb-12">
              Sustainable Materials We Use
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Reclaimed Wood",
                  description: "Salvaged from old structures, giving new life to beautiful, aged timber.",
                  icon: <Recycle className="w-12 h-12 text-gold mb-4" />,
                },
                {
                  title: "Natural Rattan",
                  description: "Sustainably harvested, biodegradable, and incredibly versatile for furniture making.",
                  icon: <Leaf className="w-12 h-12 text-gold mb-4" />,
                },
                {
                  title: "Organic Fabrics",
                  description: "Made from natural fibers, free from harmful chemicals and dyes.",
                  icon: <Shirt className="w-12 h-12 text-gold mb-4" />,
                },
                {
                  title: "Recycled Metals",
                  description: "Repurposed metals that reduce waste and energy consumption in production.",
                  icon: <Cog className="w-12 h-12 text-gold mb-4" />,
                },
                {
                  title: "Bamboo",
                  description: "Fast-growing, renewable resource that's both durable and eco-friendly.",
                  icon: <Trees className="w-12 h-12 text-gold mb-4" />,
                },
                {
                  title: "Natural Stone",
                  description: "Locally sourced stones that bring timeless beauty with minimal environmental impact.",
                  icon: <Mountain className="w-12 h-12 text-gold mb-4" />,
                },
              ].map((material, index) => (
                <motion.div
                  key={material.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-md text-center"
                >
                  {material.icon}
                  <h3 className="font-serif text-xl text-luxury-700 mb-2">{material.title}</h3>
                  <p className="text-luxury-500">{material.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-serif text-3xl md:text-4xl text-luxury-700 mb-6"
            >
              Join Us in Our Sustainable Journey
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-luxury-500 text-lg mb-8 max-w-2xl mx-auto"
            >
              By choosing Cabana Miami, you're not just selecting beautiful furniture – you're supporting a more
              sustainable future for our planet. Let's create a world of luxury that doesn't cost the earth.
            </motion.p>
          </div>
        </section>
      </main>
    </div>
  )
}

