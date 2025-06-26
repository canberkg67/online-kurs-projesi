import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(req) {
  const body = await req.json()
  const { username, email, password } = body

  // Basit kontrol
  if (!username || !email || !password) {
    return NextResponse.json({ error: "Eksik bilgi." }, { status: 400 })
  }

  // Kullanıcı zaten var mı?
  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    return NextResponse.json({ error: "Bu e-posta zaten kayıtlı." }, { status: 409 })
  }

  // kullanıcı yaratımı
  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      password, 
      role: "USER",
    },
  })

  return NextResponse.json({ message: "Kayıt başarılı!", user: newUser }, { status: 201 })
}
