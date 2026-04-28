"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Bebas_Neue } from "next/font/google";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

type Service = {
  title: ReadonlyArray<string>;
  label: string;
  desc: string;
  bg: string;
  fg: string;
  span: string;
};

const SERVICES: ReadonlyArray<Service> = [
  {
    title: ["Site", "Internet"],
    label: "Web · Conversion",
    desc: "Vitrines, landing pages, e-commerces. Pensés pour convertir, pas pour décorer.",
    bg: "#CFE9D6",
    fg: "#0C4323",
    span: "col-span-6 md:col-span-7",
  },
  {
    title: ["Identité", "Visuelle"],
    label: "Branding · DA",
    desc: "Logo, charte, direction artistique. Une marque reconnaissable au premier regard.",
    bg: "#156332",
    fg: "#FDF6EC",
    span: "col-span-6 md:col-span-5",
  },
  {
    title: ["Maintenance"],
    label: "Run · Performance",
    desc: "Mises à jour, vitesse, contenus. Un site vivant, jamais à l'abandon.",
    bg: "#2D8C4E",
    fg: "#FDF6EC",
    span: "col-span-6 md:col-span-5",
  },
  {
    title: ["Apps", "Saas"],
    label: "Produit sur-mesure",
    desc: "Tableaux de bord, plateformes, outils internes sur-mesure pour vos opérations.",
    bg: "#0C4323",
    fg: "#FDF6EC",
    span: "col-span-6 md:col-span-7",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.45) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { threshold: [0, 0.2, 0.45, 0.7] }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/*
        Sentinel d'ancre : cible du scroll vers `#services`. Hors flux du
        sticky → `offsetTop` reste fiable, peu importe d'où on vient.
        La section ci-dessous garde son sticky intact (Approche peut monter
        par-dessus comme Hero / HeroText).
      */}
      <span id="services" aria-hidden className="block h-0 w-0" />
    <section
      ref={sectionRef}
      className={
        bebas.className +
        " sticky top-0 z-20 grid h-dvh w-full grid-rows-[auto_auto_1fr] overflow-hidden" +
        " bg-[#FDF6EC] text-black" +
        " shadow-[0_-18px_60px_-12px_rgba(0,0,0,0.35)]" +
        (revealed ? " is-revealed" : "")
      }
      aria-label="Services"
    >
      {/* ── HEADER ────────────────────────────────────────── */}
      <header className="px-5 pt-24 pb-2 sm:px-8 sm:pt-24 md:px-12 md:pt-24">
        <h2 className="services-title m-0 text-[clamp(1.6rem,7.2vw,7.5rem)] font-normal uppercase leading-[0.95] tracking-[-0.015em] md:whitespace-nowrap md:leading-[0.86]">
          Des services adaptés à votre besoin
        </h2>
      </header>
      <div className="services-line mx-5 mb-3 h-[2px] bg-black sm:mx-8 sm:mb-6 md:mx-12 md:mb-8" />

      {/* ── BENTO GRID ────────────────────────────────────── */}
      <div className="grid min-h-0 grid-cols-12 grid-rows-[1fr_1fr] gap-2 px-2 pb-2 sm:gap-3 sm:px-3 sm:pb-3 md:gap-4 md:px-4 md:pb-4">
        {SERVICES.map((s, idx) => (
          <article
            key={s.title.join(" ")}
            style={
              {
                background: s.bg,
                color: s.fg,
                "--i": idx,
              } as CSSProperties & { "--i"?: number }
            }
            className={
              s.span +
              " services-card group relative flex min-h-0 flex-col overflow-hidden p-4 sm:p-7 md:p-9"
            }
          >
            {/* Voile lumineux subtil au hover */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(120% 80% at 100% 0%, rgba(255,255,255,0.08), rgba(255,255,255,0) 60%)",
              }}
            />

            {/* TOP : label + flèche */}
            <header className="relative z-10 flex items-start justify-between gap-2">
              <span
                className="font-sans text-[0.55rem] font-medium uppercase leading-tight tracking-[0.2em] sm:text-[0.62rem] sm:tracking-[0.24em]"
                style={{ color: s.fg, opacity: 0.55 }}
              >
                {s.label}
              </span>
              <span
                aria-hidden
                className="font-mono text-sm transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5 group-hover:-translate-y-1.5 sm:text-lg"
                style={{ color: s.fg, opacity: 0.85 }}
              >
                →
              </span>
            </header>

            {/* BOTTOM : titre + description */}
            <div className="relative z-10 mt-auto flex flex-col gap-2 sm:gap-4">
              <h3
                className={
                  "m-0 text-[clamp(1.4rem,5vw,4.6rem)] font-normal leading-[0.92] tracking-[-0.015em]" +
                  " transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-1 sm:leading-[0.9]"
                }
              >
                {s.title.map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </h3>

              <p
                className="m-0 hidden max-w-[26rem] font-sans text-[0.78rem] font-normal normal-case leading-relaxed opacity-65 transition-opacity duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-90 lg:block"
                style={{ color: s.fg }}
              >
                {s.desc}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
    </>
  );
}
