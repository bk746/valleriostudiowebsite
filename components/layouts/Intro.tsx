"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
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
const INTRO_SEEN_KEY = "vallerio-intro-seen";

type Phase = "loading" | "leaving" | "gone";

export default function Intro() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("gone");
  const countRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isHome = pathname === "/";
    const alreadySeen = sessionStorage.getItem(INTRO_SEEN_KEY) === "1";

    if (!isHome || alreadySeen || reduce) {
      setPhase("gone");
      return;
    }

    setPhase("loading");
    const releaseScroll = lockBodyScroll();

    let raf = 0;
    const startTime = performance.now();

    const setProgress = (value: number) => {
      const count = Math.round(value);
      if (countRef.current) {
        countRef.current.textContent = String(count).padStart(2, "0");
      }
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${count / 100})`;
      }
    };

    const animateCount = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / COUNTER_DURATION);
      const eased = 1 - Math.pow(1 - progress, 3);
      setProgress(eased * 100);
      if (progress < 1) raf = requestAnimationFrame(animateCount);
    };
    raf = requestAnimationFrame(animateCount);

    let exitTimeout: number | undefined;
    let goneTimeout: number | undefined;

    const finish = () => {
      setPhase("gone");
      sessionStorage.setItem(INTRO_SEEN_KEY, "1");
      releaseScroll();
    };

    const triggerExit = () => {
      setProgress(100);
      setPhase("leaving");
      goneTimeout = window.setTimeout(finish, EXIT_DURATION);
    };

    const onLoad = () => {
      const elapsed = performance.now() - startTime;
      const remaining = Math.max(
        COUNTER_DURATION + LINGER_AFTER_LOAD - elapsed,
        LINGER_AFTER_LOAD,
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
  }, [pathname]);

  if (phase === "gone") return null;

  return (
    <div
      className={`intro fixed inset-0 z-[120] overflow-hidden ${bebas.className}`}
      data-phase={phase}
      aria-hidden
      role="presentation"
    >
      <div
        className="intro-curtain intro-curtain--top absolute inset-x-0 top-0 h-1/2 bg-[#1D1D1F]"
        aria-hidden
      />
      <div
        className="intro-curtain intro-curtain--bottom absolute inset-x-0 bottom-0 h-1/2 bg-[#1D1D1F]"
        aria-hidden
      />
      <div className="intro-grain pointer-events-none absolute inset-0" aria-hidden />

      <div className="intro-content relative z-10 flex h-full flex-col items-stretch justify-between px-5 py-7 text-[#FFFFFF] sm:px-10 sm:py-10 md:px-14 md:py-12">
        <div className="flex items-start justify-between text-[0.65rem] uppercase tracking-[0.24em] sm:text-[0.78rem] sm:tracking-[0.28em]">
          <span className="opacity-80">Vallerio</span>
          <span ref={countRef} className="tabular-nums opacity-90" aria-hidden>
            00
          </span>
        </div>

        <div className="flex flex-col items-center text-center">
          <p
            className="intro-title m-0 text-[clamp(2.6rem,15vw,13rem)] font-normal leading-[0.95] sm:leading-none"
            aria-label="Vallerio Studio"
          >
            <HeroTitleLetters text="Vallerio Studio" />
          </p>
          <p
            className={`${cormorant.className} intro-tag mt-5 text-[clamp(0.9rem,1.4vw,1.35rem)] italic opacity-80 sm:mt-7`}
          >
            Studio digital · Annecy
          </p>
        </div>

        <div className="flex items-end justify-between gap-4 sm:gap-6">
          <span className="text-[0.65rem] uppercase tracking-[0.24em] opacity-70 sm:text-[0.78rem] sm:tracking-[0.28em]">
            Chargement
          </span>
          <div className="relative h-[2px] w-[45vw] max-w-[460px] overflow-hidden bg-[#FFFFFF]/15 sm:w-[40vw]">
            <span
              ref={progressRef}
              aria-hidden
              className="intro-progress absolute inset-y-0 left-0 origin-left bg-[#FFFFFF]"
              style={{ transform: "scaleX(0)", width: "100%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
