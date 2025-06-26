import prisma from "@/lib/prisma";


export async function PUT(req, { params }) {
  const { slug } = params; // URL'deki mevcut slug
  const { title, slug: newSlug, content } = await req.json(); // formdan güncel veriler

  try {
    
    if (slug !== newSlug) {
      const existing = await prisma.lesson.findUnique({ where: { slug: newSlug } });
      if (existing) {
        return new Response(
          JSON.stringify({ error: "Bu slug zaten kullanılıyor." }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    
    const updatedLesson = await prisma.lesson.update({
      where: { slug }, 
      data: {
        title,
        slug: newSlug,
        content,
      },
    });

    return new Response(JSON.stringify(updatedLesson), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Update error:", error);
    return new Response(
      JSON.stringify({ error: "Ders güncellenirken hata oluştu." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
