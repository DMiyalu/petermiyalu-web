"use client";

import Image from "next/image";
import { useState } from "react";
import { filtresOeuvres, oeuvres, sousTitre, type Categorie, type Oeuvre } from "@/data/oeuvres";
import DetailModal, { type Detail } from "./DetailModal";
import TypoVisual from "./TypoVisual";

function versDetail(o: Oeuvre): Detail {
  return {
    eyebrow: sousTitre(o),
    titre: o.titre,
    texte: o.description,
    images: o.cover ? [o.cover, ...o.images] : [],
    alt: o.alt,
  };
}

function Carte({ oeuvre, feature, onOpen }: { oeuvre: Oeuvre; feature?: boolean; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      className={`group relative w-full overflow-hidden border-0 bg-[#111] p-0 text-left text-white ${
        feature ? "h-[330px] md:h-[390px]" : "h-[260px] md:h-[270px]"
      } after:absolute after:inset-0 after:bg-[linear-gradient(transparent_45%,#000b)] after:content-['']`}
    >
      {oeuvre.cover ? (
        <Image
          src={oeuvre.cover.src}
          alt={oeuvre.alt}
          fill
          sizes={feature ? "(max-width: 700px) 86vw, 56vw" : "(max-width: 700px) 86vw, 28vw"}
          className="object-cover transition-transform duration-[600ms] group-hover:scale-[1.04]"
        />
      ) : (
        <div className="absolute inset-0 transition-transform duration-[600ms] group-hover:scale-[1.04]">
          <TypoVisual texte={oeuvre.titre} />
        </div>
      )}
      <span className="absolute bottom-[18px] left-5 z-[1] pr-12 font-serif text-2xl leading-tight">
        {/* Sans image, le titre est déjà au centre du visuel typographique. */}
        {oeuvre.cover && oeuvre.titre}
        <small className="mt-1.5 block font-sans text-[10px] tracking-[.5px]">{sousTitre(oeuvre)}</small>
      </span>
      <b className="absolute right-[18px] bottom-5 z-[2] font-normal transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
        ↗
      </b>
    </button>
  );
}

export default function Oeuvres() {
  const [filtre, setFiltre] = useState<Categorie | "all">("all");
  const [ouverte, setOuverte] = useState<Detail | null>(null);

  const [vedette, ...autres] = oeuvres;
  const liste = filtre === "all" ? autres : oeuvres.filter((o) => o.categories.includes(filtre));

  return (
    <section id="oeuvres" className="bg-cream px-[7%] py-[55px] text-ink md:px-[8%] md:py-20">
      <div className="md:grid md:grid-cols-[1fr_2fr] md:gap-[30px]">
        <div>
          <span className="eyebrow">SÉLECTION</span>
          <h2 className="section-title mt-5">Œuvres</h2>
          <i className="my-[25px] block h-px w-[45px] bg-[#777]" />
          <p className="text-sm md:max-w-[230px]">
            Installations, vidéos d’art et films à la croisée des territoires, des mémoires et des mouvements
            contemporains.
          </p>
          <a className="textlink" href="#expositions">
            VOIR LES EXPOSITIONS <b>→</b>
          </a>
        </div>
        <div className="mt-[30px] md:mt-0">
          <Carte oeuvre={vedette} feature onOpen={() => setOuverte(versDetail(vedette))} />
        </div>
      </div>

      <div
        role="group"
        aria-label="Filtrer les œuvres"
        className="mt-10 mb-[30px] flex flex-wrap gap-0 md:mt-[50px] md:gap-2.5"
      >
        {filtresOeuvres.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={filtre === f.id}
            onClick={() => setFiltre(f.id)}
            className={`border-0 px-3 py-2.5 text-xs transition-colors md:px-[18px] md:py-3 ${
              filtre === f.id ? "bg-ink text-cream" : "bg-transparent text-inherit hover:bg-[#0b0c0b14]"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {liste.map((o) => (
          <Carte key={o.slug} oeuvre={o} onOpen={() => setOuverte(versDetail(o))} />
        ))}
      </div>

      <DetailModal detail={ouverte} onClose={() => setOuverte(null)} />
    </section>
  );
}
