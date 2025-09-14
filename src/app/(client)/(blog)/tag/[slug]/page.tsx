// app/rituels/tag/[slug]/page.tsx

import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { ArticleDTO, mapArticle } from "../../../../../../types/articles-type";
import { content } from "@/lib/getContentPage";
import { redirect } from "next/navigation";
import { generateMetadataTag, seoPropsFromTagDynamic } from "@/lib/seo";
import Head from "next/head";
import { getAllTagSlug } from "@/lib/getArticles";
import { JsonLD } from "@/composantes/JsonLD";
import BlogLayout from "@/composantes/Admin/BlogLayout";

export const dynamic = "force-dynamic";

type Props = {
    params: Promise<{ slug: string }>; // ✅ params est une Promise
};

export async function generateStaticParams() {
    return await getAllTagSlug();
}


export async function generateMetadata({ params }: Props) {
    const { slug } = await params; // 🔑 await la promesse

    return generateMetadataTag({ params: { slug } });
}





export default async function TagPage({ params }: Props) {
    const { slug } = await params;


    // Récupération du tag + ses articles via tagsArticles
    const tag = await prisma.tag.findUnique({
        where: { slug },
        include: {
            tagsArticles: {
                include: {
                    article: {
                        include: {
                            category: { select: { id: true, name: true, slug: true } },
                            tagsArticles: {
                                select: {
                                    tag: { select: { id: true, name: true, slug: true } },
                                    assignedAt: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });


    if (!tag) {
        redirect("/rituels");
    }
    // Transforme en ArticleDTO
    const articles: ArticleDTO[] = tag.tagsArticles.map((ta) => mapArticle(ta.article));

    // Tous les articles pour la section "Autres articles"
    const articlesAllRaw = await prisma.article.findMany({
        orderBy: { updatedAt: "desc" },
        include: {
            category: { select: { id: true, name: true, slug: true } },
            tagsArticles: {
                select: {
                    tag: { select: { id: true, name: true, slug: true } },
                    assignedAt: true,
                },
            },
        },
    });
    const articlesAll: ArticleDTO[] = articlesAllRaw.map(mapArticle);
    // JSON-LD
    const seoProps = await seoPropsFromTagDynamic(slug);
    return (
        <>
            <Head>
                <JsonLD seo={seoProps} />
            </Head>
            <BlogLayout content={content}>

                <article className="lg:col-span-3 space-y-10">
                    {/* Articles du tag */}
                    <div className="container mx-auto px-4 py-8">
                        <h1 className="text-3xl font-bold mb-6 text-center">
                            Articles avec le tag : {tag.name}
                        </h1>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {articles.map((article) => (
                                <Link
                                    key={article.id}
                                    href={`/rituels/${article.slug}`}
                                    className="block bg-white rounded-lg shadow hover:shadow-md transition duration-200 overflow-hidden"
                                >
                                    {article.coverImage && (
                                        <Image
                                            src={article.coverImage?.url ?? "/default-cover.jpg"} // utiliser .url
                                            alt={article.title}
                                            className="w-full h-48 object-cover"
                                            width={400}
                                            height={192}
                                        />

                                    )}
                                    <div className="p-4">
                                        <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                                        <p className="text-gray-600 text-sm mb-3">{article.description}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Autres articles */}
                    <div className="mt-16">
                        <h3 className="text-2xl font-bold text-slate-800 mb-6">
                            Autres articles
                        </h3>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {articlesAll.map((a) => (
                                <Link
                                    key={a.slug}
                                    href={`/rituels/${a.slug}`}
                                    className="block bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
                                >
                                    <Image
                                        src={a.coverImage?.url ?? "/default-cover.jpg"} // utiliser .url
                                        alt={a.title}
                                        width={400}
                                        height={250}
                                        className="w-full h-40 object-cover"
                                    />

                                    <div className="p-4">
                                        <h4 className="text-lg font-semibold text-slate-800 mb-2">{a.title}</h4>
                                        <p className="text-sm text-slate-600">{a.description}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </article>
            </BlogLayout>

        </>
    );
}
