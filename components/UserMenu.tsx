"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function UserMenu({ user }: { user: { firstName: string } }) {
  const handleLogout = () => {
    localStorage.removeItem("user")
    location.reload() // reload page to update UI
  }

  return (
    <div className="flex items-center gap-2">
      <span className="font-semibold text-foreground">Hi, {user.firstName} 👋</span>
      <Button size="sm" variant="outline" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  )
}
