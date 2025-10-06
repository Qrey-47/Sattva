"use client";

import { useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-6 border rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-xl font-bold mb-4">Reset Password</h1>
        {token ? (
          <p className="text-sm text-gray-600">
            Token received: <span className="font-mono">{token}</span>
          </p>
        ) : (
          <p className="text-red-500 text-sm">❌ No token provided</p>
        )}
      </div>
    </div>
  );
}
