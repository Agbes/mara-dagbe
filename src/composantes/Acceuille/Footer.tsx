import Link from "next/link";
import { navLinks, actions } from "@/config/navigation";
import { Facebook, Instagram, Youtube, Phone, Mail, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-slate-200 bg-gradient-to-b from-white/90 to-amber-50/60 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Logo + description */}
          <div>
            <Link href="#accueil" className="flex items-center gap-2">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-lg">
                🧘‍♂️
              </span>
              <span className="font-display text-lg tracking-wide font-bold text-emerald-600">
                Marabout Dagbe
              </span>
            </Link>
            <p className="mt-4 text-sm text-slate-700 leading-relaxed">
              Maître marabout reconnu, spécialiste des rituels de retour affectif,
              protection spirituelle, prospérité et réussite.  
              "Là où la chance manque, un rituel peut ouvrir la voie."
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-600 hover:text-amber-600 transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
              Services rapides
            </h3>
            <div className="mt-4 flex flex-col gap-3">
              {actions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className={`${action.className} hover:shadow-md`}
                >
                  {action.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact + réseaux */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
              Contact & Réseaux
            </h3>
            <ul className="mt-4 space-y-3 text-slate-600 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-amber-600" />
                <a href="tel:+22960000000">+229 60 00 00 00</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-amber-600" />
                <a href="mailto:contact@maraboutdagbe.com">
                  contact@maraboutdagbe.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle size={16} className="text-amber-600" />
                <a href="https://wa.me/22960000000" target="_blank">
                  WhatsApp Direct
                </a>
              </li>
            </ul>

            <div className="mt-5 flex gap-4">
              <Link href="#" aria-label="Facebook">
                <Facebook className="h-5 w-5 text-slate-500 hover:text-amber-600" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <Instagram className="h-5 w-5 text-slate-500 hover:text-amber-600" />
              </Link>
              <Link href="#" aria-label="YouTube">
                <Youtube className="h-5 w-5 text-slate-500 hover:text-amber-600" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bas du footer */}
        <div className="mt-12 border-t border-slate-200 pt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Marabout Dagbe. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
