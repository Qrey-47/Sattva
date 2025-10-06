import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingCart, User, Star, Leaf, Award, Shield, Menu, Heart, Sparkles, Search } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shadow-lg border border-primary/20">
                <Leaf className="w-6 h-6 text-accent" />
              </div>
              <h1 className="text-2xl font-bold text-accent font-sans">SATTVA SKIN</h1>
            </div>

            <div className="hidden lg:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-full bg-background/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-300 font-serif text-sm"
                />
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-10">
              <a
                href="#"
                className="text-foreground hover:text-accent transition-all duration-300 font-serif relative group"
              >
                Shop
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="#"
                className="text-foreground hover:text-accent transition-all duration-300 font-serif relative group"
              >
                Men
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="#"
                className="text-foreground hover:text-accent transition-all duration-300 font-serif relative group"
              >
                Women
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="#"
                className="text-foreground hover:text-accent transition-all duration-300 font-serif relative group"
              >
                Kids
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </a>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Button
                size="sm"
                variant="ghost"
                className="lg:hidden hover:scale-110 transition-transform duration-300 p-2"
              >
                <Search className="w-5 h-5 text-foreground" />
              </Button>

              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-serif px-6 py-2 rounded-full transition-all duration-300 hidden sm:flex">
                <User className="w-4 h-4 mr-2" />
                Login
              </Button>
              <Button size="sm" variant="ghost" className="hover:scale-110 transition-transform duration-300 p-2">
                <ShoppingCart className="w-5 h-5 text-foreground" />
              </Button>

              {/* Mobile hamburger menu */}
              <Button size="sm" variant="ghost" className="md:hidden p-2">
                <Menu className="w-5 h-5 text-foreground" />
              </Button>
            </div>
          </div>
        </div>
      </header>

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
                <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span className="text-sm font-serif text-accent">Premium Natural Skincare</span>
                </div>
              </div>
              <h2 className="text-5xl lg:text-7xl font-bold text-foreground mb-8 font-sans leading-tight">
                Embrace Your
                <span className="text-accent block">Natural Beauty</span>
              </h2>
              <p className="text-xl lg:text-2xl text-muted-foreground mb-10 font-serif leading-relaxed max-w-2xl mx-auto">
                Discover the transformative power of organic ingredients with our luxurious skincare collection. Crafted
                with love, designed for your skin's natural radiance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-serif px-10 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Shop Collection
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-accent text-accent hover:bg-accent hover:text-accent-foreground font-serif px-10 py-4 text-lg rounded-full transition-all duration-300 bg-transparent"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                <Heart className="w-4 h-4 text-accent" />
                <span className="text-sm font-serif text-accent">Customer Favorites</span>
              </div>
            </div>
            <h3 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 font-sans">Best Sellers</h3>
            <p className="text-xl text-muted-foreground font-serif max-w-2xl mx-auto">
              Our most loved products for radiant, healthy skin that glows from within
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Hydrating Face Serum",
                price: "$45",
                originalPrice: "$60",
                image: "natural face serum bottle with botanical elements",
                badge: "Best Seller",
              },
              {
                name: "Gentle Cleansing Oil",
                price: "$38",
                originalPrice: "$50",
                image: "organic cleansing oil with natural ingredients",
                badge: "New",
              },
              {
                name: "Nourishing Night Cream",
                price: "$52",
                originalPrice: "$68",
                image: "luxury night cream jar with natural botanicals",
                badge: "Premium",
              },
            ].map((product, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg bg-white"
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="aspect-square rounded-t-lg overflow-hidden bg-muted">
                      <img
                        src={`/abstract-geometric-shapes.png?key=d2q3i&height=400&width=400&query=${product.image}`}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-serif">
                        {product.badge}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="font-bold text-lg text-foreground mb-3 font-serif">{product.name}</h4>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-accent font-bold text-xl font-sans">{product.price}</span>
                        <span className="text-muted-foreground line-through text-sm font-sans">
                          {product.originalPrice}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                        ))}
                      </div>
                    </div>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-serif rounded-full py-3 transition-all duration-300 hover:shadow-lg">
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Building Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 font-sans">Why Choose SATTVA SKIN?</h3>
            <p className="text-xl text-muted-foreground font-serif max-w-2xl mx-auto">
              Trusted by thousands worldwide for natural, effective skincare solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              {
                icon: Leaf,
                title: "100% Natural",
                description: "Organic ingredients sourced sustainably from nature's finest sources",
              },
              {
                icon: Award,
                title: "Award Winning",
                description: "Recognized globally for excellence in natural skincare innovation",
              },
              {
                icon: Shield,
                title: "Dermatologist Tested",
                description: "Clinically proven safe and effective for all skin types",
              },
            ].map((feature, index) => (
              <div key={index} className="text-center group hover:-translate-y-2 transition-transform duration-300">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <feature.icon className="w-10 h-10 text-accent" />
                </div>
                <h4 className="font-bold text-xl text-foreground mb-4 font-sans">{feature.title}</h4>
                <p className="text-muted-foreground font-serif leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Customer Testimonials */}
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-12 border border-primary/10">
            <h4 className="text-3xl lg:text-4xl font-bold text-center text-foreground mb-12 font-sans">
              What Our Customers Say
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah M.",
                  review:
                    "My skin has never looked better! The natural ingredients make such a difference. I'm glowing!",
                  rating: 5,
                  location: "New York",
                },
                {
                  name: "Emily R.",
                  review:
                    "Love the gentle formula. Perfect for my sensitive skin. Finally found my holy grail products!",
                  rating: 5,
                  location: "California",
                },
                {
                  name: "Jessica L.",
                  review: "Amazing results in just two weeks. Highly recommend to anyone looking for natural skincare!",
                  rating: 5,
                  location: "Texas",
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic mb-6 font-serif leading-relaxed">"{testimonial.review}"</p>
                  <div className="text-center">
                    <p className="font-bold text-foreground font-sans">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground font-serif">{testimonial.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-accent text-accent-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-primary-foreground" />
                </div>
                <h5 className="text-xl font-bold font-sans">SATTVA SKIN</h5>
              </div>
              <p className="text-primary-foreground/80 font-serif">Natural skincare for your beautiful journey.</p>
            </div>

            <div>
              <h6 className="font-semibold mb-4 font-sans">Quick Links</h6>
              <ul className="space-y-2 font-serif">
                <li>
                  <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    Products
                  </a>
                </li>
                <li>
                  <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    Reviews
                  </a>
                </li>
                <li>
                  <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h6 className="font-semibold mb-4 font-sans">Customer Care</h6>
              <ul className="space-y-2 font-serif">
                <li>
                  <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    Shipping Info
                  </a>
                </li>
                <li>
                  <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h6 className="font-semibold mb-4 font-sans">Newsletter</h6>
              <p className="text-primary-foreground/80 mb-4 font-serif">Get skincare tips and exclusive offers.</p>
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
            <p className="text-primary-foreground/80 font-serif">© 2024 SATTVA SKIN. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
