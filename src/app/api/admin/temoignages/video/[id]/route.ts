import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { temoignageVideoSchema } from "@/lib/schemas/temoignagesSchema";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const video = await prisma.temoignagesVideo.findUnique({
      where: { id: Number(id) },
    });

    if (!video) {
      return NextResponse.json({ error: "Vidéo non trouvée" }, { status: 404 });
    }

    return NextResponse.json(video);
  } catch (error) {
    console.error("❌ Erreur GET /temoignages/video/[id] :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const body = await req.json();
    const parsed = temoignageVideoSchema.parse(body);

    const updated = await prisma.temoignagesVideo.update({
      where: { id: Number(id) },
      data: {
        videoUrl: parsed.videoUrl,
      },
    });

    return NextResponse.json(updated);
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error("❌ Erreur PUT /temoignages/video/[id] :", error.message);
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  } else {
    console.error("❌ Erreur PUT /temoignages/video/[id] :", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour" },
      { status: 400 }
    );
  }
}

}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await prisma.temoignagesVideo.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Erreur DELETE /temoignages/video/[id] :", error);
    return NextResponse.json(
      { error: "Suppression impossible" },
      { status: 500 }
    );
  }
}
