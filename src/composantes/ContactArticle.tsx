"use client";

import { Mail, Phone, Clock, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function ContactArticle() {
    return (
        <div className="max-w-md mx-auto bg-gradient-to-br from-emerald-50 to-white rounded-2xl shadow-xl p-6 space-y-6 border border-emerald-100">
            <h2 className="text-3xl font-extrabold text-center text-emerald-700">
                Contact
            </h2>

            {/* Email */}
            <div className="flex items-center space-x-3">
                <Mail className="w-6 h-6 text-emerald-600" />
                <Link
                    href="mailto:professeurdagbe@gmail.com"
                    className="text-gray-700 font-medium hover:text-emerald-700 transition"
                >
                    professeurdagbe@gmail.com
                </Link>
            </div>

            {/* Téléphone */}
            <div className="flex items-center space-x-3">
                <Phone className="w-6 h-6 text-emerald-600" />
                <Link
                    href="tel:+2290152027185"
                    className="text-gray-700 font-medium hover:text-emerald-700 transition"
                >
                    +229 01 52 02 71 85
                </Link>
            </div>

            {/* WhatsApp */}
            <div className="flex items-center space-x-3">
                <MessageCircle className="w-6 h-6 text-emerald-600" />
                <Link
                    href="https://wa.me/22957936941"
                    target="_blank"
                    className="text-gray-700 font-medium hover:text-emerald-700 transition"
                >
                    WhatsApp : +229 57 93 69 41
                </Link>
            </div>

            {/* Disponibilité */}
            <div className="flex items-center space-x-3">
                <Clock className="w-6 h-6 text-emerald-600" />
                <p className="text-gray-600 italic">
                    Disponible <span className="font-semibold text-emerald-700">7j/7</span> — Réponse rapide garantie
                </p>
            </div>

            {/* Liens supplémentaires */}
            <div className="flex flex-wrap justify-center gap-3 pt-4">
                <Link
                    href="https://medium-puissant-dagbe.ghost.io/"
                    className="px-4 py-2 bg-emerald-600 text-white rounded-full text-sm font-medium shadow hover:bg-emerald-700 transition"
                >
                    Papa Dagbe
                </Link>
                <Link
                    href="https://puissant-medium-marabout-dagbe-229-0152.design.webflow.com"
                    className="px-4 py-2 bg-emerald-600 text-white rounded-full text-sm font-medium shadow hover:bg-emerald-700 transition"
                >
                    Medium Dagbe
                </Link>
                <Link
                    href="https://medium-marabout-dagbe.canalblog.com/"
                    className="px-4 py-2 bg-emerald-600 text-white rounded-full text-sm font-medium shadow hover:bg-emerald-700 transition"
                >
                    Marabout Dagbe
                </Link>
            </div>
        </div>
    );
}
