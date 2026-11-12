"use client";

import { useEffect, useState } from "react";

/** Section à partir de laquelle le bouton apparaît (3e section : Expositions). */
const SECTION_DECLENCHEUR = "expositions";

/** Bouton flottant « Retour en haut » (flèche vers le haut). */
export default function RetourEnHaut() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const cible = document.getElementById(SECTION_DECLENCHEUR);
    if (!cible) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      // Visible dès que le haut de la 3e section atteint le milieu de l'écran.
      frame = requestAnimationFrame(() =>
        setVisible(cible.getBoundingClientRect().top <= window.innerHeight / 2),
      );
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <a
      href="#accueil"
      aria-label="Retour en haut"
      title="Retour en haut"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`fixed right-5 bottom-5 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-[#f3eee559] bg-[#080909e6] text-cream backdrop-blur-sm transition-[opacity,transform,background-color] duration-300 hover:bg-cream hover:text-ink md:right-8 md:bottom-8 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}
