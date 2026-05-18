import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarPersonalizada from "@/components/navbar";
import { LanguageProvider } from "@/context/lenguageContext"; // Importamos tu nuevo Provider

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Federico Ivan Shaieb | Portfolio",
  description: "Full Stack Developer Portfolio - Specialization in Frontend Development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0f172a]">
        {/* Envolvemos los componentes con el LanguageProvider para que la Navbar y las páginas compartan el idioma */}
        <LanguageProvider>
          <NavbarPersonalizada />
          <main className="flex-1">
            {children}
          </main>
        </LanguageProvider>
      </body>
    </html>
  );
}