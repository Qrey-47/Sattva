"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Leaf, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

 const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const email = (e.currentTarget.email as HTMLInputElement).value;
  const password = (e.currentTarget.password as HTMLInputElement).value;

  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const user: { id: number; email: string; firstName: string } = await res.json();
      localStorage.setItem("user", JSON.stringify(user));
      router.push("/");
    } else {
      const error = await res.json();
      alert(error.message || "Login failed");
    }
  } catch (err) {
    console.error("Login error:", err);
    alert("Something went wrong. Please try again.");
  }
};

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/luxury-spa-botanical-background.jpg"
          alt="Luxury spa background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/40 to-transparent" />
      </div>

      {/* Left side hero section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-secondary/60 z-10" />
        <img
          src="/natural-skincare-ingredients-background.jpg"
          alt="Natural skincare ingredients"
          className="w-full h-full object-cover floating-effect opacity-80"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-12">
          {/* ... your hero content unchanged ... */}
        </div>
      </div>

      {/* Right side login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
          <div className="absolute inset-0 leaf-pattern" />
        </div>

        <div className="w-full max-w-md relative z-10">
          {/* Mobile Logo */}
          <div className="text-center mb-8 lg:hidden">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center organic-shadow border-2 border-primary/20 group-hover:shadow-xl transition-all duration-300">
                <Leaf className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-primary font-sans">SATTVA SKIN</h1>
            </Link>
          </div>

          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-2xl border-2 border-primary/10 organic-shadow hover:shadow-3xl transition-all duration-500">
            <CardHeader className="text-center pb-8 pt-10">
              <CardTitle className="text-5xl font-bold text-foreground font-sans mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Welcome Back
              </CardTitle>
              <p className="text-muted-foreground font-serif text-xl leading-relaxed">
                Continue your journey to naturally beautiful, radiant skin
              </p>
            </CardHeader>
            <CardContent className="space-y-8 px-8 pb-8">
              <form className="space-y-6" onSubmit={handleLogin}>
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-foreground font-serif text-base font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    className="h-12 border-2 border-border focus:border-primary focus:ring-primary/20 font-serif text-base rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-300"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="password" className="text-foreground font-serif text-base font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="h-12 border-2 border-border focus:border-primary focus:ring-primary/20 font-serif text-base rounded-xl bg-white/50 pr-12 backdrop-blur-sm transition-all duration-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-3">
                    <input
                      id="remember"
                      type="checkbox"
                      className="w-4 h-4 rounded border-2 border-border text-primary focus:ring-primary/20 focus:ring-2"
                    />
                    <Label htmlFor="remember" className="text-muted-foreground font-serif">
                      Remember me
                    </Label>
                  </div>
                  <Link
                    href="/forgot-password"
                    className="text-primary hover:text-primary/80 transition-colors font-serif font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-serif text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                >
                  Sign In to Your Account
                </Button>
              </form>

              {/* ... social buttons & signup link unchanged ... */}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    
  )
}
