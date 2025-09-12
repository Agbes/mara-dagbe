"use client";

export default function TemoignagesSection() {
const testimonials = [
  {
    text: "Grâce aux rituels puissants de Marabout Dagbe, j'ai retrouvé l'amour perdu en moins d'un mois. Son accompagnement est sérieux et efficace ! Chaque rituel est expliqué avec soin et j'ai senti l'énergie positive immédiatement.",
    author: "Fatou, 32 ans",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    domain: "Retour Affectif",
  },
  {
    text: "Marabout Dagbe m'a aidé à gagner mon procès grâce à ses rituels de justice. Je recommande ses services à tous ceux qui cherchent protection et succès. Ses méthodes sont précises, et j'ai ressenti une force et une sérénité qui m'ont permis de traverser cette période difficile.",
    author: "Ali, 40 ans",
    photo: "https://randomuser.me/api/portraits/men/45.jpg",
    domain: "Affaires de Justice",
  },
  {
    text: "Mon entreprise prospère et ma chance financière a changé grâce aux rituels de richesse et prospérité de Marabout Dagbe. Une expérience incroyable ! Son approche spirituelle m'a apporté confiance et courage pour prendre les bonnes décisions.",
    author: "Clara, 28 ans",
    photo: "https://randomuser.me/api/portraits/women/12.jpg",
    domain: "Richesse & Chance",
  },
  {
    text: "J'ai senti une protection immédiate sur ma vie grâce aux rituels de protection et chance. Marabout Dagbe est un vrai maître dans son domaine. Ses conseils m'ont permis de me sentir en sécurité et de développer une attitude positive face aux obstacles.",
    author: "Samuel, 35 ans",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    domain: "Chance & Protection",
  },
  {
    text: "Après avoir consulté Marabout Dagbe pour un rituel de retour affectif, j'ai retrouvé une connexion profonde avec mon partenaire. Chaque étape du rituel a été expliquée et ressentie avec intensité. Je recommande vivement son expertise.",
    author: "Amina, 29 ans",
    photo: "https://randomuser.me/api/portraits/women/25.jpg",
    domain: "Retour Affectif",
  },
  {
    text: "Grâce aux rituels puissants de justice de Marabout Dagbe, mon différend professionnel a été résolu rapidement et équitablement. Je n'avais jamais cru aux rituels auparavant, mais son professionnalisme m'a convaincu.",
    author: "Kouadio, 38 ans",
    photo: "https://randomuser.me/api/portraits/men/55.jpg",
    domain: "Affaires de Justice",
  },
  {
    text: "Les rituels de prospérité de Marabout Dagbe ont transformé ma vie financière. J'ai obtenu des opportunités inattendues et une clarté dans mes décisions. Son accompagnement spirituel est exceptionnel et authentique.",
    author: "Sophie, 34 ans",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    domain: "Richesse & Chance",
  },
  {
    text: "Marabout Dagbe m'a protégé des influences négatives dans ma vie personnelle et professionnelle. J'ai ressenti une sérénité et une force intérieure que je n'avais jamais connues. Les rituels sont puissants et efficaces.",
    author: "Jean, 42 ans",
    photo: "https://randomuser.me/api/portraits/men/60.jpg",
    domain: "Chance & Protection",
  },
];


  return (
    <section
      id="temoignages"
      className="relative py-20 bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100 overflow-hidden"
    >
      {/* Fond animé doré */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_30%,_rgba(255,223,0,0.15),_transparent_70%),radial-gradient(circle_at_70%_70%,_rgba(255,215,0,0.15),_transparent_70%)] animate-pulse-slow"></div>

      <div className="max-w-7xl mx-auto px-[--pad] relative">
        <h2 className="font-display text-3xl sm:text-4xl mb-12 text-center text-amber-900 drop-shadow-lg">
          Ils témoignent de l'efficacité de Marabout Dagbe
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((t, i) => (
            <figure
              key={i}
              className="relative rounded-3xl border border-amber-200 bg-white p-6 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group"
            >
              {/* Lueur dorée subtile */}
              <div className="absolute inset-0 bg-gradient-to-tr from-yellow-300/20 via-yellow-400/10 to-transparent opacity-0 group-hover:opacity-50 transition-all duration-500 pointer-events-none rounded-3xl"></div>

              <div className="flex items-center gap-4 mb-4 relative z-10">
                <img
                  src={t.photo}
                  alt={t.author}
                  className="w-12 h-12 rounded-full object-cover border-2 border-amber-300 shadow-inner"
                />
                <div>
                  <h3 className="font-semibold text-lg text-amber-700">{t.author}</h3>
                  <p className="text-sm text-amber-500">{t.domain}</p>
                </div>
              </div>
              <blockquote className="text-slate-700 italic relative z-10">
                "{t.text}"
              </blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
