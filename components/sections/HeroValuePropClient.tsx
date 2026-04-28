"use client";

import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

type Props = {
  bebasClassName: string;
  cormorantClassName: string;
  fullTextForA11y: string;
};

type WordSpec = { text: string; key: string };

const ITALIC_PARTS = {
  l2: ["n'est", "pas", "une", "simple"] as const,
  l3: ["c'est", "votre"] as const,
};

export function HeroValuePropClient({
  bebasClassName,
  cormorantClassName,
  fullTextForA11y,
}: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);
  let wi = 0;

  /* Reveal au scroll */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        /* Déclenche quand la section est (quasi) entièrement à l'écran,
           autrement dit quand l'utilisateur a "atterri" dessus. */
        if (entry.intersectionRatio >= 0.7) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { threshold: [0, 0.25, 0.5, 0.7, 0.9] }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Parallax souris (subtil) */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 22;
      targetY = y * 14;
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        el.style.setProperty("--mx", `${targetX.toFixed(2)}px`);
        el.style.setProperty("--my", `${targetY.toFixed(2)}px`);
      });
    };

    const onLeave = () => {
      el.style.setProperty("--mx", "0px");
      el.style.setProperty("--my", "0px");
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  const renderWords = (words: ReadonlyArray<WordSpec>) =>
    words.map((w, idx) => {
      const i = wi++;
      return (
        <Fragment key={w.key}>
          <span
            className="hero-word"
            style={{ "--i": i } as CSSProperties & { "--i"?: number }}
          >
            <span className="hero-word__inner">{w.text}</span>
          </span>
          {idx < words.length - 1 ? " " : null}
        </Fragment>
      );
    });

  return (
    <section
      ref={sectionRef}
      data-nav-theme="dark"
      className={
        bebasClassName +
        " hero-stage sticky top-0 z-10 flex h-[100svh] w-full flex-col overflow-hidden" +
        " bg-[#343d33] text-[#FDF6EC]" +
        " sm:shadow-[0_-18px_60px_-12px_rgba(0,0,0,0.35)]" +
        (revealed ? " is-revealed" : "")
      }
      aria-label="Manifeste — votre site, votre meilleur commercial"
    >
      <span className="sr-only">{fullTextForA11y}</span>

      {/* Texture grain ambiante */}
      <div className="hero-grain pointer-events-none absolute inset-0" aria-hidden />

      {/* ── STAGE ─────────────────────────────────────────── */}
      <div
        className={
          "relative z-10 flex flex-1 flex-col justify-between px-5 py-10 pt-24 sm:px-8 sm:py-14 sm:pt-14 md:px-12 md:py-16" +
          (revealed ? " hero-words-paragraph--revealed" : "")
        }
      >
        {/* Ligne 1 — VOTRE SITE */}
        <div
          className="hero-line"
          style={{ "--depth": 1.25 } as CSSProperties & { "--depth"?: number }}
        >
          <p className="m-0 pl-0 text-[clamp(3rem,15.5vw,13rem)] font-normal leading-[0.9] tracking-[-0.015em] sm:pl-[4vw] sm:leading-[0.86]">
            {renderWords([
              { text: "VOTRE", key: "l1-w1" },
              { text: "SITE", key: "l1-w2" },
            ])}
          </p>
        </div>

        {/* Ligne 2 — n'est pas une simple VITRINE. */}
        <div
          className="hero-line flex flex-col items-end self-end pr-0 text-right sm:pr-4 md:pr-8"
          style={{ "--depth": 0.55 } as CSSProperties & { "--depth"?: number }}
        >
          <p
            className={
              cormorantClassName +
              " m-0 italic text-[clamp(1.2rem,4.6vw,3.6rem)] font-normal leading-[1.05] text-[#FDF6EC]/85"
            }
          >
            {renderWords(
              ITALIC_PARTS.l2.map((w, k) => ({ text: w, key: `l2i-${k}` }))
            )}
          </p>
          <p className="m-0 text-[clamp(2.4rem,12.5vw,10.5rem)] font-normal leading-[0.9] tracking-[-0.015em] sm:leading-[0.86]">
            {renderWords([{ text: "VITRINE.", key: "l2-w1" }])}
          </p>
        </div>

        {/* Ligne 3 — c'est votre MEILLEUR COMMERCIAL */}
        <div
          className="hero-line flex flex-col items-start"
          style={{ "--depth": 0.95 } as CSSProperties & { "--depth"?: number }}
        >
          <p
            className={
              cormorantClassName +
              " m-0 self-start pl-[3vw] italic text-[clamp(1.2rem,4.6vw,3.6rem)] font-normal leading-[1.05] text-[#FDF6EC]/85 sm:pl-[8vw]"
            }
          >
            {renderWords(
              ITALIC_PARTS.l3.map((w, k) => ({ text: w, key: `l3i-${k}` }))
            )}
          </p>
          <p className="m-0 text-[clamp(2rem,11vw,9.5rem)] font-normal leading-[0.94] tracking-[-0.015em] sm:leading-[0.86]">
            {renderWords([
              { text: "MEILLEUR", key: "l3-w1" },
              { text: "COMMERCIAL", key: "l3-w2" },
            ])}
          </p>
        </div>
      </div>

    </section>
  );
}
