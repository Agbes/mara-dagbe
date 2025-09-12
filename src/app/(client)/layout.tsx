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
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
