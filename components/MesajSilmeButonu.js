"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function MesajSilmeButonu({ fromUsername, toUsername }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    const confirmDelete = confirm(
      `${toUsername} ile olan tüm mesajları silmek istediğinize emin misiniz?`
    )
    if (!confirmDelete) return

    setLoading(true)
    try {
      const res = await fetch("/api/messages/delete", {
        method: "POST",
        body: new URLSearchParams({
          fromUsername,
          toUsername,
        }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })

      if (res.ok) {
        router.refresh()
      } else {
        alert("Mesaj silinemedi.")
      }
    } catch (err) {
      console.error(err)
      alert("Bir hata oluştu.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button variant="destructive" size="sm" onClick={handleDelete} disabled={loading}>
      {loading ? "Siliniyor..." : "Sil"}
    </Button>
  )
}
