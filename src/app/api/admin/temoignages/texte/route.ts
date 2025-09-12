import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// 📌 GET : liste des témoignages
export async function GET() {
  try {
    const temoignages = await prisma.temoignagesTexte.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(temoignages);
  } catch (error) {
    console.log(error);
    
    return NextResponse.json({ error: "Erreur lors de la récupération" }, { status: 500 });
  }
}

// 📌 POST : créer un témoignage
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const temoignage = await prisma.temoignagesTexte.create({
      data: {
        name: body.name,
        category: body.category,
        description: body.description,
      },
    });
    return NextResponse.json(temoignage, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Erreur lors de la création" }, { status: 500 });
  }
}
