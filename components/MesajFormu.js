"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function MesajFormu({ messages, senderId, slug, targetSlug }) {
  const router = useRouter()
  const [text, setText] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()

    const res = await fetch("/api/messages/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        senderSlug: slug,
        receiverSlug: targetSlug,
        text,
      }),
    })

    if (res.ok) {
      setText("")
      router.refresh()
    } else {
      alert("Mesaj gönderilemedi.")
    }
  }

  return (
    <div className="space-y-6">
      <div className="border p-4 rounded-md max-h-[300px] overflow-y-auto bg-gray-50">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-sm">Henüz mesaj yok.</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`mb-2 p-2 rounded-md ${
                msg.senderId === senderId ? "bg-blue-100 text-right" : "bg-gray-200 text-left"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <p className="text-xs text-gray-500 mt-1">{new Date(msg.createdAt).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Mesajınızı yazın..."
          rows={4}
          required
        />
        <Button type="submit">Gönder</Button>
      </form>
    </div>
  )
}
