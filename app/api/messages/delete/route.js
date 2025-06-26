import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.text();
    const params = new URLSearchParams(body);
    const fromUsername = params.get("fromUsername");
    const toUsername = params.get("toUsername");

    if (!fromUsername || !toUsername) {
      return new Response(
        JSON.stringify({ error: "Eksik parametre: fromUsername veya toUsername yok" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Kullanıcıları bul
    const fromUser = await prisma.user.findUnique({
      where: { username: fromUsername },
    });
    const toUser = await prisma.user.findUnique({
      where: { username: toUsername },
    });

    if (!fromUser || !toUser) {
      return new Response(
        JSON.stringify({ error: "Kullanıcı bulunamadı" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Mesajları sil (gönderen ve alıcı olarak her iki yönde)
    await prisma.message.deleteMany({
      where: {
        OR: [
          { senderId: fromUser.id, receiverId: toUser.id },
          { senderId: toUser.id, receiverId: fromUser.id },
        ],
      },
    });

    return new Response(
      JSON.stringify({ message: "Mesajlar başarıyla silindi" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Mesaj silme hatası:", error);
    return new Response(
      JSON.stringify({ error: "Sunucu hatası, mesajlar silinemedi" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
