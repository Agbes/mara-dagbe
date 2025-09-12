// /app/login/page.tsx
import { Suspense } from "react"
import LoginFormWrapper from "@/components/LoginFormWrapper"

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <LoginFormWrapper />
    </Suspense>
  )
}
