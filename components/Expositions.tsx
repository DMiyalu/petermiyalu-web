"use client";

import Image from "next/image";
import { useState } from "react";
import { expositions, filtresExpositions, libelleType, type Exposition } from "@/data/expositions";
import DetailModal, { type Detail } from "./DetailModal";
import TypoVisual from "./TypoVisual";

type Filtre = (typeof filtresExpositions)[number]["id"];

const correspond = (e: Exposition, f: Filtre) =>
  f === "all" || (f === "exposition" ? e.type === "exposition" : e.type !== "exposition");

const repere = (e: Exposition) => [e.annee, e.lieu, libelleType[e.type]].filter(Boolean).join(" · ");

function versDetail(e: Exposition): Detail {
  return {
    eyebrow: repere(e),
    titre: e.titre,
    texte: e.detail,
    images: e.image ? [e.image] : [],
    alt: e.titre,
  };
}

export default function Expositions() {
  const [filtre, setFiltre] = useState<Filtre>("all");
  const [ouverte, setOuverte] = useState<Detail | null>(null);

  return (
    <section id="expositions" className="px-[7%] py-[55px] md:px-[8%] md:py-20">
      <div className="flex flex-col items-start gap-0 md:flex-row md:items-center md:justify-between md:gap-[25px]">
        <h2 className="section-title">Expositions</h2>
        <p className="mb-6 text-[13px] md:mb-[28px]">
          Expositions, festivals et projections
          <br className="hidden md:block" /> à travers le monde.
        </p>
      </div>

      <div role="group" aria-label="Filtrer les expositions" className="mb-[30px] flex flex-wrap gap-0 md:gap-2.5">
        {filtresExpositions.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={filtre === f.id}
            onClick={() => setFiltre(f.id)}
            className={`border-0 px-3 py-2.5 text-xs transition-colors md:px-[18px] md:py-3 ${
              filtre === f.id ? "bg-cream text-[#111]" : "bg-transparent text-inherit hover:bg-[#f3eee51a]"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <ul>
        {expositions.map((e) => (
          <li key={`${e.annee}-${e.titre}`} hidden={!correspond(e, filtre)}>
            <button
              type="button"
              aria-haspopup="dialog"
              onClick={() => setOuverte(versDetail(e))}
              className="group flex w-full items-center gap-[18px] border-0 border-b border-[#383838] bg-transparent py-4 text-left text-inherit md:gap-10"
            >
              <span className="relative block h-[100px] w-[40%] shrink-0 overflow-hidden md:h-[150px] md:w-[35%]">
                {e.image ? (
                  <Image
                    src={e.image.src}
                    alt={`${e.titre}, visuel de l’œuvre présentée`}
                    fill
                    sizes="(max-width: 700px) 40vw, 30vw"
                    className="object-cover transition-transform duration-[600ms] group-hover:scale-[1.04]"
                  />
                ) : (
                  <TypoVisual texte={e.annee} label={e.titre} petit />
                )}
              </span>
              <span className="min-w-0 font-serif text-[21px] leading-tight md:text-[30px]">
                {e.titre}
                <small className="mt-3.5 block font-sans text-[11px] tracking-[.5px] text-[#aaa]">{repere(e)}</small>
                {e.detail && (
                  <small className="mt-1.5 hidden font-sans text-[12px] tracking-[.3px] md:block">{e.detail}</small>
                )}
              </span>
              <b className="mr-[15px] ml-auto text-2xl font-normal transition-transform duration-300 group-hover:rotate-90">
                +
              </b>
            </button>
          </li>
        ))}
      </ul>

      <DetailModal detail={ouverte} onClose={() => setOuverte(null)} />
    </section>
  );
}
