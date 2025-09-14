"use client";

import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  // ⚠️ SessionProvider doit absolument être rendu dans un composant marqué "use client"
  return <SessionProvider>{children}</SessionProvider>;
}
