"use client";

export default function RituelsSection() {
  const rituels = [
    { title: "Retour Affectif", desc: "Réunissez l’être aimé rapidement grâce à un rituel puissant et discret." },
    { title: "Affaires de Justice", desc: "Protégez vos droits et obtenez justice grâce aux rituels efficaces de Dagbe." },
    { title: "Envoutement & Richesse", desc: "Attirez l’abondance, la prospérité et la réussite financière." },
    { title: "Chance & Protection", desc: "Rituel puissant pour attirer la chance et éloigner les mauvaises influences." },
  ];

  return (
    <section id="rituels" className="py-20">
      <div className="max-w-7xl mx-auto px-[--pad]">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="fade-in">
            <h2 className="font-display text-3xl sm:text-4xl mb-4">
              Rituels puissants pour <span className="text-brand-700 font-bold text-emerald-500">l’amour, la richesse et la chance</span>
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Chaque rituel est personnalisé selon vos besoins et objectifs. Marabout Dagbe utilise son savoir ancestral pour transformer votre vie rapidement et efficacement.
            </p>
            <ul className="grid sm:grid-cols-2 gap-4">
              {rituels.map((r) => (
                <li key={r.title} className="rounded-2xl border border-slate-200 p-5 shadow-soft bg-white">
                  <h3 className="font-semibold mb-1">{r.title}</h3>
                  <p className="text-sm text-slate-600">{r.desc}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-[420px] rounded-3xl overflow-hidden shadow-soft">
            <img
              className="absolute inset-0 w-full h-full object-cover"
              src="/image/dagbe.jpg"
              alt="Rituel mystique marabout Dagbe"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
