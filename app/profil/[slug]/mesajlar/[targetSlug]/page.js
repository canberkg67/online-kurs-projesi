import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import MesajFormu from "@/components/MesajFormu"

export default async function MessageToUserPage({ params }) {
  const { slug, targetSlug } = params

  const sender = await prisma.user.findUnique({
    where: { username: slug },
  })

  const receiver = await prisma.user.findUnique({
    where: { username: targetSlug },
  })

  if (!sender || !receiver) return notFound()

  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { senderId: sender.id, receiverId: receiver.id },
        { senderId: receiver.id, receiverId: sender.id },
      ],
    },
    orderBy: { createdAt: "asc" },
  })

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Sohbet: {slug} ↔ {targetSlug}
      </h1>

      <MesajFormu
        messages={messages}
        senderId={sender.id}
        slug={slug}
        targetSlug={targetSlug}
      />
    </div>
  )
}
