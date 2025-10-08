"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, User, Star, Heart, Sparkles } from "lucide-react";
import Link from "next/link";
import { products } from "./data/products";

type User = {
  firstName: string;
  lastName?: string;
  email?: string;
};

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const bestSellersRef = useRef<HTMLElement | null>(null);

  // Fetch current user from API
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/me");
        if (!res.ok) return;
        const data = await res.json();
        if (data.user) setUser(data.user);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const section = document.getElementById("shop");
      section?.scrollIntoView({ behavior: "smooth" });
    }
  }, [searchTerm]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        {/* ---------------- Left Column: Main Content ---------------- */}
        <div>
          {/* Hero Section */}
          <section className="relative py-20 lg:py-32 overflow-hidden">
            <div
              className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/10"
              style={{
                backgroundImage: `url('/serene-nature-forest-with-flowing-water-natural-sk.png')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/60 to-white/40"></div>
            </div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <div className="bg-white/95 backdrop-blur-md rounded-3xl p-12 shadow-2xl border border-primary/10">
                  <div className="flex justify-center mb-6">
                    <div className="flex items-center gap-2 bg-primary px-4 py-2 rounded-full">
                      <Sparkles className="w-4 h-4 text-primary-foreground" />
                      <span className="text-sm font-serif text-primary-foreground">
                        Premium Natural Skincare
                      </span>
                    </div>
                  </div>
                  <h2 className="text-5xl lg:text-7xl font-bold text-foreground mb-8 font-sans leading-tight">
                    Embrace Your
                    <span className="text-primary block">Natural Beauty</span>
                  </h2>
                  <p className="text-xl lg:text-2xl text-muted-foreground mb-10 font-serif leading-relaxed max-w-2xl mx-auto">
                    Discover the transformative power of organic ingredients with our luxurious skincare collection.
                    Crafted with love, designed for your skin's natural radiance.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="#shop">
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-serif px-10 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                        Shop Collection
                      </Button>
                    </a>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-serif px-10 py-4 text-lg rounded-full transition-all duration-300 bg-transparent"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Best Sellers Section */}
          <section id="shop" className="py-20 bg-card/50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <div className="flex justify-center mb-4">
                  <div className="flex items-center gap-2 bg-primary px-4 py-2 rounded-full">
                    <Heart className="w-4 h-4 text-primary-foreground" />
                    <span className="text-sm font-serif text-primary-foreground">Customer Favorites</span>
                  </div>
                </div>
                <h3 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 font-sans">Best Sellers</h3>
                <p className="text-xl text-muted-foreground font-serif max-w-2xl mx-auto">
                  Our most loved products for radiant, healthy skin that glows from within
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
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
                                <span className="text-primary font-bold text-xl font-sans">{product.price}</span>
                                <span className="text-muted-foreground line-through text-sm font-sans">
                                  {product.originalPrice}
                                </span>
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
                  ))
                ) : (
                  <p className="text-center text-muted-foreground col-span-full">No products found</p>
                )}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-primary text-primary-foreground py-16">
            <div className="container mx-auto px-4">
              <footer className="bg-primary text-primary-foreground py-16">
                <div className="container mx-auto px-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <img
                          src="/logosattva.jpg"
                          alt="SATTVA SKIN Logo"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <h5 className="text-xl font-bold font-sans">SATTVA SKIN</h5>
                      </div>
                      <p className="text-primary-foreground/80 font-serif">
                        Natural skincare for your beautiful journey.
                      </p>
                    </div>
                    <div>
                      <h6 className="font-semibold mb-4 font-sans">Quick Links</h6>
                      <ul className="space-y-2 font-serif">
                        {["About Us", "Products", "Reviews", "Contact"].map((item) => (
                          <li key={item}>
                            <a
                              href="#"
                              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                            >
                              {item}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h6 className="font-semibold mb-4 font-sans">Customer Care</h6>
                      <ul className="space-y-2 font-serif">
                        {["Shipping Info", "Returns", "FAQ", "Support"].map((item) => (
                          <li key={item}>
                            <a
                              href="#"
                              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                            >
                              {item}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h6 className="font-semibold mb-4 font-sans">Newsletter</h6>
                      <p className="text-primary-foreground/80 mb-4 font-serif">
                        Get skincare tips and exclusive offers.
                      </p>
                      <div className="flex gap-2">
                        <input
                          type="email"
                          placeholder="Your email"
                          className="flex-1 px-3 py-2 rounded bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/60 border border-primary-foreground/20 font-serif"
                        />
                        <Button variant="secondary" size="sm" className="font-serif">
                          Subscribe
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
                    <p className="text-primary-foreground/80 font-serif">
                      © 2024 SATTVA SKIN. All rights reserved.
                    </p>
                  </div>
                </div>
              </footer>
            </div>
          </footer>
        </div>

        {/* Right Column: Advertisements */}
        <aside className="hidden lg:block space-y-6 sticky top-8 h-fit">
          {/* Ad Cards */}
          <Card className="p-0 overflow-hidden">
            <img src="/ads/ad1.jpg" alt="Ad 1" className="w-full h-48 object-cover" />
            <CardContent className="p-4">
              <p className="font-serif text-sm text-muted-foreground">
                Glow naturally — shop now and get 20% off!
              </p>
            </CardContent>
          </Card>

          <Card className="p-0 overflow-hidden">
            <img src="/ads/ad2.jpg" alt="Ad 2" className="w-full h-48 object-cover" />
            <CardContent className="p-4">
              <p className="font-serif text-sm text-muted-foreground">
                Discover herbal serums for radiant skin.
              </p>
            </CardContent>
          </Card>

          <Card className="p-0 overflow-hidden">
            <img src="/ads/ad3.jpg" alt="Ad 3" className="w-full h-48 object-cover" />
            <CardContent className="p-4">
              <p className="font-serif text-sm text-muted-foreground">
                Limited edition organic face packs — try today!
              </p>
            </CardContent>
          </Card>
        </aside>

      </div>
    </div>
  );
}
