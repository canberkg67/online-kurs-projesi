import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditProfil from "@/components/EditProfil";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default async function Profil({ params }) {
  const { slug } = params;

  const user = await prisma.user.findUnique({
    where: { username: slug },
    include: { profile: true },
  });

  if (!user) return notFound();

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">

      <h1 className="text-3xl font-bold text-center">Hoşgeldin {user.username} - Profiliniz:</h1>

      <div className="flex justify-center">
        <Button asChild variant="outline">
        <Link href={`/dersler`}>
          DERSLERE GİT!
        </Link>
        </Button>
      </div>

      <div className="flex flex-col items-center space-y-4">
        {user.profile?.avatar && (
        <img
        src={user.profile.avatar}
        alt={`avatar`}
        className="w-24 h-24 rounded-full object-cover"
        />
)}


        <div className="text-center space-y-1">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Hakkınızda:</strong> {user.profile?.bio ?? "Bio yok"}</p>
        </div>
      </div>

      <EditProfil user={user} />

      <Button asChild variant="outline">
        <Link href={`/profil/${user.username}/mesajlar`}>
          Mesajlara Git
        </Link>
      </Button>
    </div>
  );
}
