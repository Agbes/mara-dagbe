// /app/verify-email/page.tsx
import { Suspense } from "react"
import VerifyEmailPage from "@/components/VerifyEmailPage"

export default function VerifyEmail() {
  return (
    <Suspense fallback={<div>Chargement de la vérification...</div>}>
      <VerifyEmailPage />
    </Suspense>
  )
}
