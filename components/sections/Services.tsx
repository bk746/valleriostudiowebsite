"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { Bebas_Neue } from "next/font/google";
import { INK, IVORY, LINEN, PARCHMENT, TERRACOTTA } from "@/lib/site-colors";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

type Service = {
  title: ReadonlyArray<string>;
  category: string;
  desc: string;
  bg: string;
  fg: string;
  span: string;
  /** Si défini, la carte devient un lien vers la page service dédiée. */
  href?: string;
};

const SERVICES: ReadonlyArray<Service> = [
  {
    title: ["Site", "Internet"],
    category: "Web · Conversion",
    desc: "Vitrines, landing pages et e-commerces pensés pour convertir.",
    bg: LINEN,
    fg: INK,
    span: "sm:col-span-6 md:col-span-7",
    href: "/services/site-internet",
  },
  {
    title: ["Identité", "Visuelle"],
    category: "Branding · DA",
    desc: "Logo, charte et direction artistique reconnaissables au premier regard.",
    bg: INK,
    fg: IVORY,
    span: "sm:col-span-6 md:col-span-5",
    href: "/services/identite-visuelle",
  },
  {
    title: ["Maintenance"],
    category: "Run · Performance",
    desc: "Mises à jour, vitesse et évolutions. Un site vivant, jamais à l'abandon.",
    bg: PARCHMENT,
    fg: INK,
    span: "sm:col-span-6 md:col-span-5",
    href: "/services/maintenance",
  },
  {
    title: ["Apps", "Saas"],
    category: "Produit sur-mesure",
    desc: "Dashboards, plateformes et outils internes adaptés à vos opérations.",
    bg: TERRACOTTA,
    fg: IVORY,
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
        " bg-[#FFFFFF] text-[#1D1D1F]" +
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
      <div className="services-line mx-5 mb-4 h-[2px] bg-[#1D1D1F] sm:mx-8 sm:mb-6 md:mx-12 md:mb-8" />

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
            " services-card group relative flex min-h-[64vw] flex-col overflow-hidden rounded-[1.5rem] p-5" +
            " sm:min-h-0 sm:rounded-[1.75rem] sm:p-5 md:p-6 lg:p-7" +
            (isLink
              ? " cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFFFF] active:scale-[0.99]"
              : "");
          // Sur les fonds clairs, le lien prend l'accent terracotta ;
          // sur les fonds saturés/sombres, il reste dans la couleur du texte.
          const isDarkCard = s.bg === INK || s.bg === TERRACOTTA;
          const linkColor = isDarkCard ? s.fg : TERRACOTTA;
          const cardStyle = {
            background: s.bg,
            color: s.fg,
            "--i": idx,
          } as CSSProperties & { "--i"?: number };
          const inner = (
            <>
              {/* ── TOP : catégorie · titre · description ────── */}
              <div className="relative z-10 flex min-h-0 flex-1 flex-col gap-2.5 sm:gap-3">
                <p
                  className="m-0 shrink-0 font-sans text-[0.66rem] font-semibold uppercase leading-none tracking-[0.14em] sm:text-[0.68rem]"
                  style={{ color: s.fg, opacity: 0.6 }}
                >
                  {s.category}
                </p>
                <h3 className="m-0 shrink-0 text-[clamp(1.75rem,5.5vw,3.2rem)] font-normal leading-[0.92] tracking-[-0.02em] sm:leading-[0.9]">
                  {s.title.map((line, i) => (
                    <span key={i} className="block">
                      {line}
                    </span>
                  ))}
                </h3>
                <p
                  className="m-0 line-clamp-3 max-w-[24rem] font-sans text-[0.78rem] font-normal normal-case leading-snug sm:text-[0.76rem] md:text-[0.78rem]"
                  style={{ color: s.fg, opacity: 0.68 }}
                >
                  {s.desc}
                </p>
              </div>

              {/* ── FOOTER : lien (jamais rogné) ─────────────── */}
              {isLink && (
                <div className="relative z-10 mt-3 shrink-0 pt-2 sm:mt-4">
                  <span
                    aria-hidden
                    className="inline-flex items-center gap-1.5 font-sans text-[0.8rem] font-medium leading-none sm:text-[0.82rem]"
                    style={{ color: linkColor, opacity: isDarkCard ? 0.9 : 1 }}
                  >
                    En savoir plus
                    <svg
                      viewBox="0 0 12 12"
                      fill="none"
                      className="size-[0.7em] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
                    >
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
              )}
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
