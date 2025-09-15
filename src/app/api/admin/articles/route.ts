// app/api/articles/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { slugify } from "@/lib/slugify";
import { mapArticle } from "../../../../../types/articles-type";

// GET: liste des articles
export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      include: {
        category: { select: { id: true, name: true, slug: true } },
        tagsArticles: {
          select: {
            assignedAt: true,
            tag: { select: { id: true, name: true, slug: true } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const articlesWithFlatTags = articles.map((article) => ({
      ...article,
      tags: article.tagsArticles.map((ta) => ta.tag),
    }));

    return NextResponse.json(articlesWithFlatTags.map(mapArticle));
  } catch (err) {
    console.error("❌ [API GET] Erreur serveur :", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}


export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log("🟢 [API POST] Payload reçu :", JSON.stringify(data, null, 2));

    // Vérification des champs obligatoires
    if (!data.title || !data.categoryId || !data.content) {
      return NextResponse.json(
        {
          success: false,
          message: "Champs manquants : title, categoryId ou content",
          data: null,
        },
        { status: 400 }
      );
    }

    // Sécurité tags
    const tagsArray = Array.isArray(data.tags) ? data.tags : [];

    // Création de l'article
    const article = await prisma.article.create({
      data: {
        slug: data.slug || slugify(data.title),
        title: data.title,
        description: data.description || "",
        metaTitre: data.metaTitre || "",
        metaDescription: data.metaDescription || "",
        conclusion: data.conclusion || "",
        coverImage: data.coverImage?.url || "",
        content: { sections: data.content.sections || [] },
        published: !!data.published,
        publishedAt: data.published
          ? new Date()
          : data.publishedAt
          ? new Date(data.publishedAt)
          : null,
        category: { connect: { id: Number(data.categoryId) } },
        tagsArticles: {
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

    console.log("✅ [API POST] Article créé :", JSON.stringify(articleWithFlatTags, null, 2));

    return NextResponse.json(
      {
        success: true,
        message: "Article créé avec succès",
        data: mapArticle(articleWithFlatTags),
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("❌ [API POST] Erreur création article :", err);
    const message =
      err instanceof Error ? err.message : "Erreur serveur inattendue";
    return NextResponse.json(
      {
        success: false,
        message,
        data: null,
      },
      { status: 500 }
    );
  }
}
