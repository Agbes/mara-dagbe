
import { ArticleDTO, ArticleWithRelations, mapArticle } from "../../../../../types/articles-tytp";
import prisma from "@/lib/prisma";

import { content } from "@/lib/getContentPage";
export const dynamic = "force-dynamic";



import { generateStaticMetadata } from "@/lib/seo";
import { seoRituels } from "@/data/seoData";
import ArticleCard from "@/composantes/BlogClient/ArticleCard";
import BlogLayout from "@/composantes/Admin/BlogLayout";


export const metadata = generateStaticMetadata(seoRituels);


export default async function RituelsPage() {

  // On récupère les articles avec la nouvelle relation TagArticle
  const articlesRaw: ArticleWithRelations[] = await prisma.article.findMany({
    orderBy: { updatedAt: "desc" },
    include: {
      category: { select: { id: true, name: true, slug: true } },
      tagsArticles: { 
        select: { 
          tag: { select: { id: true, name: true, slug: true } },
          assignedAt: true,
        }
      },
    },
  });

  const articles: ArticleDTO[] = articlesRaw.map(mapArticle);


  return (
    <BlogLayout content={content}>
      {articles.map((article) => (
        <div key={article.slug} className="flex-1 min-w-[280px]">
          <ArticleCard article={article} />
        </div>
      ))}
    </BlogLayout>
  );
}
