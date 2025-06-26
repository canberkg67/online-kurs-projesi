import prisma from "@/lib/prisma";

export async function PUT(req, { params }) {
  const { id } = params;
  const { username, bio, avatar } = await req.json();

  try {
    // user model'inde username'i güncelleme
    await prisma.user.update({
      where: { id },
      data: { username },
    });

    // 
    await prisma.profile.upsert({
      where: { userId: id },
      update: { bio, avatar },
      create: { userId: id, bio, avatar },
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Profil güncellenemedi:", err);
    return new Response(JSON.stringify({ error: "Güncelleme hatası" }), {
      status: 500,
    });
  }
}
