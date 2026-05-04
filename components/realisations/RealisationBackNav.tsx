"use client";

import TransitionLink from "@/components/layouts/TransitionLink";

export default function RealisationBackNav() {
  return (
    <nav aria-label="Retour aux réalisations" className="mb-12 sm:mb-14 md:mb-16">
      <TransitionLink
        label="Réalisations"
        targetId="realisations"
        href="/#realisations"
        className="group inline-flex items-center gap-2 font-sans text-[0.68rem] font-medium uppercase tracking-[0.22em] text-[#0C4323] opacity-80 transition-opacity hover:opacity-100"
      >
        <span className="transition-transform group-hover:-translate-x-0.5" aria-hidden>
          ←
        </span>
        Réalisations
      </TransitionLink>
    </nav>
  );
}
