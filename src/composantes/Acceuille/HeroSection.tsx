"use client";

export default function HeroSection() {
  return (
    <section
      id="accueil"
      className="relative isolate" // <- pt-16 = hauteur du header
    >
      {/* Background image semi-transparent */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage: "url('/image/dagbe.jpg')",
          opacity: 0.7, // légère transparence
        }}
      />

      {/* Glow doré animé */}
      <div className="absolute inset-0 -z-10 animate-pulse-slow"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at top left, rgba(255,215,0,0.15), transparent 70%),
            radial-gradient(ellipse at bottom right, rgba(255,223,0,0.1), transparent 70%),
            var(--background-hero-gradient)
          `,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-[--pad] py-24 sm:py-28 lg:py-36 text-white">
        <div className="max-w-3xl">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6">
            Découvrez le pouvoir de <span className="text-amber-300 font-bold">la chance</span> et des <span className="text-yellow-400 font-bold">rituels puissants</span>
          </h1>
          <p className="text-white/90 text-lg sm:text-xl leading-relaxed mb-8">
            Marabout Dagbe, spécialiste des rituels de retour affectif, richesse et affaires de justice. Attirez la chance, l’amour et le succès grâce à ses rituels personnalisés et puissants.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#rituels"
              className="rounded-2xl px-5 py-3 font-medium bg-amber-400 text-emerald-900 hover:bg-amber-300 transition shadow-lg"
            >
              Découvrir les rituels
            </a>
            <a
              href="#temoignages"
              className="rounded-2xl px-5 py-3 font-medium border border-white/40 hover:bg-white/10"
            >
              Lire les témoignages
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
