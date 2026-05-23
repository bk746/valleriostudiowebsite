"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { Bebas_Neue } from "next/font/google";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

type Service = {
  title: ReadonlyArray<string>;
  category: string;
  tags: ReadonlyArray<string>;
  price: string;
  num: string;
  bg: string;
  fg: string;
  span: string;
  /** Si défini, la carte devient un lien vers la page service dédiée. */
  href?: string;
};

const SERVICES: ReadonlyArray<Service> = [
  {
    title: ["Site", "Internet"],
    category: "Web / Conversion",
    tags: ["Vitrine", "Landing", "E-commerce", "SEO"],
    price: "À partir de 1 500 €",
    num: "01",
    bg: "#CFE9D6",
    fg: "#0C4323",
    span: "sm:col-span-6 md:col-span-7",
    href: "/services/site-internet",
  },
  {
    title: ["Identité", "Visuelle"],
    category: "Branding / DA",
    tags: ["Logo", "Charte", "Guidelines", "Direction Art."],
    price: "À partir de 800 €",
    num: "02",
    bg: "#156332",
    fg: "#FDF6EC",
    span: "sm:col-span-6 md:col-span-5",
    href: "/services/identite-visuelle",
  },
  {
    title: ["Maintenance"],
    category: "Run / Performance",
    tags: ["Updates", "Performance", "Hosting", "Évolutions"],
    price: "À partir de 150 €/mois",
    num: "03",
    bg: "#2D8C4E",
    fg: "#FDF6EC",
    span: "sm:col-span-6 md:col-span-5",
    href: "/services/maintenance",
  },
  {
    title: ["Apps", "Saas"],
    category: "Produit sur-mesure",
    tags: ["Dashboards", "Plateformes", "Outils internes", "API"],
    price: "À partir de 5 000 €",
    num: "04",
    bg: "#0C4323",
    fg: "#FDF6EC",
    span: "sm:col-span-6 md:col-span-7",
    href: "/services/apps-saas",
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
        " relative z-20 grid w-full grid-rows-[auto_auto_auto] overflow-hidden" +
        " sm:sticky sm:top-0 sm:h-svh sm:grid-rows-[auto_auto_1fr]" +
        " bg-[#FDF6EC] text-black" +
        " sm:shadow-[0_-18px_60px_-12px_rgba(0,0,0,0.35)]" +
        (revealed ? " is-revealed" : "")
      }
      aria-label="Services"
    >
      {/* ── HEADER ────────────────────────────────────────── */}
      <header className="px-5 pt-20 pb-2 sm:px-8 sm:pt-24 md:px-12 md:pt-24">
        <h2 className="services-title m-0 text-[clamp(1.9rem,7.2vw,7.5rem)] font-normal uppercase leading-[0.95] tracking-[-0.015em] md:whitespace-nowrap md:leading-[0.86]">
          Des services adaptés à votre besoin
        </h2>
      </header>
      <div className="services-line mx-5 mb-4 h-[2px] bg-black sm:mx-8 sm:mb-6 md:mx-12 md:mb-8" />

      {/* ── BENTO GRID ────────────────────────────────────── */}
      <div className="grid min-h-0 grid-cols-1 gap-3 px-3 pb-6 sm:grid-cols-12 sm:grid-rows-[1fr_1fr] sm:gap-3 sm:px-3 sm:pb-3 md:gap-4 md:px-4 md:pb-4">
        {SERVICES.map((s, idx) => {
          /*
            La carte garde exactement le même rendu visuel ; seule sa
            balise racine change selon qu'elle est cliquable ou non. On
            préserve la classe `services-card` (anim reveal) et le
            `group` (hover des sous-éléments) dans les deux cas.
          */
          const isLink = Boolean(s.href);
          const cardClass =
            s.span +
            " services-card group relative flex min-h-[72vw] flex-col overflow-hidden rounded-2xl p-4" +
            " sm:min-h-0 sm:rounded-2xl sm:p-5 md:p-6 lg:p-7" +
            (isLink
              ? " cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDF6EC] active:scale-[0.985]"
              : "");
          const cardStyle = {
            background: s.bg,
            color: s.fg,
            "--svc-fg": s.fg,
            "--svc-bg": s.bg,
            "--i": idx,
          } as CSSProperties & {
            "--svc-fg"?: string;
            "--svc-bg"?: string;
            "--i"?: number;
          };
          const inner = (
            <>
              {/* Numéro watermark éditorial */}
              <span
                aria-hidden
                className="pointer-events-none absolute select-none font-sans font-black leading-none"
                style={{
                  fontSize: "clamp(4.5rem,15vw,11rem)",
                  bottom: "-0.15em",
                  right: "-0.04em",
                  color: s.fg,
                  opacity: 0.055,
                  letterSpacing: "-0.05em",
                }}
              >
                {s.num}
              </span>

              {/* ── TOP : coordonnée | catégorie ─────────────── */}
              <header className="relative z-10 flex items-center justify-between gap-3">
                <span
                  className="font-mono text-[0.6rem] leading-none tracking-[0.04em] sm:text-[0.62rem]"
                  style={{ color: s.fg, opacity: 0.55 }}
                >
                  ({s.num})
                </span>
                <span
                  className="font-mono text-[0.6rem] uppercase leading-none tracking-[0.1em] sm:text-[0.62rem]"
                  style={{ color: s.fg, opacity: 0.55 }}
                >
                  {s.category}
                </span>
              </header>

              {/* ── MIDDLE : titre + meta ─────────────────────── */}
              <div className="relative z-10 mt-auto flex min-h-0 flex-col gap-2.5 sm:gap-3">
                <h3 className="services-card-title m-0 text-[clamp(1.9rem,6.8vw,3.9rem)] font-normal leading-[0.92] tracking-[-0.022em] sm:leading-[0.9]">
                  {s.title.map((line, i) => (
                    <span key={i} className="block">
                      {line}
                    </span>
                  ))}
                </h3>

                {/* Tags inline éditoriaux */}
                <ul
                  className="m-0 flex flex-wrap items-center gap-x-1.5 gap-y-1 p-0 font-mono text-[0.58rem] uppercase leading-none tracking-[0.08em] sm:text-[0.6rem]"
                  style={{ color: s.fg }}
                >
                  {s.tags.map((tag, i) => (
                    <li key={tag} className="flex items-center gap-x-1.5">
                      <span style={{ opacity: 0.72 }}>{tag}</span>
                      {i < s.tags.length - 1 && (
                        <span
                          aria-hidden
                          className="inline-block size-[3px] rounded-full"
                          style={{ background: s.fg, opacity: 0.35 }}
                        />
                      )}
                    </li>
                  ))}
                </ul>

                {/* Rule */}
                <div
                  aria-hidden
                  className="services-card-rule mt-1 h-px w-full origin-left sm:mt-1.5"
                  style={{ background: `color-mix(in srgb, ${s.fg} 22%, transparent)` }}
                />

                {/* ── FOOTER : prix · CTA pill ─────────────── */}
                <div className="mt-1 flex items-center justify-between gap-3 sm:mt-1.5">
                  <span
                    className="font-mono text-[0.62rem] leading-none tracking-[0.04em] sm:text-[0.64rem]"
                    style={{ color: s.fg, opacity: 0.75 }}
                  >
                    {s.price}
                  </span>

                  {isLink && (
                    <span
                      aria-hidden
                      className="services-card-cta relative inline-flex shrink-0 items-center gap-1.5 overflow-hidden rounded-full px-3 py-1.5 sm:gap-2 sm:px-3.5 sm:py-2"
                    >
                      <span
                        aria-hidden
                        className="services-card-cta-fill pointer-events-none absolute inset-0"
                      />
                      <span className="services-card-cta-label relative z-10 font-mono text-[0.56rem] font-medium uppercase leading-none tracking-[0.14em] sm:text-[0.6rem]">
                        En savoir plus
                      </span>
                      <svg
                        viewBox="0 0 12 12"
                        fill="none"
                        className="services-card-cta-icon relative z-10 size-[11px] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[2px] group-hover:-translate-y-[2px] sm:size-3"
                      >
                        <path
                          d="M2 10 L10 2 M4.5 2 H10 V7.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  )}
                </div>
              </div>
            </>
          );

          if (s.href) {
            return (
              <Link
                key={s.title.join(" ")}
                href={s.href}
                aria-label={`En savoir plus : ${s.title.join(" ")}`}
                style={cardStyle}
                className={cardClass}
              >
                {inner}
              </Link>
            );
          }

          return (
            <article
              key={s.title.join(" ")}
              style={cardStyle}
              className={cardClass}
            >
              {inner}
            </article>
          );
        })}
      </div>
    </section>
    </>
  );
}
