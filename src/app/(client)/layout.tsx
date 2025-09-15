import Footer from "@/composantes/Acceuille/Footer";
import Header from "@/composantes/Acceuille/Header";



export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="fixed inset-x-0 top-0 h-[220px] -z-10 blob"></div>
      <div className="hidden sm:block bg-brand-800 text-white text-sm py-2 text-center">
        Guidance spirituelle avec Dagbé — <span className="font-semibold">profitez d’une séance d’essai gratuite</span> 🌙
      </div>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
