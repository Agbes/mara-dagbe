import Link from "next/link";
import { navLinks } from "@/config/navigation";
import { Facebook, Instagram, Youtube, Phone, Mail, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-24 bg-slate-50 border-t border-slate-200">
      {/* Bouton WhatsApp flottant avec texte et ondes */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col sm:flex-row items-center sm:items-end gap-2 sm:gap-3">
        <span className="hidden sm:block animate-bounce bg-emerald-700 text-white text-xs sm:text-sm px-3 py-2 rounded-2xl shadow-md text-center leading-snug">
          Contacter Marabout Dagbe
        </span>

        <Link
          href="https://wa.me/2290152027185"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ouvrir WhatsApp"
          className="group relative block"
        >
          {/* Ondes (ripple) */}
          <span
            className="pointer-events-none absolute inset-0 -m-2 rounded-full bg-green-500/30 animate-ping"
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute inset-0 -m-4 rounded-full bg-green-500/20 animate-ping"
            style={{ animationDelay: "0.9s" }}
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute inset-0 -m-6 rounded-full ring-2 ring-green-400/30 animate-ping"
            style={{ animationDelay: "1.8s" }}
            aria-hidden="true"
          />

          {/* Bouton principal */}
          <span className="relative inline-flex items-center justify-center bg-green-500 text-white p-4 rounded-full shadow-lg transition-transform duration-200 hover:scale-105 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-400/50">
            <MessageCircle className="w-6 h-6" />
            <span className="sr-only">Contacter sur WhatsApp</span>
          </span>
        </Link>
      </div>

      {/* Contenu du footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-4 gap-8">
        {/* Bloc présentation */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow">
              🧘‍♂️
            </span>
            <span className="font-extrabold text-lg text-emerald-700">Marabout Dagbe</span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            Maître marabout reconnu, spécialiste des rituels de retour affectif,
            de protection spirituelle, de chance et de prospérité.  
            <span className="block mt-1 italic text-slate-500">
              "Là où la chance manque, un rituel peut ouvrir la voie."
            </span>
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-semibold mb-3 text-slate-900">Navigation</h4>
          <ul className="space-y-2 text-slate-700">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link className="hover:text-emerald-600" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Infos légales */}
        <div>
          <h4 className="font-semibold mb-3 text-slate-900">Informations</h4>
          <ul className="space-y-2 text-slate-700">
            <li>
              <Link href="/" className="hover:text-emerald-600">
                Mentions légales
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-emerald-600">
                Politique de confidentialité
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-emerald-600">
                Conditions d’utilisation
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-3 text-slate-900">Contact</h4>
          <ul className="space-y-2 text-slate-700">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-600" />
              <Link href="mailto:professeurdagbe@gmail.com" className="hover:text-emerald-600">
                professeurdagbe@gmail.com
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-600" />
              <Link href="tel:+2290152027185" className="hover:text-emerald-600">
                +2290152027185
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <Link href="https://wa.me/2290152027185" target="_blank" className="hover:text-emerald-600">
                WhatsApp Direct
              </Link>
            </li>
          </ul>

          {/* Réseaux sociaux */}
          <div className="mt-5 flex gap-4">
            <Link href="#" aria-label="Facebook">
              <Facebook className="h-5 w-5 text-slate-500 hover:text-emerald-600" />
            </Link>
            <Link href="#" aria-label="Instagram">
              <Instagram className="h-5 w-5 text-slate-500 hover:text-emerald-600" />
            </Link>
            <Link href="#" aria-label="YouTube">
              <Youtube className="h-5 w-5 text-slate-500 hover:text-emerald-600" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bas du footer */}
      <div className="text-center text-slate-500 text-sm pb-8">
        © {new Date().getFullYear()} Marabout Dagbe — Rituels traditionnels et accompagnement spirituel.
      </div>
    </footer>
  );
}
