/** Visuel typographique (fond sombre + titre) pour les œuvres et expositions sans image. */
export default function TypoVisual({
  texte,
  sousTitre,
  label,
  petit,
}: {
  texte: string;
  sousTitre?: string;
  /** Texte lu par les lecteurs d’écran (par défaut : texte). */
  label?: string;
  petit?: boolean;
}) {
  return (
    <div
      role="img"
      aria-label={`${label ?? texte}, visuel typographique`}
      className="absolute inset-0 flex flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_40%,#2a2b29,#0b0c0b_75%)] px-6 text-center text-cream"
    >
      <span className="mb-4 block h-px w-[45px] bg-[#777]" />
      <span
        className={`font-serif leading-[1.1] ${petit ? "text-[clamp(20px,2.4vw,32px)]" : "text-[clamp(26px,3vw,40px)]"}`}
      >
        {texte}
      </span>
      {sousTitre && <span className="eyebrow mt-3 block text-[#aaa] uppercase">{sousTitre}</span>}
    </div>
  );
}
