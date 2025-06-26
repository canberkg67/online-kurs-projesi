import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "İngilizce Kursu",
  description: "Bilgisayar Programcılığı Final Ödevi İçin Hazırlanmış Kurs Projesi",
  icons: {
    icon: '/kurs.ico'
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-stone-100">
        <SessionProvider>
          <Header/>
          <hr />
          <main className="flex-1 container mx-auto px-4 py-6">
          {children}
          </main>
          <hr />
          <Footer/>
        </SessionProvider>
      </body>
    </html>
  );
}
