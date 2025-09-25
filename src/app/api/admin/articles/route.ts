import prisma from "@/lib/prisma";
import { ArticleContent, ArticleDTO, ImageValue, mapArticle } from "../../../../../types/articles-type";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { slugify } from "@/lib/slugify";


// ➡️ GET /api/articles
export const GET = async () => {
  const articles = await prisma.article.findMany({
    include: { category: true, tagsArticles: { include: { tag: true } } },
    orderBy: { createdAt: "desc" },
  });

  return Response.json(articles.map(mapArticle), { status: 200 });
};


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload helper
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

// POST /api/articles
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

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

    console.log("slug reçu:", slug);

    // Cover image
    let coverImage: any = null;
    const coverFile = formData.get("coverImage");
    if (coverFile && coverFile instanceof File) {
      const uploaded: any = await uploadToCloudinary(coverFile, "articles/covers");
      console.log("uploaded.public_id  ", uploaded.public_id);

      coverImage = { url: uploaded.secure_url, publicId: uploaded.public_id };
    } else if (coverFile && typeof coverFile === "string") {
      coverImage = JSON.parse(coverFile);
    }

    // Sections
    const contentRaw = formData.get("content") as string;
    const content = JSON.parse(contentRaw) as { sections: any[] };
    const sectionFiles = formData.getAll("sectionImages") as File[];

    let imgIndex = 0;
    for (const section of content.sections) {
      if (section.image?.filepath && sectionFiles[imgIndex]) {
        const file = sectionFiles[imgIndex];
        const uploaded: any = await uploadToCloudinary(file, "articles/sections");
        console.log("uploaded.public_id  ", uploaded.public_id);
        section.image = { url: uploaded.secure_url, publicId: uploaded.public_id };
        imgIndex++;
      }
    }


    // Tags
    const tagsRaw = formData.get("tags") as string | null;
    const tagsArray = tagsRaw ? JSON.parse(tagsRaw) as string[] : [];

    if (!Array.isArray(tagsArray)) {
      console.warn("⚠️ [API POST] tags non fourni ou invalide, valeur reçue :", tagsArray);
    }
    // Save article

    console.log({
      slug,
      title,
      tagsArray
    });

    const article = await prisma.article.create({
      data: {
        slug,
        title,
        description,
        metaTitre,
        metaDescription,
        conclusion,
        coverImage,
        content,
        tagsArticles: {
          create: tagsArray.map((tagName: string,index) => ({
            tag: {
              connectOrCreate: {
                where: { name: tagName },
                create: { name: tagName, slug: `${slugify(tagName)}-${Date.now()}-${index}` },
              },
            },
          })),
        },

        categoryId,
        published,
        publishedAt,
      },
      include: {
        category: { select: { id: true, name: true, slug: true } },
        tagsArticles: {
          select: {
            assignedAt: true,
            tag: { select: { id: true, name: true, slug: true } },
          },
        },
      },
    });

    return NextResponse.json(article, { status: 201 });
  } catch (error: any) {
    console.error("❌ Article creation error:", error);

    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : String(error),
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    );
  }

}
