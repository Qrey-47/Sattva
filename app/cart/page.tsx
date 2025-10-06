"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CartPage() {
    const router = useRouter()
    const [currentUser, setCurrentUser] = useState<any>(null)
    const [cartItems, setCartItems] = useState<any[]>([])
    const [totalPrice, setTotalPrice] = useState<number>(0)

    // Check if user is logged in
    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch("/api/me")
            const data = await res.json()
            if (!data.user) {
                router.push("/login")
            } else {
                setCurrentUser(data.user)
            }
        }
        fetchUser()
    }, [router])

    // Load cart from localStorage
    useEffect(() => {
        const storedCart = localStorage.getItem("cart")
        if (storedCart) setCartItems(JSON.parse(storedCart))
    }, [])

    // Update total price
    useEffect(() => {
        const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price.replace(/[^0-9.-]+/g, "")), 0)
        setTotalPrice(total)
    }, [cartItems])

    const handleQuantityChange = (index: number, delta: number) => {
        const newCart = [...cartItems]
        newCart[index].quantity = Math.max(1, (newCart[index].quantity || 1) + delta)
        setCartItems(newCart)
        localStorage.setItem("cart", JSON.stringify(newCart))
    }

    const handleRemoveItem = (index: number) => {
        const newCart = [...cartItems]
        newCart.splice(index, 1)
        setCartItems(newCart)
        localStorage.setItem("cart", JSON.stringify(newCart))
    }

    const handleCheckout = async () => {
        try {
            const res = await fetch("/api/create-checkout-session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items: cartItems.map(item => ({
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity || 1
                    }))
                }),
            })
            const data = await res.json()
            if (data.url) window.location.href = data.url
            else alert("Failed to create checkout session")
        } catch (err) {
            console.error("Checkout error:", err)
        }
    }

    if (!currentUser) return null // wait for session check

    return (
        <div className="min-h-screen bg-gray-50">

            <section className="max-w-6xl mx-auto px-4 py-10">
                <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

                {cartItems.length === 0 ? (
                    <p className="text-gray-600">
                        Your cart is empty. <Link href="/" className="text-[#0F5132] underline">Go shopping</Link>.
                    </p>
                ) : (
                    <>
                        <div className="space-y-4">
                            {cartItems.map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between bg-white p-4 rounded-xl shadow">
                                    <div className="flex items-center gap-4">
                                        <img src={Array.isArray(item.image) ? item.image[0] : item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                                        <div>
                                            <h2 className="font-semibold text-gray-800">{item.name}</h2>
                                            <p className="text-gray-600">{item.price}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleQuantityChange(idx, -1)}
                                            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                        >-</button>
                                        <span className="px-2">{item.quantity || 1}</span>
                                        <button
                                            onClick={() => handleQuantityChange(idx, 1)}
                                            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                        >+</button>
                                        <button
                                            onClick={() => handleRemoveItem(idx)}
                                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                        >Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-xl shadow">
                            <p className="text-xl font-semibold">Total: ₹{totalPrice.toFixed(2)}</p>
                            <Button className="bg-[#0F5132] text-white mt-4 md:mt-0" onClick={handleCheckout}>
                                Checkout
                            </Button>
                        </div>
                    </>
                )}
            </section>
        </div>
    )
}
