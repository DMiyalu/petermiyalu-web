# RAPPORT : chantier du site Peter Miyalu

Date : 12 novembre 2026. Les 4 étapes de `CHANTIER.md` sont exécutées. Les décisions du 12 novembre sont appliquées (voir la section suivante). Rien n'a été commité.

## Décisions du 12 novembre (appliquées)

| # | Décision | Ce qui a été fait |
|---|---|---|
| 1 | *Urban Rythms* devient une œuvre à part entière | Nouvelle œuvre « Urban Rythms » (slug `urban-rythms`, type « Photographie », filtre Photographies) avec les 12 images, renommées `urban-rythms-cover.jpg` et `-01` à `-11` (dossier `public/images/oeuvres/urban-rythms/`). *Chorégraphie des villes* n'a plus d'image : elle affiche le visuel typographique, dans Œuvres comme dans Expositions. L'Actualité « Africa Awareness Week » garde sa photo (`urban-rythms-01`), avec le texte alternatif corrigé (« série Urban Rythms »). `data/images-manifest.json` et `scripts/prepare-images.mjs` sont à jour. |
| 2 | Dates de la biographie partout | Fil rouge = 2021, Image en mouvement = 2019 : c'était déjà le cas dans `data/expositions.ts`, `data/oeuvres.ts` et `data/biographie.ts`. Ajout dans `data/expositions.ts` de `// TODO: confirmer avec Peter (CV = 2022 / 2020)`. |
| 3 | E-mail de contact | `Petermiyalu22@gmail.com` (adresse du CV), dans `data/actualites.ts`. Il est utilisé par la section Contact et par la modale. |
| 4 | Hero | `portrait-01.jpg` (IMG_8889, bras croisés, fond gris). Comme ce portrait est sombre et vertical, trois ajustements ont été nécessaires (`components/Hero.tsx`) : cadrage sur le visage, titre « PETER MIYALU » en crème au lieu du noir (illisible sur la veste), voile sombre à gauche. Sur mobile, l'image est décalée de 10 % vers la droite pour que le titre ne recouvre pas le visage. Vérifié à 360, 390, 820 et 1440 px. |
| 5 | Aucune donnée privée dans le build | Voir ci-dessous. |

### Point 5 : contrôle de `.next/` et `public/`

- **Supprimés de `public/files/`** : `cv/CV Peter Miyalu.pdf` (adresse postale et téléphone personnels) et `Demarche artistique/Démarche artistique.docx` (qui contient la lettre de candidature à la bourse). Les originaux restent dans l'archive `Sites/Peter Miyalu -20261112T025324Z-1-001.zip`. L'adresse `/files/cv/CV%20Peter%20Miyalu.pdf` renvoie maintenant 404.
- **Recherche dans `.next/` (cache compris) et `public/`** : le téléphone, l'adresse (rue, code postal), « Curriculum », « CV Peter », `.pdf`, la lettre de bourse (« candidature », « bourse », « Je vous remercie ») et l'ancienne adresse e-mail ne figurent nulle part. Seule exception légitime : le nom « Galerie d'art du Parc », qui est le lieu public de l'exposition *Là où naît la parole* (2023).
- Le commentaire de `data/demarche.ts` qui citait la lettre de bourse a été reformulé : les source maps du serveur le recopiaient.
- **Images publiées** (71) : aucune métadonnée EXIF ni GPS.
- `Serie Photo Qualifié/Cartel Qualifié.docx` reste dans `public/files/`. Il ne contient que le texte du cartel, déjà publié sur le site, et aucune donnée personnelle.

## ⚠️ Avant le déploiement

**Retirer aussi le reste de `public/files/`** (le déplacer hors du projet, puis mettre à jour `SRC` dans `scripts/prepare-images.mjs`). Le CV et la lettre n'y sont plus. Restent les originaux des images (≈ 350 Mo) et le cartel : ils ne sont pas privés, mais `next start` ou un déploiement à partir de ce dossier les **sert publiquement**, en pleine résolution. Le dossier est dans `.gitignore`, donc il ne sera pas commité.

## État des vérifications

| Vérification | Résultat |
|---|---|
| `npm run build` | ✅ OK, aucune erreur (page `/` générée en statique) |
| `npm run lint` | ✅ Aucun avertissement |
| Responsive 390 px / 820 px / 1440 px | ✅ Pas de défilement horizontal. Captures vérifiées via Chrome headless (protocole DevTools) |
| Menu mobile ☰ | ✅ S'ouvre, et se referme au clic sur un lien |
| Filtres Œuvres / Expositions | ✅ « Performances » → 3 œuvres ; « Festivals & projections » → 5 lignes sur 14 |
| Modale × + carrousel | ✅ Ouverture, image suivante (02 / 07), fermeture |
| Images (`next/image`) | ✅ Toutes servies (200). Chargement différé, sauf le hero (`preload`) |
| Recherche « Œuvres récentes », « télécharger/TÉLÉCHARGER », « .pdf » | ✅ Aucune occurrence (hors `CHANTIER.md` et ce rapport) |
| Onglet / section « Films » | ✅ Supprimés. Le mot « Films » ne reste que comme **filtre** de la section Œuvres (demandé à l'étape 3.1) |
| Référence à `public/files` | ⚠️ Aucune dans le site. Il en reste deux hors site : `.gitignore` (demandé à l'étape 4.4) et `scripts/prepare-images.mjs` (le script de copie des images, qui doit lire la source) |
| HTML généré (`.next/server/app/index.html`) | ✅ Aucun `.pdf`, aucun `/files/`, aucun « télécharger » |
| Fichier `biographie-peter-miyalu.pdf` | ✅ Non copié. Aucun lien ni bouton de téléchargement nulle part |

## 1. Tableau final : dossier source → slug → fichiers créés

Toutes les images sont converties en JPG (largeur max 2000 px, qualité 82, orientation EXIF appliquée) : 71 fichiers, 16 Mo au total. Les originaux des images sont **copiés**, jamais déplacés. Depuis le 12 novembre, `public/files/` ne contient plus `cv/` ni `Demarche artistique/` (voir le point 5) ; les originaux des images y sont toujours. Le script `scripts/prepare-images.mjs` est relançable. La correspondance exacte fichier source → fichier créé est dans `scripts/prepare-images.mjs`. Le manifeste est dans `data/images-manifest.json`.

| Dossier source | Slug | Fichiers créés | Couverture choisie (source) |
|---|---|---|---|
| `Ngoma/` | `ngoma` | `ngoma-cover.jpg`, `ngoma-01.jpg` (2) | Capture 14.04.22 (lessive au bord de l'eau) |
| (aucun) | `fil-rouge` | aucun, visuel typographique | |
| `Urban Rythms/` | `urban-rythms` | `-cover.jpg`, `-01` à `-11` (12) | IMG_7411 (silhouette à la fenêtre, coucher de soleil) |
| (aucun) | `choregraphie-des-villes` | aucun, visuel typographique | |
| (aucun) | `la-danse-du-matin` | aucun, visuel typographique | |
| `Mutilation/` | `mutilation` | `-cover.jpg`, `-01` à `-06` (7) | IMG_0447 (vue de l'installation) |
| `tala ngai/` | `tala-ngai` | `-cover.jpg`, `-01` (2) | f3d6597f….JPEG (portrait aux fleurs) |
| `Performance 1/` | `performance-1` | `-cover.jpg`, `-01` à `-06` (7) | IMG_3317 |
| `Performance 2/` | `performance-2` | `-cover.jpg`, `-01` à `-04` (5) | IMG_2937 |
| `perfomance 3/` | `performance-3` | `-cover.jpg`, `-01` à `-21` (22) | IMG_4082 |
| `Serie Photo Qualifié/` | `serie-photo-qualifie` | `-cover.jpg`, `-01` à `-08` (9), dont 6 HEIC convertis | Sans titre-1 copie (autoportrait à la plaque de cuivre) |
| `Photo portrait /` | `public/images/profil/` | `portrait-01.jpg` à `portrait-05.jpg` (5) | `portrait-01` = IMG_8889 (bras croisés, fond gris) |
| `cv/` (retiré de `public/` le 12 nov.) | (texte seulement) | rien de copié | |
| `Demarche artistique/` (retiré de `public/` le 12 nov.) | (texte seulement) | `data/demarche.ts` | |

Images du site :
- Hero : `portrait-01.jpg` (décision du 12 novembre ; l'ancienne photo de Kinshasa, `urban-rythms-02`, reste dans l'œuvre Urban Rythms).
- Fond de Contact : `serie-photo-qualifie-02.jpg`.
- Actualités : `portrait-02` (prix), `ngoma-cover` (film), `urban-rythms-01` (Atlanta).

## 2. Images manquantes

- **Fil rouge** : aucun dossier, aucune image du matériel ne correspond clairement. Visuel typographique (fond sombre + titre).
- **La danse du matin** : idem.
- **Chorégraphie des villes** : idem depuis le 12 novembre (les photos sont passées à *Urban Rythms*).
- **Expositions sans visuel** : Liberté et censure, Africa Awareness Week, Là où naît la parole, Inclusion, Lumbung film, Filmcollage 60x60, Exposition virtuelle (Kontempo), Image en mouvement…, Histoire des villes, Documenter le quotidien. Elles affichent une vignette typographique avec l'année. Seules Congo in Harlem et Ishango Encunter ont une image (celle de *Ngoma*, l'œuvre liée).

## 3. Doutes de correspondance et choix faits

1. ✅ **Résolu le 12 novembre : *Urban Rythms* est une œuvre distincte.** Constat d'origine : les 12 images sont des **photographies de rue de Kinshasa** (marché, taxis, enfants au fleuve, silhouettes à la fenêtre), pas des vues d'une exposition vidéo à ACUD (Berlin). Elles forment désormais l'œuvre *Urban Rythms* (filtre Photographies). *Chorégraphie des villes* garde le visuel typographique.
2. **Doublons exclus** (empreinte identique) :
   - `Photo portrait /IMG_4351.JPG` est identique à `Performance 1/IMG_4351.JPG`. C'est une photo de performance (valises), donc elle est gardée dans `performance-1` et retirée des portraits.
   - `Performance 1/IMG_3314 2.JPG` est identique à `IMG_3314.JPG` ; une seule copie est gardée.
3. **Ngoma : capture exclue.** `Capture d'écran … 14.04.03.png` est une mosaïque de vignettes répétées (capture d'un logiciel de montage), inutilisable comme image d'œuvre. Ngoma n'a donc que 2 images.
4. **Quasi-doublons conservés** dans `performance-3` (IMG_4052/4053, 4058/4059, 4091/4092 : prises quasi identiques). Ils sont gardés pour ne rien perdre ; l'artiste peut en retirer.
5. **Démarche artistique.** Le fichier `.docx` contient, après la démarche, une **lettre de candidature à la bourse de la Galerie d'art du Parc** (« Je souhaite soumettre ma candidature… Je vous remercie. »). Elle est **exclue** du site, car privée et hors sujet. Seuls les 5 paragraphes de la démarche sont repris, sans modification de fond.
6. **Série photo.** Le cartel (`Cartel Qualifié.docx`) donne le titre réel « QUALIFIÉ » et la technique « Photographie et Estampe numérique ». Le titre affiché est **« Série photo Qualifié »**. Le texte du cartel, écrit par l'artiste, est utilisé tel quel comme description dans la modale (rien d'inventé). À valider : faut-il afficher simplement « Qualifié » ?
7. **Types déduits des images** (pas de source écrite), à confirmer :
   - *Mutilation* : « Installation vidéo », filtres Vidéos + Installations.
   - *Tala ngai* : « Photographie », filtre Photographies.
   - *Fil rouge* : filtres Vidéos + Installations.
8. **« Ishango Encunter »** est gardé tel quel (biographie « à reproduire telle quelle »). C'est probablement « Ishango Encounter » : à vérifier. Le tableau du chantier donnait « Ishango Encunter » comme lieu ; le lieu est laissé vide.
9. **Choix de `portrait-01`** (IMG_8889, bras croisés, fond gris) : choix esthétique, facile à changer en réordonnant `PORTRAITS` dans le script.
10. **Africa Awareness Week** : le détail « Congo Film Showcase » (intitulé du CV) est ajouté. Le type reste « Festival » comme dans le chantier.

## 4. Champs à compléter par l'artiste

Dans `data/oeuvres.ts` (champs `annee` et `description` à `null` ; rien n'a été inventé) :

| Œuvre | Année | Description |
|---|---|---|
| Mutilation | à compléter | à compléter |
| Tala ngai | à compléter | à compléter |
| Performance 1 | à compléter | à compléter (et vrai titre ?) |
| Performance 2 | à compléter | à compléter (et vrai titre ?) |
| Performance 3 | à compléter | à compléter (et vrai titre ?) |
| Série photo Qualifié | à compléter | ✅ cartel de l'artiste |
| Chorégraphie des villes | à compléter (2022 selon le CV) | ✅ texte d'origine |
| Urban Rythms | à compléter | à compléter (lieu et période des prises de vue ?) |

Autres points :
- *Performance 1/2/3* sont des titres provisoires issus des noms de dossiers. L'une d'elles est peut-être celle du **1er Prix du Musée de la Performance (2025)** : à préciser.
- ✅ **E-mail** : `Petermiyalu22@gmail.com` (décision du 12 novembre).
- Le **1er Prix d'excellence de la Section des arts de l'UQTR** (cité dans la biographie) n'est pas dans le CV daté du 1er avril 2026. C'est cohérent s'il est plus récent, mais il faudrait mettre le CV à jour.

## 5. Écarts entre le CV et la liste des expositions

**Ajoutées au site** car présentes dans le CV mais absentes du tableau du chantier (marquées `source: "cv"` dans `data/expositions.ts`) :

| Année | Intitulé | Lieu |
|---|---|---|
| 2025 | *Liberté et censure*, Festival MAP | Trois-Rivières |
| 2023 | *Là où naît la parole*, Sana Trois-Rivières, Galerie d'art du Parc | Trois-Rivières |
| 2023 | *Inclusion*, Sana Trois-Rivières, Atelier Silex | Trois-Rivières |
| 2019 | *Histoire des villes*, Goethe Institut | Kinshasa |
| 2019 | *Documenter le quotidien*, Festival du film européen, Institut Français | Kinshasa |

**Dates divergentes** : décision du 12 novembre, les dates de la biographie sont gardées partout. Un `TODO` dans `data/expositions.ts` rappelle de confirmer avec Peter :

| Exposition | Chantier / biographie | CV |
|---|---|---|
| *Fil rouge* (Texaf Bilembo) | 2021 | **2022** (« partenariat entre Cfao et Texaf Bilembo ») |
| *Image en mouvement, créateur en puissance* (SADI, Mont des arts) | 2019 | **2020** (« restitution des ateliers Sadi ») ; l'atelier lui-même date de 2019 |

**Précisions du CV non reprises dans les titres** :
- L'exposition virtuelle Kontempo (2020) s'intitule *Sortir de la grande nuit*. Le titre affiché reste « Exposition virtuelle » comme dans le chantier ; il vaudrait sans doute mieux afficher le vrai titre.
- *Chorégraphie des villes* : le CV précise **Berlin** (le site dit « Allemagne ») et orthographie « Fluctifing Image » (le site garde « Fluctuating-Images »).

**Présentes dans le chantier mais absentes du CV** : Ishango Encunter, Filmcollage 60x60 (Museum Brot und Kunst), Lumbung film (Documenta 15). Elles sont conservées.

**Classement « Documenter le quotidien »** : il est classé « Exposition » (rubrique « Exposition collective » du CV), bien que présenté dans le cadre d'un festival de film.

## Fichiers produits

- `scripts/prepare-images.mjs` : copie et conversion des images (relançable).
- `public/images/oeuvres/<slug>/`, `public/images/profil/` : 71 images.
- `data/` : `images-manifest.json`, `images.ts`, `oeuvres.ts`, `expositions.ts`, `actualites.ts`, `biographie.ts`, `demarche.ts`.
- `components/` : `Header`, `Hero`, `Oeuvres`, `Expositions`, `APropos`, `Actualites`, `Contact`, `Footer`, plus `DetailModal` (modale et carrousel) et `TypoVisual` (visuel typographique).
- `app/page.tsx`, `app/layout.tsx` (`lang="fr"`, métadonnées), `app/globals.css` (couleurs et typographies de l'original : crème `#f3eee5`, noir `#0b0c0b`, Georgia et Arial, bascule mobile à 700 px).
- `.gitignore` : ajout de `/public/files/`.

## Vérification finale (12 novembre)

- `npx tsc --noEmit`, `npm run lint` : aucune erreur ni aucun avertissement.
- `npm run build` : ✅ OK, page `/` générée en statique.
- Captures du Hero à 360, 390, 820 et 1440 px (Chrome headless) : visage cadré, titre lisible.
- Bouton rond « Découvrir son univers » du Hero : mesuré dans Chrome headless, il est **entier** à 360 px (cercle de 256 à 316 px) et à 390 px (cercle de 283 à 343 px), sans défilement horizontal. La remarque précédente, qui le disait coupé, était erronée.
- Contrôle repassé après l'application des décisions : aucun téléphone, aucune adresse postale, aucun CV, aucun `.pdf` ni `.docx`, aucune lettre de bourse dans `.next/` ni dans `public/` (hors originaux d'images et cartel dans `public/files/`) ; 71 images publiées sans métadonnées EXIF, XMP ni IPTC.

Rien n'a été commité.
