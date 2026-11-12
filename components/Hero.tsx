import Image from "next/image";
import { portraits } from "@/data/images";

// portrait-01 (Photo portrait/IMG_8889).
const heroImage = portraits[0] ?? null;

export default function Hero() {
  return (
    <section
      id="accueil"
      className="relative h-screen max-h-[1050px] min-h-[660px] overflow-hidden md:min-h-[650px]"
    >
      {heroImage && (
        // Mobile : image décalée vers la droite pour dégager le visage du titre.
        <div className="absolute inset-y-0 left-[10%] -right-[10%] md:inset-x-0">
          <Image
            src={heroImage.src}
            alt="Portrait de Peter Miyalu"
            fill
            preload
            sizes="(min-width: 768px) 100vw, 120vw"
            className="object-cover object-[0%_top] md:object-[center_12%]"
          />
        </div>
      )}
      {/* Portrait sombre : voile à gauche pour garder le titre lisible. */}
      <div className="absolute inset-0 bg-[linear-gradient(0deg,#0008,transparent_60%),linear-gradient(90deg,#0009,transparent_55%)]" />

      <div className="absolute top-[16%] left-[7%] text-cream md:top-[13%] md:left-[8%]">
        <h1 className="mb-4 text-[clamp(65px,8.5vw,130px)] leading-[.94] font-light tracking-[-3px] md:tracking-[-5px]">
          PETER
          <br />
          MIYALU
        </h1>
        <p className="text-[11px] leading-[1.4] tracking-[4px] text-cream md:text-[15px]">
          ARTISTE VISUEL
          <br />& CINÉASTE
        </p>
      </div>

      <div className="absolute right-[8%] bottom-[7%] left-[8%] flex items-center justify-between">
        <p className="text-[15px]">
          Images
          <br />
          Mouvements
          <br />
          Territoires
          <br />
          <br />
          <small className="block text-[11px] tracking-[.5px]">
            Kinshasa
            <br />
            Québec
            <br />
            Worldwide
          </small>
        </p>
        <a href="#oeuvres" className="group text-center text-[10px] leading-[1.5] tracking-[2px]">
          <span className="mx-auto mb-[15px] flex h-[60px] w-[60px] items-center justify-center rounded-full border text-2xl transition-transform duration-500 group-hover:translate-y-1">
            ↓
          </span>
          DÉCOUVRIR
          <br />
          SON UNIVERS
        </a>
      </div>
    </section>
  );
}
