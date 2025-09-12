// app/rituels/BlogLayout.tsx
import React from "react";
import SidebarRituel from "@/components/BlogClient/SidebarRetourAffectif";
import { getArticles } from "@/lib/getArticles";
import prisma from "@/lib/prisma";
import { ArticleSidebarDTO } from "../../../types/articles-tytp";


export const revalidate = 120;

function getRandomItems<T>(arr: T[], n: number) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

export default async function SidebarRituelLayout() {
  // 🔹 Récupération des articles via getArticles
  const articles = await getArticles();

  // 🔹 Récupération des catégories et tags
  const categories = await prisma.category.findMany({
    select: { id: true, name: true, slug: true, createdAt: true },
  });

  const tags = await prisma.tag.findMany({
    take: 20,
    select: { id: true, name: true, slug: true, createdAt: true },
  });

  const randomTags = getRandomItems(tags, 20);

  // 🔹 Préparer les articles pour la sidebar
  const sidebarArticles: ArticleSidebarDTO[] = articles.map((a) => ({
    title: a.title,
    slug: a.slug,
    coverImage: a.coverImage,
  }));

  return (
    <SidebarRituel
      articles={sidebarArticles}
      categories={categories}
      tags={randomTags}
    />
  );
}
