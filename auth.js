import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import prisma from "@/lib/prisma"


export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        email: {
          type: "email",
          label: "E-posta",
          placeholder: "ornek@example.com",
        },
        password: {
          type: "password",
          label: "Parola",
          placeholder: "******",
        },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user || user.password !== credentials.password) {
          throw new Error("Geçersiz e-posta veya parola")
        }

        return {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role,
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.username = user.username
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id
      session.user.username = token.username
      session.user.role = token.role
      return session
    },
  },
  pages: {
    signIn: "/giris", // your custom login page route
  },
})