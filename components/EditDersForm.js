"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function EditDersForm({ lesson }) {
  const router = useRouter();
  const [title, setTitle] = useState(lesson.title);
  const [slug, setSlug] = useState(lesson.slug);
  const [content, setContent] = useState(lesson.content);

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await fetch(`/api/lessons/update/${lesson.slug}`, {
      method: "PUT",
      body: JSON.stringify({ title, slug, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      router.push("/admin/edit");
    } else {
      alert("Ders güncellenirken hata oluştu");
    }
  }

  async function handleDelete() {
    const confirmed = confirm("Bu dersi silmek istediğinizden emin misiniz?");
    if (!confirmed) return;

    const response = await fetch(`/api/lessons/delete/${lesson.slug}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Ders silindi.");
      router.push("/admin/edit");
    } else {
      alert("Ders silinemedi.");
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Başlık</Label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            type="text"
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
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <Button type="submit">Güncelle</Button>
      </form>

      {/* 🔴 Delete Button (outside form) */}
      <div className="pt-4 border-t">
        <Button variant="destructive" onClick={handleDelete}>
          Sil
        </Button>
      </div>
    </div>
  );
}
