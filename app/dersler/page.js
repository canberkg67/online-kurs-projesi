
import prisma from "@/lib/prisma"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default async function Dersler() {
  const dersler = await prisma.lesson.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-4">Dersler</h1>

      <div className="space-y-4">
        {dersler.map((lesson) => (
          <Card key={lesson.id}>
            <CardHeader>
              <CardTitle>{lesson.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{new Date(lesson.createdAt).toLocaleDateString()}</p>
            </CardHeader>
            <CardContent>
              <p>{lesson.content.slice(0, 100)}...</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" size="sm">
                <Link href={`/dersler/${lesson.slug}`}>Görüntüle</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
