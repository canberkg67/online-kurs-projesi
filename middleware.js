import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET })

  const { pathname } = req.nextUrl

  // /admin rotasının korunması
  if (pathname.startsWith("/admin")) {
    if (!token || token.role !== "ADMIN") {
      // Erişemeyen kullanıcıları anasayfaya yönlendir
      return NextResponse.redirect(new URL("/", req.url))
    }
  }

  // /profil rotasının korunması
  if (pathname.startsWith("/profil")) {
    if (!token) {
      return NextResponse.redirect(new URL("/giris", req.url)) // login'e yönlendir.
    }
  }

  if (pathname.startsWith("/dersler")) {
    if (!token) {
      return NextResponse.redirect(new URL("/giris", req.url));
    }
  }

  return NextResponse.next()
}
