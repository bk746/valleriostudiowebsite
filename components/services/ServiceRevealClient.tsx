"use client";

import { useEffect } from "react";

/**
 * Active les apparitions au scroll des pages services.
 *
 * Le composant ne rend rien : il observe tous les `[data-reveal]` du
 * document et ajoute `is-revealed` quand l'élément entre dans le
 * viewport. Les classes CSS associées (`.svc-reveal`, `.svc-stagger`)
 * sont définies dans `src/app/service-page-anim.css`.
 *
 * - Threshold bas (0.15) + `rootMargin` négatif pour déclencher juste
 *   avant que le bloc soit pleinement visible — on évite l'effet
 *   « ça apparaît trop tard ».
 * - `prefers-reduced-motion` : on révèle tout immédiatement, sans
 *   transition.
 * - L'observer est mis en place après le premier paint (timeout court)
 *   pour laisser l'intro / Lenis se stabiliser sur les arrivées de
 *   navigation, et un repli plein écran ré-applique tout au cas où.
 */
export default function ServiceRevealClient() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const collect = () =>
      Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (reduce) {
      collect().forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    let io: IntersectionObserver | null = null;

    const setup = () => {
      const targets = collect();
      if (targets.length === 0) return;

      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
              entry.target.classList.add("is-revealed");
              io?.unobserve(entry.target);
            }
          }
        },
        { threshold: [0, 0.15, 0.35], rootMargin: "0px 0px -8% 0px" },
      );

      /* Éléments déjà dans la vue au montage (ex. hero) : on les révèle
         tout de suite, sans attendre un événement de scroll. */
      const vh = window.innerHeight;
      for (const el of targets) {
        const rect = el.getBoundingClientRect();
        const visible = rect.top < vh * 0.92 && rect.bottom > vh * 0.08;
        if (visible) {
          el.classList.add("is-revealed");
        } else {
          io.observe(el);
        }
      }
    };

    /* Léger délai pour laisser le DOM du segment service se stabiliser
       (transitions de section, scroll restore, etc.). */
    const t = window.setTimeout(setup, 30);

    return () => {
      window.clearTimeout(t);
      io?.disconnect();
    };
  }, []);

  return null;
}
