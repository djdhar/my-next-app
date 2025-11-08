"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import LoginButton from "../api/_components/loginbutton"

export default function SignupPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" }
    })
    if (res.ok) router.push("/login")
    else {
      const data = await res.json()
      setError(data.error || "Signup failed")
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10">
      <input
        type="text"
        placeholder="Name"
        className="border p-2 w-full"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full mt-2"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full mt-2"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit" className="bg-green-500 text-white p-2 mt-4 w-full">
        Sign Up
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
    <p className="pt-5">Or</p>
    <LoginButton/>
    </div>
  )
}
