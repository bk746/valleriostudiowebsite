"use client";

import { useEffect, useState } from "react";
import { Bebas_Neue } from "next/font/google";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const ENTER_DURATION = 420;
const HOLD_DURATION = 220;
const EXIT_DURATION = 420;

/** Cible : le haut de la section aligné sur le haut du viewport (y = 0), pas sous la navbar. */
const SECTION_TOP_VIEWPORT_PX = 0;

type Phase = "idle" | "entering" | "holding" | "leaving";

type Detail = { label: string; targetId: string };

export const SECTION_TRANSITION_EVENT = "vallerio:section-transition";

/**
 * Vraie position absolue dans le document.
 *
 * On NE peut PAS utiliser `getBoundingClientRect().top + scrollY` :
 * Services / Realisations sont en `position: sticky` — quand ils sont pinned,
 * `rect.top` vaut 0 quel que soit le scroll réel, donc le calcul retourne la
 * position visuelle, pas la position de flux. Idem pour les boucles de
 * raffinement basées sur `rect.top`.
 *
 * `offsetTop` cumulé en remontant les `offsetParent` donne la position de flux
 * réelle, qui est ce qu'on veut atteindre.
 */
function getDocumentTop(el: HTMLElement): number {
  let y = 0;
  let node: HTMLElement | null = el;
  while (node) {
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return y;
}

export function scrollToSectionAnchor(targetId: string): void {
  const el = document.getElementById(targetId);
  if (!el) return;

  const top = Math.max(0, getDocumentTop(el) - SECTION_TOP_VIEWPORT_PX);
  /*
   Si Lenis est actif, on l'utilise pour le saut sec : sinon Lenis
   continuerait d'animer le scroll vers la position d'avant-rideau et
   réécraserait le saut programmatique.

   En fallback (mobile / reduced-motion / Lenis indisponible), on scrolle
   TOUS les candidats : selon le navigateur, le scrolling root peut être
   `window`, `documentElement` ou `body`.
  */
  const lenis = typeof window !== "undefined" ? window.__lenis : undefined;
  if (lenis) {
    lenis.scrollTo(top, { immediate: true, force: true, lock: true });
  } else {
    window.scrollTo({ left: 0, top, behavior: "auto" });
    if (document.scrollingElement) {
      document.scrollingElement.scrollTop = top;
    }
    document.documentElement.scrollTop = top;
    document.body.scrollTop = top;
  }

  try {
    const { pathname, search } = window.location;
    window.history.replaceState(
      null,
      "",
      `${pathname}${search}#${encodeURIComponent(targetId)}`
    );
  } catch {
    /* ignore SSR / vieux navigateurs */
  }
}

function scrollToAnchorAfterLayout(targetId: string): void {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => scrollToSectionAnchor(targetId));
  });
}

export default function SectionTransition() {
  const [label, setLabel] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    const timeouts: number[] = [];

    const handler = (e: Event) => {
      const detail = (e as CustomEvent<Detail>).detail;
      if (!detail) return;
      const { label: lbl, targetId } = detail;

      // prefers-reduced-motion → on saute l'animation et on scroll directement
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        scrollToAnchorAfterLayout(targetId);
        return;
      }

      // Annule une transition précédente en cours
      timeouts.splice(0).forEach(window.clearTimeout);

      setLabel(lbl);
      setPhase("entering");
      /* NB: pas de body.style.overflow = "hidden" ici. Le rideau plein écran
         (z-[110], pointer-events auto) bloque déjà toute interaction
         utilisateur avec la page sous-jacente, et un overflow:hidden sur le
         body empêcherait le scrollIntoView programmatique de fonctionner —
         on n'atterrirait jamais sur la section cible. */

      // 1. Une fois le rideau en place → scroll vers la section (sticky-safe)
      timeouts.push(
        window.setTimeout(() => {
          scrollToAnchorAfterLayout(targetId);
          setPhase("holding");
        }, ENTER_DURATION)
      );

      // 2. Sortie du rideau
      timeouts.push(
        window.setTimeout(() => {
          setPhase("leaving");
        }, ENTER_DURATION + HOLD_DURATION)
      );

      // 3. Retour à l'état initial — recale le scroll (Safari / sticky peuvent dévier)
      timeouts.push(
        window.setTimeout(() => {
          setPhase("idle");
          scrollToAnchorAfterLayout(targetId);
        }, ENTER_DURATION + HOLD_DURATION + EXIT_DURATION)
      );
    };

    window.addEventListener(SECTION_TRANSITION_EVENT, handler);
    return () => {
      window.removeEventListener(SECTION_TRANSITION_EVENT, handler);
      timeouts.forEach(window.clearTimeout);
    };
  }, []);

  if (phase === "idle") return null;

  return (
    <div
      data-phase={phase}
      className={`section-transition fixed inset-0 z-[110] overflow-hidden ${bebas.className}`}
      aria-hidden
      role="presentation"
    >
      <div className="section-transition-panel absolute inset-0 flex items-center justify-center bg-[#156332]">
        <h2 className="section-transition-label m-0 px-5 text-center text-[clamp(2.6rem,18vw,18rem)] font-normal uppercase leading-[0.92] tracking-[-0.015em] text-[#FDF6EC] sm:leading-[0.9]">
          {label}
        </h2>
      </div>
    </div>
  );
}

/**
 * Helper utilisable depuis n'importe quel composant client pour déclencher
 * la transition de section.
 */
export function triggerSectionTransition(label: string, targetId: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<Detail>(SECTION_TRANSITION_EVENT, {
      detail: { label, targetId },
    })
  );
}
