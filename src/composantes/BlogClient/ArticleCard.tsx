"use client";

import Image from "next/image";
import Link from "next/link";
import { ArticleDTO } from "../../../types/articles-tytp";

type Props = {
  article: ArticleDTO;
};

export default function ArticleCard({ article }: Props) {
  return (
<article className="flex flex-col bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:shadow-cyan-500/30 transform transition duration-300 hover:scale-105 hover:-translate-y-1">
      {/* Image */}
      <div className="flex-shrink-0">
        <Image
          src={article.coverImage ? article.coverImage : "/default-cover.jpg"}
          alt={article.title}
          width={500}
          height={250}
          className="w-full h-40 object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col p-6">
        <h2 className="text-lg font-bold mb-2 line-clamp-2">{article.title}</h2>

        <p className="text-slate-600 text-sm flex-1 line-clamp-3">
          {article.description}
        </p>

        <div className="mt-2 text-xs text-slate-400">
          {new Date(article.updatedAt).toLocaleString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>

        {/* CTA bouton collé en bas */}
        <div className="mt-auto flex">
          <Link
            href={`/rituels/${article.slug}`}
            className="px-4 py-2 text-sm rounded-lg bg-cyan-700 text-white font-medium hover:bg-cyan-600 transition"
          >
            Lire plus →
          </Link>
        </div>
      </div>
    </article>
  );
}
