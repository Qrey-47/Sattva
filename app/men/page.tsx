"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import { products } from "../data/products"

export default function MenPage() {
  const menProducts = products.filter((p) => p.category === "men")

  return (
    <div className="min-h-screen bg-background">
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 font-sans">
              Men’s Collection
            </h2>
            <p className="text-xl text-muted-foreground font-serif max-w-2xl mx-auto">
              Skincare essentials crafted for men’s unique skin needs.
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menProducts.map((product) => (
              <Link key={product.slug} href={`/products/${product.slug}`} className="group">
                <Card className="hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg bg-white">
                  <CardContent className="p-0">
                    <div className="relative">
                      <div className="aspect-square rounded-t-lg overflow-hidden bg-muted">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      {product.badge && (
                        <div className="absolute top-4 left-4">
                          <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-serif">
                            {product.badge}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h4 className="font-bold text-lg text-foreground mb-3 font-serif">
                        {product.name}
                      </h4>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-primary font-bold text-xl font-sans">
                            {product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-muted-foreground line-through text-sm font-sans">
                              {product.originalPrice}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                          ))}
                        </div>
                      </div>
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-serif rounded-full py-3 transition-all duration-300 hover:shadow-lg">
                        View Product
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
