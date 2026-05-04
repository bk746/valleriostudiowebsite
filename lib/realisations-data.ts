import type { StaticImageData } from "next/image";
import realisation1 from "@/src/images/réalisations1.png";
import realisation3 from "@/src/images/réalisation3.png";
import valerioShot1 from "@/src/images/valerio-realisation-1.png";
import valerioShot2 from "@/src/images/valerio-realisation-2.png";
import valerioShot3 from "@/src/images/valerio-realisation-3.png";
import valerioShot4 from "@/src/images/valerio-realisation.png";

export type CaseStudy = {
  problem: string;
  solution: string;
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
    image: realisation1,
    imageAlt: "Aperçu du site vitrine",
    visualShell: "dark",
    caseStudy: {
      problem:
        "Des offres fortes mais une présence web datée : peu de crédibilité auprès des prospects et aucune hiérarchie claire entre CTA et contenus.",
      solution:
        "Structure en blocs lisibles, contraste maîtrisé et parcours vers la prise de contact raccourci — le site porte l’identité sans la surcharger.",
    },
  },
  {
    slug: "portfolio-editorial",
    index: "02",
    title: "Portfolio éditorial",
    status: "Direction artistique · site livré",
    image: valerioShot1,
    imageAlt: "Accueil du portfolio : plein écran photo et navigation minimaliste",
    visualShell: "cream",
    extraGallery: [
      {
        src: valerioShot2,
        alt: "Vue projet : mise en page éditoriale et typographie serif",
      },
      {
        src: valerioShot3,
        alt: "Détail d'une section projet et hiérarchie visuelle",
      },
      {
        src: valerioShot4,
        alt: "Vue complémentaire du portfolio",
      },
    ],
    caseStudy: {
      problem:
        "Le travail était éparpillé entre PDF, réseaux et anciennes maquettes : peu lisible pour des marques premium, pas de fil narratif clair.",
      solution:
        "Parcours plein écran, grilles aérées et UI quasi invisible pour laisser l’image porter le discours — rythme pensé comme un magazine de luxe.",
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
      problem:
        "Une marque chaleureuse dont le site ne reflétait ni la palette ni le ton : sensation « générique » là où il fallait de la personnalité et de l’appétence.",
      solution:
        "Palette crème et orange affirmée, sections respirantes et médias mis en avant — le visiteur reconnaît la marque en quelques secondes.",
    },
  },
];

export function getRealisationBySlug(slug: string): Realisation | undefined {
  return REALISATIONS.find((r) => r.slug === slug);
}

export function getRealisationGallery(r: Realisation): ReadonlyArray<GallerySlide> {
  if (!r.extraGallery?.length) {
    return [{ src: r.image, alt: r.imageAlt }];
  }
  return [{ src: r.image, alt: r.imageAlt }, ...r.extraGallery];
}
