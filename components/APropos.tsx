import Image from "next/image";
import { biographie, reperes } from "@/data/biographie";
import { demarche } from "@/data/demarche";
import { portraits } from "@/data/images";

const altsGalerie = [
  "Portrait de Peter Miyalu, bras croisés, fond gris",
  "Portrait en noir et blanc de Peter Miyalu, assis",
  "Portrait en noir et blanc de Peter Miyalu, souriant",
  "Portrait de Peter Miyalu, bras croisés, fond vert",
  "Portrait de Peter Miyalu en pull clair, souriant",
];

export default function APropos() {
  const [principal, ...galerie] = portraits;

  return (
    <section
      id="apropos"
      className="grid grid-cols-1 px-[7%] py-[55px] md:grid-cols-[1fr_1.2fr] md:items-start md:gap-[8%] md:px-[8%] md:py-20"
    >
      <div className="md:sticky md:top-24">
        {principal && (
          <div className="relative h-[430px] w-full md:h-[590px]">
            <Image
              src={principal.src}
              alt={altsGalerie[0]}
              fill
              sizes="(max-width: 700px) 86vw, 38vw"
              className="object-cover object-top"
            />
          </div>
        )}
        {galerie.length > 0 && (
          <ul className="mt-3 grid grid-cols-4 gap-3" aria-label="Autres portraits">
            {galerie.map((p, i) => (
              <li key={p.src} className="group relative aspect-[3/4] overflow-hidden">
                <Image
                  src={p.src}
                  alt={altsGalerie[i + 1] ?? "Portrait de Peter Miyalu"}
                  fill
                  sizes="(max-width: 700px) 20vw, 9vw"
                  className="object-cover object-top transition-transform duration-[600ms] group-hover:scale-[1.04]"
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-[35px] md:mt-0">
        <span className="eyebrow">PARCOURS & DÉMARCHE</span>
        <h2 className="section-title mt-[25px]">À propos</h2>
        <div className="max-w-[560px] text-sm">
          {biographie.map((p, i) => (
            <p key={i} className="mb-4">
              {p}
            </p>
          ))}
        </div>

        <div className="mt-[30px] flex justify-between gap-[15px] md:mt-[55px]">
          {reperes.map((r) => (
            <p key={r.lieu} className="font-serif text-base md:text-[19px]">
              {r.lieu}
              <small className="mt-[7px] block font-sans text-[10px] tracking-[.5px] text-[#aaa]">{r.label}</small>
            </p>
          ))}
        </div>

        <div className="mt-[45px] border-t border-[#292929] pt-[45px]">
          <span className="eyebrow">DÉMARCHE ARTISTIQUE</span>
          <h3 className="mt-5 mb-6 font-serif text-[clamp(28px,3vw,40px)] leading-[1.1] font-normal">
            Démarche artistique
          </h3>
          <div className="max-w-[560px] text-sm">
            {demarche.map((p, i) => (
              <p key={i} className="mb-4">
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
