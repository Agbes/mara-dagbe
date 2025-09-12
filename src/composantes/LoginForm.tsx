"use client";

import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Lock, User } from "lucide-react";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const successParam = searchParams.get("success");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(!!successParam); // succès après confirmation email

  // 🔹 Auto-disparition du message succès après 5s
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (res?.error) {
      setError(res.error); // affiche l’erreur renvoyée par authorize()
    } else {
      router.push("/admin"); // connexion réussie
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-6"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Connexion – <span className="text-red-600">Médium Ali Moussa</span>
      </h2>

      {/* ✅ Message succès avec fade */}
      {showSuccess && (
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm text-center transition-opacity duration-1000 opacity-100">
          Votre compte a été confirmé avec succès 🎉 Connectez-vous maintenant.
        </div>
      )}

      {/* ❌ Message d’erreur */}
      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm text-center transition-opacity duration-500">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div className="relative">
          <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="email"
            name="email"
            required
            placeholder="Adresse e-mail"
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="password"
            name="password"
            required
            placeholder="Mot de passe"
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition disabled:opacity-70"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin w-5 h-5" /> Connexion...
          </>
        ) : (
          "Se connecter"
        )}
      </button>

      {/* 🔹 Lien vers l’inscription */}
      <p className="text-center text-sm text-gray-600">
        Pas encore de compte ?{" "}
        <Link href="/register" className="text-red-600 hover:underline font-medium">
          Inscrivez-vous
        </Link>
      </p>
    </form>
  );
}
