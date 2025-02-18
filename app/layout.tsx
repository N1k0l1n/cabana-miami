import "./globals.css"
import { Montserrat, Playfair_Display } from "next/font/google"
import type React from "react"
import Script from "next/script"
import { CartProvider } from "./contexts/CartContext"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
})

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
})

export const metadata = {
  title: "Cabana Miami - Luxury Handmade Furniture",
  description:
    "Discover handcrafted, eco-friendly luxury furniture at Cabana Miami. Elevate your space with our artisanal pieces inspired by nature and built for luxury.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${playfairDisplay.variable} font-sans`}>
        <CartProvider>
          <main>{children}</main>
        </CartProvider>
        <Script src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `}
        </Script>
        <footer className="bg-background-accent text-primary py-8">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-serif text-xl mb-4">Cabana Miami</h3>
              <p>Handcrafted elegance, inspired by nature, built for luxury.</p>
            </div>
            <div>
              <h4 className="font-serif text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/shop" className="hover:text-soft-gold transition-colors">
                    Shop
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:text-soft-gold transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/sustainability" className="hover:text-soft-gold transition-colors">
                    Sustainability
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-soft-gold transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif text-lg mb-4">Connect With Us</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-soft-gold transition-colors">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-soft-gold transition-colors">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-soft-gold transition-colors">
                    Pinterest
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="container mx-auto mt-8 pt-8 border-t border-beige/30 text-center">
            <p>&copy; 2023 Cabana Miami. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}



import './globals.css'