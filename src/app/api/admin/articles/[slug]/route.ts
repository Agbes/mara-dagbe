// app/api/articles/[slug]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ArticleContent, mapArticle } from "../../../../../../types/articles-type";
import { slugify } from "@/lib/slugify";
import { deleteImage, uploadImage } from "@/lib/cloudinary";

// ---------------- GET ----------------
export async function GET(
    req: Request,
    context: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await context.params;

        const article = await prisma.article.findUnique({
            where: { slug },
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

        if (!article) {
            return NextResponse.json({ error: "Article non trouvé" }, { status: 404 });
        }

        const articleWithFlatTags = {
            ...article,
            tags: article.tagsArticles.map((ta) => ta.tag),
        };

        return NextResponse.json(mapArticle(articleWithFlatTags));
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}



// ---------------- PUT ----------------

export async function PUT(
  req: Request,
  context: { params: { slug: string } }
) {
  try {
    const { slug } = context.params;
    const data = await req.json();
    console.log("🟡 [API PUT] Payload reçu :", JSON.stringify(data, null, 2));

    // Vérifie la catégorie
    const category = await prisma.category.findUnique({
      where: { id: Number(data.categoryId) },
    });
    if (!category) {
      return NextResponse.json(
        { error: "Catégorie introuvable" },
        { status: 400 }
      );
    }

    // Sécurité tags
    const tagsArray = Array.isArray(data.tags) ? data.tags : [];

    // Mise à jour de l'article
    const article = await prisma.article.update({
      where: { slug },
      data: {
        title: data.title,
        description: data.description || "",
        conclusion: data.conclusion || "",
        metaTitre: data.metaTitre || "",
        metaDescription: data.metaDescription || "",
        coverImage: data.coverImage?.url || data.coverImage || "",
        content: { sections: data.content.sections || [] },
        published: !!data.published,
        publishedAt: data.published
          ? new Date()
          : data.publishedAt
          ? new Date(data.publishedAt)
          : null,
        category: { connect: { id: Number(data.categoryId) } },
        tagsArticles: {
          deleteMany: {}, // on supprime l'ancien set
          create: tagsArray.map((tagName: string) => ({
            tag: {
              connectOrCreate: {
                where: { name: tagName },
                create: { name: tagName, slug: slugify(tagName) },
              },
            },
          })),
        },
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

    const articleWithFlatTags = {
      ...article,
      tags: article.tagsArticles.map((ta) => ta.tag),
    };

    console.log("✅ [API PUT] Article mis à jour :", JSON.stringify(articleWithFlatTags, null, 2));

    return NextResponse.json(mapArticle(articleWithFlatTags), { status: 200 });
  } catch (error) {
    console.error("❌ [API PUT] Erreur update article:", error);
    const message =
      error instanceof Error ? error.message : "Erreur serveur inattendue";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}


// ---------------- DELETE ----------------

// Type guard pour vérifier si l'objet est bien une image
function isImageObject(
  obj: unknown
): obj is { url: string; publicId: string } {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "url" in obj &&
    "publicId" in obj &&
    typeof (obj as { url?: unknown; publicId?: unknown }).url === "string" &&
    typeof (obj as { url?: unknown; publicId?: unknown }).publicId === "string"
  );
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;

    // 1️⃣ Récupérer l'article avec coverImage et contenu
    const article = await prisma.article.findUnique({
      where: { slug },
      select: { id: true, coverImage: true, content: true },
    });

    if (!article)
      return NextResponse.json({ error: "Article non trouvé" }, { status: 404 });

    // 2️⃣ Supprimer coverImage si elle existe et est bien un objet
    if (isImageObject(article.coverImage)) {
      await deleteImage(article.coverImage.publicId);
    }

    // 3️⃣ Supprimer toutes les images des sections
    const content = article.content as ArticleContent;
    if (content?.sections?.length) {
      await Promise.all(
        content.sections
          .filter(section => isImageObject(section.image))
          .map(section => deleteImage(section.image!.publicId))
      );
    }

    // 4️⃣ Supprimer les tags liés
    await prisma.tagArticle.deleteMany({ where: { articleId: article.id } });

    // 5️⃣ Supprimer l'article
    await prisma.article.delete({ where: { id: article.id } });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Erreur DELETE article :", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}


