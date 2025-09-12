import BlogLayout from "@/composantes/Admin/BlogLayout";
import { seoJustice } from "@/data/seoData";
import { getArticlesByCategory } from "@/lib/getArticles";
import { contentJustice } from "@/lib/getContentPage";

export const dynamic = "force-dynamic";


import { generateJSONLD, generateStaticMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";


export const metadata = generateStaticMetadata(seoJustice);


export default async function JusticePage() {
    const { category, articlesAll } = await getArticlesByCategory("problemes-de-justice");

    if (!category) {
        redirect("/rituels");
    }

    return (
        <>
            <BlogLayout content={contentJustice}>
                <article className="lg:col-span-3 space-y-10">
                    <div className="container mx-auto px-4 py-8">
                        <h1 className="text-3xl font-bold mb-6 text-center">
                            Articles dans la catégorie : {category.name}
                        </h1>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {category.articles.map((article) => (
                                <a
                                    key={article.id}
                                    href={`/rituels/${article.slug}`}
                                    className="block bg-white rounded-lg shadow hover:shadow-md transition duration-200 overflow-hidden"
                                >
                                    {article.coverImage && (
                                        <Image
                                            src={article.coverImage}
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
                                </a>
                            ))}
                        </div>
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
                                        className="w-full h-40 object-cover"
                                        width={400}
                                        height={250}
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
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: generateJSONLD(seoJustice) }}
            />
        </>
    );
}
