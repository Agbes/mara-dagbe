"use client";

export default function RituelsSection() {
  return (
    <section id="rituels" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-[--pad] grid lg:grid-cols-2 gap-12 items-center">
        <div className="fade-in">
          <h2 className="font-display text-3xl sm:text-4xl mb-4">
            Transformez votre vie avec <span className="text-brand-700">Marabout Dagbe</span>
          </h2>
          <p className="text-slate-700 mb-6">
            Spécialiste des rituels puissants, Marabout Dagbe vous guide pour attirer l'amour, la chance, la richesse ou obtenir justice.
          </p>
          <ul className="space-y-4 text-slate-700">
            <li className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-100">❤️</span>
              Retour affectif et harmonisation des relations
            </li>
            <li className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-100">⚖️</span>
              Affaires de justice et protection contre les obstacles
            </li>
            <li className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-100">💰</span>
              Envoutements pour la richesse et opportunités financières
            </li>
            <li className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-100">🍀</span>
              Chance, protection et guidance spirituelle
            </li>
          </ul>
          <p className="mt-6 text-slate-700">
            Découvrez des rituels personnalisés, efficaces et réalisés avec discrétion et puissance.
          </p>
          <a
            href="#contact"
            className="mt-6 inline-block rounded-2xl px-6 py-3 font-medium bg-brand-600 text-white hover:bg-brand-700 shadow-soft transition"
          >
            Contactez Marabout Dagbe
          </a>
        </div>

        <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-soft">
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src="/image/marabout-dagbe.jpg"
            alt="Rituels spirituels puissants"
          />
        </div>
      </div>
    </section>
  );
}
