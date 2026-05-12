"use client";

import TransitionLink from "@/components/layouts/TransitionLink";

const DEFAULT_LINK_CLASS =
  "group inline-flex items-center gap-2 font-sans text-[0.68rem] font-medium uppercase tracking-[0.22em] text-[#0C4323] opacity-80 transition-opacity hover:opacity-100";

/**
 * Retour discret en haut des pages services (`/services/[…]`) — pendant
 * exact de `RealisationBackNav`. Utilise `TransitionLink` pour rejouer
 * la transition de section depuis la home (`/#services`).
 */
export default function ServiceBackNav({
  linkClassName = DEFAULT_LINK_CLASS,
}: {
  linkClassName?: string;
}) {
  return (
    <nav aria-label="Retour aux services" className="mb-12 sm:mb-14 md:mb-16">
      <TransitionLink
        label="Services"
        targetId="services"
        href="/#services"
        className={linkClassName}
      >
        <span className="transition-transform group-hover:-translate-x-0.5" aria-hidden>
          ←
        </span>
        Services
      </TransitionLink>
    </nav>
  );
}
