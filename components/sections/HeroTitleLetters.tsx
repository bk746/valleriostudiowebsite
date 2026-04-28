"use client";

import { useCallback, useEffect, useRef } from "react";

type Props = {
  text: string;
};

const STAGGER_MS = 65;

/**
 * Au chargement : cascade sur chaque lettre. Au survol : relance sur la
 * lettre concernée uniquement.
 */
export function HeroTitleLetters({ text }: Props) {
  const chars = text.split("");

  return (
    <span className="inline-flex flex-wrap justify-center" aria-hidden>
      {chars.map((char, index) => (
        <Letter key={`${index}-${char}`} char={char} index={index} />
      ))}
    </span>
  );
}

function Letter({ char, index }: { char: string; index: number }) {
  const innerRef = useRef<HTMLSpanElement | null>(null);

  const applyPlay = useCallback(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const el = innerRef.current;
    if (!el) return;
    el.classList.remove("hero-letter__inner--play");
    void el.offsetWidth;
    el.classList.add("hero-letter__inner--play");
  }, []);

  /* Animation au premier chargement (cascade) */
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const id = window.setTimeout(applyPlay, index * STAGGER_MS);
    return () => window.clearTimeout(id);
  }, [index, applyPlay]);

  const onAnimationEnd = useCallback(() => {
    innerRef.current?.classList.remove("hero-letter__inner--play");
  }, []);

  return (
    <span className="hero-letter" onPointerEnter={applyPlay}>
      <span
        ref={innerRef}
        className="hero-letter__inner"
        onAnimationEnd={onAnimationEnd}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    </span>
  );
}
