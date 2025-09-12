"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArticleSummaryDTO } from "../../../types/articles-tytp";

type Props = { articles: ArticleSummaryDTO[] };
const PAGE_SIZE = 6;

export default function CategoryArticlesClient({ articles }: Props) {
  const [mainArticle, ...restArticles] = articles;
  const [visibleArticles, setVisibleArticles] = useState<ArticleSummaryDTO[]>(restArticles.slice(0, PAGE_SIZE));
  const [page, setPage] = useState(1);

  const loadMore = useCallback(() => {
    const nextPage = page + 1;
    setVisibleArticles(restArticles.slice(0, nextPage * PAGE_SIZE));
    setPage(nextPage);
  }, [page, restArticles]);


  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
        visibleArticles.length < restArticles.length
      ) {
        loadMore();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMore, visibleArticles, restArticles]);

  return (
    <div>
      {/* Premier article */}
      <Link
        href={`/rituels/${mainArticle.slug}`}
        className="block bg-white shadow-lg rounded-xl overflow-hidden mb-10 hover:shadow-2xl transition transform hover:-translate-y-1"
      >
        <Image
          src={mainArticle.coverImage ?? "/default-cover.jpg"}
          alt={mainArticle.title}
          width={900}
          height={400}
          className="w-full h-64 md:h-80 object-cover"
        />
        <div className="p-5">
          <h2 className="text-2xl font-bold mb-2">{mainArticle.title}</h2>
          <p className="text-sm text-gray-600 mb-2">
            {new Date(mainArticle.updatedAt).toLocaleDateString("fr-FR")}
          </p>
          <p className="text-gray-700">{mainArticle.description}</p>
        </div>
      </Link>

      {/* Autres articles */}
      {visibleArticles.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Autres articles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleArticles.map((article, index) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <Link
                  href={`/rituels/${article.slug}`}
                  className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1"
                >
                  <Image
                    src={article.coverImage ?? "/default-cover.jpg"}
                    alt={article.title}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 flex flex-col flex-1">
                    <h4 className="text-lg font-semibold mb-1">{article.title}</h4>
                    <p className="text-sm text-gray-500 mb-2">
                      {new Date(article.updatedAt).toLocaleDateString("fr-FR")}
                    </p>
                    <p className="text-gray-700 mt-auto">{article.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          {visibleArticles.length < restArticles.length && (
            <p className="text-center mt-4 text-gray-500">Faites défiler pour charger plus...</p>
          )}
        </div>
      )}
    </div>
  );
}
