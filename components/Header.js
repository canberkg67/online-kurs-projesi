"use client"

import Link from 'next/link'
import Image from 'next/image'
import {Button} from "@/components/ui/button"
import { useSession, signOut } from "next-auth/react"

export default function Header() {
  const { data: session } = useSession()

  return (
    <header className="bg-gray-100 border-b shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          İngilizce Kursu
        </Link>
        <Image src="/kurs96.ico" alt="İngilizce Kursu Logosu" width={72} height={72} />
        <nav className="space-x-4">
          {!session ? (
            <>
              <Link href="/giris">
                <Button variant="outline">Giriş</Button>
              </Link>
              <Link href="/kayit">
                <Button>Kayıt</Button>
              </Link>
            </>
          ) : (
            <>
              <Link href={`/profil/${session.user.username}`}>
                <Button variant="outline">Profil</Button>
              </Link>
              <Button
                variant="destructive"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Çıkış
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

