"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Leaf, Globe, Gem } from "lucide-react"
import { LuxuryHeader } from "@/components/luxury-header"

const collections = [
  {
    name: "Natural Rattan",
    description: "Artisanal rattan pieces that bring tropical elegance indoors",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pini1._a_high_resolution_rendering_of_a_natural_furniture_a_sol_a72ad10d-a009-470c-92c9-69a2c0f5e0a6-Q8JF9fJclpeIcHVrMgU9VPXOuPUFPM.png",
    icon: <Leaf className="w-6 h-6 text-gold" />,
  },
  {
    name: "Coastal Living",
    description: "Luxurious outdoor furniture for your Miami lifestyle",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pini1._A_set_of_sofas_2_pieces_of_a_single_sofa_one_unit_2_seat_c17263ef-cb5b-4ebf-8139-5651cf60c81b-1-buSx6vTTxr2s5w8ZqhWYDoZAaECLtV.png",
    icon: <Globe className="w-6 h-6 text-gold" />,
  },
  {
    name: "Sunroom Elegance",
    description: "Create your perfect indoor-outdoor living space",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pini1._A_seating_set_made_of_teak_branches_white_upholstery_rat_b7943ceb-de60-47fb-8c09-199a52b9ddca-k6i3Fa0xLzlfrdhseyYGBfp43fRdbn.png",
    icon: <Gem className="w-6 h-6 text-gold" />,
  },
  {
    name: "Terrace Living",
    description: "Modern teak furniture for your outdoor sanctuary",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pini1._A_set_of_sofas_2_pieces_of_a_single_sofa_one_unit_2_seat_9f49b278-c7cf-44f7-b6f4-75f1c795701b-PKfMdLtyfn0RskCz8vR1COYo4Uvp3Y.png",
    icon: <Leaf className="w-6 h-6 text-gold" />,
  },
  {
    name: "Waterfront Series",
    description: "Designed for Miami's spectacular coastal views",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pini1._A_set_of_sofas_2_pieces_of_a_single_sofa_one_unit_2_seat_1d3ec3eb-c748-4f75-ac2b-5f40aa359d92-KbgUW4p5z5L8d8JyRz8bfpEeadlVJF.png",
    icon: <Globe className="w-6 h-6 text-gold" />,
  },
  {
    name: "Signature Teak",
    description: "Timeless designs crafted from sustainable teak",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pini1._A_set_of_sofas_2_pieces_of_a_single_sofa_one_unit_2_seat_60a64e91-ecdb-48c6-8552-e9fa70e172f7-fCkMZ8OT94GBzMhLfd7LUSFs4YL1Ct.png",
    icon: <Gem className="w-6 h-6 text-gold" />,
  },
]

export default function Collections() {
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
            Our Collections
          </motion.h1>
        </div>
      </section>
      <main>
        {/* Collections Grid */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-luxury-500 text-center max-w-2xl mx-auto mb-12 text-lg md:text-xl"
            >
              Discover our curated collections of handcrafted, sustainable luxury furniture. Each piece tells a story of
              artisanal craftsmanship and environmental consciousness.
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {collections.map((collection, index) => (
                <motion.div
                  key={collection.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-64 md:h-80 overflow-hidden">
                    <Image
                      src={collection.image || "/placeholder.svg"}
                      alt={collection.name}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <div className="flex items-center mb-3">
                      {collection.icon}
                      <h2 className="font-serif text-2xl text-white ml-3">{collection.name}</h2>
                    </div>
                    <p className="text-white/80 mb-4">{collection.description}</p>
                    <Link
                      href={`/collections/${collection.name.toLowerCase().replace(" ", "-")}`}
                      className="inline-flex items-center text-gold hover:text-luxury-300 transition-colors"
                    >
                      Explore Collection
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Custom Projects CTA */}
        <section className="py-16 md:py-24 bg-luxury-200">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center max-w-3xl mx-auto"
              >
                <h2 className="font-serif text-3xl md:text-4xl text-luxury-700 mb-6">Custom-Designed Projects</h2>
                <p className="text-luxury-500 mb-8 text-lg">
                  Can't find exactly what you're looking for? We specialize in bringing your unique vision to life. From
                  single statement pieces to complete room sets, our expert craftsmen are ready to create furniture
                  that's uniquely yours.
                </p>
                <Link
                  href="/custom-projects"
                  className="inline-flex items-center gap-2 bg-gold text-luxury-700 px-6 py-3 rounded-full text-lg font-semibold hover:bg-luxury-300 transition-colors"
                >
                  Start Your Custom Project
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Sustainability Note */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="font-serif text-3xl md:text-4xl text-luxury-700 mb-6">Our Commitment to Sustainability</h2>
              <p className="text-luxury-500 mb-8 text-lg">
                Every piece in our collections is crafted with a deep respect for nature and a commitment to sustainable
                practices. We use reclaimed materials, eco-friendly finishes, and responsible sourcing to ensure that
                our furniture is as kind to the environment as it is beautiful in your home.
              </p>
              <Link
                href="/sustainability"
                className="inline-flex items-center text-gold hover:text-luxury-300 transition-colors text-lg"
              >
                Learn More About Our Sustainable Practices
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}

