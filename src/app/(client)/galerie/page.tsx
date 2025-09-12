import { getAllArticles } from "@/lib/getArticles";
import { contentGalerie } from "@/lib/getContentPage";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";


import { generateJSONLD, generateStaticMetadata } from "@/lib/seo";
import { seoGalerie } from "@/data/seoData";
import BlogLayout from "@/composantes/Admin/BlogLayout";


export const metadata = generateStaticMetadata(seoGalerie);


export default async function GaleriPage() {
  // 🔹 Tous les articles déjà mappés en ArticleDTO
  const articles = await getAllArticles();

  if (!articles || articles.length === 0) throw new Error("Aucun article trouvé");

  // 🔹 Construire la liste de toutes les images
  const allImages = articles.flatMap((article) => {
    const images: { src: string; articleTitle: string; articleSlug: string }[] = [];

    if (article.coverImage) {
      images.push({
        src: article.coverImage,
        articleTitle: article.title,
        articleSlug: article.slug,
      });
    }

    article.content?.sections?.forEach((section) => {
      if (section.image) {
        images.push({
          src: section.image,
          articleTitle: article.title,
          articleSlug: article.slug,
        });
      }
    });

    return images;
  });

  return (
    <>
      <BlogLayout content={contentGalerie}>
        <article className="lg:col-span-3 space-y-10">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">
              La galerie des rituels du Medium Ali Moussa
            </h1>

            {/* Masonry Grid */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {allImages.map((img, index) => (
                <Link
                  key={index}
                  href={`/rituels/${img.articleSlug}`}
                  className="block break-inside-avoid overflow-hidden rounded-2xl shadow hover:shadow-lg transition"
                >
                  <Image
                    src={img.src}
                    alt={img.articleTitle}
                    width={600}
                    height={400}
                    className="w-full object-cover rounded-2xl"
                  />
                  <div className="p-2 text-center bg-white">
                    <p className="text-sm text-slate-700 font-medium">{img.articleTitle}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </article>
      </BlogLayout>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateJSONLD(seoGalerie) }}
      />

    </>
  );
}
