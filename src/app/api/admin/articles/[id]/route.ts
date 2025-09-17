import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { slugify } from "@/lib/slugify";

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// Helper upload
async function uploadToCloudinary(file: File, folder: string) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
    uploadStream.end(buffer);
  });
}

// ---------------------------
// GET /api/admin/articles/:id
// ---------------------------
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const articleId = Number(id);

    const article = await prisma.article.findUnique({
      where: { id: articleId },
      include: { category: true, tagsArticles: { include: { tag: true } } },
    });

    if (!article) return NextResponse.json({ message: "Article non trouvé" }, { status: 404 });
    return NextResponse.json(article, { status: 200 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ message: err.message || "Internal Server Error" }, { status: 500 });
  }
}


// PUT /api/admin/articles/:id
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const articleId = Number(id);

    const formData = await req.formData();

    const existingArticle = await prisma.article.findUnique({ where: { id: articleId } });
    if (!existingArticle)
      return NextResponse.json({ message: "Article non trouvé" }, { status: 404 });

    // Champs principaux
    const slug = formData.get("slug") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const metaTitre = formData.get("metaTitre") as string;
    const metaDescription = formData.get("metaDescription") as string;
    const conclusion = formData.get("conclusion") as string;
    const categoryId = Number(formData.get("categoryId"));
    const published = formData.get("published") === "true";
    const publishedAtRaw = formData.get("publishedAt") as string | null;
    const publishedAt = publishedAtRaw ? new Date(publishedAtRaw) : null;

    // Couverture
    let coverImage: any = existingArticle.coverImage ?? null;
    const coverFile = formData.get("coverImage");
    if (coverFile instanceof File) {
      if (coverImage?.publicId) await cloudinary.uploader.destroy(coverImage.publicId);
      const uploaded: any = await uploadToCloudinary(coverFile, "articles/covers");
      coverImage = { url: uploaded.secure_url, publicId: uploaded.public_id };
    } else if (coverFile && typeof coverFile === "string") {
      coverImage = JSON.parse(coverFile);
    }

    // Sections
    const existingContent = existingArticle.content as { sections: any[] } | null;
    const contentRaw = formData.get("content") as string;
    const content = JSON.parse(contentRaw) as { sections: { image?: any }[] };
    const sectionFiles = formData.getAll("sectionImages") as File[];

    let imgIndex = 0;
    for (let i = 0; i < content.sections.length; i++) {
      const section = content.sections[i];
      const oldSection = existingContent?.sections[i];

      if (section.image instanceof File) {
        if (oldSection?.image?.publicId) await cloudinary.uploader.destroy(oldSection.image.publicId);
        const uploaded: any = await uploadToCloudinary(section.image, "articles/sections");
        section.image = { url: uploaded.secure_url, publicId: uploaded.public_id };
      } else if (section.image && typeof section.image === "object" && section.image.url) {
        section.image = section.image;
      } else {
        section.image = null;
      }
    }

    // -------------------
    // Tags
    // -------------------
    const tagsRaw = formData.get("tags") as string | null;
    const tags = tagsRaw ? (JSON.parse(tagsRaw) as string[]) : [];

    // -------------------
    // Update Prisma
    // -------------------
    const article = await prisma.article.update({
      where: { id: articleId },
      data: {
        slug,
        title,
        description,
        metaTitre,
        metaDescription,
        conclusion,
        coverImage,
        content,
        categoryId,
        published,
        publishedAt,
        tagsArticles: {
          deleteMany: {}, // Supprime les anciens tags
          create: tags.map((name: string) => ({
            tag: {
              connectOrCreate: {
                where: { name },
                create: {
                  name,
                  slug: slugify(name),
                },
              },
            },
          })),
        },
      },
      include: { tagsArticles: { include: { tag: true } } },
    });

    return NextResponse.json(article, { status: 200 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ message: err.message || "Internal Server Error" }, { status: 500 });
  }
}



// ---------------------------
// DELETE /api/admin/articles/:id
// ---------------------------
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const articleId = Number(id);

    const article = await prisma.article.findUnique({ where: { id: articleId } });
    if (!article) return NextResponse.json({ message: "Article non trouvé" }, { status: 404 });

    // Supprimer couverture si c'est un objet avec publicId
    try {
      const cover = article.coverImage;
      if (cover && typeof cover === "object" && cover !== null && "publicId" in cover) {
        const publicId = (cover as { publicId?: string }).publicId;
        if (publicId) await cloudinary.uploader.destroy(publicId);
      }
    } catch (err) {
      console.warn("Erreur suppression couverture Cloudinary :", err);
    }

    // Supprimer images sections
    try {
      const content = article.content as { sections?: { image?: any }[] } | null;
      for (const section of content?.sections ?? []) {
        const image = section.image;
        if (image && typeof image === "object" && image !== null && "publicId" in image) {
          const publicId = (image as { publicId?: string }).publicId;
          if (publicId) await cloudinary.uploader.destroy(publicId);
        }
      }
    } catch (err) {
      console.warn("Erreur suppression sections Cloudinary :", err);
    }

    // Supprimer article
    await prisma.article.delete({ where: { id: articleId } });

    return NextResponse.json({ message: "Article supprimé avec succès" }, { status: 200 });
  } catch (err: any) {
    console.error("❌ DELETE article error:", err);
    return NextResponse.json({ message: err.message || "Internal Server Error" }, { status: 500 });
  }
}
