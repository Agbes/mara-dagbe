import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

type Params = { params: Promise<{ id: string }> };

// 📌 GET : récupérer un témoignage
export async function GET(req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const numericId = Number(id);

    if (isNaN(numericId)) {
      return NextResponse.json({ error: "ID invalide" }, { status: 400 });
    }

    const temoignage = await prisma.temoignagesTexte.findUnique({
      where: { id: numericId },
    });

    if (!temoignage) {
      return NextResponse.json(
        { error: "Témoignage non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json(temoignage);
  } catch (error) {
    console.error("❌ Erreur GET témoignage :", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération" },
      { status: 500 }
    );
  }
}

// 📌 PUT : modifier un témoignage
export async function PUT(req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const numericId = Number(id);

    if (isNaN(numericId)) {
      return NextResponse.json({ error: "ID invalide" }, { status: 400 });
    }

    const body = await req.json();

    const temoignage = await prisma.temoignagesTexte.update({
      where: { id: numericId },
      data: {
        name: body.name,
        category: body.category,
        description: body.description,
      },
    });

    return NextResponse.json(temoignage);
  } catch (error) {
    console.error("❌ Erreur PUT témoignage :", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour" },
      { status: 500 }
    );
  }
}

// 📌 DELETE : supprimer un témoignage
export async function DELETE(req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const numericId = Number(id);

    if (isNaN(numericId)) {
      return NextResponse.json({ error: "ID invalide" }, { status: 400 });
    }

    const deleted = await prisma.temoignagesTexte.delete({
      where: { id: numericId },
    });

    return NextResponse.json({ message: "Témoignage supprimé", deleted });
  } catch (error) {
    console.error("❌ Erreur DELETE témoignage :", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression" },
      { status: 500 }
    );
  }
}
