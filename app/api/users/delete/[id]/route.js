import prisma from "@/lib/prisma"

export async function POST(req, { params }) {
  const { id } = params

  try {
    await prisma.user.delete({
      where: { id },
    })

    return new Response("Kullanıcı silindi", { status: 200 })
  } catch (err) {
    return new Response("Silme sırasında hata oluştu", { status: 500 })
  }
}
