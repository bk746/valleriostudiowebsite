"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/*
  Smooth scroll inertiel global (style agence Awwwards).

  On NE l'active pas sur :
   - les écrans tactiles (`pointer: coarse`) : le scroll natif iOS / Android
     est plus fluide via le système, intercepter le touch dégrade nettement
     le ressenti.
   - `prefers-reduced-motion: reduce` : respecte le réglage d'accessibilité.

  Important : Lenis anime le VRAI `window.scrollY` via rAF, ce qui veut dire
  que toute la mécanique existante (sticky, IntersectionObserver, listeners
  scroll) continue de fonctionner sans modification.

  L'instance est exposée via `window.__lenis` pour que les sauts programmatiques
  (transitions de section après le rideau) puissent utiliser `lenis.scrollTo`
  avec `immediate: true` plutôt que `window.scrollTo`, ce qui évite à Lenis
  d'animer ensuite vers une cible obsolète.
*/

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    /*
      Mode `lerp` (interpolation continue) plutôt que `duration` (tween par
      tick). Avec un tween, un changement brusque de direction (bas → haut)
      doit d'abord laisser le tween en cours se finir, ce qui donne une
      sensation de saccade / "le site bug". Le lerp, lui, recalcule chaque
      frame et change instantanément de cible quand on inverse le scroll.

      lerp = 0.08 → plus lent / plus inertiel que la valeur par défaut (0.1).
      wheelMultiplier réduit la course par tick de molette, ce qui contribue
      aussi à un scroll plus posé.
    */
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      syncTouch: false,
    });

    window.__lenis = lenis;

    let raf = 0;
    const update = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      if (window.__lenis === lenis) {
        delete window.__lenis;
      }
    };
  }, []);

  return null;
}
