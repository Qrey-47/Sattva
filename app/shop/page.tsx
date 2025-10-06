"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ShoppingCart, Filter, Eye } from "lucide-react"

// --- Mock Data: Retained for visibility ---
const MOCK_PRODUCTS = [
  { _id: "p1", name: "Hydrating Facial Serum", price: 49.99, originalPrice: 65.00, image: "/images/serum.jpg", category: "Skincare", badge: "SALE", rating: 4.8 },
  { _id: "p2", name: "Organic Lavender Cleanser", price: 29.50, image: "/images/cleanser.jpg", category: "Skincare", badge: "NEW", rating: 5.0 },
  { _id: "p3", name: "Deep Repair Night Cream", price: 59.99, image: "/images/night-cream.jpg", category: "Skincare", rating: 4.5 },
  { _id: "p4", name: "Volumizing Shampoo Bar", price: 18.00, originalPrice: 22.00, image: "/images/shampoo.jpg", category: "Haircare", badge: "Best Seller", rating: 4.9 },
  { _id: "p5", name: "Aloe Vera Body Lotion", price: 34.99, image: "/images/lotion.jpg", category: "Body", rating: 4.2 },
  { _id: "p6", name: "Detox Clay Face Mask", price: 39.00, image: "/images/mask.jpg", category: "Skincare", rating: 4.7 },
]
// --------------------------------------------------------------------------

interface Product {
  _id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category?: string
  badge?: string
  rating: number 
}

// Helper function to simulate star ratings
const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className="flex">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-4 h-4 fill-amber-400 text-amber-400" />
      ))}
      {hasHalfStar && (
        <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="#facc15" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.178 3.619 3.805.275c.957.069 1.34 1.25.642 1.777l-2.906 2.112 1.107 3.407c.3.921-.755 1.688-1.54 1.144L10 14.613l-3.048 2.217c-.785.544-1.84-.223-1.54-1.144l1.107-3.407-2.906-2.112c-.698-.527-.315-1.708.642-1.777l3.805-.275L9.049 2.927z" fill="url(#half)" />
        </svg>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-4 h-4 text-amber-400" strokeWidth={1.5} />
      ))}
    </div>
  )
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  // 🌿 Primary Color Scheme: Matched to the SATTVA SKIN logo/theme
  // Using 'teal-800' provides the deep, muted green/teal tone for an elegant, natural look.
  const PRIMARY_COLOR_CLASS = "bg-teal-800 hover:bg-teal-900" 
  const TEXT_COLOR_CLASS = "text-teal-800"
  const BORDER_COLOR_CLASS = "border-teal-800"

  useEffect(() => {
    // --- Mock Fetch Implementation: SIMULATES MongoDB Atlas API call ---
    setTimeout(() => { 
        setProducts(MOCK_PRODUCTS as Product[])
        setLoading(false)
    }, 1000)
    // ------------------------------------------------------------------
  }, [])

  return (
    // Background is high-contrast white/light gray
    <div className="min-h-screen bg-white dark:bg-gray-50">
      
      {/* ✅ Page Header - Clean, Minimalist Banner */}
      <section className="bg-white py-16 text-center border-b border-gray-100">
        <h1 className={`text-5xl font-extrabold ${TEXT_COLOR_CLASS} mb-4 tracking-normal`}>
          Shop Our Collection
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Natural. Effective. Inspired by ancient wellness traditions.
        </p>
      </section>

      {/* ✅ Shop Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-10 border-b pb-4 border-gray-200">
          <h2 className="text-3xl font-semibold text-gray-800">All Products</h2>
          <Button 
            variant="outline" 
            className={`flex items-center gap-2 ${TEXT_COLOR_CLASS} ${BORDER_COLOR_CLASS} hover:bg-gray-50 transition-all`}
          >
            <Filter className="w-4 h-4" />
            Filter & Sort
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-20">
            {/* Loading spinner uses the primary text color (teal-800) */}
            <div className={`animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent ${TEXT_COLOR_CLASS.replace('text-', 'text-')} rounded-full`} role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <p className="text-gray-500 mt-4">Preparing nature's finest products...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <Card 
                key={product._id} 
                className="group overflow-hidden shadow-sm border-gray-100 hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-0.5 bg-white"
              >
                <CardContent className="p-0">
                  {/* Product Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                    />
                    {product.badge && (
                      <span className={`absolute top-4 left-4 ${PRIMARY_COLOR_CLASS} text-white px-3 py-1 rounded-sm text-xs font-medium shadow-md`}>
                        {product.badge}
                      </span>
                    )}

                    {/* Quick View Overlay (Subtle Hover) */}
                    <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button variant="secondary" className={`${PRIMARY_COLOR_CLASS} text-white shadow-lg flex items-center gap-2`}>
                            <Eye className="w-4 h-4" />
                            Quick View
                        </Button>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="p-5 text-center">
                    <p className={`text-sm font-semibold ${TEXT_COLOR_CLASS} uppercase mb-1 tracking-wider`}>
                        {product.category || 'Skincare'}
                    </p>
                    <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                    
                    {/* Rating & Price */}
                    <div className="flex items-center justify-center mb-3">
                        {renderStars(product.rating)}
                        <span className="text-xs text-gray-500 ml-2">({product.rating.toFixed(1)})</span>
                    </div>
                    
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <span className={`text-xl font-bold ${TEXT_COLOR_CLASS}`}>{`$${product.price.toFixed(2)}`}</span>
                      {product.originalPrice && (
                        <span className="line-through text-sm text-gray-400">
                          {`$${product.originalPrice.toFixed(2)}`}
                        </span>
                      )}
                    </div>
                    
                    {/* Add to Cart Button */}
                    <Button className={`w-full ${PRIMARY_COLOR_CLASS} text-white rounded-sm transition-colors duration-300 shadow-md flex items-center justify-center gap-2`}>
                      <ShoppingCart className="w-4 h-4" />
                      Add to Basket
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}