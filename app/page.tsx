"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Leaf, Globe, Gem, Recycle, Palette } from "lucide-react"
import { motion } from "framer-motion"
import { useRef } from "react"
import { LuxuryHeader } from "@/components/luxury-header"

export default function Home() {
  const containerRef = useRef(null)

  return (
    <div ref={containerRef} className="bg-luxury-100">
      <LuxuryHeader />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <video
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20250207_1501_Luxurious%20Coastal%20Living_simple_compose_01jkh0200bevvvhqbz65ycpfdb-Q1pPfZp4Lg3M15058AiWuS3YI4VHl5.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="object-cover w-full h-full"
            poster="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pini1._Natural_rattan_and_rattan_lampshades_on_the_ceiling_are__4ff710d1-0b6f-48de-a9f6-ed26b71ce46b-Q7FoV0woSgS4fqHxZcwr32CAzJRECr.png"
          >
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white max-w-4xl px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl mb-6"
          >
            Cabana Miami
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
          >
            Luxury. Sustainability. Design.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 bg-gold text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Discover Luxury
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Our Unique Approach Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl text-luxury-700 text-center mb-12">Our Unique Approach</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Palette className="w-12 h-12 text-gold" />,
                title: "Custom Design",
                description: "Tailored furniture projects for discerning clients and spaces.",
              },
              {
                icon: <Recycle className="w-12 h-12 text-gold" />,
                title: "Sustainable Materials",
                description: "Eco-friendly and reclaimed materials for conscious luxury.",
              },
              {
                icon: <Gem className="w-12 h-12 text-gold" />,
                title: "Artisanal Craftsmanship",
                description: "Skilled artisans bringing designs to life with precision.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-luxury-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex flex-col items-center text-center">
                  <motion.div initial={{ rotate: 0 }} whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                    {item.icon}
                  </motion.div>
                  <h3 className="font-serif text-xl text-luxury-700 mt-4 mb-2">{item.title}</h3>
                  <p className="text-luxury-500">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-16 md:py-24 bg-luxury-200">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-luxury-700 mb-4 md:mb-6">Our Signature Collections</h2>
            <p className="text-base md:text-lg text-luxury-500">
              Discover our handcrafted pieces and custom-designed furniture projects. We create unique items in any
              quantity, using a wide range of materials to perfectly suit your Miami lifestyle.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pini1._a_high_resolution_rendering_of_a_natural_furniture_a_sol_a72ad10d-a009-470c-92c9-69a2c0f5e0a6-Q8JF9fJclpeIcHVrMgU9VPXOuPUFPM.png",
                alt: "Indoor Rattan Collection",
                title: "Natural Rattan",
                description: "Artisanal rattan pieces that bring tropical elegance indoors",
                link: "/collections/natural-rattan",
              },
              {
                src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pini1._A_set_of_sofas_2_pieces_of_a_single_sofa_one_unit_2_seat_c17263ef-cb5b-4ebf-8139-5651cf60c81b-1-buSx6vTTxr2s5w8ZqhWYDoZAaECLtV.png",
                alt: "Coastal Living Collection",
                title: "Coastal Living",
                description: "Luxurious outdoor furniture for your Miami lifestyle",
                link: "/collections/coastal-living",
              },
              {
                src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pini1._A_seating_set_made_of_teak_branches_white_upholstery_rat_b7943ceb-de60-47fb-8c09-199a52b9ddca-k6i3Fa0xLzlfrdhseyYGBfp43fRdbn.png",
                alt: "Sunroom Collection",
                title: "Sunroom Elegance",
                description: "Create your perfect indoor-outdoor living space",
                link: "/collections/sunroom-elegance",
              },
              {
                src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pini1._A_set_of_sofas_2_pieces_of_a_single_sofa_one_unit_2_seat_9f49b278-c7cf-44f7-b6f4-75f1c795701b-PKfMdLtyfn0RskCz8vR1COYo4Uvp3Y.png",
                alt: "Terrace Living Collection",
                title: "Terrace Living",
                description: "Modern teak furniture for your outdoor sanctuary",
                link: "/collections/terrace-living",
              },
              {
                src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pini1._A_set_of_sofas_2_pieces_of_a_single_sofa_one_unit_2_seat_1d3ec3eb-c748-4f75-ac2b-5f40aa359d92-KbgUW4p5z5L8d8JyRz8bfpEeadlVJF.png",
                alt: "Waterfront Series",
                title: "Waterfront Series",
                description: "Designed for Miami's spectacular coastal views",
                link: "/collections/waterfront-series",
              },
              {
                src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pini1._A_set_of_sofas_2_pieces_of_a_single_sofa_one_unit_2_seat_60a64e91-ecdb-48c6-8552-e9fa70e172f7-fCkMZ8OT94GBzMhLfd7LUSFs4YL1Ct.png",
                alt: "Signature Teak Collection",
                title: "Signature Teak",
                description: "Timeless designs crafted from sustainable teak",
                link: "/collections/signature-teak",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group relative overflow-hidden rounded-xl shadow-lg"
              >
                <Image
                  src={item.src || "/placeholder.svg"}
                  alt={item.alt}
                  width={600}
                  height={400}
                  className="object-cover w-full h-64 md:h-80 transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 md:p-8">
                  <div className="text-white">
                    <h3 className="font-serif text-xl md:text-2xl mb-2">{item.title}</h3>
                    <p className="text-white/80 mb-4 text-sm md:text-base">{item.description}</p>
                    <Link
                      href={item.link}
                      className="text-gold hover:text-luxury-300 transition-colors text-sm md:text-base"
                    >
                      View Collection →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
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
            <h2 className="font-serif text-3xl md:text-4xl text-luxury-700 mb-6">Our Commitment to Sustainability</h2>
            <p className="text-luxury-500 text-lg">
              At Cabana Miami, we believe that luxury and sustainability go hand in hand. Our commitment to the
              environment is reflected in every piece we create.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Leaf className="w-12 h-12 text-gold mb-4" />,
                title: "Eco-Friendly Materials",
                description:
                  "We use reclaimed wood, sustainable rattan, and other eco-friendly materials in our designs.",
              },
              {
                icon: <Recycle className="w-12 h-12 text-gold mb-4" />,
                title: "Responsible Production",
                description:
                  "Our production processes are designed to minimize waste and reduce our environmental impact.",
              },
              {
                icon: <Globe className="w-12 h-12 text-gold mb-4" />,
                title: "Local Sourcing",
                description: "We prioritize local sourcing to support communities and reduce transportation emissions.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
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

      {/* Call to Action */}
      <section className="relative py-16 md:py-32">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pini1._Natural_rattan_and_rattan_lampshades_on_the_ceiling_are__4ff710d1-0b6f-48de-a9f6-ed26b71ce46b-Q7FoV0woSgS4fqHxZcwr32CAzJRECr.png"
          alt="Luxury coastal living space"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4 md:mb-6">
              Transform Your Space with Cabana Miami
            </h2>
            <p className="text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto">
              Experience the perfect blend of luxury, sustainability, and timeless design. Let us help you create your
              own tropical paradise.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gold text-luxury-700 px-6 py-3 md:px-8 md:py-4 rounded-full text-base md:text-lg font-semibold hover:bg-luxury-300 hover:text-luxury-700 transition-colors"
            >
              Get in Touch
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

