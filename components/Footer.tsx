export default function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-5 border-t border-[#292929] px-[5%] py-[35px] text-[11px] md:flex-nowrap">
      <p className="m-0">
        Peter Miyalu
        <small className="mt-[5px] block text-[10px] text-[#aaa]">Artiste visuel & Cinéaste</small>
      </p>
      <span>Kinshasa · Québec · Worldwide</span>
      {/* « Retour en haut » : bouton flottant, voir RetourEnHaut.tsx */}
    </footer>
  );
}
