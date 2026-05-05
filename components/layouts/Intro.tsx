"use client";

import { useEffect, useState } from "react";
import { Bebas_Neue, Cormorant_Garamond } from "next/font/google";
import { HeroTitleLetters } from "@/components/sections/HeroTitleLetters";
import { lockBodyScroll } from "@/lib/body-scroll-lock";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["400", "500"],
  style: ["italic"],
  subsets: ["latin"],
  display: "swap",
});

const COUNTER_DURATION = 1800;
const EXIT_DURATION = 900;
const LINGER_AFTER_LOAD = 200;

type Phase = "loading" | "leaving" | "gone";

export default function Intro() {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<Phase>("loading");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      setCount(100);
      setPhase("gone");
      return;
    }

    const releaseScroll = lockBodyScroll();

    const cleanup = () => {
      releaseScroll();
    };

    let raf = 0;
    const startTime = performance.now();

    const animateCount = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / COUNTER_DURATION);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * 100));
      if (progress < 1) raf = requestAnimationFrame(animateCount);
    };
    raf = requestAnimationFrame(animateCount);

    let exitTimeout: number | undefined;
    let goneTimeout: number | undefined;

    const triggerExit = () => {
      setPhase("leaving");
      goneTimeout = window.setTimeout(() => {
        setPhase("gone");
        cleanup();
      }, EXIT_DURATION);
    };

    const onLoad = () => {
      const elapsed = performance.now() - startTime;
      const remaining = Math.max(
        COUNTER_DURATION + LINGER_AFTER_LOAD - elapsed,
        LINGER_AFTER_LOAD
      );
      exitTimeout = window.setTimeout(triggerExit, remaining);
    };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }

    return () => {
      cancelAnimationFrame(raf);
      if (exitTimeout) window.clearTimeout(exitTimeout);
      if (goneTimeout) window.clearTimeout(goneTimeout);
      window.removeEventListener("load", onLoad);
      releaseScroll();
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      className={`intro fixed inset-0 z-[120] overflow-hidden ${bebas.className}`}
      data-phase={phase}
      aria-hidden
      role="presentation"
    >
      {/* ── Rideaux ──────────────────────────────────────── */}
      <div
        className="intro-curtain intro-curtain--top absolute inset-x-0 top-0 h-1/2 bg-[#343d33]"
        aria-hidden
      />
      <div
        className="intro-curtain intro-curtain--bottom absolute inset-x-0 bottom-0 h-1/2 bg-[#343d33]"
        aria-hidden
      />

      {/* ── Texture grain ambiante ───────────────────────── */}
      <div className="intro-grain pointer-events-none absolute inset-0" aria-hidden />

      {/* ── Contenu ──────────────────────────────────────── */}
      <div className="intro-content relative z-10 flex h-full flex-col items-stretch justify-between px-5 py-7 text-[#FDF6EC] sm:px-10 sm:py-10 md:px-14 md:py-12">
        {/* Top bar */}
        <div className="flex items-start justify-between text-[0.65rem] uppercase tracking-[0.24em] sm:text-[0.78rem] sm:tracking-[0.28em]">
          <span className="opacity-80">Vallerio</span>
          <span className="tabular-nums opacity-90" aria-hidden>
            {String(count).padStart(2, "0")}
          </span>
        </div>

        {/* Centre — titre + tagline */}
        <div className="flex flex-col items-center text-center">
          <h1
            className="intro-title m-0 text-[clamp(2.6rem,15vw,13rem)] font-normal leading-[0.95] sm:leading-none"
            aria-label="Vallerio Studio"
          >
            <HeroTitleLetters text="Vallerio Studio" />
          </h1>
          <p
            className={`${cormorant.className} intro-tag mt-5 text-[clamp(0.9rem,1.4vw,1.35rem)] italic opacity-80 sm:mt-7`}
          >
            Studio digital · Annecy
          </p>
        </div>

        {/* Bottom bar */}
        <div className="flex items-end justify-between gap-4 sm:gap-6">
          <span className="text-[0.65rem] uppercase tracking-[0.24em] opacity-70 sm:text-[0.78rem] sm:tracking-[0.28em]">
            Chargement
          </span>
          <div className="relative h-[2px] w-[45vw] max-w-[460px] overflow-hidden bg-[#FDF6EC]/15 sm:w-[40vw]">
            <span
              aria-hidden
              className="intro-progress absolute inset-y-0 left-0 origin-left bg-[#FDF6EC]"
              style={{ transform: `scaleX(${count / 100})`, width: "100%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
