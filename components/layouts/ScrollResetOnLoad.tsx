"use client";

import { useLayoutEffect } from "react";

/**
 * Chargement / rechargement : toujours commencer tout en haut (Hero).
 *
 * Le composant est monté dans le RootLayout — il ne s'exécute qu'au premier
 * mount (rechargement / ouverture d'onglet), pas lors des navigations SPA.
 *
 * — Désactive la restauration de scroll du navigateur.
 * — Force scrollY = 0.
 * — Supprime le #hash de l'URL pour que `HomeSectionHashScroll` n'aille pas
 *   sauter vers une section ensuite. Les liens depuis /contact passent
 *   désormais par `sessionStorage` (HomePendingSectionTransition), donc on
 *   peut nettoyer le hash sans casser ce flow.
 */
export default function ScrollResetOnLoad() {
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    try {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
    } catch {
      /* noop */
    }

    window.scrollTo({ left: 0, top: 0, behavior: "auto" });

    try {
      if (window.location.hash) {
        const { pathname, search } = window.location;
        window.history.replaceState(null, "", `${pathname}${search}`);
      }
    } catch {
      /* noop */
    }
  }, []);

  return null;
}
