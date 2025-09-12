import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import Head from "next/head";

import { content } from "@/lib/getContentPage";
import { generateMetadataCategory, seoPropsFromCategoryDynamic } from "@/lib/seo";
import { getAllCategorySlug } from "@/lib/getArticles";
import BlogLayout from "@/composantes/Admin/BlogLayout";
import { JsonLD } from "@/composantes/JsonLD";

export const dynamic = "force-dynamic";

type Props = {
    params: Promise<{ slug: string }>; // ✅ params est une Promise
};


export async function generateStaticParams() {
  return await getAllCategorySlug();
}


export async function generateMetadata({ params }: Props) {
    const { slug } = await params; // 🔑 await la promesse

    return generateMetadataCategory({ params: { slug } });
}





export default async function CategoriePage({ params }: Props) {
    const { slug } = await params; // 🔑 await la promesse


    const category = await prisma.category.findUnique({
        where: { slug },
        include: {
            articles: {
                include: {
                    category: { select: { id: true, name: true, slug: true } },
                    tagsArticles: {
                        select: {
                            tag: { select: { id: true, name: true, slug: true } },
                            assignedAt: true,
                        },
                    },
                },
                orderBy: { updatedAt: "desc" },
            },
        },
    });

    const articlesAll = await prisma.article.findMany({
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


    if (!category) {
        redirect("/rituels");
    }

    // JSON-LD
    const seoProps = await seoPropsFromCategoryDynamic(slug);

    return (
        <>
            <Head>
                <JsonLD seo={seoProps} />
            </Head>

            <BlogLayout content={content}>

                <article className="lg:col-span-3 space-y-10">
                    <div className="container mx-auto px-4 py-8">
                        <h1 className="text-3xl font-bold mb-6 text-center">
                            Articles dans la catégorie : {category.name}
                        </h1>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {category.articles.map((article) => (
                                <Link
                                    key={article.id}
                                    href={`/articles/${article.slug}`}
                                    className="block bg-white rounded-lg shadow hover:shadow-md transition duration-200 overflow-hidden"
                                >
                                    {article.coverImage && (
                                        <Image
                                            src={article.coverImage}
                                            alt={article.title}
                                            width={400}
                                            height={192}
                                            className="w-full h-48 object-cover"
                                        />
                                    )}
                                    <div className="p-4">
                                        <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                                        <p className="text-gray-600 text-sm mb-3">{article.description}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <div className="mt-16">
                            <h3 className="text-2xl font-bold text-slate-800 mb-6">Autres articles</h3>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {articlesAll.map((a) => (
                                    <Link
                                        key={a.slug}
                                        href={`/rituels/${a.slug}`}
                                        className="block bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
                                    >
                                        <Image
                                            src={a.coverImage ?? "/default-cover.jpg"}
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
                    </div>
                </article>
            </BlogLayout>
        </>

    );
}
