// app/api/articles/[slug]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { mapArticle } from "../../../../../../types/articles-tytp";
import { slugify } from "@/lib/slugify";

// GET: un article par slug
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
            assignedAt: true, // 👈 ajoute ça
            tag: { select: { id: true, name: true, slug: true } },
        },
        },
      },
    });

    if (!article) {
      return NextResponse.json({ error: "Article non trouvé" }, { status: 404 });
    }

    // Flatten des tags pour le front
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

// PUT: mise à jour
export async function PUT(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    const data = await req.json();

    // Vérifie la catégorie
    const category = await prisma.category.findUnique({
      where: { id: data.categoryId },
    });

    if (!category) {
      return NextResponse.json({ error: "Catégorie introuvable" }, { status: 400 });
    }

    // Mise à jour article
    const article = await prisma.article.update({
      where: { slug },
      data: {
        title: data.title,
        description: data.description,
        conclusion: data.conclusion,
        metaTitre: data.metaTitre,
        metaDescription: data.metaDescription,
        coverImage: data.coverImage,
        published: data.published,
        publishedAt: data.published
          ? new Date()
          : data.publishedAt
          ? new Date(data.publishedAt)
          : null,
        category: { connect: { id: data.categoryId } },
        content: data.content,
        // Mise à jour des tags via la table pivot
        tagsArticles: {
          deleteMany: {}, // supprime toutes les anciennes relations
          create: data.tags.map((tagName: string) => ({
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
            assignedAt: true, // 👈 ajoute ça
            tag: { select: { id: true, name: true, slug: true } },
          
          },
        },
      },
    });

    const articleWithFlatTags = {
      ...article,
      tags: article.tagsArticles.map((ta) => ta.tag),
    };

    return NextResponse.json(mapArticle(articleWithFlatTags), { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Erreur update article:", error.message);
    } else {
      console.error("Erreur update article:", error);
    }
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// DELETE: suppression


export async function DELETE(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    console.log("🗑️ Tentative de suppression article slug:", slug);

    const article = await prisma.article.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!article) {
      return NextResponse.json({ error: "Article non trouvé" }, { status: 404 });
    }

    // Supprime d'abord les tags liés
    await prisma.tagArticle.deleteMany({ where: { articleId: article.id } });

    // Supprime l'article
    const deleted = await prisma.article.delete({ where: { id: article.id } });
    console.log("✅ Article supprimé :", deleted);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ Erreur DELETE article :", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

