"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function Ekle() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [content, setContent] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      const response = await fetch("/api/lessons/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, slug, content }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push("/admin/edit") // 
      } else {
        setError(data.error || "Bir hata oluştu")
      }
    } catch (err) {
      console.error("Ders eklenirken hata oluştu:", err)
      setError("Sunucu hatası. Lütfen tekrar deneyin.")
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Yeni Ders Ekle</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Başlık</Label>
          <Input
            id="title"
            type="text"
            placeholder="Ders başlığı"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="slug">Slug (URL için)</Label>
          <Input
            id="slug"
            type="text"
            placeholder="ders-slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="content">İçerik</Label>
          <Textarea
            id="content"
            rows={8}
            placeholder="Ders içeriği"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-red-600">{error}</p>}

        <Button type="submit">Dersi Ekle</Button>
      </form>
    </div>
  )
}
