import Header from "@/composantes/Acceuille/Header";
import Footer from "@/composantes/Acceuille/Footer";
import HeroSection from "@/composantes/Acceuille/HeroSection";
import RituelsSection from "@/composantes/Acceuille/RituelsSection";
import PlanningSection from "@/composantes/Acceuille/PlanningSection";
import TarifsSection from "@/composantes/Acceuille/TarifsSection";
import TemoignagesSection from "@/composantes/Acceuille/TemoignagesSection";
import ReservationSection from "@/composantes/Acceuille/ReservationSection";
import DerniersRituelsSection from "@/composantes/Acceuille/DerniersRituelsSection";
import { ArticleDTO } from "../../types/articles-type";
import { getLastRituels } from "@/lib/getArticles";
import ContactArticle from "@/composantes/ContactArticle";


export const revalidate = 60;


export default async function Home() {
  const derniersRituels: ArticleDTO[] = await getLastRituels();

  return (
    <>
      <div className="hidden sm:block bg-brand-800 text-white text-sm py-2 text-center">
        Guidance spirituelle avec Dagbé — <span className="font-semibold">profitez d’une séance d’essai gratuite</span> 🌙
      </div>
      <Header />
      <HeroSection />
      <RituelsSection />
      <DerniersRituelsSection rituels={derniersRituels} /> {/* ⚡ props côté serveur */}
      <PlanningSection />
      <TarifsSection />
      <TemoignagesSection />
      <ReservationSection />
      <ContactArticle />

      <Footer />
    </>
  );
}
