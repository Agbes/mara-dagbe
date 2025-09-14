"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { navLinks, actions } from "@/config/navigation";

export default function Header() {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2"
            onClick={handleClose}
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-brand-600 text-white shadow">
              🧘‍♂️
            </span>
            <span className="font-display text-lg tracking-wide whitespace-nowrap font-bold text-emerald-500">
              Marabout Dagbe
            </span>
          </Link>

          {/* Menu desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-bold text-emerald-500 hover:text-brand-700 whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions desktop */}
          <div className="hidden md:flex items-center gap-3">
            {actions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className={action.className}
              >
                {action.label}
              </Link>
            ))}
          </div>

          {/* Burger */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Ouvrir le menu"
            className="md:hidden inline-flex items-center justify-center rounded-xl border border-slate-300 p-2"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 py-4 grid gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-2"
                onClick={handleClose}
              >
                {link.label}
              </Link>
            ))}

            {actions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className={action.className}
                onClick={handleClose}
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
