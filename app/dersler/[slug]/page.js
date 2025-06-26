
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function Ders({ params }) {
  const { slug } = params

  const lesson = await prisma.lesson.findUnique({
    where: { slug },
  })

  if (!lesson) return notFound()

  return (
    <div>
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{lesson.title}</CardTitle>
            <p className="text-sm text-muted-foreground">{new Date(lesson.createdAt).toLocaleDateString()}</p>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap font-sans">{lesson.content.trim()}</pre>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button asChild variant="outline">
          <Link href="/dersler">← Derslere Geri Dön</Link>
        </Button>
      </div>
    </div>
  )
}
