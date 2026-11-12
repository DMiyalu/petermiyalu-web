import Image from "next/image";
import { contact } from "@/data/actualites";
import { imageOf } from "@/data/images";

const fond = imageOf("serie-photo-qualifie", 2);

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative min-h-[480px] overflow-hidden bg-[#080909] px-[7%] py-[55px] md:min-h-[500px] md:px-[8%] md:py-20"
    >
      {fond && (
        <Image
          src={fond.src}
          alt=""
          fill
          sizes="(max-width: 700px) 100vw, 65vw"
          className="object-cover object-[center_20%] md:left-auto! md:w-[65%]!"
        />
      )}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#000c,#0008)] md:bg-[linear-gradient(90deg,#080909_30%,#08090988_60%,transparent)]" />
      <div className="relative">
        <h2 className="section-title">Contact</h2>
        <p className="max-w-[300px]">{contact.texte}</p>
        <a href={`mailto:${contact.email}`} className="mt-5 block text-sm hover:underline">
          ✉ &nbsp; {contact.email}
        </a>
      </div>
    </section>
  );
}
