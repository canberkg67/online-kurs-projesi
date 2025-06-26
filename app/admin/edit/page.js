import prisma from "@/lib/prisma"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default async function AdminEditPage() {
  const lessons = await prisma.lesson.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      author: true, 
    },
  })

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dersleri Yönet</h1>

      {lessons.length === 0 ? (
        <p>Henüz hiç ders eklenmemiş.</p>
      ) : (
        <div className="grid gap-4">
          {lessons.map((lesson) => (
            <Card key={lesson.id}>
              <CardHeader className="flex justify-between items-center">
                <CardTitle>{lesson.title}</CardTitle>
                <div className="space-x-2">
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/dersler/${lesson.slug}`}>Görüntüle</Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link href={`/admin/edit/${lesson.slug}`}>Düzenle</Link>
                  </Button>
                  {/* TODO: Add delete logic */}
                </div>
              </CardHeader>
              <CardContent>
                <p>{lesson.content.substring(0, 100)}...</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
