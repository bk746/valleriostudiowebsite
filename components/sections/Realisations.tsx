"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import { Bebas_Neue } from "next/font/google";
import realisation1 from "@/src/images/réalisations1.png";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

type Project = {
  index: string;
  title: string;
  status: string;
  image?: StaticImageData;
  imageAlt?: string;
};

const PROJECTS: ReadonlyArray<Project> = [
  {
    index: "01",
    title: "Site vitrine",
    status: "Vitrine web · livrée",
    image: realisation1,
    imageAlt: "Aperçu du site vitrine",
  },
  {
    index: "02",
    title: "Projet à venir",
    status: "À découvrir bientôt",
  },
  {
    index: "03",
    title: "Projet à venir",
    status: "À découvrir bientôt",
  },
];

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
              {PROJECTS.length} projets en préparation
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
              const isVisualCard = Boolean(p.image);
              return (
              <article
                key={p.index}
                className={
                  "relative flex min-h-0 shrink-0 snap-start flex-col overflow-hidden rounded-2xl bg-[#156332] text-[#FDF6EC] " +
                  (isVisualCard
                    ? "h-[min(90svh,780px)] w-[92vw] gap-2 p-2 sm:h-full sm:min-h-0 sm:w-[88vw] sm:gap-3 sm:rounded-3xl sm:p-5 md:p-6"
                    : "aspect-[3/4] w-[80vw] gap-3 p-6")
                }
              >
                {!isVisualCard ? (
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className={`${bebas.className} text-[0.85rem] uppercase tracking-[0.22em] opacity-70`}
                    >
                      {p.index} / {String(PROJECTS.length).padStart(2, "0")}
                    </span>
                  </div>
                ) : null}

                {p.image ? (
                  <div className="relative min-h-0 w-full flex-1 overflow-hidden rounded-lg bg-black/10 sm:rounded-2xl">
                    <Image
                      src={p.image}
                      alt={p.imageAlt ?? ""}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 640px) 92vw, 88vw"
                      priority={p.index === "01"}
                    />
                  </div>
                ) : null}

                <div
                  className={
                    isVisualCard
                      ? "shrink-0"
                      : "mt-auto flex items-end justify-between gap-4"
                  }
                >
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`${bebas.className} m-0 uppercase leading-[0.95] tracking-[-0.01em] ${
                        isVisualCard
                          ? "text-[clamp(1.05rem,3.8vw,2rem)]"
                          : "text-[clamp(2rem,11vw,4rem)]"
                      }`}
                    >
                      {p.title}
                    </h3>
                    <p
                      className={
                        isVisualCard
                          ? "mt-1 font-sans text-[0.58rem] font-medium uppercase leading-tight tracking-[0.16em] opacity-70"
                          : "mt-3 inline-flex flex-wrap items-center gap-2 font-sans text-[0.7rem] font-medium uppercase tracking-[0.18em] opacity-80"
                      }
                    >
                      {p.status}
                      {!isVisualCard ? (
                        <span aria-hidden className="text-sm">
                          →
                        </span>
                      ) : null}
                    </p>
                  </div>
                  {!isVisualCard ? (
                    <span
                      aria-hidden
                      className={`${bebas.className} pointer-events-none select-none text-[clamp(5rem,28vw,12rem)] leading-none opacity-[0.06]`}
                    >
                      {p.index}
                    </span>
                  ) : null}
                </div>
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
                const isVisualCard = Boolean(p.image);
                return (
                <article
                  key={p.index}
                  className={
                    "relative flex h-full min-h-0 shrink-0 flex-col overflow-hidden rounded-2xl bg-[#156332] text-[#FDF6EC] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.45)] " +
                    (isVisualCard
                      ? "w-[86vw] gap-2 p-3 sm:w-[88vw] sm:gap-3 sm:rounded-3xl sm:p-5 md:p-6"
                      : "w-[86vw] gap-4 p-6 sm:w-[88vw] sm:gap-6 sm:rounded-3xl sm:p-12 md:p-16")
                  }
                >
                  {!isVisualCard ? (
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

                  {p.image ? (
                    <div className="relative min-h-0 w-full flex-1 overflow-hidden rounded-xl bg-black/10 sm:rounded-2xl">
                      <Image
                        src={p.image}
                        alt={p.imageAlt ?? ""}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 1280px) 88vw, 1100px"
                        priority={p.index === "01"}
                      />
                    </div>
                  ) : null}

                  <div
                    className={
                      isVisualCard
                        ? "shrink-0"
                        : "mt-auto flex items-end justify-between gap-4 sm:gap-8"
                    }
                  >
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`${bebas.className} m-0 uppercase tracking-[-0.01em] sm:leading-[0.88] ${
                          isVisualCard
                            ? "text-[clamp(1.15rem,2.8vw,2.35rem)] leading-[0.95]"
                            : "leading-[0.92] text-[clamp(2rem,6.4vw,6.5rem)]"
                        }`}
                      >
                        {p.title}
                      </h3>
                      <p
                        className={
                          isVisualCard
                            ? "mt-1 font-sans text-[0.6rem] font-medium uppercase leading-tight tracking-[0.18em] opacity-70 sm:text-[0.62rem]"
                            : "mt-4 inline-flex flex-wrap items-center gap-2 font-sans text-[0.7rem] font-medium uppercase tracking-[0.18em] opacity-80 sm:mt-5 sm:gap-3 sm:text-[0.85rem] sm:tracking-[0.22em]"
                        }
                      >
                        {p.status}
                        {!isVisualCard ? (
                          <span aria-hidden className="text-sm sm:text-base">
                            →
                          </span>
                        ) : null}
                      </p>
                    </div>
                    {!isVisualCard ? (
                      <span
                        aria-hidden
                        className={`${bebas.className} pointer-events-none select-none text-[clamp(5rem,18vw,18rem)] leading-none opacity-[0.06]`}
                      >
                        {p.index}
                      </span>
                    ) : null}
                  </div>
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
