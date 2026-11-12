// Copie (sans jamais déplacer) les images de public/files/ vers public/images/,
// les renomme, les convertit en JPG optimisé (largeur max 2000 px, qualité 82)
// et génère data/images-manifest.json.
// Usage : node scripts/prepare-images.mjs
import sharp from "sharp";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "public/files");
const OUT_WORKS = path.join(ROOT, "public/images/oeuvres");
const OUT_PROFILE = path.join(ROOT, "public/images/profil");
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), "pm-heic-"));

// Ordre choisi après examen visuel : le premier fichier est la couverture.
const WORKS = [
  { slug: "ngoma", dir: "Ngoma", files: ["Capture d’écran 2026-11-04 à 14.04.22.png", "Capture d’écran 2026-11-04 à 14.04.32.png"] },
  { slug: "fil-rouge", dir: null, files: [] },
  {
    slug: "urban-rythms",
    dir: "Urban Rythms",
    files: ["IMG_7411.jpg", "IMG_7315.jpg", "IMG_7321.jpg", "IMG_7396.jpg", "IMG_7416.jpg", "IMG_7328.jpg", "XE0A5013.jpg", "IMG_9164 copie.jpg", "IMG_2997.jpg", "IMG_8213.jpg", "IMG_8215.jpg", "IMG_8216.jpg"],
  },
  { slug: "choregraphie-des-villes", dir: null, files: [] },
  { slug: "la-danse-du-matin", dir: null, files: [] },
  {
    slug: "mutilation",
    dir: "Mutilation",
    files: ["IMG_0447.jpg", "IMG_0448.jpg", "IMG_0449.jpg", "IMG_0453.jpg", "IMG_0455.jpg", "Capture d’écran 2026-11-04 à 14.01.54.png", "Capture d’écran 2026-11-04 à 14.02.03.png"],
  },
  { slug: "tala-ngai", dir: "tala ngai", files: ["f3d6597fdb58dbee6a80cee0018ae36b.JPEG", "IMG_9086.JPG"] },
  {
    slug: "performance-1",
    dir: "Performance 1",
    files: ["IMG_3317.JPG", "IMG_3314.JPG", "IMG_3315.JPG", "IMG_3316.JPG", "IMG_3318.JPG", "IMG_4350.jpg", "IMG_4351.JPG"],
  },
  { slug: "performance-2", dir: "Performance 2", files: ["IMG_2937.jpg", "IMG_2932.jpg", "IMG_2935.jpg", "IMG_2936.PNG", "IMG_2938.jpg"] },
  {
    slug: "performance-3",
    dir: "perfomance 3",
    files: [
      "IMG_4082.JPG", "IMG_4034.JPG", "IMG_4041 2.JPG", "IMG_4052.JPG", "IMG_4053.JPG", "IMG_4058.JPG", "IMG_4059.JPG",
      "IMG_4064.jpg", "IMG_4071 2.JPG", "IMG_4077.JPG", "IMG_4081.JPG", "IMG_4086.JPG", "IMG_4089.JPG", "IMG_4091.JPG",
      "IMG_4092.JPG", "IMG_4096.JPG", "IMG_4097.JPG", "IMG_4099.JPG", "IMG_4100.JPG", "IMG_4101.JPG", "IMG_4102.JPG", "IMG_4103.JPG",
    ],
  },
  {
    slug: "serie-photo-qualifie",
    dir: "Serie Photo Qualifié",
    files: ["Sans titre-1 copie.jpg", "Sans titre-2 copie.jpg", "Sans titre-2.jpg", "IMG_5566.heic", "IMG_5666.heic", "IMG_5568.HEIC", "IMG_5664.heic", "IMG_5616.heic", "IMG_5639.heic"],
  },
];

// IMG_4351.JPG est exclu : identique (même empreinte) à Performance 1/IMG_4351.JPG.
const PORTRAITS = { dir: "Photo portrait ", files: ["IMG_8889.JPG", "IMG_8891.JPG", "IMG_8892.JPG", "IMG_3604.JPG", "DSC_4279.jpg"] };

// Retrouve le vrai nom sur disque (normalisation Unicode, espaces insécables de macOS).
const norm = (s) => s.normalize("NFC").replace(/\s/g, " ");
function resolveSource(dir, file) {
  const real = fs.readdirSync(path.join(SRC, dir)).find((f) => norm(f) === norm(file));
  if (!real) throw new Error(`Fichier introuvable : ${dir}/${file}`);
  return path.join(SRC, dir, real);
}

async function convert(srcPath, destPath) {
  let input = srcPath;
  if (/\.heic$/i.test(srcPath)) {
    input = path.join(TMP, path.basename(srcPath).replace(/\.heic$/i, ".jpg"));
    execFileSync("sips", ["-s", "format", "jpeg", srcPath, "--out", input], { stdio: "ignore" });
  }
  const info = await sharp(input, { limitInputPixels: false })
    .rotate()
    .resize({ width: 2000, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(destPath);
  return { width: info.width, height: info.height };
}

const pad = (n) => String(n).padStart(2, "0");
const manifest = { oeuvres: [], profil: [] };

for (const w of WORKS) {
  const entry = { slug: w.slug, cover: null, images: [], sources: {} };
  if (w.dir) {
    const outDir = path.join(OUT_WORKS, w.slug);
    fs.mkdirSync(outDir, { recursive: true });
    for (const [i, f] of w.files.entries()) {
      const name = i === 0 ? `${w.slug}-cover.jpg` : `${w.slug}-${pad(i)}.jpg`;
      const size = await convert(resolveSource(w.dir, f), path.join(outDir, name));
      const pub = `/images/oeuvres/${w.slug}/${name}`;
      const img = { src: pub, ...size };
      if (i === 0) entry.cover = img;
      else entry.images.push(img);
      entry.sources[name] = `${w.dir}/${f}`;
    }
  }
  manifest.oeuvres.push(entry);
  console.log(w.slug, w.files.length);
}

fs.mkdirSync(OUT_PROFILE, { recursive: true });
for (const [i, f] of PORTRAITS.files.entries()) {
  const name = `portrait-${pad(i + 1)}.jpg`;
  const size = await convert(resolveSource(PORTRAITS.dir, f), path.join(OUT_PROFILE, name));
  manifest.profil.push({ src: `/images/profil/${name}`, ...size, source: `Photo portrait/${f}` });
}
console.log("profil", PORTRAITS.files.length);

fs.mkdirSync(path.join(ROOT, "data"), { recursive: true });
fs.writeFileSync(path.join(ROOT, "data/images-manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
fs.rmSync(TMP, { recursive: true, force: true });
