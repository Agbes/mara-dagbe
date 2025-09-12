// lib/slugResolver.ts
import prisma from "@/lib/prisma";

type SlugType = "article" | "category" | "tag";

export interface SlugEntry {
  type: SlugType;
  id: number;
}

let slugCache: Record<string, SlugEntry> | null = null;

/**
 * Précharge tous les slugs dans la mémoire du serveur
 */
export async function preloadSlugs() {
  const [articles, categories, tags] = await Promise.all([
    prisma.article.findMany({ select: { id: true, slug: true } }),
    prisma.category.findMany({ select: { id: true, slug: true } }),
    prisma.tag.findMany({ select: { id: true, slug: true } }),
  ]);

  slugCache = {};

  articles.forEach((a) => (slugCache![a.slug] = { type: "article", id: a.id }));
  categories.forEach((c) => (slugCache![c.slug] = { type: "category", id: c.id }));
  tags.forEach((t) => (slugCache![t.slug] = { type: "tag", id: t.id }));

  console.log(`✅ Slug cache préchargé: ${Object.keys(slugCache).length} entrées`);
}

/**
 * Résout un slug en type/id
 */
export function resolveSlug(slug: string): SlugEntry | null {
  if (!slugCache) {
    throw new Error("Slug cache non initialisé. Appelle preloadSlugs() au démarrage.");
  }
  return slugCache[slug] || null;
}
