"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Bebas_Neue } from "next/font/google";
import { NEXT_IMAGE_QUALITY_RASTER } from "@/lib/image-defaults";
import type { Realisation } from "@/lib/realisations-data";
import { REALISATIONS } from "@/lib/realisations-data";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

function projectHost(project: Realisation): string {
  if (!project.liveUrl) return `${project.slug}.vallerio.studio`;
  try {
    return new URL(project.liveUrl).host;
  } catch {
    return project.liveUrl;
  }
}

function ProjectCard({
  project,
  sizes,
  priority,
  layout,
}: {
  project: Realisation;
  sizes: string;
  priority?: boolean;
  layout: "mobile" | "desktop";
}) {
  const light = project.card.ink === "light";
  const widthClass =
    layout === "mobile"
      ? "aspect-[4/4.6] w-[88vw] max-w-[440px] shrink-0 snap-start"
      : "h-full w-[min(80vw,1000px)] shrink-0";

  return (
    <Link
      href={`/realisations/${project.slug}`}
      className={`realisation-card group relative block overflow-hidden rounded-[1.75rem] outline-none focus-visible:ring-2 focus-visible:ring-[#1D1D1F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFFFF] sm:rounded-[2rem] ${widthClass}`}
      style={{ background: project.card.backdrop }}
      aria-label={`Voir le projet : ${project.title}`}
    >
      {/* Halo lumineux discret en haut du fond teinté */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 85% at 18% 0%, rgba(255,255,255,0.18), transparent 55%)",
        }}
      />

      {/* Mockup navigateur */}
      <div
        className={
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[0.9rem] shadow-[0_30px_70px_-18px_rgba(0,0,0,0.45)] motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[calc(50%+8px)] sm:rounded-[1.1rem]" +
          (layout === "mobile" ? " w-[88%]" : " w-[74%]")
        }
      >
        <div className="flex items-center gap-2 bg-white px-3.5 py-2.5 sm:px-4 sm:py-3">
          <span aria-hidden className="flex shrink-0 items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-[#FF5F57]" />
            <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="size-2.5 rounded-full bg-[#28C840]" />
          </span>
          <span className="mx-auto hidden max-w-[60%] truncate rounded-md bg-[#F0F0F2] px-3 py-1 font-sans text-[0.62rem] leading-none text-[#86868B] sm:block">
            {projectHost(project)}
          </span>
          <span aria-hidden className="hidden w-[52px] shrink-0 sm:block" />
        </div>
        <div className="relative aspect-[16/10] w-full bg-white">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            className="object-cover object-top"
            sizes={sizes}
            quality={NEXT_IMAGE_QUALITY_RASTER}
            priority={priority}
          />
        </div>
      </div>

      {/* Scrim de lisibilité en bas */}
      <div
        aria-hidden
        className={
          "pointer-events-none absolute inset-x-0 bottom-0 h-[42%] " +
          (light
            ? "bg-gradient-to-t from-black/55 via-black/20 to-transparent"
            : "bg-gradient-to-t from-white/70 via-white/25 to-transparent")
        }
      />

      {/* Méta en haut à gauche */}
      <p
        className={
          "absolute left-5 top-5 m-0 font-sans text-[0.62rem] font-medium uppercase leading-none tracking-[0.18em] sm:left-7 sm:top-7 sm:text-[0.66rem] " +
          (light ? "text-white/70" : "text-[#1D1D1F]/55")
        }
      >
        {project.index} · {project.status}
      </p>

      {/* Flèche en haut à droite */}
      <span
        aria-hidden
        className={
          "absolute right-5 top-5 inline-flex size-9 items-center justify-center rounded-full motion-safe:transition-all motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] sm:right-7 sm:top-7 sm:size-10 " +
          (light
            ? "bg-white/15 text-white backdrop-blur-sm group-hover:bg-white group-hover:text-[#1D1D1F]"
            : "bg-[#1D1D1F]/[0.08] text-[#1D1D1F] backdrop-blur-sm group-hover:bg-[#1D1D1F] group-hover:text-white")
        }
      >
        <svg viewBox="0 0 14 14" fill="none" className="size-3.5">
          <path
            d="M3 11 L11 3 M5 3 H11 V9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      {/* Titre + tags en bas */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-3 p-5 sm:flex-row sm:items-end sm:justify-between sm:gap-6 sm:p-7">
        <h3
          className={`${bebas.className} m-0 text-[clamp(1.7rem,3.4vw,3rem)] font-normal uppercase leading-[0.92] tracking-[-0.015em] ${
            light ? "text-white" : "text-[#1D1D1F]"
          }`}
        >
          {project.title}
        </h3>
        <ul className="m-0 flex shrink-0 list-none flex-wrap gap-2 p-0">
          {project.card.tags.map((tag) => (
            <li
              key={tag}
              className={
                "rounded-full border px-3 py-1.5 font-sans text-[0.6rem] font-medium uppercase leading-none tracking-[0.12em] backdrop-blur-sm sm:text-[0.64rem] " +
                (light
                  ? "border-white/25 bg-white/10 text-white"
                  : "border-[#1D1D1F]/15 bg-white/60 text-[#1D1D1F]")
              }
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}

function isCoarsePointer(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: coarse)").matches;
}

export default function Realisations() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [maxShift, setMaxShift] = useState(0);

  useEffect(() => {
    if (isCoarsePointer()) {
      setMaxShift(0);
      return;
    }

    let raf = 0;
    const measure = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const track = trackRef.current;
        const section = sectionRef.current;
        if (!track || !section) return;
        const ms = Math.max(0, track.scrollWidth - window.innerWidth);
        setMaxShift(ms);
        section.style.minHeight =
          ms > 0 ? `calc(200dvh + ${ms}px)` : "100dvh";
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
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || isCoarsePointer()) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || maxShift === 0) {
      track.style.transform = "translate3d(0,0,0)";
      return;
    }

    let raf = 0;
    let lastShift = NaN;
    const compute = () => {
      const sec = sectionRef.current;
      if (!sec) return;
      const scrolled = -sec.getBoundingClientRect().top;
      const p = Math.max(0, Math.min(1, scrolled / maxShift));
      const shift = -p * maxShift;
      if (shift !== lastShift) {
        lastShift = shift;
        track.style.transform = `translate3d(${shift.toFixed(2)}px,0,0)`;
      }
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        compute();
      });
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [maxShift]);

  return (
    <section
      id="realisations"
      ref={sectionRef}
      className="realisations-section relative z-30 w-full bg-[#FFFFFF]"
      style={{ minHeight: "100dvh" }}
      aria-label="Réalisations"
    >
      <div className="realisations-inner--desktop flex w-full flex-col text-[#1D1D1F]">
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
          <div className="h-[2px] bg-[#1D1D1F]" />
        </header>

        <div
          className="realisations-mobile-only realisations-track-mobile w-full snap-x snap-mandatory items-stretch gap-6 overflow-x-auto px-5 py-8"
          style={{ scrollPaddingLeft: "1.25rem" }}
        >
          {REALISATIONS.map((p) => (
            <ProjectCard
              key={`mobile-${p.slug}`}
              project={p}
              layout="mobile"
              priority={p.index === "01"}
              sizes="(max-width: 500px) 78vw, 390px"
            />
          ))}
        </div>

        <div className="realisations-desktop-only relative flex-1 overflow-hidden">
          <div
            ref={trackRef}
            className="flex h-full items-stretch gap-[4vw] px-5 py-6 will-change-transform sm:gap-[3vw] sm:px-[4vw] sm:py-8 md:py-10"
            style={{ transform: "translate3d(0,0,0)" }}
          >
            {REALISATIONS.map((p) => (
              <ProjectCard
                key={`desktop-${p.slug}`}
                project={p}
                layout="desktop"
                priority={p.index === "01"}
                sizes="(max-width: 1536px) 60vw, 740px"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
