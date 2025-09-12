import Image from "next/image";
import Link from "next/link";

import { generateJSONLD, generateStaticMetadata } from "@/lib/seo";
import { seoPropos } from "@/data/seoData";

export const metadata = generateStaticMetadata(seoPropos);

export default function AboutPage() {
  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4">
            À propos de Maître Ali Moussa
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Découvrez le parcours, l’expérience et la sagesse d’un grand maître
            spirituel, reconnu pour ses rituels puissants et sa guidance unique.
          </p>
        </header>

        {/* Présentation */}
        <section className="grid md:grid-cols-2 gap-10 items-center mb-20">
          <div>
            <Image
              src="/images/ali-moussa.jpg"
              alt="Maître Ali Moussa"
              width={600}
              height={600}
              className="rounded-2xl shadow-lg object-cover w-full h-[400px]"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-cyan-700 mb-4">
              Un héritage spirituel ancestral
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Depuis plus de <strong>20 ans</strong>, Maître Ali Moussa pratique
              et transmet des rituels puissants hérités de ses ancêtres. Sa
              réputation repose sur sa capacité à aider dans les domaines de
              l’amour, de la protection, de la justice, de la prospérité et du
              succès.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Reconnu à l’international, il a accompagné des centaines de
              personnes vers la paix intérieure, l’harmonie et la réussite dans
              leur vie personnelle et professionnelle.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/propos"
                className="px-6 py-3 rounded-xl bg-cyan-600 text-white font-semibold shadow hover:bg-cyan-700 transition"
              >
                Qui suis-je
              </Link>
              <Link
                href="/rituels"
                className="px-6 py-3 rounded-xl border border-slate-300 font-semibold text-gray-700 hover:bg-slate-50 transition"
              >
                Mes Rituels
              </Link>
            </div>
          </div>
        </section>

        {/* Valeurs */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-cyan-700 mb-8 text-center">
            Les valeurs de Maître Ali Moussa
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white shadow-md rounded-2xl p-6 text-center hover:shadow-lg transition">
              <h3 className="text-lg font-bold mb-2">Authenticité</h3>
              <p className="text-slate-600 text-sm">
                Des rituels transmis de génération en génération, dans la pure
                tradition spirituelle.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-2xl p-6 text-center hover:shadow-lg transition">
              <h3 className="text-lg font-bold mb-2">Bienveillance</h3>
              <p className="text-slate-600 text-sm">
                Un accompagnement humain et respectueux, dans la discrétion et la
                confidentialité.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-2xl p-6 text-center hover:shadow-lg transition">
              <h3 className="text-lg font-bold mb-2">Résultats</h3>
              <p className="text-slate-600 text-sm">
                Des témoignages nombreux qui attestent de la puissance et de
                l’efficacité de ses rituels.
              </p>
            </div>
          </div>
        </section>

        {/* Appel à l’action */}
        <section className="bg-gradient-to-r from-cyan-900 to-cyan-700 rounded-2xl shadow-lg p-10 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Besoin d’une guidance spirituelle ?
          </h2>
          <p className="mb-6 text-white/90 max-w-2xl mx-auto">
            Maître Ali Moussa vous propose une consultation confidentielle pour
            répondre à vos besoins, que ce soit en amour, en protection, en
            chance, en prospérité ou en justice.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-cyan-700 font-bold px-6 py-3 rounded-full hover:bg-slate-100 transition"
          >
            Je contacte le Maître
          </Link>
        </section>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateJSONLD(seoPropos) }}
      />

    </>
  );
}
