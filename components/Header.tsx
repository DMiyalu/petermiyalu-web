"use client";

import { useState } from "react";

export const navigation = [
  { href: "#accueil", label: "Accueil" },
  { href: "#oeuvres", label: "Œuvres" },
  { href: "#expositions", label: "Expositions" },
  { href: "#apropos", label: "À propos" },
  { href: "#actualites", label: "Actualités" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute z-10 flex h-[65px] w-full items-center gap-[30px] bg-[#080909aa] px-[5%] md:h-[78px] md:bg-transparent md:bg-[linear-gradient(#0007,transparent)]">
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
