import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { temoignageVideoSchema } from "@/lib/schemas/temoignagesSchema";

export async function GET() {
  try {
    const videos = await prisma.temoignagesVideo.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(videos);
  } catch (error) {
    console.error("❌ Erreur GET /temoignages/video :", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = temoignageVideoSchema.parse(body);

    // ⚡ Extraire uniquement le publicId
    const publicId = parsed.videoUrl
      .replace(/^.*\/upload\/v[0-9]+\//, "") // supprime le préfixe jusqu'à après /upload/vxxxx/
      .replace(/\.(mp4|mov|avi|mkv)$/, ""); // supprime l’extension si présente

    const video = await prisma.temoignagesVideo.create({
      data: {
        videoUrl: publicId, // ✅ on stocke uniquement le publicId
      },
    });

    return NextResponse.json(video, { status: 201 });
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error("❌ Erreur POST /temoignages/video :", error.message);
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  } else {
    console.error("❌ Erreur POST /temoignages/video :", error);
    return NextResponse.json(
      { error: "Erreur lors de la création" },
      { status: 400 }
    );
  }
}

}
