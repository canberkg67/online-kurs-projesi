import prisma from "@/lib/prisma";

export async function DELETE(req, { params }) {
  const { slug } = params;

  try {
    await prisma.lesson.delete({
      where: { slug },
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Ders silme hatası:", error);
    return new Response(
      JSON.stringify({ error: "Ders silinemedi" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
