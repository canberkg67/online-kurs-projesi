// app/admin/page.js
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Admin() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">Admin Paneli</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Yeni Ders Ekleme */}
        <Card>
          <CardHeader>
            <CardTitle>Yeni Ders Ekleme</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <p>Kurs İçin Yeni Bir Ders Ekle</p>
            <Button asChild>
              <Link href="/admin/ekle">Ekle</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Dersleri Görme ve Güncelleme */}
        <Card>
          <CardHeader>
            <CardTitle>Dersleri Görüntüle</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <p>Var Olan Dersleri Düzenle veya Sil</p>
            <Button asChild variant="outline">
              <Link href="/admin/edit">Aç</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Kullanıcıları görme */}
        <Card>
          <CardHeader>
            <CardTitle>Kullanıcılar</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <p>Kullanıcıları Görüntüle veya Sil</p>
            <Button asChild variant="destructive">
              <Link href="/admin/users">Gör</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
