"use client";

import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import { Bebas_Neue, Cormorant_Garamond } from "next/font/google";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
});

type Step = {
  n: string;
  title: string;
  desc: string;
};

const STEPS: ReadonlyArray<Step> = [
  {
    n: "01",
    title: "Cadrage",
    desc: "On définit ensemble les grandes lignes et on précise les objectifs de votre projet. Le temps d'un appel, et tout sera plus clair.",
  },
  {
    n: "02",
    title: "Design",
    desc: "On imagine, on teste et on valide ensemble l'univers visuel qui vous ressemble. Votre projet prend vie sous vos yeux avec style et précision.",
  },
  {
    n: "03",
    title: "Intégration",
    desc: "Chaque étape du développement est soignée, optimisée et pensée pour que votre identité digitale soit unique. Résultat : un site performant, solide et ultra-fluide.",
  },
  {
    n: "04",
    title: "Livraison",
    desc: "Il est temps de publier votre site sur le web, pour qu'il rencontre vos utilisateurs, en veillant à ce qu'il soit parfaitement référencé par Google.",
  },
  {
    n: "05",
    title: "Suivi",
    desc: "On reste à vos côtés après la mise en ligne, en se chargeant pour vous des mises à jour de contenu et de sécurité — votre site ne sera jamais obsolète.",
  },
];

const ILLUS_COMMON = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const ILLUSTRATIONS: ReadonlyArray<ReactNode> = [
  // 01 Cadrage — coins de cadre + viseur
  <svg key="01" viewBox="0 0 200 200" {...ILLUS_COMMON} aria-hidden focusable="false">
    <path d="M 35 55 L 35 35 L 55 35" />
    <path d="M 145 35 L 165 35 L 165 55" />
    <path d="M 165 145 L 165 165 L 145 165" />
    <path d="M 55 165 L 35 165 L 35 145" />
    <line x1="100" y1="78" x2="100" y2="122" />
    <line x1="78" y1="100" x2="122" y2="100" />
    <circle cx="100" cy="100" r="5.5" />
  </svg>,

  // 02 Design — crayon en diagonale + petit trait
  <svg key="02" viewBox="0 0 200 200" {...ILLUS_COMMON} aria-hidden focusable="false">
    <g transform="rotate(-32 100 100)">
      <rect x="50" y="86" width="100" height="22" />
      <line x1="68" y1="86" x2="68" y2="108" />
      <line x1="135" y1="86" x2="135" y2="108" />
      <path d="M 50 86 L 28 97 L 50 108 Z" />
      <line x1="38" y1="97" x2="28" y2="97" />
    </g>
    <path d="M 32 168 Q 60 150 92 168 T 158 168" />
  </svg>,

  // 03 Intégration — chevrons + slash
  <svg key="03" viewBox="0 0 200 200" {...ILLUS_COMMON} aria-hidden focusable="false">
    <path d="M 65 65 L 32 100 L 65 135" />
    <path d="M 135 65 L 168 100 L 135 135" />
    <line x1="118" y1="55" x2="82" y2="145" />
  </svg>,

  // 04 Livraison — avion en papier + lignes de mouvement
  <svg key="04" viewBox="0 0 200 200" {...ILLUS_COMMON} aria-hidden focusable="false">
    <path d="M 30 102 L 172 48 L 118 168 Z" />
    <path d="M 30 102 L 100 120 L 172 48" />
    <line x1="100" y1="120" x2="118" y2="168" />
    <line x1="18" y1="78" x2="40" y2="78" opacity="0.55" />
    <line x1="12" y1="100" x2="34" y2="100" opacity="0.55" />
    <line x1="18" y1="122" x2="40" y2="122" opacity="0.55" />
  </svg>,

  // 05 Suivi — cercle + ligne pulse
  <svg key="05" viewBox="0 0 200 200" {...ILLUS_COMMON} aria-hidden focusable="false">
    <circle cx="100" cy="100" r="64" />
    <path d="M 48 100 L 76 100 L 86 74 L 100 132 L 114 78 L 124 100 L 152 100" />
  </svg>,
];

export default function Approche() {
  const friseRef = useRef<HTMLDivElement | null>(null);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [lineProgress, setLineProgress] = useState(0);
  const [revealed, setRevealed] = useState<boolean[]>(() => STEPS.map(() => false));

  // Tracé continu de la ligne centrale (suit le milieu du viewport)
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setLineProgress(1);
      return;
    }

    let raf = 0;
    const compute = () => {
      const el = friseRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = (vh / 2 - rect.top) / rect.height;
      setLineProgress(Math.max(0, Math.min(1, p)));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Apparition des étapes (latch)
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setRevealed(STEPS.map(() => true));
      return;
    }

    const observers: IntersectionObserver[] = [];
    stepRefs.current.forEach((el, i) => {
      if (!el) return;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.intersectionRatio >= 0.35) {
            setRevealed((prev) => {
              if (prev[i]) return prev;
              const next = [...prev];
              next[i] = true;
              return next;
            });
            io.disconnect();
          }
        },
        { threshold: [0, 0.2, 0.35, 0.6], rootMargin: "0px 0px -10% 0px" }
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section
      className="relative z-30 w-full overflow-hidden bg-[#FDF6EC] text-[#0C4323] shadow-[0_-18px_60px_-12px_rgba(0,0,0,0.35)]"
      aria-label="Notre approche"
    >
      {/* ── HEADER ───────────────────────────────────────── */}
      <header className={`${bebas.className} px-5 pt-24 pb-2 sm:px-8 sm:pt-36 md:px-12 md:pt-40`}>
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="m-0 text-[clamp(2.4rem,7.2vw,7.5rem)] font-normal uppercase leading-[0.92] tracking-[-0.015em] md:whitespace-nowrap md:leading-[0.86]">
            Notre approche
          </h2>
          <span className="hidden font-sans text-[0.6rem] font-medium uppercase tracking-[0.28em] opacity-60 sm:inline-block sm:text-[0.68rem]">
            Cinq étapes · une exécution sur-mesure
          </span>
        </div>
        <div className="h-[2px] bg-[#0C4323]" />
      </header>

      {/* ── FRISE ────────────────────────────────────────── */}
      <div
        ref={friseRef}
        className="relative flex flex-col px-5 pb-32 pt-16 sm:px-12 sm:pb-48 sm:pt-32 md:grid md:grid-cols-2 md:px-20 md:pb-56 md:pt-40"
        style={{
          rowGap: "clamp(4.5rem, 14vw, 14rem)",
        }}
      >
        {/* Ligne centrale (desktop) / à gauche (mobile) */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 h-full w-[2px] left-[1.25rem] sm:left-[2.25rem] md:left-1/2 md:-translate-x-1/2"
        >
          <span className="absolute inset-0 bg-[#0C4323] opacity-15" />
          <span
            className="absolute left-0 top-0 w-full bg-[#0C4323]"
            style={{ height: `${lineProgress * 100}%` }}
          />
          {/* Curseur qui descend */}
          <span
            className="absolute left-1/2 size-3 rounded-full bg-[#0C4323] ring-4 ring-[#FDF6EC]"
            style={{
              top: `${lineProgress * 100}%`,
              transform: "translate(-50%, -50%)",
              opacity: lineProgress > 0.005 && lineProgress < 0.995 ? 1 : 0,
              transition: "opacity 0.4s ease",
            }}
          />
        </div>

        {/* Étapes */}
        {STEPS.map((step, i) => {
          const isLeft = i % 2 === 0;
          const isRev = revealed[i];

          return (
            <Fragment key={step.n}>
              {/* Bloc texte */}
              <div
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                data-side={isLeft ? "left" : "right"}
                style={{
                  gridRow: i + 1,
                }}
                className={
                  "approche-step relative flex flex-col items-start pl-10 sm:pl-16 " +
                  (isLeft ? "md:col-start-1 md:pl-0 md:pr-20" : "md:col-start-2 md:pl-20 md:pr-0") +
                  (isRev ? " is-revealed" : "")
                }
              >
                <div className="step-meta">
                  <div className={`${bebas.className} flex flex-wrap items-baseline gap-x-4 gap-y-1 sm:gap-x-5`}>
                    <span className="text-[clamp(2.4rem,5.6vw,6rem)] leading-none text-[#156332]">
                      {step.n}
                    </span>
                    <span className="text-[clamp(1.7rem,3.8vw,3.8rem)] uppercase leading-none tracking-[0.01em]">
                      {step.title}
                    </span>
                  </div>
                </div>

                <p
                  className={`${cormorant.className} step-desc m-0 mt-4 max-w-[34rem] text-[clamp(1.05rem,1.5vw,1.7rem)] leading-[1.5] sm:mt-7 sm:leading-[1.45]`}
                >
                  {step.desc}
                </p>
              </div>

              {/* Illustration miroir (desktop only) */}
              <div
                aria-hidden
                data-side={isLeft ? "right" : "left"}
                style={{
                  gridRow: i + 1,
                }}
                className={
                  "approche-illus relative hidden items-center justify-center px-4 text-[#156332] sm:px-8 md:flex md:px-12 " +
                  (isLeft ? "md:col-start-2" : "md:col-start-1") +
                  (isRev ? " is-revealed" : "")
                }
              >
                <span className="approche-illus-svg block w-[clamp(8rem,15vw,16rem)]">
                  {ILLUSTRATIONS[i]}
                </span>
              </div>
            </Fragment>
          );
        })}
      </div>
    </section>
  );
}
