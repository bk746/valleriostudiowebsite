import type { StaticImageData } from "next/image";
import nexusCaptureHero from "@/src/images/nexus-capture-hero.png";
import nexusCaptureAbout from "@/src/images/nexus-capture-01.png";
import nexusCaptureServices from "@/src/images/nexus-capture-02.png";
import nexusCaptureProjects from "@/src/images/nexus-capture-03.png";
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
  caseStudy?: CaseStudy;
  visualShell?: "dark" | "cream" | "warm";
};

export const REALISATIONS: ReadonlyArray<Realisation> = [
  {
    slug: "nexus-tp",
    index: "01",
    title: "Nexus TP",
    status: "Site vitrine · livrée",
    image: nexusCaptureHero,
    imageAlt:
      "Capture d’écran du site Nexus TP : page d’accueil, hero chantier et appels à l’action",
    visualShell: "dark",
    extraGallery: [
      {
        src: nexusCaptureAbout,
        alt: "Page à propos Nexus TP : photo chantier, chiffres clés et promesse",
      },
      {
        src: nexusCaptureServices,
        alt: "Page services Nexus TP : grille des prestations en travaux publics",
      },
      {
        src: nexusCaptureProjects,
        alt: "Page réalisations Nexus TP : projets de terrassement et galerie chantiers",
      },
    ],
    caseStudy: {
      summary:
        "Vitrine pour Nexus TP, entreprise de travaux publics : thème sombre, orange signature et grille de services lisible en un scroll — pensée pour rassurer particuliers et pros avant la prise de contact.",
      context:
        "Terrassement, VRD et aménagement extérieur sur toute la région. Le site doit valoriser l’expérience terrain (chantiers, flotte, sécurité) et structurer six prestations clés sans noyer le visiteur dans le jargon.",
      problem:
        "L’ancienne présence en ligne ne reflétait pas le niveau d’exigence chantier ni la clarté attendue sur mobile. Les offres étaient difficiles à comparer ; le parcours vers le devis ou la discussion projet manquait de repères visuels forts.",
      solution:
        "Direction sombre premium avec contrastes WCAG, pictos ligne orange et cartes services homogènes. Navigation épurée (Accueil, À propos, Services, Réalisations, Contact) et CTA contact toujours visible pour capter les demandes locales.",
      methodology:
        "Atelier contenu par prestation, maquettes desktop & mobile, puis intégration composants réutilisables (hero, stats, grilles, CTA). Recette sur breakpoints et optimisation des visuels chantier pour un chargement rapide.",
      deliverables: [
        "Pages clés : accueil, à propos, services, réalisations, contact",
        "Grille de 6 prestations avec pictogrammes et descriptions",
        "Composants UI (navigation, boutons, cartes, chiffres clés)",
        "Intégration responsive et assets optimisés",
      ],
      stack: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Images optimisées & déploiement statique / edge",
      ],
      outcomes:
        "Une vitrine alignée sur l’identité Nexus TP : services compris en quelques secondes, crédibilité renforcée sur chantier et formulaire de contact à portée de clic sur tous les écrans.",
    },
  },
  {
    slug: "portfolio-editorial",
    index: "02",
    title: "Portfolio éditorial",
    status: "Direction artistique · site livré",
    image: realisations2,
    imageAlt:
      "Portfolio éditorial — plein écran montagne, typo serif et accroche « Les sommets du monde »",
    visualShell: "cream",
    extraGallery: [
      {
        src: valerioShot1,
        alt: "Accueil du portfolio : plein écran photo et navigation minimaliste",
      },
      {
        src: valerioShot2,
        alt: "Vue projet : mise en page éditoriale et typographie serif",
      },
      {
        src: valerioShot3,
        alt: "Détail d'une section projet et hiérarchie visuelle",
      },
    ],
    caseStudy: {
      summary:
        "Direction artistique et expérience immersive pour un portfolio haut de gamme : plein écran, rythme de scroll calibré et typo serif comme fil conducteur, pensé pour convaincre des directeurs de création et des marques lifestyle.",
      context:
        "Portfolio destiné à la prise de contact avec des annonceurs exigeants. Le travail existant était dispersé sur plusieurs supports ; l’enjeu était de présenter des campagnes et des shootings comme une collection cohérente, sans effet « carrousel générique ».",
      problem:
        "Les visuels fort impact perdaient en densité lorsqu’ils étaient traités comme des vignettes. Les textes d’accompagnement manquaient de hiérarchie ; le positionnement « luxe / outdoor » ne se lisait pas immédiatement dans la structure de page.",
      solution:
        "Scénarisation type magazine : grands aplats photo, titres serif affirmés, légendes discrètes et navigation presque invisible pour laisser respirer les images. Chaque projet ouvre sur une séquence hero avant de déployer le détail — le visiteur comprend le niveau de finition avant même de scroller.",
      methodology:
        "Moodboard et grille éditoriale validés avant le design fini ; définition d’une échelle typographique stricte et de règles de recadrage photo. Tests sur plusieurs formats d’écran pour conserver l’intention « cinéma » sans sacrifier la lisibilité des crédits et des crédits projet.",
      deliverables: [
        "Direction artistique web & charte de mise en page",
        "Composants éditoriaux (hero, collections, pages cas)",
        "Intégration des médias haute définition et optimisations",
        "Documentation pour ajouter un nouveau projet sans casser la grille",
      ],
      stack: [
        "Next.js",
        "Gestion d’images responsive & formats modernes",
        "Animations CSS ciblées",
        "CI / déploiement continu",
      ],
      outcomes:
        "Une vitrine à la hauteur du créatif présenté : premier contact mémorable, crédibilité renforcée auprès des marques premium et base solide pour montrer de nouveaux travaux en quelques heures plutôt qu’en plusieurs jours de mise en page manuelle.",
    },
  },
  {
    slug: "dashboard-finance",
    index: "03",
    title: "Dashboard",
    status: "App métier · livrée",
    image: dashboardCaptureOverview,
    imageAlt:
      "Tableau de bord : vue d’ensemble CA, clients actifs, objectifs et navigation modules",
    visualShell: "cream",
    extraGallery: [
      {
        src: dashboardCaptureFinance,
        alt: "Module finance : synthèse encaissé, dépenses, factures et liste des dépenses",
      },
      {
        src: dashboardCaptureObjectifs,
        alt: "Module objectifs : progression globale, cartes par cible et liste détaillée",
      },
    ],
    caseStudy: {
      summary:
        "Tableau de bord sur-mesure pour piloter l’activité : CA, facturation, dépenses, clients et objectifs annuels — une interface claire qui remplace les tableurs et les allers-retours entre outils.",
      context:
        "Structure en croissance (freelance, studio ou TPE) avec besoin de visibilité financière et commerciale. Les données étaient éclatées entre factures, fichiers et notes ; il manquait une vue unique pour décider vite.",
      problem:
        "Pas de lecture immédiate du chiffre d’affaires encaissé, des impayés ou de la progression vers les objectifs CA et clients. Les relances et le suivi des dépenses demandaient trop de manipulations manuelles.",
      solution:
        "Dashboard modulaire : accueil synthétique (évolution du CA, encaissements, clients actifs), espaces Finance et Objectifs dédiés, cartes KPI colorées et tableaux filtrables. Navigation latérale stable et parcours « ajouter une dépense » / factures explicites.",
      methodology:
        "Atelier des indicateurs prioritaires, wireframes des vues Accueil / Finance / Objectifs, puis design system (violet & rose, cartes arrondies, badges d’état). Intégration composants data-viz et formulaires, tests de lisibilité des montants et des progress bars.",
      deliverables: [
        "Vue d’ensemble : graphique CA 12 mois, KPI encaissé et clients",
        "Module Finance : synthèse, dépenses, factures et recherche",
        "Module Objectifs : progression globale, cartes par cible, liste détaillée",
        "Navigation latérale et raccourcis vers clients, deals et paramètres",
      ],
      stack: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Graphiques & tableaux interactifs",
      ],
      outcomes:
        "Pilotage en un coup d’œil : objectifs financiers et clients suivis en temps réel, facturation et dépenses centralisées — moins de friction opérationnelle au quotidien.",
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
