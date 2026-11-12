import { imageOf, type Img } from "./images";

export type TypeExposition = "exposition" | "festival" | "projection";

export const filtresExpositions: { id: "all" | "exposition" | "festival-projection"; label: string }[] = [
  { id: "all", label: "Tous" },
  { id: "exposition", label: "Expositions" },
  { id: "festival-projection", label: "Festivals & projections" },
];

export type Exposition = {
  annee: string;
  /** Vide si le lieu n’est pas connu. */
  lieu: string;
  titre: string;
  detail: string | null;
  type: TypeExposition;
  /** Slug de l’œuvre liée, dont la couverture sert de visuel. */
  oeuvre: string | null;
  /** « cv » : ajoutée après croisement avec le CV (absente du tableau de CHANTIER.md). */
  source: "chantier" | "cv";
  image: Img | null;
};

// Dates de la biographie gardées partout : Fil rouge = 2021, Image en mouvement = 2019.
// TODO: confirmer avec Peter (CV = 2022 / 2020)
const data: Omit<Exposition, "image">[] = [
  { annee: "2025", lieu: "Trois-Rivières (Canada)", titre: "Liberté et censure", detail: "Exposition collective dans le cadre du Festival MAP", type: "exposition", oeuvre: null, source: "cv" },
  { annee: "Avril 2023", lieu: "Atlanta (États-Unis)", titre: "Africa Awareness Week", detail: "Congo Film Showcase", type: "festival", oeuvre: null, source: "chantier" },
  { annee: "2023", lieu: "Trois-Rivières (Canada)", titre: "Là où naît la parole", detail: "Organisée par la Sana Trois-Rivières, Galerie d’art du Parc", type: "exposition", oeuvre: null, source: "cv" },
  { annee: "2023", lieu: "Trois-Rivières (Canada)", titre: "Inclusion", detail: "Organisée par la Sana Trois-Rivières, Atelier Silex", type: "exposition", oeuvre: null, source: "cv" },
  { annee: "2022", lieu: "Allemagne", titre: "Chorégraphie des villes", detail: "Exposition vidéo à ACUD, co-organisée avec Fluctuating-Images", type: "exposition", oeuvre: "choregraphie-des-villes", source: "chantier" },
  { annee: "2022", lieu: "Kinshasa", titre: "Lumbung film", detail: "Programmation Lumbung film de la Documenta de Kassel 15", type: "projection", oeuvre: null, source: "chantier" },
  { annee: "2022", lieu: "New York", titre: "Congo in Harlem", detail: "14e édition du festival, avec le film Ngoma", type: "festival", oeuvre: "ngoma", source: "chantier" },
  { annee: "2022", lieu: "", titre: "Ishango Encunter", detail: "Festival international du cinéma, avec le film Ngoma", type: "festival", oeuvre: "ngoma", source: "chantier" },
  { annee: "2022", lieu: "Allemagne", titre: "Filmcollage 60x60", detail: "Festival international du Filmcollage 60x60, Museum Brot und Kunst", type: "festival", oeuvre: null, source: "chantier" },
  { annee: "2021", lieu: "Kinshasa", titre: "Fil rouge", detail: "Exposition au centre culturel Texaf Bilembo", type: "exposition", oeuvre: "fil-rouge", source: "chantier" },
  { annee: "2020", lieu: "Kinshasa", titre: "Exposition virtuelle", detail: "Avec Laboratoire Kontempo, Académie des Beaux-Arts", type: "exposition", oeuvre: null, source: "chantier" },
  { annee: "2019", lieu: "Kinshasa", titre: "Image en mouvement et créateur en puissance", detail: "Collectif SADI, centre culturel Le Mont des arts", type: "exposition", oeuvre: null, source: "chantier" },
  { annee: "2019", lieu: "Kinshasa", titre: "Histoire des villes", detail: "Goethe Institut", type: "exposition", oeuvre: null, source: "cv" },
  { annee: "2019", lieu: "Kinshasa", titre: "Documenter le quotidien", detail: "Dans le cadre du Festival du film européen en RD Congo, Institut Français", type: "exposition", oeuvre: null, source: "cv" },
];

export const expositions: Exposition[] = data.map((e) => ({
  ...e,
  image: e.oeuvre ? imageOf(e.oeuvre) : null,
}));

export const libelleType: Record<TypeExposition, string> = {
  exposition: "Exposition",
  festival: "Festival",
  projection: "Projection",
};
