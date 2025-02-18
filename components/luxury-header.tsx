"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown, Instagram, Facebook, Linkedin } from "lucide-react"

const navItems = [
  { name: "Home", href: "/" },
  {
    name: "Collections",
    href: "/collections",
    subItems: [
      { name: "Living Room", href: "/collections/living-room" },
      { name: "Bedroom", href: "/collections/bedroom" },
      { name: "Dining", href: "/collections/dining" },
      { name: "Outdoor", href: "/collections/outdoor" },
    ],
  },
  { name: "Shop", href: "/shop" },
  { name: "About", href: "/about" },
  { name: "Sustainability", href: "/sustainability" },
  { name: "Contact", href: "/contact" },
]

export function LuxuryHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleSubmenu = (name: string) => {
    setOpenSubmenu(openSubmenu === name ? null : name)
  }

  return (
    <header
      id="luxury-header"
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : ""}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cabana-miami-keBav2S0ISAeDf7XerkHzEF3wqHzxG.svg"
              alt="Cabana Miami"
              width={120}
              height={40}
              className={`transition-all duration-300 ${isScrolled ? "brightness-0" : "brightness-0 invert"}`}
            />
          </Link>
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-gold ${
                    isScrolled ? "text-luxury-700" : "text-white"
                  }`}
                >
                  {item.name}
                </Link>
                {item.subItems && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block px-4 py-2 text-sm text-luxury-700 hover:bg-soft-gold transition-colors"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <button className="md:hidden text-gold" onClick={() => setIsMobileMenuOpen(true)} aria-label="Open menu">
            <Menu className={`w-6 h-6 ${isScrolled ? "text-luxury-700" : "text-white"}`} />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 bg-white z-50 overflow-y-auto"
          >
            <div className="container mx-auto px-4 py-4 flex justify-between items-center border-b border-luxury-200">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cabana-miami-keBav2S0ISAeDf7XerkHzEF3wqHzxG.svg"
                  alt="Cabana Miami"
                  width={120}
                  height={40}
                  className="brightness-0"
                />
              </Link>
              <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
                <X className="text-luxury-700 w-6 h-6" />
              </button>
            </div>
            <nav className="container mx-auto px-4 py-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="mb-6"
                >
                  {item.subItems ? (
                    <div>
                      <button
                        onClick={() => toggleSubmenu(item.name)}
                        className="w-full text-luxury-700 text-xl font-medium py-2 flex justify-between items-center"
                      >
                        {item.name}
                        <ChevronDown
                          className={`w-5 h-5 transition-transform ${openSubmenu === item.name ? "rotate-180" : ""}`}
                        />
                      </button>
                      <AnimatePresence>
                        {openSubmenu === item.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-2 pl-4 border-l-2 border-gold"
                          >
                            {item.subItems.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className="block text-luxury-500 text-lg py-2 hover:text-gold transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="block text-luxury-700 text-xl font-medium py-2 hover:text-gold transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>
            <div className="container mx-auto px-4 py-8 border-t border-luxury-200">
              <h3 className="text-luxury-700 font-serif text-xl mb-4">Contact Us</h3>
              <p className="text-luxury-500 mb-2">sales@cabana-miami.com</p>
              <p className="text-luxury-500 mb-4">305-965-8026</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gold hover:text-luxury-300 transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="text-gold hover:text-luxury-300 transition-colors">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-gold hover:text-luxury-300 transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

