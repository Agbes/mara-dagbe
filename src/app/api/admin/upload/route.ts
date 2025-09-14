import { NextResponse } from "next/server";
import { uploadImage } from "@/lib/cloudinary";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ message: "Fichier invalide" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    const result = await uploadImage(buffer, "articles");
    return NextResponse.json(result);
  } catch (err) {
    console.error("Erreur Cloudinary:", err);
    return NextResponse.json({ message: "Erreur lors de l'upload sur Cloudinary" }, { status: 500 });
  }
}
