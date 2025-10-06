import type React from "react"
import type { Metadata } from "next"
import { Inter, Manrope } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/app/Context/CartContext"
import Navbar from "@/components/Navbar"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
})

export const metadata: Metadata = {
  title: "SATTVA SKIN - Natural Skincare",
  description: "Embrace your natural beauty with premium organic skincare products",
  generator: "v0.app",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable} antialiased`}>
      <body>
        <CartProvider>
          <Navbar />  {/* ✅ Global navbar */}
          <main>{children}</main>

        </CartProvider>
      </body>
    </html>
  )
}
