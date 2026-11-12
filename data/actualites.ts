import { imageOf, portraits, type Img } from "./images";

export type Actualite = { repere: string; titre: string; texte: string; image: Img | null; alt: string };

export const actualites: Actualite[] = [
  {
    repere: "2025 · QUÉBEC",
    titre: "1er Prix du Musée de la Performance",
    texte: "Une distinction obtenue dans le cadre de ses études à l’Université du Québec à Trois-Rivières.",
    image: portraits[1] ?? null,
    alt: "Portrait en noir et blanc de Peter Miyalu",
  },
  {
    repere: "2022 · CINÉMA",
    titre: "Ngoma, de Goma à New York",
    texte: "Réalisé en résidence à Yolé! Africa, le film participe à Ishango Encunter et à Congo in Harlem.",
    image: imageOf("ngoma"),
    alt: "Photogramme du film Ngoma : lessive au bord de l’eau à Goma",
  },
  {
    repere: "2023 · ATLANTA",
    titre: "Africa Awareness Week",
    texte: "Peter Miyalu participe à Africa Awareness Week aux États-Unis en avril 2023.",
    image: imageOf("urban-rythms", 1),
    alt: "Vue de Kinshasa au coucher du soleil, série Urban Rythms",
  },
];

export const contact = {
  email: "Petermiyalu22@gmail.com",
  texte: "Pour des expositions, projections, collaborations et demandes professionnelles.",
};
