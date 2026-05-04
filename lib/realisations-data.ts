import type { StaticImageData } from "next/image";
import vitrineNuitCarte from "@/src/images/vitrine-nuit-carte.png";
import vitrineNuitHero from "@/src/images/vitrine-nuit-hero.png";
import vitrineNuit01 from "@/src/images/vitrine-nuit-01.png";
import vitrineNuit02 from "@/src/images/vitrine-nuit-02.png";
import vitrineNuit03 from "@/src/images/vitrine-nuit-03.png";
import vitrineNuit04 from "@/src/images/vitrine-nuit-04.png";
import vitrineNuit05 from "@/src/images/vitrine-nuit-05.png";
import realisations2 from "@/src/images/réalisations2.png";
import realisation3 from "@/src/images/réalisation3.png";
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
    slug: "site-vitrine-nuit",
    index: "01",
    title: "Site vitrine",
    status: "Vitrine web · livrée",
    image: vitrineNuitCarte,
    imageAlt:
      "Aperçu principal de la vitrine (réalisation 1) : mise en page sur fond sombre",
    visualShell: "dark",
    extraGallery: [
      {
        src: vitrineNuitHero,
        alt: "Variante ou vue plein écran de la page d’accueil vitrine",
      },
      {
        src: vitrineNuit01,
        alt: "Section présentation ou hero secondaire de la vitrine",
      },
      {
        src: vitrineNuit02,
        alt: "Bloc services ou offres, hiérarchie typographique sur fond nuit",
      },
      {
        src: vitrineNuit03,
        alt: "Détail de mise en page : cartes, repères visuels ou process",
      },
      {
        src: vitrineNuit04,
        alt: "Vue complémentaire du site : navigation ou pied de section",
      },
      {
        src: vitrineNuit05,
        alt: "Capture additionnelle : cohérence du thème sombre sur l’ensemble du parcours",
      },
    ],
    caseStudy: {
      summary:
        "Conception d’une vitrine « nuit » pour un positionnement premium : fond bleu-gris profond, contrastes maîtrisés et promesse lisible dès l’arrivée — pensée pour un décideur qui scanne la page en quelques secondes avant de prendre contact.",
      context:
        "Activité de services ou de création digitale avec besoin de crédibilité en ligne. Les échanges partent souvent de recommandations ; le site doit prolonger cette confiance et expliquer l’offre sans surcharge, y compris sur mobile où une partie du trafic arrive déjà.",
      problem:
        "Avant la refonte, la vitrine peinait à ordonner les messages : témoignages, offres et appels à l’action coexistaient sans ordre de lecture clair. Sur fond clair ou brouillon, l’identité forte ne ressortait pas ; le parcours vers la prise de rendez-vous ou le devis était trop long.",
      solution:
        "Nous avons calibré une ambiance sombre élégante — pas « gadget » — avec une hiérarchie explicite : accroche, preuves courtes, présentation des axes d’intervention puis CTA répété sans agressivité. Les blocs respirent, les dégradés et le vert signature servent le guidage du regard vers l’action.",
      methodology:
        "Arborescence validée sur prototypes, puis affinage des contrastes WCAG sur textes longs et boutons. Nous avons priorisé la vitesse perçue (chargement des sections hero, images optimisées) et un comportement homogène entre breakpoints pour éviter les ruptures de grilles au passage mobile.",
      deliverables: [
        "Maquettes desktop & mobile des pages clés de la vitrine",
        "Bibliothèque de composants (titres, cartes, CTA, listes à puces)",
        "Intégration responsive et recette navigateurs",
        "Fiches de contenu type pour faciliter les mises à jour post-livraison",
      ],
      stack: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Images optimisées & déploiement statique / edge",
      ],
      outcomes:
        "Une présence en ligne à la hauteur du positionnement : lecture fluide du début à la fin, contact jamais loin, et captures d’écran utilisables telles quelles pour la prospection ou les réseaux — sans reprendre toute la chaîne graphique à chaque campagne.",
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
    slug: "site-vitrine-chaleur",
    index: "03",
    title: "Site vitrine",
    status: "Vitrine web · livrée",
    image: realisation3,
    imageAlt: "Aperçu du site vitrine",
    visualShell: "warm",
    caseStudy: {
      summary:
        "Identité chaleureuse traduite dans une vitrine digitale : tons crème et orange, sections généreuses et mises en avant produit / offre pour un rendu à la fois humain et structuré.",
      context:
        "Marque orientée bien-être / lifestyle avec une offre claire mais un site trop neutre. Le trafic venait en partie des réseaux ; il fallait que la page d’accueil prolonge immédiatement l’univers des publications et renforce la confiance avant la conversion.",
      problem:
        "Palette et illustrations ne correspondaient pas à la tonalité des contenus sociaux. Les sections étaient uniformes, sans point de focalisation ; l’utilisateur ne distinguait pas les bénéfices clés ni l’ordre de lecture souhaité par la marque.",
      solution:
        "Construction par blocs thématiques : accroche émotionnelle, preuves courtes, offres mises en avant avec pictos légers et CTA visibles sans agressivité. Les oranges signature encadrent les zones d’action ; les fonds clairs gardent une impression premium et lisible.",
      methodology:
        "Alignement avec les guidelines print & réseaux existantes, puis variation contrôlée pour le web (contrastes, tailles de touche). Atelier mots-clés et tests de lecture sur mobile pour valider la longueur des paragraphes et la hiérarchie des titres.",
      deliverables: [
        "Adaptation UI de la marque au format web",
        "Page d’accueil et gabarits sectionnels réutilisables",
        "Formulaire et rappels de contact intégrés au design system",
        "Recommandations SEO on-page de base",
      ],
      stack: ["Next.js", "Composants accessibles", "Formulaires sécurisés"],
      outcomes:
        "Cohérence visuelle bout en bout : un visiteur qui arrive d’Instagram reconnaît la marque en quelques secondes et dispose d’un fil clair vers la prise de contact ou la découverte de l’offre phare.",
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
