import { imagesOf, type Img } from "./images";

export type Categorie = "film" | "video" | "installation" | "performance" | "photographie";

export const filtresOeuvres: { id: Categorie | "all"; label: string }[] = [
  { id: "all", label: "Tous" },
  { id: "film", label: "Films" },
  { id: "video", label: "Vidéos" },
  { id: "installation", label: "Installations" },
  { id: "performance", label: "Performances" },
  { id: "photographie", label: "Photographies" },
];

export type Oeuvre = {
  slug: string;
  titre: string;
  /** Nature de l’œuvre (ex. « Film »). */
  type: string;
  /** Laisser à null tant que l’artiste n’a pas fourni l’information. */
  annee: string | null;
  /** Laisser à null tant que l’artiste n’a pas fourni l’information. */
  description: string | null;
  categories: Categorie[];
  /** Description des images, complétée par le numéro de l’image. */
  alt: string;
  cover: Img | null;
  images: Img[];
};

type OeuvreData = Omit<Oeuvre, "cover" | "images">;

const data: OeuvreData[] = [
  // Œuvres présentes sur le site d’origine
  {
    slug: "ngoma",
    titre: "Ngoma",
    type: "Film",
    annee: "2022",
    description:
      "Réalisé en 2022 pendant une résidence de création à Yolé! Africa, à Goma, Ngoma a participé au festival international du cinéma Ishango Encunter et à la 14e édition de Congo in Harlem, à New York.",
    categories: ["film"],
    alt: "Ngoma, photogramme du film",
  },
  {
    slug: "fil-rouge",
    titre: "Fil rouge",
    type: "Vidéos & installations",
    annee: "2021",
    description:
      "Peter Miyalu a présenté ses vidéos et installations dans le cadre de l’exposition Fil rouge, au centre culturel Texaf Bilembo à Kinshasa, en 2021.",
    categories: ["video", "installation"],
    alt: "Fil rouge",
  },
  {
    slug: "choregraphie-des-villes",
    titre: "Chorégraphie des villes",
    type: "Exposition vidéo",
    annee: null,
    description:
      "Peter Miyalu a co-organisé, avec la structure allemande Fluctuating-Images, l’exposition vidéo Chorégraphie des villes à ACUD, en Allemagne.",
    categories: ["video"],
    // Pas d’image : visuel typographique (les photos d’Urban Rythms forment
    // une œuvre à part entière).
    alt: "Chorégraphie des villes",
  },
  {
    slug: "la-danse-du-matin",
    titre: "La danse du matin",
    type: "Court métrage",
    annee: "2019",
    description:
      "La danse du matin a remporté le 1er Prix du concours du Film de poche du Festival du Film européen en République démocratique du Congo en 2019. Le court métrage a été présenté à l’Institut Français de Kinshasa.",
    categories: ["film"],
    alt: "La danse du matin",
  },
  // Œuvres ajoutées depuis les dossiers de l’artiste (année et description à compléter)
  {
    slug: "urban-rythms",
    titre: "Urban Rythms",
    type: "Photographie",
    annee: null,
    description: null,
    categories: ["photographie"],
    alt: "Urban Rythms, photographie de rue à Kinshasa",
  },
  {
    slug: "mutilation",
    titre: "Mutilation",
    type: "Installation vidéo",
    annee: null,
    description: null,
    categories: ["video", "installation"],
    alt: "Mutilation, installation vidéo avec écrans et téléviseurs",
  },
  {
    slug: "tala-ngai",
    titre: "Tala ngai",
    type: "Photographie",
    annee: null,
    description: null,
    categories: ["photographie"],
    alt: "Tala ngai, portrait photographique entouré de fleurs sur fond noir",
  },
  {
    slug: "performance-1",
    titre: "Performance 1",
    type: "Performance",
    annee: null,
    description: null,
    categories: ["performance"],
    alt: "Performance 1, l’artiste en scène avec des valises",
  },
  {
    slug: "performance-2",
    titre: "Performance 2",
    type: "Performance",
    annee: null,
    description: null,
    categories: ["performance"],
    alt: "Performance 2, performeur devant une projection vidéo",
  },
  {
    slug: "performance-3",
    titre: "Performance 3",
    type: "Performance",
    annee: null,
    description: null,
    categories: ["performance"],
    alt: "Performance 3, performance participative avec le public",
  },
  {
    slug: "serie-photo-qualifie",
    titre: "Série photo Qualifié",
    type: "Photographie et estampe numérique",
    annee: null,
    // Texte du cartel fourni par l’artiste (Cartel Qualifié.docx).
    description: [
      "Ce projet de création s’inscrit dans une réflexion artistique sur les parcours migratoires et les dispositifs administratifs qui encadrent les corps en mouvement. Nourri par mon expérience d’étudiant étranger, il met en lumière les mécanismes contemporains de classification, d’évaluation et de hiérarchisation des individus, tout en révélant certaines continuités avec des systèmes historiques de contrôle.",
      "Au centre du dispositif, un autoportrait me représente portant une plaque en cuivre gravée du mot QUALIFIÉ. Ce matériau évoque à la fois l’histoire de l’exploitation minière congolaise et les dispositifs d’identification (badges, plaques) utilisés pour autoriser ou restreindre l’accès. Le terme « qualifié », issu du vocabulaire de l’immigration canadienne, interroge les critères d’admissibilité imposés aux personnes migrantes.",
      "Cette image dialogue avec une série de portraits photographiques inspirés du format passeport, représentant des personnes issues de l’immigration. Traités de manière frontale, ces portraits questionnent la réduction de l’identité à une image normative. Chacun est marqué par une empreinte visuelle évoquant un tampon administratif, symbole des processus de validation ou de refus. L’ensemble met en tension visibilité, contrôle et légitimité, transformant chaque image en document à la fois intime et politique.",
    ].join("\n\n"),
    categories: ["photographie"],
    alt: "Série photo Qualifié, autoportrait en noir et blanc",
  },
];

export const oeuvres: Oeuvre[] = data.map((o) => ({ ...o, ...imagesOf(o.slug) }));

export function sousTitre(o: Pick<Oeuvre, "type" | "annee">): string {
  return o.annee ? `${o.type} · ${o.annee}` : o.type;
}
