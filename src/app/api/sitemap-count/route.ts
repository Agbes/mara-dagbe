import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const sitemapUrl = "https://mara-dagbe.vercel.app/sitemap.xml";

  try {
    const res = await fetch(sitemapUrl);
    const text = await res.text();

    // Compter les balises <loc>
    const urlsCount = (text.match(/<loc>/g) || []).length;

    return NextResponse.json({ count: urlsCount });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Erreur inconnue" }, { status: 500 });
  }
}
