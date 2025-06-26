"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { getSession } from "next-auth/react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function Giris() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    })

    if (res?.ok) {
  
  const session = await getSession() // import from 'next-auth/react'
  
  if (session?.user.role === "ADMIN") {
    router.push("/admin")
  } else {
    router.push(`/profil/${session.user.username}`)
  }
} else {
  setError("Geçersiz e-posta veya parola")
}
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center">Giriş Yap</h1>

        {error && <p className="text-red-600 text-center">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="örnek@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <Label htmlFor="password">Şifre</Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full">
            Giriş
          </Button>
        </form>

        <p className="text-sm text-center text-muted-foreground">
          Hesabınız yoksa:{" "}
          <a href="/kayit" className="text-blue-600 hover:underline">
            Kayıt Olun!
          </a>
        </p>
      </div>
    </div>
  )
}
