import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MesajSilmeButonu from "@/components/MesajSilmeButonu";

export default async function MessagesPage({ params }) {
  const { slug } = params;

  const user = await prisma.user.findUnique({
    where: { username: slug },
  });

  if (!user) return notFound();

  // Mesajların fetch işleri
  const receivedMessages = await prisma.message.findMany({
    where: { receiverId: user.id },
    orderBy: { createdAt: "desc" },
    take: 3,
    include: { sender: true },
  });

  const sentMessages = await prisma.message.findMany({
    where: { senderId: user.id },
    orderBy: { createdAt: "desc" },
    take: 3,
    include: { receiver: true },
  });

  const userMap = new Map();
  receivedMessages.forEach((msg) => userMap.set(msg.sender.username, msg.sender));
  sentMessages.forEach((msg) => userMap.set(msg.receiver.username, msg.receiver));
  const contacts = Array.from(userMap.values());

  const allUsers = await prisma.user.findMany({
    where: { NOT: { id: user.id } },
    select: { username: true },
    orderBy: { username: "asc" },
  });

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Mesajlarınız</h1>

      {/* Konuşma Geçmişi */}
      <Card>
        <CardHeader>
          <CardTitle>Mesaj Geçmişi</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {contacts.length === 0 && <p>Henüz mesajlaşma yok.</p>}
          {contacts.map((contact) => (
            <div key={contact.username} className="flex justify-between items-center gap-4">
              <Button asChild variant="outline" className="flex-1 justify-start">
                <Link href={`/profil/${slug}/mesajlar/${contact.username}`}>
                  {contact.username} ile mesajlaş
                </Link>
              </Button>

              <MesajSilmeButonu
                fromUsername={slug}
                toUsername={contact.username}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Kullanıcıların hepsi */}
      <Card>
        <CardHeader>
          <CardTitle>Tüm Kullanıcılar</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {allUsers.map((u) => (
            <Button
              key={u.username}
              asChild
              className="w-full justify-start"
              variant="secondary"
            >
              <Link href={`/profil/${slug}/mesajlar/${u.username}`}>
                {u.username} kullanıcısına mesaj gönder
              </Link>
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Alınan Mesajlar*/}
      <Card>
        <CardHeader>
          <CardTitle>Gelen Son Mesajlar </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {receivedMessages.length === 0 && <p>Henüz mesaj yok.</p>}
          {receivedMessages.map((msg) => (
            <div key={msg.id} className="border-b pb-2">
              <p><strong>{msg.sender.username}:</strong> {msg.text}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(msg.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Gönderilen Mesajlar */}
      <Card>
        <CardHeader>
          <CardTitle>Gönderilen Son Mesajlar </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {sentMessages.length === 0 && <p>Henüz mesaj gönderilmedi.</p>}
          {sentMessages.map((msg) => (
            <div key={msg.id} className="border-b pb-2">
              <p><strong>{msg.receiver.username}:</strong> {msg.text}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(msg.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
