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
  const widthClass =
    layout === "mobile"
      ? "w-[88vw] max-w-[420px] shrink-0 snap-start"
      : "h-full w-[min(78vw,920px)] shrink-0";

  return (
    <Link
      href={`/realisations/${project.slug}`}
      className={
        `realisation-card group flex flex-col outline-none focus-visible:ring-2 focus-visible:ring-[#1D1D1F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFFFF] ${widthClass}` +
        (layout === "desktop" ? " min-h-0" : "")
      }
      aria-label={`Voir le projet : ${project.title}`}
    >
      <figure
        className={
          "relative m-0 w-full overflow-hidden rounded-[1.25rem] bg-[#1D1D1F]/[0.04] shadow-[0_2px_8px_rgba(0,0,0,0.06)] motion-safe:transition-[box-shadow,transform] motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:shadow-[0_20px_48px_-16px_rgba(0,0,0,0.18)] group-hover:-translate-y-0.5" +
          (layout === "desktop"
            ? " min-h-0 flex-1"
            : " aspect-[4/3]")
        }
      >
        <div
          className={
            layout === "desktop" ? "relative h-full min-h-[280px] w-full" : "relative h-full w-full"
          }
        >
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            className="object-cover object-top motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
            sizes={sizes}
            quality={NEXT_IMAGE_QUALITY_RASTER}
            priority={priority}
          />
        </div>
      </figure>

      <div className="mt-4 flex shrink-0 items-end justify-between gap-4 px-0.5 sm:mt-5">
        <div className="min-w-0">
          <p className="m-0 font-sans text-[0.66rem] font-medium uppercase leading-none tracking-[0.14em] text-[#1D1D1F]/50 sm:text-[0.68rem]">
            {project.index} · {project.status}
          </p>
          <h3
            className={`${bebas.className} m-0 mt-2 text-[clamp(1.6rem,4vw,2.75rem)] font-normal uppercase leading-[0.92] tracking-[-0.02em] text-[#1D1D1F]`}
          >
            {project.title}
          </h3>
        </div>
        <span
          aria-hidden
          className="inline-flex shrink-0 items-center gap-1 font-sans text-[0.8rem] font-medium leading-none text-[#0071E3] motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 sm:text-[0.82rem]"
        >
          Voir
          <svg viewBox="0 0 12 12" fill="none" className="size-[0.75em]">
            <path
              d="M2.5 1.5 L7 6 L2.5 10.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}

export default function Realisations() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [maxShift, setMaxShift] = useState(0);
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
    const track = trackRef.current;
    if (!track) return;

    if (isMobile) {
      track.style.transform = "translate3d(0,0,0)";
      return;
    }

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
  }, [maxShift, isMobile]);

  const minHeight = isMobile
    ? "auto"
    : maxShift > 0
      ? `calc(200dvh + ${maxShift}px)`
      : "100dvh";

  return (
    <section
      id="realisations"
      ref={sectionRef}
      className="relative z-30 w-full bg-[#FFFFFF]"
      style={{ minHeight }}
      aria-label="Réalisations"
    >
      <div
        className={
          "flex w-full flex-col text-[#1D1D1F]" +
          (isMobile ? " py-12" : " sticky top-0 h-[100svh] overflow-hidden")
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
          <div className="h-[2px] bg-[#1D1D1F]" />
        </header>

        {isMobile ? (
          <div
            className="realisations-track-mobile flex w-full snap-x snap-mandatory items-stretch gap-6 overflow-x-auto px-5 py-8"
            style={{ scrollPaddingLeft: "1.25rem" }}
          >
            {REALISATIONS.map((p) => (
              <ProjectCard
                key={p.slug}
                project={p}
                layout="mobile"
                priority={p.index === "01"}
                sizes="(max-width: 430px) 100vw, 88vw"
              />
            ))}
          </div>
        ) : (
          <div className="relative flex-1 overflow-hidden">
            <div
              ref={trackRef}
              className="flex h-full items-stretch gap-[4vw] px-5 py-6 will-change-transform sm:gap-[3vw] sm:px-[4vw] sm:py-8 md:py-10"
              style={{ transform: "translate3d(0,0,0)" }}
            >
              {REALISATIONS.map((p) => (
                <ProjectCard
                  key={p.slug}
                  project={p}
                  layout="desktop"
                  priority={p.index === "01"}
                  sizes="(max-width: 1536px) 78vw, 920px"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
