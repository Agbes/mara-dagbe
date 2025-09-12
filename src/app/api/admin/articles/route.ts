// app/api/articles/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { mapArticle } from "../../../../../types/articles-tytp";
import { slugify } from "@/lib/slugify";

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

// POST: création d’un article
export async function POST(req: Request) {
  try {
    const data = await req.json();

    // 🔹 Debug : log complet du payload
    console.log("🟢 [API POST] Payload reçu :", JSON.stringify(data, null, 2));

    // 🔹 Vérification des champs obligatoires
    if (!data.title || !data.categoryId || !data.content) {
      console.warn(
        "⚠️ [API POST] Champs manquants :",
        "title =", data.title,
        "categoryId =", data.categoryId,
        "content =", data.content
      );
      return NextResponse.json(
        { error: "Champs manquants : title, categoryId ou content" },
        { status: 400 }
      );
    }

    // 🔹 Sécurité tags
    const tagsArray = Array.isArray(data.tags) ? data.tags : [];
    if (!Array.isArray(data.tags)) {
      console.warn("⚠️ [API POST] tags non fourni ou invalide, valeur reçue :", data.tags);
    }

    const article = await prisma.article.create({
      data: {
        slug: data.slug || slugify(data.title),
        title: data.title,
        description: data.description || "",
        metaTitre: data.metaTitre || "",
        metaDescription: data.metaDescription || "",
        conclusion: data.conclusion || "",
        coverImage: data.coverImage || "",
        published: !!data.published,
        publishedAt: data.published
          ? new Date()
          : data.publishedAt
          ? new Date(data.publishedAt)
          : null,
        category: { connect: { id: Number(data.categoryId) } },
        content: data.content,
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

    return NextResponse.json(mapArticle(articleWithFlatTags));
  } catch (err) {
    console.error("❌ [API POST] Erreur création article :", err);

    // Envoi de l'erreur complète au client pour debug
    const message = err instanceof Error ? err.message : "Erreur serveur inattendue";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
