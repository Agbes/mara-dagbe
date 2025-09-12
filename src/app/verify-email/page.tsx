// /app/verify-email/page.tsx
import VerifyEmailPage from "@/composantes/VerifyEmailPage"
import { Suspense } from "react"

export default function VerifyEmail() {
  return (
    <Suspense fallback={<div>Chargement de la vérification...</div>}>
      <VerifyEmailPage />
    </Suspense>
  )
}
