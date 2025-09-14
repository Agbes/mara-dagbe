

import prisma from "@/lib/prisma";
import { ArticleDTO, ArticleWithRelations, mapArticle } from "../../../../../../types/articles-type";
import Link from "next/link";
import Image from "next/image";

import { content } from "@/lib/getContentPage";
import { redirect } from "next/navigation";
import { generateStaticMetadata, seoPropsFromArticle } from "@/lib/seo";
import Head from "next/head";
import { JsonLD } from "@/composantes/JsonLD";
import BlogLayout from "@/composantes/Admin/BlogLayout";
import ContactArticle from "@/composantes/ContactArticle";
export const dynamic = "force-dynamic";

type Props = {
    params: Promise<{ slug: string }>; // ✅ params est une Promise
};

export async function generateStaticParams() {
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

    return articles.map((article) => ({
        slug: article.slug,
    }));
}

export async function generateMetadata({ params }: Props) {
    const { slug } = await params; // 🔑 await la promesse

    const article = await prisma.article.findUnique({
        where: { slug },
        include: {
            category: { select: { id: true, name: true, slug: true } },
            tagsArticles: { select: { tag: { select: { id: true, name: true, slug: true } }, assignedAt: true } },
        },
    });

    if (!article) {
        return generateStaticMetadata({
            title: "Découvrez: Rituels populaires & Marabout Dagbe",
            description: "Explorez nos autres rituels et conseils du marabout Dagbe pour trouver des solutions immédiatement",
        });
    }

    return generateStaticMetadata(seoPropsFromArticle(article));
}



export default async function ArticlePage({ params }: Props) {

    const { slug } = await params; // 🔑 await la promesse



    const articlesRaw: ArticleWithRelations[] = await prisma.article.findMany({
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



    const articleRaw = await prisma.article.findUnique({
        where: { slug },
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



    const articles: ArticleDTO[] = articlesRaw.map(mapArticle);




    if (!articleRaw) {
        redirect("/rituels");
    }
    const seoProps = seoPropsFromArticle(articleRaw);

    const article = mapArticle(articleRaw);



    return (
        <>
            <Head>
                <JsonLD seo={seoProps} />
            </Head>
            <BlogLayout content={content}>


                <article className="lg:col-span-3 space-y-10">
                    {/* Header */}
                    <header>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4">
                            {article.title}
                        </h1>
                        <p className="text-slate-500 text-sm">
                            {new Date(article.updatedAt).toLocaleDateString("fr-FR", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </p>
                        <Image
                            src={article.coverImage?.url ?? "/default-cover.jpg"} // ✅ string
                            alt={article.title}
                            width={1200}
                            height={600}
                        />

                    </header>

                    {/* Sections */}
                    <div className="space-y-16">
                        {article.content.sections.map((section, index) => (
                            <div
                                key={index}
                                className="grid md:grid-cols-2 gap-8 items-center"
                            >
                                {/* Image */}
                                <div className={`${index % 2 === 1 ? "md:order-2" : "md:order-1"}`}>
                                    <Image
                                        src={section.image?.url ?? "/default-cover.jpg"} // ✅ prendre la propriété url
                                        alt={section.subtitle}
                                        width={600}
                                        height={400}
                                        className="w-full h-64 object-cover rounded-2xl shadow-md"
                                    />
                                </div>

                                {/* Texte */}
                                <div className={`${index % 2 === 1 ? "md:order-1" : "md:order-2"}`}>
                                    <h2 className="text-2xl font-bold text-cyan-700 mb-4">
                                        {section.subtitle}
                                    </h2>
                                    <p className="text-slate-700 leading-relaxed">{section.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Conclusion */}
                    <div className="bg-slate-100 p-6 rounded-2xl shadow-md">
                        <h2 className="text-2xl font-bold text-cyan-700 mb-4">En Conclusion</h2>
                        <p className="text-slate-700 leading-relaxed">{article.conclusion}</p>
                        <ContactArticle />
                    </div>

                    {/* Articles similaires */}
                    <div className="mt-16">
                        <h3 className="text-2xl font-bold text-slate-800 mb-6">
                            Autres articles
                        </h3>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {articles.map((a) => (
                                <Link
                                    key={a.slug}
                                    href={`/rituels/${a.slug}`}
                                    className="block bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
                                >
                                    <Image
                                        src={a.coverImage?.url ?? "/default-cover.jpg"} // ✅ prend l'URL ou valeur par défaut
                                        alt={a.title}
                                        width={400}
                                        height={250}
                                        className="w-full h-40 object-cover"
                                    />
                                    <div className="p-4">
                                        <h4 className="text-lg font-semibold text-slate-800 mb-2">
                                            {a.title}
                                        </h4>
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