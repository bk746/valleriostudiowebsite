"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Bebas_Neue } from "next/font/google";
import type { Realisation } from "@/lib/realisations-data";
import { REALISATIONS } from "@/lib/realisations-data";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

function resolveVisualShell(p: Realisation): "dark" | "cream" | "warm" {
  return p.visualShell ?? "dark";
}

function VisualProjectCaption({
  title,
  status,
  bebasClassName,
}: {
  title: string;
  status: string;
  bebasClassName: string;
}) {
  return (
    <figcaption className="absolute bottom-3 left-3 z-10 w-fit max-w-[calc(100%-1.5rem)] rounded-xl border border-white/12 bg-[rgba(8,10,14,0.87)] px-3.5 py-3 text-left backdrop-blur-md sm:bottom-4 sm:left-4 sm:max-w-[min(26rem,calc(100%-2rem))] sm:px-5 sm:py-4">
      <h3
        className={`${bebasClassName} m-0 text-[clamp(1.15rem,4.2vw,2.65rem)] font-normal uppercase leading-[0.96] tracking-[-0.02em] text-white`}
      >
        {title}
      </h3>
      <p className="mt-1 max-w-[28rem] font-sans text-[0.58rem] font-medium uppercase leading-relaxed tracking-[0.2em] text-white/92 sm:mt-1.5 sm:text-[0.64rem] sm:tracking-[0.22em]">
        {status}
      </p>
      <p className="mt-2 m-0 font-sans text-[0.52rem] font-medium uppercase tracking-[0.24em] text-white/55">
        Voir l’étude de cas →
      </p>
    </figcaption>
  );
}

/** Carte cliquable : aperçu + lien vers `/realisations/[slug]`. */
function VisualProjectFigure({
  project,
  sizes,
  priority,
  bebasClassName,
  shell = "dark",
}: {
  project: Realisation;
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
        alt={project.imageAlt}
        fill
        className="object-cover object-top motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:scale-[1.02]"
        sizes={sizes}
        priority={priority}
      />
      <VisualProjectCaption
        title={project.title}
        status={project.status}
        bebasClassName={bebasClassName}
      />
    </figure>
  );
}

function cardShellClasses(shell: "dark" | "cream" | "warm", desktop: boolean): string {
  const h = desktop
    ? ""
    : "h-[min(92svh,840px)] w-[92vw]";
  const w = desktop ? "w-[86vw] p-1.5 sm:w-[88vw] sm:rounded-3xl sm:p-2" : "p-1.5 sm:rounded-3xl";

  if (shell === "cream") {
    return desktop
      ? `bg-[#EDEAE4] text-[#141414] shadow-[0_28px_56px_-28px_rgba(0,0,0,0.16)] ${w}`
      : `bg-[#EDEAE4] text-[#141414] shadow-[0_28px_55px_-28px_rgba(0,0,0,0.14)] ${h} w-[92vw] p-1.5 sm:rounded-3xl`;
  }
  if (shell === "warm") {
    return desktop
      ? `bg-[#FFE8D4] text-[#3d1f12] shadow-none ${w}`
      : `bg-[#FFE8D4] text-[#3d1f12] shadow-none ${h} w-[92vw] p-1.5 sm:rounded-3xl`;
  }
  return desktop
    ? `bg-[#1a222d] text-white shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)] ${w}`
    : `bg-[#1a222d] text-white shadow-[0_28px_70px_-28px_rgba(0,0,0,0.55)] ${h} w-[92vw] p-1.5 sm:rounded-3xl`;
}

export default function Realisations() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [maxShift, setMaxShift] = useState(0);
  const [shift, setShift] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(pointer: coarse)");
    const apply = () => setIsMobile(mql.matches);
    apply();
    mql.addEventListener("change", apply);
    return () => mql.removeEventListener("change", apply);
  }, []);

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

  const minHeight = isMobile
    ? "auto"
    : maxShift > 0
      ? `calc(200dvh + ${maxShift}px)`
      : "100dvh";

  const renderCard = (p: Realisation, layout: "mobile" | "desktop") => {
    const shell = resolveVisualShell(p);
    const shellCls = cardShellClasses(shell, layout === "desktop");
    const sizes =
      layout === "mobile" ? "92vw" : "(max-width: 1280px) 88vw, 1100px";

    const inner = (
      <>
        <VisualProjectFigure
          project={p}
          sizes={sizes}
          priority={p.index === "01"}
          bebasClassName={bebas.className}
          shell={shell}
        />
        <span className="sr-only">Ouvrir la page projet : {p.title}</span>
      </>
    );

    const baseArticle =
      "relative flex min-h-0 flex-col overflow-hidden rounded-2xl ";

    if (layout === "mobile") {
      return (
        <Link
          key={p.slug}
          href={`/realisations/${p.slug}`}
          className={`group ${baseArticle} ${shellCls} shrink-0 snap-start outline-none focus-visible:ring-2 focus-visible:ring-[#0C4323] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDF6EC]`}
          aria-label={`Voir le projet : ${p.title}`}
        >
          {inner}
        </Link>
      );
    }

    return (
      <Link
        key={p.slug}
        href={`/realisations/${p.slug}`}
        className={`group ${baseArticle} ${shellCls} h-full min-h-0 shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[#0C4323] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDF6EC]`}
        aria-label={`Voir le projet : ${p.title}`}
      >
        {inner}
      </Link>
    );
  };

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

        {isMobile ? (
          <div
            className="realisations-track-mobile flex w-full snap-x snap-mandatory items-stretch gap-4 overflow-x-auto px-5 py-8"
            style={{ scrollPaddingLeft: "1.25rem" }}
          >
            {REALISATIONS.map((p) => renderCard(p, "mobile"))}
          </div>
        ) : (
          <div className="relative flex-1 overflow-hidden">
            <div
              ref={trackRef}
              className="flex h-full items-stretch gap-[3vw] px-5 py-6 will-change-transform sm:gap-[2.5vw] sm:px-[4vw] sm:py-10 md:py-12"
              style={{ transform: `translate3d(${shift}px, 0, 0)` }}
            >
              {REALISATIONS.map((p) => renderCard(p, "desktop"))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
