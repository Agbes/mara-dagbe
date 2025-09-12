"use client";

export default function RituelsCardsSection() {
  const rituels = [
    {
      title: "Retour Affectif",
      icon: "❤️",
      desc: "Rassemblez l’être aimé et ravivez les sentiments perdus grâce à un rituel puissant."
    },
    {
      title: "Affaires de Justice",
      icon: "⚖️",
      desc: "Obtenez protection et justice dans vos affaires personnelles ou professionnelles."
    },
    {
      title: "Envoutement & Richesse",
      icon: "💰",
      desc: "Attirez l’abondance, la réussite et les opportunités financières rapidement."
    },
    {
      title: "Chance & Protection",
      icon: "🍀",
      desc: "Bénéficiez d’une protection spirituelle et d’une chance continue dans vos projets."
    },
    {
      title: "Harmonisation des relations",
      icon: "🤝",
      desc: "Rééquilibrez les liens familiaux, amicaux et professionnels grâce à des rituels ciblés."
    },
    {
      title: "Purification & Energie",
      icon: "🌿",
      desc: "Libérez les énergies négatives et boostez votre bien-être physique et spirituel."
    },
  ];

  return (
    <section id="rituels" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-[--pad]">
        <h2 className="font-display text-3xl sm:text-4xl mb-10 text-center font-bold text-emerald-500">Découvrez les rituels de Marabout Dagbe</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {rituels.map((rituel) => (
            <div key={rituel.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft hover:scale-105 transition-transform">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-brand-100 text-brand-700 text-xl mb-4">
                {rituel.icon}
              </div>
              <div className="text-lg font-semibold text-slate-800 mb-2">{rituel.title}</div>
              <p className="text-sm text-slate-600 mb-4">{rituel.desc}</p>
              <a 
                href="#contact" 
                className="inline-flex rounded-xl px-4 py-2 text-sm font-medium bg-brand-600 text-white hover:bg-brand-700 shadow-soft transition"
              >
                En savoir plus
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
