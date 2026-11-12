import manifest from "./images-manifest.json";

export type Img = { src: string; width: number; height: number };

type ManifestEntry = { slug: string; cover: Img | null; images: Img[] };

const bySlug = new Map<string, ManifestEntry>(
  (manifest.oeuvres as ManifestEntry[]).map((o) => [o.slug, o]),
);

export function imagesOf(slug: string): { cover: Img | null; images: Img[] } {
  const entry = bySlug.get(slug);
  return { cover: entry?.cover ?? null, images: entry?.images ?? [] };
}

/** Image n de l’œuvre : 0 = couverture, 1 = <slug>-01, etc. */
export function imageOf(slug: string, index = 0): Img | null {
  const { cover, images } = imagesOf(slug);
  return index === 0 ? cover : (images[index - 1] ?? null);
}

export const portraits: Img[] = manifest.profil.map(({ src, width, height }) => ({ src, width, height }));
