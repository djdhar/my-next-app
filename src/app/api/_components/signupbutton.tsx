'use client'

import { useRouter } from "next/navigation"

export default function SignupButton() {
  const router = useRouter()
  return (
    <button
      onClick={() => router.push("/signup")}
      className="mt-6 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      aria-label="Go to signup"
    >
      Sign up
    </button>
  )
}