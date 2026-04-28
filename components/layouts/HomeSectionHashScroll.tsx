"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { scrollToSectionAnchor } from "@/components/layouts/SectionTransition";

/** Sections exposées depuis la nav (anchors sur la page d’accueil). */
const SECTION_IDS = new Set(["services", "realisations", "faq"]);

/**
 * Une fois la home chargée avec un `#hash` (ex. navigation SPA depuis /contact),
 * aligne la page sur la section correspondante — le scroll programmatique vient après
 * le montage du DOM (sections présentes uniquement sur `/`).
 */
export default function HomeSectionHashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const isHome = pathname === "/" || pathname === "";
    if (!isHome) return;

    let cancelled = false;

    const run = () => {
      if (cancelled) return;
      const raw = window.location.hash.replace(/^#/, "");
      const id = raw ? decodeURIComponent(raw) : "";
      if (!id || !SECTION_IDS.has(id)) return;
      scrollToSectionAnchor(id);
    };

    const t = window.setTimeout(run, 0);
    requestAnimationFrame(() => {
      requestAnimationFrame(run);
    });

    const onHash = () => run();
    window.addEventListener("hashchange", onHash);

    return () => {
      cancelled = true;
      window.clearTimeout(t);
      window.removeEventListener("hashchange", onHash);
    };
  }, [pathname]);

  return null;
}
