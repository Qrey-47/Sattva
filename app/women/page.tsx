"use client";

import { useState } from "react";
import Link from "next/link";
import { products } from "@/app/data/products";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Star } from "lucide-react";

export default function WomenPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // filter products by category + search term
  const filteredProducts = products.filter(
    (p) =>
      p.category === "women" &&
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 font-sans">
            Women&apos;s Collection
          </h2>
          <p className="text-lg text-muted-foreground font-serif">
            Explore our premium skincare range crafted for women’s radiant skin
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full max-w-md mx-auto mb-12">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search women’s products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-full bg-background/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 font-serif text-sm"
          />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group"
              >
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
                          <span className="text-muted-foreground line-through text-sm font-sans">
                            {product.originalPrice}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-primary text-primary"
                            />
                          ))}
                        </div>
                      </div>
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-serif rounded-full py-3 transition-all duration-300 hover:shadow-lg">
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <p className="text-center text-muted-foreground col-span-full">
              No products found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
