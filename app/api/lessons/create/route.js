import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { auth } from "@/auth"

export async function POST(req) {
  const session = await auth()

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  const { title, slug, content } = await req.json()

  try {
    const newLesson = await prisma.lesson.create({
      data: {
        title,
        slug,
        content,
        authorId: session.user.id,
      },
    })

    return NextResponse.json({ success: true, lesson: newLesson })
  } catch (error) {
    console.error("Ders Eklemede Hata:", error)
    return NextResponse.json({ error: "Ders ekleme başarısız" }, { status: 500 })
  }
}
