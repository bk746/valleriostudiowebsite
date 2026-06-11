import type { StaticImageData } from "next/image";
import elegenciaCaptureHero from "@/src/images/elegencia-capture-hero.png";
import elegenciaCaptureProperties from "@/src/images/elegencia-capture-properties.png";
import elegenciaCaptureAgency from "@/src/images/elegencia-capture-agency.png";
import averoCaptureHero from "@/src/images/avero-capture-hero.png";
import bkArchitectureCaptureHero from "@/src/images/bk-architecture-capture-hero.png";
import bkArchitectureCaptureDesign from "@/src/images/bk-architecture-capture-design.png";
import bkArchitectureCaptureRealisations from "@/src/images/bk-architecture-capture-realisations.png";
import bkArchitectureCaptureProcess from "@/src/images/bk-architecture-capture-process.png";
import valerioShot1 from "@/src/images/valerio-realisation-1.png";
import valerioShot2 from "@/src/images/valerio-realisation-2.png";
import valerioShot3 from "@/src/images/valerio-realisation-3.png";

export type CaseStudy = {
  /** Chapô sous le titre : accroche lisible en une lecture. */
  summary: string;
  /** Secteur, enjeu business, public visé. */
  context: string;
  problem: string;
  solution: string;
  /** Méthode et priorités de conception. */
  methodology: string;
  deliverables: ReadonlyArray<string>;
  /** Technologies et périmètre production. */
  stack: ReadonlyArray<string>;
  /** Effets attendus ou constat post-livraison (qualitatif / mesurable). */
  outcomes: string;
};

export type GallerySlide = {
  src: StaticImageData;
  alt: string;
};

export type RealisationCard = {
  /** Fond teinté de la vignette (gradient CSS), accordé à l’identité du projet. */
  backdrop: string;
  /** Couleur d’encre lisible sur le fond teinté. */
  ink: "light" | "dark";
  tags: ReadonlyArray<string>;
};

export type Realisation = {
  slug: string;
  index: string;
  title: string;
  status: string;
  image: StaticImageData;
  imageAlt: string;
  /** Vues supplémentaires sur la page projet (la une reste `image`). */
  extraGallery?: ReadonlyArray<GallerySlide>;
  /** Lien vers le site en ligne (démo ou production). */
  liveUrl?: string;
  caseStudy?: CaseStudy;
  visualShell?: "dark" | "cream" | "warm";
  /** Habillage de la carte vitrine sur la home. */
  card: RealisationCard;
};

export const REALISATIONS: ReadonlyArray<Realisation> = [
  {
    slug: "elegencia",
    index: "01",
    title: "Elegencia",
    status: "Démo agence immo · livrée",
    image: elegenciaCaptureHero,
    imageAlt:
      "Démo Elegencia : page d’accueil, hero panorama et promesse « Découvrez votre bien d’exception »",
    liveUrl: "https://elegencia-beta.vercel.app",
    visualShell: "dark",
    card: {
      backdrop:
        "linear-gradient(140deg, #14202E 0%, #243A52 52%, #3E5E80 100%)",
      ink: "light",
      tags: ["Immobilier", "Site vitrine", "Next.js"],
    },
    extraGallery: [
      {
        src: elegenciaCaptureProperties,
        alt: "Page propriétés Elegencia : recherche, filtres et grille de biens d’exception",
      },
      {
        src: elegenciaCaptureAgency,
        alt: "Page l’agence Elegencia : équipe, chiffres clés et positionnement luxe",
      },
    ],
    caseStudy: {
      summary:
        "Démo de site pour agence immobilière haut de gamme : hero plein écran, catalogue de propriétés filtrable et page agence éditoriale — pensée pour inspirer confiance et désir avant la prise de contact.",
      context:
        "Agence positionnée sur le luxe et l’international (Côte d’Azur, Monaco, Italie, Suisse). La démo doit montrer comment structurer une vitrine premium : promesse claire, parcours vers les biens et preuves d’expertise sans surcharge.",
      problem:
        "Les sites immo génériques noient l’utilisateur sous les annonces sans hiérarchie ni fil d’Ariane émotionnel. Manque de distinction entre catalogue et storytelling agence ; la recherche et les filtres sont souvent mal intégrés au design.",
      solution:
        "Accueil cinématique avec CTA « Trouver votre propriété », page Propriétés avec recherche, chips Villas/Appartements, carte et grille de biens avec badges Exclusivité. Page L’agence : photo d’équipe, stats (15+ ans, 120+ transactions, 6 pays) et ton discret haut de gamme.",
      methodology:
        "Wireframes des trois vues clés, direction typo uppercase sobre sur hero sombre puis interface claire sur le catalogue. Composants réutilisables (cartes bien, barre de recherche, chips, CTA pill) et recette responsive sur grands écrans et mobile.",
      deliverables: [
        "Hero accueil : navigation, promesse et CTA principal",
        "Catalogue propriétés : recherche, filtres, grille et badges",
        "Page agence : storytelling, chiffres et prise de contact",
        "Design system UI (boutons, cartes, typographie)",
      ],
      stack: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Images optimisées & déploiement statique / edge",
      ],
      outcomes:
        "Une démo convaincante pour prospects agences immo : positionnement luxe lisible en quelques secondes, parcours propriétés fluide et crédibilité renforcée par la page agence.",
    },
  },
  {
    slug: "portfolio-editorial",
    index: "02",
    title: "Avero",
    status: "Démo portfolio · livrée",
    image: averoCaptureHero,
    imageAlt:
      "Avero — plein écran montagne, typo serif et accroche « Les sommets du monde »",
    liveUrl: "https://avero-kappa.vercel.app",
    visualShell: "cream",
    card: {
      backdrop:
        "linear-gradient(140deg, #EFE9DE 0%, #DED3C1 55%, #C5B49B 100%)",
      ink: "dark",
      tags: ["Portfolio", "Éditorial", "Direction artistique"],
    },
    extraGallery: [
      {
        src: valerioShot1,
        alt: "Page accueil Avero : hero plein écran, navigation discrète et accroche éditoriale",
      },
      {
        src: valerioShot2,
        alt: "Page projet Avero : mise en page magazine, typographie serif et grands visuels",
      },
      {
        src: valerioShot3,
        alt: "Section détail Avero : hiérarchie de lecture, crédits et storytelling visuel",
      },
    ],
    caseStudy: {
      summary:
        "Démo de portfolio éditorial haut de gamme : hero plein écran, pages projets scénarisées et navigation minimaliste — pensée pour inspirer confiance et désir avant la prise de contact avec des marques lifestyle.",
      context:
        "Créatif positionné sur le luxe et l’outdoor (campagnes, shootings, direction artistique). La démo doit montrer comment structurer une vitrine premium : promesse claire dès l’accueil, parcours vers les projets et preuves de niveau sans surcharge ni effet « carrousel générique ».",
      problem:
        "Les portfolios génériques traitent les visuels forts comme de simples vignettes : l’impact se perd, la hiérarchie disparaît. Les textes d’accompagnement manquent de rythme ; le positionnement haut de gamme ne se lit pas immédiatement dans la structure de page.",
      solution:
        "Accueil cinématique plein écran avec accroche serif et navigation discrète, pages projets type magazine avec grands aplats photo et titres affirmés, détail de section avec crédits et hiérarchie lisible. Chaque vue ouvre sur une séquence hero avant de déployer le contenu — le visiteur comprend le niveau de finition avant même de scroller.",
      methodology:
        "Wireframes des trois vues clés, direction typo serif sobre sur hero immersif puis interface épurée sur les pages projets. Composants réutilisables (hero plein écran, blocs éditoriaux, légendes, CTA discret) et recette responsive sur grands écrans et mobile.",
      deliverables: [
        "Hero accueil : navigation, promesse et mise en scène plein écran",
        "Pages projets : grilles éditoriales, titres serif et crédits",
        "Sections détail : storytelling visuel et hiérarchie de lecture",
        "Design system UI (typographie, espacements, composants éditoriaux)",
      ],
      stack: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Images optimisées & déploiement statique / edge",
      ],
      outcomes:
        "Une démo convaincante pour prospects créatifs et marques premium : positionnement haut de gamme lisible en quelques secondes, parcours projets fluide et crédibilité renforcée par une expérience type magazine.",
    },
  },
  {
    slug: "bk-architecture",
    index: "03",
    title: "BK Architecture",
    status: "Démo vitrine architecture · livrée",
    image: bkArchitectureCaptureHero,
    imageAlt:
      "BK Architecture — hero plein écran, atrium bois et promesse « formes fortes, élégance subtile »",
    liveUrl: "https://bk-architecture-eight.vercel.app",
    visualShell: "dark",
    card: {
      backdrop:
        "linear-gradient(140deg, #1F1812 0%, #413327 52%, #6C5640 100%)",
      ink: "light",
      tags: ["Architecture", "Site vitrine", "Branding"],
    },
    extraGallery: [
      {
        src: bkArchitectureCaptureDesign,
        alt: "Section « Basé sur le design » : intérieur bois, texte éditorial et CTA En savoir plus",
      },
      {
        src: bkArchitectureCaptureRealisations,
        alt: "Page Réalisations : grille photographique noir et blanc, typographie monumentale",
      },
      {
        src: bkArchitectureCaptureProcess,
        alt: "Parcours client en cinq étapes : découverte, concept, développement, permis et livraison",
      },
    ],
    caseStudy: {
      summary:
        "Démo de site vitrine pour cabinet d’architecture : hero immersif, section positionnement éditoriale, portfolio photographique et parcours client en cinq étapes — pensée pour inspirer confiance et désir avant la prise de contact.",
      context:
        "Cabinet positionné sur la conception et la restauration de projets haut de gamme. La démo doit montrer comment structurer une vitrine premium : promesse claire dès l’accueil, preuves visuelles fortes et méthode lisible sans surcharge ni effet « catalogue générique ».",
      problem:
        "Les sites d’architecture génériques alignent des photos sans hiérarchie ni fil narratif : l’impact se perd, le positionnement ne se lit pas. Le parcours client et la méthode sont souvent absents ou noyés dans des pages trop denses.",
      solution:
        "Accueil cinématique plein écran avec navigation Services / Réalisations / L’entreprise et accroche sur l’identité BK, section « Basé sur le design » avec visuel intérieur et texte d’accompagnement expert, page Réalisations en grille éditoriale noir et blanc, parcours en cinq étapes numérotées de la découverte à la livraison.",
      methodology:
        "Wireframes des quatre vues clés, direction typo uppercase sobre sur hero sombre puis interface claire et monumentale sur le portfolio. Composants réutilisables (hero plein écran, blocs éditoriaux, grille photo, liste numérotée) et recette responsive sur grands écrans et mobile.",
      deliverables: [
        "Hero accueil : navigation, promesse et mise en scène architecturale",
        "Section positionnement : storytelling, visuel fort et CTA discret",
        "Page réalisations : grille photographique et hiérarchie typographique",
        "Parcours client : cinq étapes de la découverte à la livraison",
      ],
      stack: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Images optimisées & déploiement statique / edge",
      ],
      outcomes:
        "Une démo convaincante pour prospects cabinets d’architecture : positionnement haut de gamme lisible en quelques secondes, portfolio percutant et méthode rassurante avant le premier échange.",
    },
  },
];

export function getRealisationBySlug(slug: string): Realisation | undefined {
  return REALISATIONS.find((r) => r.slug === slug);
}

/** Images sous l’étude de cas : uniquement les vues supplémentaires si présentes. */
export function getRealisationExtraGallery(
  r: Realisation,
): ReadonlyArray<GallerySlide> {
  return r.extraGallery ?? [];
}
