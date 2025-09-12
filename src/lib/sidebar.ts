// lib/sidebar.ts
import prisma from "@/lib/prisma";

export type ArticleSidebarDTO = {
  title: string;
  slug: string;
  coverImage?: string | null;
};

export interface SidebarData {
  articles: ArticleSidebarDTO[];
  categories: { id: number; name: string; slug: string }[];
  tags: { id: number; name: string; slug: string }[];
}

let cachedSidebar: SidebarData | null = null;

export async function getSidebar(): Promise<SidebarData> {
  if (cachedSidebar) return cachedSidebar;

  const [articlesRaw, categories, tagsRaw] = await Promise.all([
    prisma.article.findMany({
      orderBy: { updatedAt: "desc" },
      select: { title: true, slug: true, coverImage: true },
    }),
    prisma.category.findMany({ select: { id: true, name: true, slug: true } }),
    prisma.tag.findMany({ select: { id: true, name: true, slug: true } }),
  ]);

  // Prendre un échantillon aléatoire pour les tags
  const tags = tagsRaw.sort(() => 0.5 - Math.random()).slice(0, 20);

  cachedSidebar = {
    articles: articlesRaw.map(a => ({ title: a.title, slug: a.slug, coverImage: a.coverImage })),
    categories,
    tags,
  };

  return cachedSidebar;
}
