// composantes/Acceuille/DerniersRituelsSection.tsx

// composantes/Acceuille/DerniersRituelsSection.tsx

import Link from "next/link";
import Image from "next/image";
import { ArticleDTO } from "../../../types/articles-type";

interface Props {
  rituels: ArticleDTO[];
}

export default function DerniersRituelsSection({ rituels }: Props) {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-12 text-gray-800">
          ✨ Derniers Rituels avec un résultats en 24H
        </h2>

        {/* Grille des derniers rituels */}
        <div className="grid gap-8 md:grid-cols-3">
          {rituels.map((rituel) => (
            <Link
              key={rituel.id}
              href={`/rituels/${rituel.slug}`}
              className="group relative block rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              {rituel.coverImage?.url ? (
                <Image
                  src={rituel.coverImage.url}
                  alt={rituel.title}
                  className="w-full h-64 sm:h-72 object-cover transform group-hover:scale-105 transition-transform duration-500"
                  width={600}
                  height={300}
                />
              ) : (
                <div className="w-full h-64 sm:h-72 bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                  Image manquante
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-6 flex flex-col justify-end">
                <h3 className="text-xl font-bold text-white mb-1 line-clamp-2">
                  {rituel.title}
                </h3>
                <p className="text-sm text-gray-200 mb-2 line-clamp-2">
                  {rituel.description}
                </p>
                <span className="text-brand-300 font-semibold hover:underline">
                  Lire plus →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Lien magique pour voir tous les rituels */}
        <div className="mt-12 text-center">
          <Link
            href="/rituels"
            className="inline-block px-8 py-4 text-lg font-semibold rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300"
          >
            🔮 Découvrir tous les rituels
          </Link>
        </div>
      </div>
    </section>
  );
}



// composantes/Acceuille/DerniersRituelsSection.tsx

// import Link from "next/link";
// import Image from "next/image";
// import { ArticleDTO } from "../../../types/articles-type";

// interface Props {
//   rituels: ArticleDTO[];
// }

// export default function DerniersRituelsSection({ rituels }: Props) {
//   return (
//     <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
//       <div className="max-w-7xl mx-auto px-6">
//         <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-12 text-gray-800">
//           ✨ Derniers Rituels
//         </h2>

//         <div className="grid gap-8 md:grid-cols-3">
//           {rituels.map((rituel) => (
//             <Link
//               key={rituel.id}
//               href={`/articles/${rituel.slug}`}
//               className="group relative block rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
//             >
//               {/* Image cover */}
//               {rituel.coverImage?.url ? (
//                 <Image
//                   src={rituel.coverImage.url}
//                   alt={rituel.title}
//                   className="w-full h-64 sm:h-72 object-cover transform group-hover:scale-105 transition-transform duration-500"
//                   width={600}
//                   height={300}
//                 />
//               ) : (
//                 <div className="w-full h-64 sm:h-72 bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
//                   Image manquante
//                 </div>
//               )}

//               {/* Overlay animé */}
//               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
//                 <div className="translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
//                   <h3 className="text-xl font-bold text-white mb-1 line-clamp-2">
//                     {rituel.title}
//                   </h3>
//                   <p className="text-sm text-gray-200 mb-2 line-clamp-2">
//                     {rituel.description}
//                   </p>
//                   <span className="text-brand-300 font-semibold hover:underline">
//                     Lire plus →
//                   </span>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
