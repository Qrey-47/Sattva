"use client"

import { useRouter } from "next/navigation"

export default function SignOutButton() {
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            const res = await fetch("/api/signout", { method: "POST" });
            if (res.ok) {
                router.refresh(); // refresh page to update UI
                alert("Signed out successfully!");
            } else {
                alert("Failed to sign out.");
            }
        } catch (err) {
            console.error("Sign out error:", err);
            alert("Error signing out.");
        }
    }

    return (
        <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
            Sign Out
        </button>
    );
}
