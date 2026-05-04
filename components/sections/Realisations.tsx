"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import { Bebas_Neue } from "next/font/google";
import realisation1 from "@/src/images/réalisations1.png";
import realisation3 from "@/src/images/réalisation3.png";
import valerioShot1 from "@/src/images/valerio-realisation-1.png";
import valerioShot2 from "@/src/images/valerio-realisation-2.png";
import valerioShot3 from "@/src/images/valerio-realisation-3.png";
import valerioShot4 from "@/src/images/valerio-realisation.png";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

type ProjectGallerySlide = {
  src: StaticImageData;
  alt: string;
};

type Project = {
  index: string;
  title: string;
  status: string;
  image?: StaticImageData;
  /** Plusieurs vues : carrousel horizontal dans la carte (prioritaire sur `image`). */
  gallery?: ReadonlyArray<ProjectGallerySlide>;
  imageAlt?: string;
  /** Court récit UX / conception pour la légende (optionnel). */
  caseStudy?: {
    problem: string;
    solution: string;
  };
  /** Cadre autour de la capture : `dark` (bleu nuit), `cream` (portfolio clair), `warm` (orange clair, sans ombre). */
  visualShell?: "dark" | "cream" | "warm";
};

const PROJECTS: ReadonlyArray<Project> = [
  {
    index: "01",
    title: "Site vitrine",
    status: "Vitrine web · livrée",
    image: realisation1,
    imageAlt: "Aperçu du site vitrine",
    visualShell: "dark",
  },
  {
    index: "02",
    title: "Portfolio éditorial",
    status: "Direction artistique · site livré",
    visualShell: "cream",
    gallery: [
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
    index: "03",
    title: "Site vitrine",
    status: "Vitrine web · livrée",
    image: realisation3,
    imageAlt: "Aperçu du site vitrine",
    visualShell: "warm",
  },
];

type ProjectWithImage = Project & {
  image: StaticImageData;
};

type ProjectWithGallery = Project & {
  gallery: ReadonlyArray<ProjectGallerySlide>;
};

function resolveVisualShell(p: Project): "dark" | "cream" | "warm" {
  return p.visualShell ?? "dark";
}

function hasGallery(p: Project): p is ProjectWithGallery {
  return Boolean(p.gallery && p.gallery.length > 0);
}

function VisualProjectCaption({
  title,
  status,
  caseStudy,
  bebasClassName,
}: {
  title: string;
  status: string;
  caseStudy?: Project["caseStudy"];
  bebasClassName: string;
}) {
  return (
    <figcaption className="absolute bottom-3 left-3 z-10 w-fit max-w-[calc(100%-1.5rem)] rounded-xl border border-white/12 bg-[rgba(8,10,14,0.87)] px-3.5 py-3 text-left backdrop-blur-md sm:bottom-4 sm:left-4 sm:max-w-[min(32rem,calc(100%-2rem))] sm:px-5 sm:py-4">
      <h3
        className={`${bebasClassName} m-0 text-[clamp(1.15rem,4.2vw,2.65rem)] font-normal uppercase leading-[0.96] tracking-[-0.02em] text-white`}
      >
        {title}
      </h3>
      <p className="mt-1 max-w-[28rem] font-sans text-[0.58rem] font-medium uppercase leading-relaxed tracking-[0.2em] text-white/92 sm:mt-1.5 sm:text-[0.64rem] sm:tracking-[0.22em]">
        {status}
      </p>
      {caseStudy ? (
        <div className="mt-2.5 border-t border-white/14 pt-2.5 sm:mt-3 sm:pt-3">
          <p className="m-0 font-sans text-[0.56rem] font-semibold uppercase tracking-[0.18em] text-white/55">
            Problématique
          </p>
          <p className="mt-1 m-0 max-w-[26rem] font-sans text-[0.62rem] font-normal leading-snug tracking-[0.02em] text-white/88 sm:text-[0.66rem] sm:leading-relaxed">
            {caseStudy.problem}
          </p>
          <p className="mt-2.5 m-0 font-sans text-[0.56rem] font-semibold uppercase tracking-[0.18em] text-white/55 sm:mt-3">
            Réponse
          </p>
          <p className="mt-1 m-0 max-w-[26rem] font-sans text-[0.62rem] font-normal leading-snug tracking-[0.02em] text-white/88 sm:text-[0.66rem] sm:leading-relaxed">
            {caseStudy.solution}
          </p>
        </div>
      ) : null}
    </figcaption>
  );
}

/** Carte « vitrine » : image maximale + légende sur pilule bas (contraste garanti). */
function VisualProjectFigure({
  project,
  sizes,
  priority,
  bebasClassName,
  shell = "dark",
}: {
  project: ProjectWithImage;
  sizes: string;
  priority?: boolean;
  bebasClassName: string;
  shell?: "dark" | "cream" | "warm";
}) {
  const insetRing =
    shell === "cream"
      ? "shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)]"
      : shell === "warm"
        ? ""
        : "shadow-[inset_0_0_0_1px_rgba(192,96,45,0.45)]";

  return (
    <figure
      className={`relative m-0 flex min-h-0 h-full w-full min-w-0 flex-1 overflow-hidden rounded-[1.1rem] sm:rounded-[1.6rem] ${insetRing}`}
    >
      <Image
        src={project.image}
        alt={project.imageAlt ?? project.title}
        fill
        className="object-cover object-top"
        sizes={sizes}
        priority={priority}
      />
      <VisualProjectCaption
        title={project.title}
        status={project.status}
        caseStudy={project.caseStudy}
        bebasClassName={bebasClassName}
      />
    </figure>
  );
}

/** Galerie horizontale (snap) : plusieurs captures pour une même étude de cas. */
function VisualProjectGalleryFigure({
  project,
  sizes,
  bebasClassName,
  shell = "cream",
}: {
  project: ProjectWithGallery;
  sizes: string;
  bebasClassName: string;
  shell?: "dark" | "cream" | "warm";
}) {
  const insetRing =
    shell === "cream"
      ? "shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)]"
      : shell === "warm"
        ? ""
        : "shadow-[inset_0_0_0_1px_rgba(192,96,45,0.45)]";

  return (
    <figure
      className={`relative m-0 flex min-h-0 h-full w-full min-w-0 flex-1 flex-col overflow-hidden rounded-[1.1rem] sm:rounded-[1.6rem] ${insetRing}`}
    >
      <div
        className="relative min-h-0 flex-1 overflow-y-hidden overflow-x-auto scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        tabIndex={0}
        aria-label="Vues du projet — faire défiler horizontalement"
      >
        <div className="flex h-full w-full">
          {project.gallery.map((slide, i) => (
            <div
              key={`slide-${i}`}
              className="relative h-full min-h-[200px] w-full min-w-full shrink-0 snap-center"
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover object-top"
                sizes={sizes}
                priority={i === 0}
              />
            </div>
          ))}
        </div>
      </div>
      <span
        className="pointer-events-none absolute right-3 top-14 z-[9] font-sans text-[0.5rem] font-medium uppercase tracking-[0.28em] text-white/40 sm:bottom-[6.25rem] sm:top-auto sm:text-[0.55rem]"
        aria-hidden
      >
        Faire défiler →
      </span>
      <VisualProjectCaption
        title={project.title}
        status={project.status}
        caseStudy={project.caseStudy}
        bebasClassName={bebasClassName}
      />
    </figure>
  );
}

export default function Realisations() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [maxShift, setMaxShift] = useState(0);
  const [shift, setShift] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Détection mobile (pointeur grossier) — détermine quel mode de défilement
  // utiliser. Sur mobile : scroll horizontal natif avec scroll-snap (zéro JS
  // au scroll vertical). Sur desktop : pin vertical + translate horizontal.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(pointer: coarse)");
    const apply = () => setIsMobile(mql.matches);
    apply();
    mql.addEventListener("change", apply);
    return () => mql.removeEventListener("change", apply);
  }, []);

  // Mesure la distance horizontale à parcourir pour faire défiler toutes les cartes.
  // Inutile en mobile (scroll natif).
  useEffect(() => {
    if (isMobile) {
      setMaxShift(0);
      return;
    }
    let raf = 0;
    const measure = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const track = trackRef.current;
        if (!track) return;
        const ms = Math.max(0, track.scrollWidth - window.innerWidth);
        setMaxShift(ms);
      });
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [isMobile]);

  // Pilote le translate horizontal du track selon la progression du scroll vertical.
  // La section est en sticky-inner : la fenêtre reste pinned tant qu'on n'a pas
  // parcouru tout maxShift en scroll, le track glisse alors vers la gauche.
  // Désactivé en mobile pour laisser le scroll horizontal natif faire le travail
  // (zéro listener scroll vertical = zéro jank au swipe).
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isMobile) {
      setShift(0);
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShift(0);
      return;
    }
    if (maxShift === 0) return;

    let raf = 0;
    const compute = () => {
      const sec = sectionRef.current;
      if (!sec) return;
      const scrolled = -sec.getBoundingClientRect().top;
      const p = Math.max(0, Math.min(1, scrolled / maxShift));
      setShift(-p * maxShift);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [maxShift, isMobile]);

  // Hauteur totale (desktop) = viewport + maxShift (durée du défilement horizontal)
  // + 100dvh de buffer : pendant ce buffer, la section reste pinned avec la dernière
  // carte affichée pendant que la section CTA suivante remonte par-dessus.
  // Mobile : auto (la section a la hauteur naturelle de son contenu).
  const minHeight = isMobile
    ? "auto"
    : maxShift > 0
      ? `calc(200dvh + ${maxShift}px)`
      : "100dvh";

  const isVisualCard = (p: Project) =>
    Boolean(p.image) || hasGallery(p);

  return (
    <section
      id="realisations"
      ref={sectionRef}
      className="relative z-30 w-full bg-[#FDF6EC]"
      style={{ minHeight }}
      aria-label="Réalisations"
    >
      <div
        className={
          "flex w-full flex-col text-[#0C4323]" +
          (isMobile
            ? " py-12"
            : " sticky top-0 h-[100svh] overflow-hidden")
        }
      >
        {/* ── HEADER ───────────────────────────────────────── */}
        <header
          className={`${bebas.className} px-5 pt-24 sm:px-8 sm:pt-28 md:px-12 md:pt-32`}
        >
          <div className="mb-3 flex flex-wrap items-baseline justify-between gap-3 sm:mb-4">
            <h2 className="m-0 text-[clamp(2.4rem,7vw,7.5rem)] font-normal uppercase leading-[0.92] tracking-[-0.015em] sm:leading-[0.86]">
              Réalisations
            </h2>
            <span className="hidden font-sans text-[0.6rem] font-medium uppercase tracking-[0.28em] opacity-60 sm:inline-block sm:text-[0.68rem]">
              Projets sélectionnés
            </span>
          </div>
          <div className="h-[2px] bg-[#0C4323]" />
        </header>

        {/* ── TRACK HORIZONTAL ─────────────────────────────── */}
        {isMobile ? (
          <div
            className="realisations-track-mobile flex w-full snap-x snap-mandatory items-stretch gap-4 overflow-x-auto px-5 py-8"
            style={{ scrollPaddingLeft: "1.25rem" }}
          >
            {PROJECTS.map((p) => {
              const visual = isVisualCard(p);
              const shell = resolveVisualShell(p);
              return (
              <article
                key={p.index}
                className={
                  "relative flex min-h-0 shrink-0 snap-start flex-col overflow-hidden rounded-2xl " +
                  (visual
                    ? shell === "cream"
                      ? "bg-[#EDEAE4] text-[#141414] shadow-[0_28px_55px_-28px_rgba(0,0,0,0.14)] h-[min(92svh,840px)] w-[92vw] p-1.5 sm:rounded-3xl"
                      : shell === "warm"
                        ? "bg-[#FFE8D4] text-[#3d1f12] shadow-none h-[min(92svh,840px)] w-[92vw] p-1.5 sm:rounded-3xl"
                        : "bg-[#1a222d] text-white shadow-[0_28px_70px_-28px_rgba(0,0,0,0.55)] h-[min(92svh,840px)] w-[92vw] p-1.5 sm:rounded-3xl"
                    : "bg-[#156332] text-[#FDF6EC] shadow-[0_28px_70px_-32px_rgba(0,0,0,0.42)] aspect-[3/4] w-[80vw] gap-3 p-6 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.4)]")
                }
              >
                {!visual ? (
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className={`${bebas.className} text-[0.85rem] uppercase tracking-[0.22em] opacity-70`}
                    >
                      {p.index} / {String(PROJECTS.length).padStart(2, "0")}
                    </span>
                  </div>
                ) : null}

                {visual && hasGallery(p) ? (
                  <VisualProjectGalleryFigure
                    project={p}
                    sizes="92vw"
                    bebasClassName={bebas.className}
                    shell={shell}
                  />
                ) : null}
                {visual && p.image && !hasGallery(p) ? (
                  <VisualProjectFigure
                    project={{ ...p, image: p.image }}
                    sizes="92vw"
                    priority={p.index === "01"}
                    bebasClassName={bebas.className}
                    shell={shell}
                  />
                ) : null}

                {!visual ? (
                  <div className="mt-auto flex items-end justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`${bebas.className} m-0 text-[clamp(2rem,11vw,4rem)] uppercase leading-[0.95] tracking-[-0.01em]`}
                      >
                        {p.title}
                      </h3>
                      <p className="mt-3 inline-flex flex-wrap items-center gap-2 font-sans text-[0.7rem] font-medium uppercase tracking-[0.18em] opacity-80">
                        {p.status}
                        <span aria-hidden className="text-sm">
                          →
                        </span>
                      </p>
                    </div>
                    <span
                      aria-hidden
                      className={`${bebas.className} pointer-events-none select-none text-[clamp(5rem,28vw,12rem)] leading-none opacity-[0.06]`}
                    >
                      {p.index}
                    </span>
                  </div>
                ) : null}
              </article>
            );
            })}
          </div>
        ) : (
          <div className="relative flex-1 overflow-hidden">
            <div
              ref={trackRef}
              className="flex h-full items-stretch gap-[3vw] px-5 py-6 will-change-transform sm:gap-[2.5vw] sm:px-[4vw] sm:py-10 md:py-12"
              style={{ transform: `translate3d(${shift}px, 0, 0)` }}
            >
              {PROJECTS.map((p) => {
                const visual = isVisualCard(p);
                const shell = resolveVisualShell(p);
                return (
                <article
                  key={p.index}
                  className={
                    "relative flex h-full min-h-0 shrink-0 flex-col overflow-hidden rounded-2xl " +
                    (visual
                      ? shell === "cream"
                        ? "bg-[#EDEAE4] text-[#141414] shadow-[0_28px_56px_-28px_rgba(0,0,0,0.16)] w-[86vw] p-1.5 sm:w-[88vw] sm:rounded-3xl sm:p-2"
                        : shell === "warm"
                          ? "bg-[#FFE8D4] text-[#3d1f12] shadow-none w-[86vw] p-1.5 sm:w-[88vw] sm:rounded-3xl sm:p-2"
                          : "bg-[#1a222d] text-white shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)] w-[86vw] p-1.5 sm:w-[88vw] sm:rounded-3xl sm:p-2"
                      : "bg-[#156332] text-[#FDF6EC] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.45)] w-[86vw] gap-4 p-6 sm:w-[88vw] sm:gap-6 sm:rounded-3xl sm:p-12 md:p-16")
                  }
                >
                  {!visual ? (
                    <div className="flex items-start justify-between gap-4">
                      <span
                        className={`${bebas.className} text-[0.85rem] uppercase tracking-[0.22em] opacity-70 sm:text-[1.05rem]`}
                      >
                        {p.index} / {String(PROJECTS.length).padStart(2, "0")}
                      </span>
                      <span className="hidden font-sans text-[0.65rem] font-medium uppercase tracking-[0.22em] opacity-60 sm:inline-block sm:text-[0.7rem]">
                        Étude de cas
                      </span>
                    </div>
                  ) : null}

                  {visual && hasGallery(p) ? (
                    <VisualProjectGalleryFigure
                      project={p}
                      sizes="(max-width: 1280px) 88vw, 1100px"
                      bebasClassName={bebas.className}
                      shell={shell}
                    />
                  ) : null}
                  {visual && p.image && !hasGallery(p) ? (
                    <VisualProjectFigure
                      project={{ ...p, image: p.image }}
                      sizes="(max-width: 1280px) 88vw, 1100px"
                      priority={p.index === "01"}
                      bebasClassName={bebas.className}
                      shell={shell}
                    />
                  ) : null}

                  {!visual ? (
                    <div className="mt-auto flex items-end justify-between gap-4 sm:gap-8">
                      <div className="flex-1 min-w-0">
                        <h3
                          className={`${bebas.className} m-0 text-[clamp(2rem,6.4vw,6.5rem)] uppercase leading-[0.92] tracking-[-0.005em] sm:leading-[0.88]`}
                        >
                          {p.title}
                        </h3>
                        <p className="mt-4 inline-flex flex-wrap items-center gap-2 font-sans text-[0.7rem] font-medium uppercase tracking-[0.18em] opacity-80 sm:mt-5 sm:gap-3 sm:text-[0.85rem] sm:tracking-[0.22em]">
                          {p.status}
                          <span aria-hidden className="text-sm sm:text-base">
                            →
                          </span>
                        </p>
                      </div>
                      <span
                        aria-hidden
                        className={`${bebas.className} pointer-events-none select-none text-[clamp(5rem,18vw,18rem)] leading-none opacity-[0.06]`}
                      >
                        {p.index}
                      </span>
                    </div>
                  ) : null}
                </article>
              );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
