import prisma from "@/lib/prisma"

export async function POST(req) {
  const { senderSlug, receiverSlug, text } = await req.json()

  if (!text || !senderSlug || !receiverSlug) {
    return new Response(JSON.stringify({ error: "Eksik veri" }), { status: 400 })
  }

  const sender = await prisma.user.findUnique({
    where: { username: senderSlug },
  })

  const receiver = await prisma.user.findUnique({
    where: { username: receiverSlug },
  })

  if (!sender || !receiver) {
    return new Response(JSON.stringify({ error: "Kullanıcı bulunamadı" }), { status: 404 })
  }

  const message = await prisma.message.create({
    data: {
      senderId: sender.id,
      receiverId: receiver.id,
      text,
    },
  })

  return new Response(JSON.stringify(message), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })
}
