"use client";

import { useState } from "react";
import { Leaf, Eye, EyeOff, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    dateOfBirth: "",
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const [firstName, ...lastParts] = formData.fullName.trim().split(" ");
      const lastName = lastParts.join(" ") || "";

      const requestBody = {
        firstName,
        lastName,
        email: formData.email,
        password: formData.password,
        dob: formData.dateOfBirth,
      };

      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await res.json();
      if (!res.ok) setMessage(data.error || "Signup failed");
      else {
        setMessage("✅ Account created successfully!");
        setFormData({ fullName: "", email: "", password: "", dateOfBirth: "" });
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/luxury-spa-botanical-background.jpg"
          alt="Luxury spa background"
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-secondary/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/85 via-white/30 to-transparent" />
      </div>

      {/* Left Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/75 to-secondary/65 z-10" />
        <img
          src="/premium-skincare-spa-treatment.jpg"
          alt="Premium skincare spa treatment"
          className="w-full h-full object-cover floating-effect opacity-75"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-12">
          <div className="text-center space-y-8 max-w-lg">
            <div className="inline-flex items-center gap-4 mb-8">
              <div className="w-28 h-28 bg-white/35 rounded-full flex items-center justify-center backdrop-blur-lg border-4 border-white/50 organic-shadow floating-effect">
                <Leaf className="w-14 h-14 text-white drop-shadow-2xl" />
              </div>
              <h1 className="text-7xl font-bold font-sans tracking-wide drop-shadow-2xl">SATTVA SKIN</h1>
            </div>
            <h2 className="text-5xl font-bold font-sans leading-tight text-balance drop-shadow-lg">
              Transform Your Skin, Transform Your Life
            </h2>
            <p className="text-2xl font-serif opacity-95 text-pretty leading-relaxed drop-shadow-md">
              Join our exclusive community of beauty enthusiasts and discover the secret to naturally radiant, youthful skin with our premium botanical formulations.
            </p>
          </div>
        </div>
      </div>

      {/* Right Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10">
        <div className="absolute inset-0 opacity-15">
          <div className="w-full h-full bg-gradient-to-br from-primary/8 via-transparent to-secondary/8" />
          <div className="absolute inset-0 leaf-pattern" />
        </div>

        <div className="w-full max-w-lg relative z-10">
          <Card className="organic-shadow border-0 bg-white/97 backdrop-blur-2xl border-2 border-primary/10 hover:shadow-3xl transition-all duration-500">
            <CardHeader className="text-center pb-8 pt-10">
              <CardTitle className="text-5xl font-bold text-foreground font-sans mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Join SATTVA SKIN
              </CardTitle>
              <p className="text-muted-foreground font-serif text-xl leading-relaxed">
                Begin your journey to naturally beautiful, radiant skin
              </p>
            </CardHeader>
            <CardContent className="space-y-8 px-10 pb-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("fullName")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className={`h-12 bg-input border-2 transition-all duration-300 rounded-xl font-serif ${
                      focusedField === "fullName"
                        ? "border-primary shadow-lg shadow-primary/10 scale-[1.02]"
                        : "border-border hover:border-accent/50"
                    }`}
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className={`h-12 bg-input border-2 transition-all duration-300 rounded-xl font-serif ${
                      focusedField === "email"
                        ? "border-primary shadow-lg shadow-primary/10 scale-[1.02]"
                        : "border-border hover:border-accent/50"
                    }`}
                  />
                </div>

                {/* Password */}
                <div className="space-y-2 relative">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a secure password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className={`h-12 bg-input border-2 transition-all duration-300 rounded-xl font-serif pr-12 ${
                      focusedField === "password"
                        ? "border-primary shadow-lg shadow-primary/10 scale-[1.02]"
                        : "border-border hover:border-accent/50"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>

                {/* Date of Birth */}
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("dateOfBirth")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className={`h-12 bg-input border-2 transition-all duration-300 rounded-xl font-serif ${
                      focusedField === "dateOfBirth"
                        ? "border-primary shadow-lg shadow-primary/10 scale-[1.02]"
                        : "border-border hover:border-accent/50"
                    }`}
                  />
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-serif text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] border-0 relative overflow-hidden group"
                >
                  <span className="relative z-10">
                    {loading ? "Creating Account..." : "Join Sattva Skin"}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 group-hover:opacity-30 transition-opacity duration-300 rounded-2xl" />
                </Button>
              </form>

              {message && <p className="text-center mt-4">{message}</p>}

              <div className="text-center pt-6 border-t border-border/50">
                <p>
                  Already have an account?{" "}
                  <Link href="/login" className="text-primary underline">
                    Log in
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
