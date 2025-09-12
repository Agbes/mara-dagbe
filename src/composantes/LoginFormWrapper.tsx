"use client";

import LoginForm from "./LoginForm";

export default function LoginFormWrapper() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-100 px-4">
      <div className="text-center absolute top-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Bienvenue chez <span className="text-red-600">Médium Ali Moussa</span>
        </h1>
        <p className="mt-2 text-gray-600">
          Connectez-vous pour accéder à votre espace sécurisé
        </p>
      </div>

      <LoginForm />
    </section>
  );
}
