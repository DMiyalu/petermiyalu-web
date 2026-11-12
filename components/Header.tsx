"use client";

import { useEffect, useRef, useState } from "react";

export const navigation = [
  { href: "#accueil", label: "Accueil" },
  { href: "#oeuvres", label: "Œuvres" },
  { href: "#expositions", label: "Expositions" },
  { href: "#apropos", label: "À propos" },
  { href: "#actualites", label: "Actualités" },
  { href: "#contact", label: "Contact" },
];

/** Écart minimal de défilement (px) avant de masquer ou réafficher le header. */
const SEUIL = 6;

export default function Header() {
  const [open, setOpen] = useState(false);
  const [cache, setCache] = useState(false);
  const [enHaut, setEnHaut] = useState(true);
  const dernierY = useRef(0);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - dernierY.current;
        setEnHaut(y < 80);
        if (y < 80) setCache(false);
        else if (delta > SEUIL) setCache(true); // on descend : on masque
        else if (delta < -SEUIL) setCache(false); // on remonte : on réaffiche
        if (Math.abs(delta) > SEUIL) dernierY.current = y;
      });
    };
    dernierY.current = window.scrollY;
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Le menu mobile ouvert garde le header visible.
  const masque = cache && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-20 flex h-[65px] items-center gap-[30px] px-[5%] transition-[transform,background-color] duration-300 md:h-[78px] ${
        masque ? "-translate-y-full" : "translate-y-0"
      } ${
        enHaut
          ? "bg-[#080909aa] md:bg-transparent md:bg-[linear-gradient(#0007,transparent)]"
          : "bg-[#080909e6] backdrop-blur-sm"
      }`}
    >
      <a href="#accueil" className="text-xs tracking-[1px]">
        PETER MIYALU
      </a>
      <button
        type="button"
        className="ml-auto border-0 bg-transparent text-2xl text-white md:hidden"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={open}
        aria-controls="menu-principal"
        onClick={() => setOpen((v) => !v)}
      >
        ☰
      </button>
      <nav
        id="menu-principal"
        className={`${open ? "flex" : "hidden"} absolute inset-x-0 top-[65px] flex-col gap-[28px] bg-[#111] p-[25px] text-xs md:static md:ml-auto md:flex md:flex-row md:bg-transparent md:p-0`}
      >
        {navigation.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="border-b border-transparent hover:border-current"
            onClick={() => setOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <span className="text-[11px] md:ml-[30px]">FR</span>
    </header>
  );
}
