import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Oeuvres from "@/components/Oeuvres";
import Expositions from "@/components/Expositions";
import APropos from "@/components/APropos";
import Actualites from "@/components/Actualites";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import RetourEnHaut from "@/components/RetourEnHaut";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Oeuvres />
        <Expositions />
        <APropos />
        <Actualites />
        <Contact />
      </main>
      <Footer />
      <RetourEnHaut />
    </>
  );
}
