"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Img } from "@/data/images";
import { contact } from "@/data/actualites";
import TypoVisual from "./TypoVisual";

export type Detail = {
  eyebrow: string;
  titre: string;
  texte: string | null;
  images: Img[];
  alt: string;
};

/** Fenêtre modale (croix ×) avec carrousel, reprise du <dialog> du site d’origine. */
export default function DetailModal({ detail, onClose }: { detail: Detail | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const [shown, setShown] = useState<Detail | null>(null);

  // Réinitialise le carrousel à chaque nouvelle ouverture.
  if (detail !== shown) {
    setShown(detail);
    setIndex(0);
  }

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (detail && !dialog.open) dialog.showModal();
    if (!detail && dialog.open) dialog.close();
  }, [detail]);

  const count = detail?.images.length ?? 0;
  const go = (delta: number) => count > 1 && setIndex((i) => (i + delta + count) % count);
  const current = detail?.images[index];

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
      aria-labelledby="detail-title"
      className="m-auto max-h-[92vh] w-[90%] max-w-[850px] overflow-y-auto border-0 bg-cream p-0 text-[#111]"
    >
      {detail && (
        <>
          <div className="relative h-[240px] bg-[#111] md:h-[350px]">
            {current ? (
              <Image
                key={current.src}
                src={current.src}
                alt={`${detail.alt}${count > 1 ? `, image ${index + 1} sur ${count}` : ""}`}
                fill
                sizes="(max-width: 900px) 90vw, 850px"
                className="object-cover"
              />
            ) : (
              <TypoVisual texte={detail.titre} sousTitre={detail.eyebrow} />
            )}
            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Image précédente"
                  className="absolute top-1/2 left-3 h-10 w-10 -translate-y-1/2 border-0 bg-[#111a] text-xl text-white transition-colors hover:bg-[#111]"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Image suivante"
                  className="absolute top-1/2 right-3 h-10 w-10 -translate-y-1/2 border-0 bg-[#111a] text-xl text-white transition-colors hover:bg-[#111]"
                >
                  ›
                </button>
                <span className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-[#111a] px-3 py-1 text-[10px] tracking-[2px] text-white">
                  {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                </span>
              </>
            )}
          </div>
          <div className="p-[25px] md:p-10">
            <span className="eyebrow uppercase">{detail.eyebrow}</span>
            <h2 id="detail-title" className="section-title mt-[15px]">
              {detail.titre}
            </h2>
            {detail.texte?.split("\n\n").map((p, i) => (
              <p key={i} className="mb-4">
                {p}
              </p>
            ))}
            <a className="textlink" href={`mailto:${contact.email}`}>
              DEMANDER UNE PROJECTION →
            </a>
          </div>
        </>
      )}
      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer"
        className="absolute top-3 right-3 h-10 w-10 border-0 bg-[#111] text-[26px] leading-none text-white"
      >
        ×
      </button>
    </dialog>
  );
}
