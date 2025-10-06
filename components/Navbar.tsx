"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart, User, Search, Menu, X } from "lucide-react"
import UserMenu from "@/components/UserMenu"
import { useRouter } from "next/navigation"

const navItems = ["Shop", "Men", "Women", "Kids"]

export default function Navbar() {
  const router = useRouter()
  const [user, setUser] = useState<{ firstName: string } | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) setUser(JSON.parse(storedUser))
  }, [])

  useEffect(() => {
    if (searchTerm) {
      const section = document.getElementById("shop")
      section?.scrollIntoView({ behavior: "smooth" })
    }
  }, [searchTerm])

  const goToCart = () => {
    if (user) router.push("/cart")
    else {
      alert("You need to login to access the cart")
      router.push("/login")
    }
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 cursor-pointer">
          <img
            src="/logosattva.jpg"
            alt="SATTVA SKIN Logo"
            className="w-10 h-10 rounded-full object-cover border border-primary/20"
          />
          <h1 className="text-xl sm:text-2xl font-bold text-primary font-sans">
            SATTVA SKIN
          </h1>
        </Link>

        {/* Desktop Search */}
        <div className="hidden lg:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-full bg-background/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 font-serif text-sm"
            />
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item}
              href={item === "Shop" ? "/#shop" : `/${item.toLowerCase()}`}
              className="text-foreground hover:text-primary transition-all duration-300 font-serif relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile Search Toggle */}
          <Button
            size="sm"
            variant="ghost"
            className="lg:hidden p-2"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="w-5 h-5 text-foreground" />
          </Button>

          {/* Login / User */}
          {user ? (
            <UserMenu user={user} />
          ) : (
            <Link href="/login">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-serif px-5 py-2 rounded-full transition-all duration-300 hidden sm:flex">
                <User className="w-4 h-4 mr-2" /> Login
              </Button>
            </Link>
          )}

          {/* Cart */}
          <Button
            size="sm"
            variant="ghost"
            className="hover:scale-110 transition-transform duration-300 p-2"
            onClick={goToCart}
          >
            <ShoppingCart className="w-5 h-5 text-foreground" />
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            size="sm"
            variant="ghost"
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5 text-foreground" />
            ) : (
              <Menu className="w-5 h-5 text-foreground" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="p-4 border-t border-border bg-white lg:hidden">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-full bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 font-serif text-sm"
            />
          </div>
        </div>
      )}

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-border px-6 py-4 space-y-4 animate-slideDown">
          {navItems.map((item) => (
            <Link
              key={item}
              href={item === "Shop" ? "/#shop" : `/${item.toLowerCase()}`}
              onClick={() => setIsMenuOpen(false)}
              className="block text-lg text-foreground hover:text-primary transition-colors font-serif"
            >
              {item}
            </Link>
          ))}
          {!user && (
            <Link href="/login" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-serif mt-2">
                <User className="w-4 h-4 mr-2" /> Login
              </Button>
            </Link>
          )}
        </div>
      )}
    </header>
  )
}
