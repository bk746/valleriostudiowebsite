import type { StaticImageData } from "next/image";
import elegenciaCaptureHero from "@/src/images/elegencia-capture-hero.png";
import elegenciaCaptureProperties from "@/src/images/elegencia-capture-properties.png";
import elegenciaCaptureAgency from "@/src/images/elegencia-capture-agency.png";
import realisations2 from "@/src/images/réalisations2.png";
import dashboardCaptureOverview from "@/src/images/dashboard-capture-01.png";
import dashboardCaptureFinance from "@/src/images/dashboard-capture-02.png";
import dashboardCaptureObjectifs from "@/src/images/dashboard-capture-03.png";
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
    image: realisations2,
    imageAlt:
      "Avero — plein écran montagne, typo serif et accroche « Les sommets du monde »",
    liveUrl: "https://avero-kappa.vercel.app",
    visualShell: "cream",
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
    slug: "dashboard-finance",
    index: "03",
    title: "Dashboard",
    status: "Démo app métier · livrée",
    image: dashboardCaptureOverview,
    imageAlt:
      "Tableau de bord : vue d’ensemble CA, clients actifs, objectifs et navigation modules",
    visualShell: "cream",
    extraGallery: [
      {
        src: dashboardCaptureFinance,
        alt: "Module Finance : synthèse encaissé, dépenses, factures et liste filtrable",
      },
      {
        src: dashboardCaptureObjectifs,
        alt: "Module Objectifs : progression globale, cartes par cible et barres de suivi",
      },
    ],
    caseStudy: {
      summary:
        "Démo de tableau de bord métier : vue d’ensemble, module finance et suivi des objectifs — pensée pour remplacer les tableurs et donner une lecture immédiate de l’activité avant chaque décision.",
      context:
        "Structure en croissance (freelance, studio ou TPE) avec besoin de visibilité financière et commerciale. La démo doit montrer comment centraliser CA, facturation, dépenses et objectifs annuels dans une interface claire, sans surcharge ni allers-retours entre fichiers.",
      problem:
        "Les outils génériques éclatent les données entre tableurs, factures et notes : pas de vue unique, pas de lecture immédiate des impayés ni de la progression vers les objectifs. Les relances et le suivi des dépenses demandent trop de manipulations manuelles.",
      solution:
        "Accueil synthétique avec graphique CA 12 mois, KPI encaissé et clients actifs, module Finance avec synthèse encaissé/dépenses, factures et liste filtrable, module Objectifs avec progression globale, cartes par cible et barres de suivi. Navigation latérale stable et parcours « ajouter une dépense » explicites.",
      methodology:
        "Wireframes des trois vues clés, direction UI sobre sur fond clair avec cartes KPI et badges d’état. Composants réutilisables (graphiques, tableaux, progress bars, formulaires) et recette responsive sur desktop et tablette.",
      deliverables: [
        "Vue d’ensemble : graphique CA, KPI encaissé et clients actifs",
        "Module Finance : synthèse, dépenses, factures et recherche",
        "Module Objectifs : progression globale, cartes par cible et liste détaillée",
        "Design system UI (cartes, badges, navigation latérale, formulaires)",
      ],
      stack: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Graphiques & tableaux interactifs",
      ],
      outcomes:
        "Une démo convaincante pour prospects TPE et indépendants : pilotage lisible en quelques secondes, finance et objectifs centralisés — moins de friction opérationnelle au quotidien.",
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
