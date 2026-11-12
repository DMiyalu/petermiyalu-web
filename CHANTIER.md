# CHANTIER : Site portfolio de Peter Miyalu

Projet Next.js (App Router) déjà initialisé. Exécute ce fichier du début à la fin, étape par étape, sans me poser de questions. Chaque doute ou choix incertain va dans `RAPPORT.md` (à la racine), pas dans une question.

**Mission :**
1. Trier, copier et renommer correctement les images (étape 1).
2. Cloner le site https://peter-miyalu.dieudonnemiyalu6.chatgpt.site/ (étape 2).
3. Appliquer les modifications demandées (étape 3).
4. Vérifier et rendre un rapport (étape 4).

---

## ÉTAPE 1 : Copie et nommage des images

### 1.1 Source
Tout le matériel de l'artiste est dans `public/files/`. Structure des sous-dossiers :

| N° | Dossier source | Contenu probable |
|---|---|---|
| 1 | `cv/` | CV de l'artiste (document) |
| 2 | `Demarche artistique/` | Texte de la démarche artistique (document) |
| 3 | `Mutilation/` | Images d'une œuvre |
| 4 | `Ngoma/` | Images du film *Ngoma* |
| 5 | `perfomance 3/` | Images d'une performance (faute de frappe dans le nom, garde-la en lecture) |
| 6 | `Performance 1/` | Images d'une performance |
| 7 | `Performance 2/` | Images d'une performance |
| 8 | `Photo portrait/` | Photos de profil de l'artiste |
| 9 | `Serie Photo Qualifié/` | Série photographique |
| 10 | `tala ngai/` | Images d'une œuvre |
| 11 | `Urban Rythms/` | Images d'une œuvre (probablement *Chorégraphie des villes*, à confirmer en regardant les images) |

### 1.2 Règles
- **Copie, ne déplace jamais.** `public/files/` reste intact.
- Commence par lister le contenu réel de chaque sous-dossier (`find public/files -type f`) et **regarde les images** pour comprendre ce qu'elles montrent.
- Destination :
  - Œuvres : `public/images/oeuvres/<slug>/`
  - Profil : `public/images/profil/`
- Nommage : minuscules, sans accents, sans espaces, tirets uniquement.
  - Image de couverture de chaque œuvre : `<slug>-cover.jpg`
  - Autres images : `<slug>-01.jpg`, `<slug>-02.jpg`, etc.
  - Portraits : `portrait-01.jpg`, `portrait-02.jpg`, etc. (`portrait-01.jpg` = la plus belle, utilisée en principal)
- Si les fichiers sont lourds ou en HEIC/PNG : convertis en JPG ou WebP optimisé (largeur max 2000 px, qualité ~82) avec `sharp`.
- Slugs prévus : `ngoma`, `fil-rouge`, `choregraphie-des-villes`, `la-danse-du-matin`, `mutilation`, `tala-ngai`, `performance-1`, `performance-2`, `performance-3`, `serie-photo-qualifie`.

> ✏️ **CORRESPONDANCES À RESPECTER**
> `Ngoma/` → slug `ngoma`
> `Urban Rythms/` → slug `choregraphie-des-villes` (si les images ne correspondent pas, note-le dans RAPPORT.md)
> `Mutilation/` → `mutilation`
> `tala ngai/` → `tala-ngai`
> `Performance 1/`, `Performance 2/`, `perfomance 3/` → `performance-1`, `performance-2`, `performance-3`
> `Serie Photo Qualifié/` → `serie-photo-qualifie`
> `Photo portrait/` → `public/images/profil/`

Il n'y a **aucun dossier** pour *Fil rouge* ni pour *La danse du matin*. Ne copie rien d'inventé : si aucune image du matériel ne leur correspond clairement, ces deux œuvres utilisent un visuel typographique élégant (fond sombre + titre) et tu les listes dans RAPPORT.md comme « images manquantes ».

### 1.3 Textes
- Lis le contenu de `Demarche artistique/` (docx, pdf ou txt) et extrais le texte. Il sert pour la section À propos (étape 3). Écris-le dans `data/demarche.ts` (corrige seulement la typographie et les coquilles évidentes, ne réécris pas le fond).
- Regarde aussi `cv/`. Il sert à vérifier les dates et titres des expositions. **Le CV ne doit jamais être proposé au téléchargement sur le site.**

### 1.4 Sortie de l'étape 1
Crée `data/images-manifest.json` : pour chaque œuvre, son slug, le chemin de la couverture, la liste des autres images.

---

## ÉTAPE 2 : Cloner le site

Ouvre l'URL et reproduis fidèlement : design, couleurs, typographies, espacements, animations, menu mobile (☰), responsive, effets au survol, fenêtre modale (croix ×) des œuvres avec le bouton « DEMANDER UNE PROJECTION → ».

- Page unique avec ancres : Accueil, Œuvres, À propos, Actualités, Contact, pied de page.
- Hero : « PETER MIYALU / ARTISTE VISUEL & CINÉASTE », « Images Mouvements Territoires », « Kinshasa Québec Worldwide ».
- Le sélecteur « FR » reste visible comme sur l'original.
- TypeScript, Tailwind CSS, composants séparés : `Header`, `Hero`, `Oeuvres`, `Expositions`, `APropos`, `Actualites`, `Contact`, `Footer`.
- Données dans `/data` (œuvres, expositions, actualités, démarche).
- Images avec `next/image`, `alt` descriptifs, lazy loading.
- N'utilise **aucune** image de l'ancien site, uniquement celles préparées à l'étape 1.

---

## ÉTAPE 3 : Modifications à appliquer

### 3.1 Section Œuvres

> ✏️ **MOT À MODIFIER**
> « Œuvres récentes » → **« Œuvres »**

- Titre de section : `Œuvres`.
- Les 4 œuvres d'origine restent : *Ngoma* (Film · 2022), *Fil rouge* (Vidéos & installations · 2021), *Chorégraphie des villes* (Exposition vidéo), *La danse du matin* (Court métrage · 2019).
- Ajoute les autres œuvres issues des dossiers : *Mutilation*, *Tala ngai*, *Performance 1*, *Performance 2*, *Performance 3*, *Série photo*. Titres tirés des noms de dossiers (corrige la casse et les accents). **N'invente ni année ni description** : laisse le champ vide et note-le dans RAPPORT.md.
- Les films font partie des œuvres : ajoute les filtres **Tous / Films / Vidéos / Installations / Performances / Photographies** (reprends le style de l'ancien filtre de la section Films).
- Chaque œuvre ouvre la modale avec sa couverture et ses autres images (carrousel si plusieurs).

> ✏️ **MOT À MODIFIER**
> Bouton « EXPLORER LES FILMS → » → **« VOIR LES EXPOSITIONS → »** (ancre `#expositions`)

### 3.2 Onglet Films devient Expositions

> ✏️ **MOT À MODIFIER**
> Onglet « Films » → **« Expositions »**

- Supprime entièrement la section et l'onglet « Films » (les films sont déjà dans les Œuvres).
- Nouvel ordre du menu : Accueil, Œuvres, Expositions, À propos, Actualités, Contact.
- Section « Expositions » dans le même style que l'ancienne section Films. Sous-titre : « Expositions, festivals et projections à travers le monde. » Filtres : Tous / Expositions / Festivals & projections.
- Contenu (ordre chronologique décroissant), dans `data/expositions.ts`, à croiser avec le CV pour vérifier les dates :

| Année | Lieu | Intitulé | Type |
|---|---|---|---|
| Avril 2023 | Atlanta (États-Unis) | Africa Awareness Week | Festival |
| 2022 | Allemagne | *Chorégraphie des villes*, exposition vidéo à ACUD, co-organisée avec Fluctuating-Images | Exposition |
| 2022 | Kinshasa | Programmation Lumbung film de la Documenta de Kassel 15 | Projection |
| 2022 | New York | 14e édition du festival Congo in Harlem, avec le film *Ngoma* | Festival |
| 2022 | Ishango Encunter | Avec le film *Ngoma* | Festival |
| 2022 | Allemagne | Festival international du Filmcollage 60x60, Museum Brot und Kunst | Festival |
| 2021 | Kinshasa | Exposition *Fil rouge*, centre culturel Texaf Bilembo | Exposition |
| 2020 | Kinshasa | Exposition virtuelle avec Laboratoire Kontempo, Académie des Beaux-Arts | Exposition |
| 2019 | Kinshasa | « Image en mouvement et créateur en puissance », collectif SADI, centre culturel Le Mont des arts | Exposition |

Si le CV contient d'autres expositions absentes de ce tableau, ajoute-les et signale-le dans RAPPORT.md. Utilise l'image de l'œuvre correspondante quand elle existe, sinon une carte typographique.

### 3.3 Section À propos

> ✏️ **À MODIFIER DANS À PROPOS**
> 1. Remplacer le court paragraphe par la **biographie complète**, affichée dans la page.
> 2. Ajouter un bloc **« Démarche artistique »** (texte du dossier `Demarche artistique/`).
> 3. **Supprimer** le lien « LIRE LA BIOGRAPHIE COMPLÈTE → ».
> 4. **Supprimer** le bouton « TÉLÉCHARGER LA BIOGRAPHIE ↓ » dans Contact.

Biographie complète, à reproduire telle quelle (accents corrigés, « En 2025, dans le cadre… » avec la virgule) :

> Né le 11 août 2000 à Kinshasa, Peter Miyalu est un artiste visuel et cinéaste congolais. Initiateur du Ciné-club Minzoto, il fait actuellement ses études à l'Université du Québec à Trois-Rivières, au Canada, en Arts visuels Nouveaux Médias, après avoir été diplômé en Arts graphiques, orientation communication visuelle à l'Académie des Beaux-Arts de Kinshasa en 2021.
>
> Avec ses installations et vidéos d'art, il a participé à plusieurs expositions collectives axées sur l'art contemporain dont l'exposition Image en mouvement et créateur en puissance, en 2019, organisée par le collectif Solidarité des Artistes pour le Développement Intégral (SADI), au centre culturel le Mont des arts, à Kinshasa. Avec Laboratoire Kontempo, il a participé à une exposition virtuelle, présentée à l'Académie des Beaux-arts de Kinshasa, en 2020. À l'exposition Fil rouge, au centre culturel Texaf Bilembo en 2021, à Kinshasa, il a aussi présenté ses vidéos et installations.
>
> Il a participé au Festival international du Filmcollage 60x60, organisé par le Museum Brot und Kunst en Allemagne en 2022. Avec son film Ngoma, réalisé en 2022, pendant une résidence de création à Yolé! Africa de Goma, il a participé au festival international du cinéma Ishango Encunter en 2022, ainsi qu'à la 14e édition du festival international du cinéma Congo in Harlem à New York.
>
> Il a co-organisé, avec la structure allemande Fluctuating-Images, l'exposition vidéo Chorégraphie des villes à ACUD, en Allemagne, et la programmation Lumbung film de la Documenta de Kassel 15 à Kinshasa. En avril 2023, il a participé à Africa Awareness Week à Atlanta, aux États-Unis.
>
> Le travail de Peter Miyalu a été reconnu à plusieurs reprises au cours de son parcours artistique et académique. En 2019, il remporte le 1er Prix du concours du Film de poche du Festival du Film européen en République démocratique du Congo grâce à son court métrage La danse du matin, présenté à l'Institut Français de Kinshasa. En 2025, dans le cadre de ses études à l'Université du Québec à Trois-Rivières, il a obtenu le 1er Prix du Musée de la Performance, soulignant la qualité et l'originalité de sa démarche artistique. Plus récemment, il s'est également vu décerner le 1er Prix d'excellence de la Section des arts de l'Université du Québec à Trois-Rivières, une distinction qui récompense l'excellence de son parcours académique et de sa contribution à la vie artistique universitaire.

- Garde les trois repères sous le texte : Kinshasa (Origines), Québec (Formation), Worldwide (Expositions & festivals).
- Photo principale : `portrait-01.jpg`. Les autres portraits peuvent former une petite galerie.
- **Aucun lien ni bouton de téléchargement** (PDF, CV, biographie) nulle part sur le site. Ne copie pas le fichier `biographie-peter-miyalu.pdf`.

### 3.4 Actualités et Contact (inchangés, sauf images)
- Actualités : garde les 3 repères (2025 Québec, 1er Prix du Musée de la Performance ; 2022 Cinéma, *Ngoma, de Goma à New York* ; 2023 Atlanta, Africa Awareness Week) avec les nouvelles images (portrait pour le prix, `ngoma` pour le film, `choregraphie-des-villes` ou un portrait pour Atlanta).
- Contact : « Pour des expositions, projections, collaborations et demandes professionnelles. », e-mail `peter.miyalu@gmail.com`, pied de page « Peter Miyalu, Artiste visuel & Cinéaste, Kinshasa · Québec · Worldwide », « RETOUR EN HAUT ↑ ».

---

## ÉTAPE 4 : Vérification et rapport

1. Lance `npm run build` et corrige toutes les erreurs.
2. Teste le rendu mobile, tablette et desktop.
3. Cherche dans tout le code (hors `public/files`) et confirme qu'il ne reste **aucune** occurrence de : « Œuvres récentes », l'onglet « Films », « télécharger » / « TÉLÉCHARGER », « .pdf », ou une référence à `public/files`.
4. Ajoute `public/files/` au `.gitignore` (le CV et les originaux ne doivent pas être publiés ni servis publiquement). Précise dans le rapport que le dossier doit être retiré de `public/` avant le déploiement.
5. Écris `RAPPORT.md` avec :
   - le tableau final « dossier source → slug → fichiers créés »
   - les images manquantes (au minimum *Fil rouge* et *La danse du matin* si aucune image ne correspond)
   - les doutes de correspondance (ex. *Urban Rythms* ↔ *Chorégraphie des villes*)
   - les champs à compléter par l'artiste (années et descriptions des nouvelles œuvres)
   - les écarts éventuels entre le CV et la liste des expositions
