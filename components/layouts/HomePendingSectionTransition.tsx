"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  triggerSectionTransition,
} from "@/components/layouts/SectionTransition";

const STORAGE_KEY = "vallerio.pending-home-section:V1";

type Payload = {
  label: string;
  targetId: string;
};

/**
 * A appeler depuis TransitionLink hors page d’accueil avant router.push("/").
 * Même comportement ensuite que sur `/` : rideau plein écran + scroll vers la section.
 */
export function prepareNavigateToHomeWithSameTransition(
  label: string,
  targetId: string
): void {
  try {
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ label, targetId } satisfies Payload)
    );
  } catch {
    /* quota / mode privé */
  }
}

/**
 * Après SPA vers `/`, rejoue `triggerSectionTransition` (identique lien Réalisations / FAQ sur la home).
 */
export default function HomePendingSectionTransition() {
  const pathname = usePathname();

  useEffect(() => {
    const isHome = pathname === "/" || pathname === "";
    if (!isHome) return;

    let payload: Payload | null = null;
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      sessionStorage.removeItem(STORAGE_KEY);
      payload = JSON.parse(raw) as Payload;
    } catch {
      return;
    }

    if (!payload || !payload.label || !payload.targetId) return;

    const { label: lbl, targetId } = payload;

    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        triggerSectionTransition(lbl, targetId);
      });
    });

    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return null;
}
