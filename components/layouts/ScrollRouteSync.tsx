"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import type Lenis from "lenis";
import { resetBodyScrollLocks } from "@/lib/body-scroll-lock";

function reconcileLenis(lenis: Lenis): void {
  lenis.resize();
  /* `reset()` remet `isLocked` / inertie à zéro ; il est marqué `private`
   * dans les types Lenis 1.3 mais bien exposé à l’exécution. */
  (lenis as unknown as { reset: () => void }).reset();
}

/**
 * Recale Lenis lorsque la route change (hauteurs / limit / état interne) et
 * remet à zéro les verrous de scroll après un retour bfcache.
 *
 * NB : on **n’exécute pas** au premier mount — `ScrollResetOnLoad` et l’intro
 * s’en occupent déjà ; appeler `lenis.reset()` ici interromprait toute animation
 * Lenis légitime au démarrage.
 */
export default function ScrollRouteSync() {
  const pathname = usePathname();
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    let cancelled = false;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (cancelled) return;
        const lenis = window.__lenis;
        if (lenis) reconcileLenis(lenis);
      });
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(id);
    };
  }, [pathname]);

  useEffect(() => {
    const onPageShow = (e: PageTransitionEvent) => {
      if (!e.persisted) return;
      resetBodyScrollLocks();
      const lenis = window.__lenis;
      if (lenis) {
        requestAnimationFrame(() => reconcileLenis(lenis));
      }
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  return null;
}
