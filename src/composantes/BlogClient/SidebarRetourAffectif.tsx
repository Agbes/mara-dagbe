import Link from "next/link";
import Image from "next/image";
import { ArticleSidebarDTO } from "../../../types/articles-tytp";

type CategoryDTO = {
  id: number;
  slug: string;
  name: string;
  createdAt: Date;
};

type TagDTO = {
  id: number;
  slug: string;
  name: string;
  createdAt: Date;
};

type PropSide = {
  articles: ArticleSidebarDTO[];
  categories: CategoryDTO[];
  tags: TagDTO[];
};

export default async function SidebarRituel({
  articles,
  categories,
  tags,
}: PropSide) {
  return (
    <aside className="space-y-8">
      {/* À propos */}
      <div className="bg-gradient-to-r from-cyan-900 to-cyan-700 text-white rounded-2xl shadow-md p-6">
        <h3 className="text-lg font-bold mb-3">À propos du Maître</h3>
        <p className="text-white/90 text-sm leading-relaxed">
          Maître Ali Moussa est un praticien spirituel reconnu avec plus de 20
          ans d’expérience. Expert en amour, protection et réussite, il met son
          savoir au service de ceux qui cherchent une solution.
        </p>
      </div>

      {/* Articles récents */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-lg font-bold mb-4">Articles récents</h3>
        <ul className="space-y-3">
          {articles.map((a) => (
            <li key={a.slug} className="flex items-center gap-3">
              <Image
                src={a.coverImage ? a.coverImage : "/default-cover.jpg"}
                alt={a.title}
                width={50}
                height={50}
                className="w-12 h-12 object-cover rounded-md"
              />
              <Link
                href={`/rituels/${a.slug}`}
                className="text-slate-700 hover:text-cyan-700 transition text-sm font-medium"
              >
                {a.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Catégories */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-lg font-bold mb-4">Catégories</h3>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat.slug}>
              <Link
                href={`/categorie/${cat.slug}`}
                className="text-slate-700 hover:text-cyan-700 transition"
              >
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Tags */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-lg font-bold mb-4">Tags populaires</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag.slug}
              href={`/tag/${tag.slug}`}
              className="bg-slate-100 text-slate-700 text-sm px-3 py-1 rounded-full hover:bg-cyan-600 hover:text-white transition"
            >
              #{tag.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-2xl shadow-lg p-6 text-center">
        <h3 className="text-xl font-bold mb-2">Besoin d’aide urgente ?</h3>
        <p className="text-sm mb-4">
          Contactez le Maître dès maintenant pour une consultation
          confidentielle.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-white text-amber-600 font-bold px-4 py-2 rounded-full hover:bg-slate-100 transition"
        >
          Je contacte le Maître
        </Link>
      </div>
    </aside>
  );
}
