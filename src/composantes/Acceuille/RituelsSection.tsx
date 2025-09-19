"use client";

export default function RituelsSection() {
  const rituels = [
    { title: "Retour Affectif", desc: "Réunissez l’être aimé rapidement grâce à un rituel puissant et discret." },
    { title: "Affaires de Justice", desc: "Protégez vos droits et obtenez justice grâce aux rituels efficaces de Dagbe." },
    { title: "Envoutement & Richesse", desc: "Attirez l’abondance, la prospérité et la réussite financière." },
    { title: "Chance & Protection", desc: "Rituel puissant pour attirer la chance et éloigner les mauvaises influences." },
  ];

  return (
    <section id="rituels" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Texte et cards */}
          <div className="fade-in space-y-6">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold leading-tight">
              Rituels puissants pour{" "}
              <span className="text-emerald-500 font-bold">
                l’amour, la richesse et la chance
              </span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Chaque rituel est personnalisé selon vos besoins et objectifs. Marabout Dagbe utilise son savoir ancestral pour transformer votre vie rapidement et efficacement.
            </p>

            {/* Cards des rituels */}
            <ul className="grid sm:grid-cols-2 gap-6">
              {rituels.map((r) => (
                <li key={r.title} className="rounded-3xl border border-slate-200 p-6 shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300">
                  <h3 className="font-semibold text-lg mb-2">{r.title}</h3>
                  <p className="text-slate-600 text-sm">{r.desc}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Image côté droit */}
          <div className="relative h-[420px] rounded-3xl overflow-hidden shadow-lg">
            <img
              className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              src="/image/dagbe.jpg"
              alt="Rituel mystique marabout Dagbe"
            />
            {/* Overlay subtil pour effet mystique */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
