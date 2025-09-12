"use client";

export default function PlanningSection() {
  const days = [
    { day: "Lundi", schedule: "Consultation et rituels d’amour" },
    { day: "Mardi", schedule: "Rituel de chance et protection" },
    { day: "Mercredi", schedule: "Rituel de richesse et prospérité" },
    { day: "Jeudi", schedule: "Affaires de justice et protections légales" },
    { day: "Vendredi", schedule: "Retour affectif rapide" },
    { day: "Samedi", schedule: "Séances personnalisées selon votre besoin" },
  ];

  return (
    <section id="planning" className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-[--pad]">
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-6 mb-12">
          <h2 className="font-display text-3xl sm:text-4xl text-slate-900 text-center md:text-left">
            Planning hebdomadaire des rituels
          </h2>
          <a 
            href="#contact" 
            className="rounded-2xl px-6 py-3 text-sm font-semibold bg-brand-600 text-white hover:bg-brand-700 shadow-lg transition"
          >
            Contactez Marabout Dagbe
          </a>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
          {days.map((d) => (
            <div 
              key={d.day} 
              className="p-6 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition hover:-translate-y-1 text-center"
            >
              <div className="text-xl font-bold text-brand-700 mb-2">{d.day}</div>
              <p className="text-sm text-slate-600">{d.schedule}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-slate-500">
          Chaque rituel est personnalisé selon vos besoins pour garantir les meilleurs résultats.
        </p>
      </div>
    </section>
  );
}
