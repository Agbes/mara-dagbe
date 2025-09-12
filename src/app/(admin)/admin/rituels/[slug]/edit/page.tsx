import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ArticleContent, ArticleDTO } from "../../../../../../../types/articles-tytp";
import EditArticlePage from "@/composantes/Admin/articles/edit/EditArticlePage";

type Props = {
  params: Promise<{ slug: string }>; // params est une Promise
};

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const [categories, article] = await Promise.all([
    prisma.category.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    }),
    prisma.article.findUnique({
      where: { slug },
      include: {
        category: { select: { id: true, name: true } },
        tagsArticles: {
          select: {
            tag: { select: { id: true, name: true } },
          },
        },
      },
    }),
  ]);

  if (!article) return notFound();

  const dto: ArticleDTO = {
    id: article.id,
    slug: article.slug,
    title: article.title,
    description: article.description,
    metaDescription: article.metaDescription,
    metaTitre: article.metaTitre,
    coverImage: article.coverImage ?? null,
    conclusion: article.conclusion ?? "",
    categoryId: article.categoryId,
    category: article.category?.name ?? "",
    tags: article.tagsArticles?.map((ta) => ta.tag.name) ?? [], // ✅ flatten des tags
    published: article.published,
    publishedAt: article.publishedAt ? article.publishedAt.toISOString() : null,
    content: article.content as ArticleContent,
    createdAt: article.createdAt.toISOString(),
    updatedAt: article.updatedAt.toISOString(),
  };

  return <EditArticlePage categories={categories} article={dto} />;
}
