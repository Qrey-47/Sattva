"use client"

import { useState, useEffect } from "react"
import { products } from "@/app/data/products"
import Navbar from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { notFound } from "next/navigation"
import Link from "next/link"

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug)
  if (!product) return notFound()

  // Session
  const [currentUser, setCurrentUser] = useState<any>(null)
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/me")
      const data = await res.json()
      setCurrentUser(data.user)
    }
    fetchUser()
  }, [])

  const [cartCount, setCartCount] = useState(0)
  const [currentImage, setCurrentImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<"ingredients" | "benefits" | "howToUse">("ingredients")
  const [prevTab, setPrevTab] = useState(activeTab)
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null)

  const productImages = Array.isArray(product.image) ? product.image : [product.image]

  // Reviews / Comments
  const [commentText, setCommentText] = useState("")
  const [comments, setComments] = useState<any[]>(product.reviewList || [])

  // Cart / Checkout
  const handleCheckout = async () => {
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: product.name,
          price: product.price,
          quantity,
        }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
      else alert("Failed to create checkout session")
    } catch (err) {
      console.error("Checkout error:", err)
    }
  }

  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    if (storedCart) setCartCount(JSON.parse(storedCart).length)
  }, [])

  const handleAddToCart = (qty: number) => {
    const storedCart = localStorage.getItem("cart")
    const cart = storedCart ? JSON.parse(storedCart) : []
    for (let i = 0; i < qty; i++) cart.push(product)
    localStorage.setItem("cart", JSON.stringify(cart))
    setCartCount(cart.length)
    alert(`${qty} x ${product.name} added to cart!`)
  }

  const handleBuyNow = (qty: number) => {
    handleAddToCart(qty)
    handleCheckout()
  }

  const getDeliveryDate = () => {
    const today = new Date()
    today.setDate(today.getDate() + 3)
    return today.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
  }

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % productImages.length)
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + productImages.length) % productImages.length)

  const handleTabClick = (tab: "ingredients" | "benefits" | "howToUse") => {
    setPrevTab(activeTab)
    setActiveTab(tab)
  }

  const getDirection = (tab: string) => {
    const tabsOrder = ["ingredients", "benefits", "howToUse"]
    return tabsOrder.indexOf(tab) > tabsOrder.indexOf(prevTab) ? "right" : "left"
  }

  // Post a comment
  const handlePostComment = async () => {
    if (!currentUser) {
      alert("You need to login to post a comment")
      return
    }
    if (!commentText.trim()) return alert("Comment cannot be empty")

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productSlug: product.slug,
          userId: currentUser._id,
          userName: currentUser.firstName,
          comment: commentText,
          rating: 5, // optional: add star rating input later
        }),
      })
      if (res.ok) {
        const newComment = await res.json()
        setComments((prev) => [newComment, ...prev])
        setCommentText("")
        alert("Comment posted successfully!")
      } else {
        alert("Failed to post comment")
      }
    } catch (err) {
      console.error("Error posting comment:", err)
      alert("Error posting comment")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Product Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Product Image */}
          <div className="relative group">
            <img
              src={productImages[currentImage]}
              alt={product.name}
              className="w-full h-[450px] md:h-[550px] lg:h-[600px] object-cover rounded-xl shadow-xl transition-transform duration-500 group-hover:scale-105"
            />
            {product.badge && (
              <div className="absolute top-4 left-4 bg-[#0F5132] text-white font-bold px-4 py-1 rounded-lg shadow-lg text-sm tracking-wide">
                {product.badge}
              </div>
            )}
            {productImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Product Info + Tabs */}
          <div className="flex flex-col justify-start space-y-6">
            <h1 className="text-4xl font-extrabold text-gray-900">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < Math.round(product.rating) ? "fill-[#0F5132] text-[#0F5132]" : "text-gray-300"}`}
                />
              ))}
              <span className="text-gray-500 text-sm">{product.rating.toFixed(1)} / 5 ({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-[#0F5132] font-bold text-3xl">{product.price}</span>
              <span className="text-gray-400 line-through text-lg">{product.originalPrice}</span>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">{product.description}</p>

            {/* Tabs */}
            <div className="mt-6">
              <div className="flex gap-4 border-b border-gray-200">
                {["ingredients", "benefits", "howToUse"].map((tab) => (
                  <button
                    key={tab}
                    className={`pb-2 font-semibold ${activeTab === tab ? "border-b-2 border-[#0F5132] text-[#0F5132]" : "text-gray-600"}`}
                    onClick={() => handleTabClick(tab as any)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, " $1")}
                  </button>
                ))}
              </div>

              <div className="mt-4 bg-white p-4 rounded-xl shadow overflow-hidden relative">
                {["ingredients", "benefits", "howToUse"].map((tab) => {
                  const isActive = activeTab === tab
                  const direction = getDirection(tab)
                  return (
                    <div
                      key={tab}
                      className={`transition-transform duration-500 ease-in-out ${isActive
                        ? "translate-x-0 opacity-100 relative"
                        : direction === "right"
                          ? "translate-x-full opacity-0 absolute top-0 left-0 w-full"
                          : "-translate-x-full opacity-0 absolute top-0 left-0 w-full"
                        }`}
                    >
                      {tab === "ingredients" && (
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                          {product.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
                        </ul>
                      )}
                      {tab === "benefits" && (
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                          {product.benefits.map((b, i) => <li key={i}>{b}</li>)}
                        </ul>
                      )}
                      {tab === "howToUse" && (
                        <p className="text-gray-600">{product.howToUse}</p>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Action Panel */}
      <section className="w-full bg-[#E6F4EA]">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="font-medium text-gray-800">Quantity</span>
            <div className="flex items-center border rounded-lg overflow-hidden w-fit bg-white">
              <button onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))} className="px-4 py-2 hover:bg-gray-100 transition">-</button>
              <span className="px-6 py-2 text-gray-800 font-semibold">{quantity}</span>
              <button onClick={() => setQuantity((prev) => prev + 1)} className="px-4 py-2 hover:bg-gray-100 transition">+</button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button
              className="bg-[#0F5132] text-white rounded-full px-8 py-3 w-full sm:w-auto hover:bg-[#13472E] transition font-bold"
              onClick={() => handleAddToCart(quantity)}
            >
              Add to Cart
            </Button>

            <Button
              className="bg-[#0F5132] text-white rounded-full px-8 py-3 w-full sm:w-auto hover:bg-[#13472E] transition font-bold"
              onClick={() => handleBuyNow(quantity)}
            >
              Buy Now
            </Button>
          </div>

          <div className="text-gray-700 text-sm text-center md:text-left">
            <p>Order today and get it delivered by <span className="font-semibold">{getDeliveryDate()}</span></p>
            <p className="mt-1">Free standard delivery on this product</p>
          </div>
        </div>
      </section>

      {/* Reviews & Post Comment */}
      <section className="max-w-6xl mx-auto px-4 py-10 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Reviews</h2>

        {/* Post Comment */}
        <div className="bg-white p-6 rounded-xl shadow space-y-2">
          <h3 className="font-semibold text-gray-700">Post a Comment</h3>
          {currentUser ? (
            <>
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write your comment..."
                className="w-full border rounded-md p-2"
              />
              <Button className="bg-[#0F5132] text-white" onClick={handlePostComment}>
                Post Comment
              </Button>
            </>
          ) : (
            <p className="text-gray-500">You need to <Link href="/login" className="text-[#0F5132] underline">login</Link> to post a comment.</p>
          )}
        </div>

        {/* Display Comments */}
        {comments.map((rev, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow space-y-2">
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, idx) => (
                <Star
                  key={idx}
                  className={`w-4 h-4 ${idx < rev.rating ? "fill-[#0F5132] text-[#0F5132]" : "text-gray-300"}`}
                />
              ))}
              <span className="text-gray-500 text-sm">{rev.userName} - {new Date(rev.createdAt).toLocaleDateString()}</span>
            </div>
            <p className="text-gray-600">{rev.comment}</p>
          </div>
        ))}
      </section>

      {/* FAQs */}
      <section className="max-w-6xl mx-auto px-4 py-10 space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">FAQs</h2>
        {product.faq?.map((faq, i) => {
          const isOpen = faqOpenIndex === i
          return (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow cursor-pointer"
              onClick={() => setFaqOpenIndex(isOpen ? null : i)}
            >
              <h3 className="text-gray-800 font-semibold">{faq.q}</h3>
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-96 mt-2" : "max-h-0"}`}>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            </div>
          )
        })}
      </section>
    </div>
  )
}
