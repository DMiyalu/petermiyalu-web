import Image from "next/image";
import { actualites } from "@/data/actualites";

export default function Actualites() {
  return (
    <section id="actualites" className="bg-cream px-[7%] py-[55px] text-ink md:px-[8%] md:py-20">
      <div className="flex flex-col items-start md:flex-row md:items-center md:justify-between md:gap-[25px]">
        <h2 className="section-title">Actualités</h2>
        <span className="eyebrow mb-7 md:mb-0">REPÈRES DU PARCOURS</span>
      </div>
      <div className="grid grid-cols-1 gap-[25px] md:grid-cols-3">
        {actualites.map((a) => (
          <article key={a.titre} className="group bg-[#ffffff45] pb-5">
            <div className="relative h-[260px] overflow-hidden md:h-[230px]">
              {a.image && (
                <Image
                  src={a.image.src}
                  alt={a.alt}
                  fill
                  sizes="(max-width: 700px) 86vw, 28vw"
                  className="object-cover transition-transform duration-[600ms] group-hover:scale-[1.04]"
                />
              )}
            </div>
            <small className="mx-[18px] mt-[15px] block text-[9px] tracking-[.5px] text-[#666]">{a.repere}</small>
            <h3 className="mx-[18px] my-[15px] font-serif text-[25px] leading-tight font-normal">{a.titre}</h3>
            <p className="mx-[18px] text-[13px]">{a.texte}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
