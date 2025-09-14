import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionWrappers from "@/lib/sessionWrappers";
import { GoogleTagManager } from '@next/third-parties/google'


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Marabout Dagbe",
    description: "Puissant medium marabout Dagbe : +2290152027185",
    icons: {
        icon: "/Ali-moussa.png",
    },
    other: {
        "google-site-verification": process.env.NEXT_PUBLIC_GOOGLE_CONSOLE || "",
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrappers>

      <html lang="fr" className={`${geistMono.variable} h-full`}>
        <GoogleTagManager gtmId="GTM-KSDX9JB8" />
        <body className="flex flex-col min-h-screen bg-white text-slate-800 antialiased [--pad:clamp(1rem,3vw,2rem)]">
          {/* Fond décoratif */}
          <div className="pointer-events-none fixed inset-0 -z-10 bg-glow"></div>



          {/* Contenu principal qui prend tout l’espace restant */}
          <main className="flex-1">{children}</main>


        </body>
      </html>
    </SessionWrappers>

  );
}
