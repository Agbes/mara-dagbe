
import Header from "@/composantes/Acceuille/Header";
import Footer from "@/composantes/Acceuille/Footer";
import HeroSection from "@/composantes/Acceuille/HeroSection";
import RituelsSection from "@/composantes/Acceuille/RituelsSection";
import PlanningSection from "@/composantes/Acceuille/PlanningSection";
import TarifsSection from "@/composantes/Acceuille/TarifsSection";
import TemoignagesSection from "@/composantes/Acceuille/TemoignagesSection";
import ReservationSection from "@/composantes/Acceuille/ReservationSection";

export default function Home() {
  return (
    <>
        <div className="hidden sm:block bg-brand-800 text-white text-sm py-2 text-center">
      Séance d’essai offerte — <span className="font-semibold">réservez aujourd’hui</span> ✨
    </div>
      <Header />
      <HeroSection />
      <RituelsSection />
      <PlanningSection />
      <TarifsSection />
      <TemoignagesSection />
      <ReservationSection />
      <Footer />
    </>
  );
}
