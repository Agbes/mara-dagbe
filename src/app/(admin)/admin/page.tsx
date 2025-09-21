"use client";

import { useState, useEffect } from "react";

export default function AdminDashboard() {
    const [sitemapCount, setSitemapCount] = useState<number | null>(null);

    useEffect(() => {
        async function fetchSitemapCount() {
            try {
                const res = await fetch("/api/sitemap-count");
                const data = await res.json();
                setSitemapCount(data.count);
            } catch (err) {
                console.error("Erreur en récupérant le sitemap:", err);
            }
        }

        fetchSitemapCount();
    }, []);

    return (
        <main className="flex-1 p-3 overflow-y-auto">
            <h2 className="text-3xl font-bold mb-6">Bienvenue Marabout Dagbe ✨</h2>
            <p className="text-lg text-gray-600 mb-8">
                Depuis cet espace, vous avez le contrôle total de votre site :
                gérez vos témoignages, vos articles, vos pages, vos consultations et vos
                messages. Utilisez le menu à gauche pour naviguer facilement.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Exemple : Sitemap */}
                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h3 className="text-xl font-bold mb-2">🗺️ Sitemap URLs</h3>
                    <p className="text-gray-600">
                        {sitemapCount !== null
                            ? `${sitemapCount} URLs`
                            : "Chargement..."}
                    </p>
                </div>
                {/* Messages */}
                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h3 className="text-xl font-bold mb-2">📩 Messages reçus</h3>
                    <p className="text-gray-600">12 nouveaux messages</p>
                </div>

                {/* Témoignages */}
                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h3 className="text-xl font-bold mb-2">⭐ Témoignages</h3>
                    <p className="text-gray-600">8 publiés</p>
                </div>

                {/* Articles */}
                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h3 className="text-xl font-bold mb-2">📝 Articles</h3>
                    <p className="text-gray-600">5 en ligne</p>
                </div>

                {/* Google Analytics */}
                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h3 className="text-xl font-bold mb-2">📊 Google Analytics</h3>
                    <p className="text-gray-600">3.2k visites ce mois</p>
                </div>

                {/* Google Search Console */}
                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h3 className="text-xl font-bold mb-2">🔍 Google Search Console</h3>
                    <p className="text-gray-600">450 clics organiques</p>
                </div>

                {/* Tags */}
                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h3 className="text-xl font-bold mb-2">🏷️ Tags</h3>
                    <p className="text-gray-600">14 tags actifs</p>
                </div>

                {/* Catégories */}
                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h3 className="text-xl font-bold mb-2">📂 Catégories</h3>
                    <p className="text-gray-600">6 catégories</p>
                </div>

                {/* Performance globale */}
                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h3 className="text-xl font-bold mb-2">⚡ Performance</h3>
                    <p className="text-gray-600">Score moyen : 92%</p>
                </div>
            </div>

        </main>
    );
}
