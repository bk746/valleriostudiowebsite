"use client";

import { useState } from "react";
import { Bebas_Neue, Cormorant_Garamond } from "next/font/google";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
});

type QA = {
  q: string;
  a: string;
};

const FAQ_ITEMS: ReadonlyArray<QA> = [
  {
    q: "Combien de temps pour livrer un site ?",
    a: "En moyenne 2 semaines selon la complexité du projet. On vous donne un planning précis dès le cadrage, et on tient les délais.",
  },
  {
    q: "Quel est le tarif d’un projet ?",
    a: "Chaque projet est sur-mesure : le tarif dépend du périmètre, du nombre de pages et des fonctionnalités. On vous envoie un devis détaillé après un premier appel — gratuit et sans engagement.",
  },
  {
    q: "Travaillez-vous avec des clients hors de France ?",
    a: "Oui, on travaille en visio avec des clients partout en Europe et au-delà. Tant que la communication est fluide, la distance n’est pas un frein.",
  },
  {
    q: "Qui s’occupe du contenu — textes et photos ?",
    a: "On peut vous accompagner sur la rédaction, la direction artistique et la production photo / vidéo si besoin. Sinon, on intègre vos contenus existants en respectant votre identité.",
  },
  {
    q: "Que se passe-t-il après la mise en ligne ?",
    a: "On reste à vos côtés : mises à jour de contenu, sécurité, suivi des performances et conseils pour faire évoluer votre site dans le temps.",
  },
  {
    q: "Puis-je modifier mon site moi-même ?",
    a: "Oui. On vous remet un site facile à mettre à jour, avec une formation rapide pour gérer vos contenus en autonomie. Et on reste joignable en cas de doute.",
  },
  {
    q: "Proposez-vous le référencement naturel (SEO) ?",
    a: "Le SEO technique est inclus dans tous nos sites : structure propre, performances, métadonnées, balisage. On peut aussi vous accompagner sur une stratégie de contenu plus poussée.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="relative z-[60] w-full bg-[#FDF6EC] px-5 pb-20 pt-20 text-[#0C4323] sm:px-8 sm:pb-28 sm:pt-28 sm:shadow-[0_-18px_60px_-12px_rgba(0,0,0,0.35)] md:px-12 md:pb-32 md:pt-32"
      aria-label="Questions fréquentes"
    >
      <div className="grid grid-cols-1 gap-8 sm:gap-12 md:grid-cols-12 md:gap-16">
        {/* ── TITRE ────────────────────────────────────────── */}
        <header className="md:col-span-4 lg:col-span-3">
          <h2
            className={`${bebas.className} m-0 text-[clamp(3rem,9vw,9rem)] font-normal uppercase leading-[0.92] tracking-[-0.015em] sm:leading-[0.86]`}
          >
            FAQ
          </h2>
          <p className="mt-3 max-w-[22rem] font-sans text-[0.65rem] font-medium uppercase tracking-[0.24em] opacity-60 sm:mt-5 sm:text-[0.75rem]">
            Questions fréquentes — réponses claires
          </p>
        </header>

        {/* ── LISTE ────────────────────────────────────────── */}
        <ul className="m-0 list-none p-0 md:col-span-8 lg:col-span-9">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <li
                key={item.q}
                className="border-t border-[#0C4323]/55 last:border-b last:border-[#0C4323]/55"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-trigger-${i}`}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className={`${bebas.className} group flex w-full items-center justify-between gap-4 py-5 text-left text-[clamp(1.05rem,1.85vw,1.85rem)] uppercase tracking-[0.005em] transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[#156332] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0C4323]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDF6EC] sm:gap-6 sm:py-8`}
                >
                  <span className="flex-1 leading-[1.1] sm:leading-[1.05]">{item.q}</span>
                  <span
                    aria-hidden
                    className="relative flex size-6 shrink-0 items-center justify-center sm:size-8"
                  >
                    <span className="absolute h-[1.5px] w-full bg-current" />
                    <span
                      className={`absolute h-full w-[1.5px] bg-current transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isOpen ? "scale-y-0" : "scale-y-100"
                      }`}
                    />
                  </span>
                </button>

                {/* Panneau réponse — animation grid 0fr → 1fr (no jank) */}
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${i}`}
                  className="grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="overflow-hidden">
                    <p
                      className={`${cormorant.className} m-0 max-w-[42rem] pb-6 pr-2 text-[clamp(1rem,1.35vw,1.5rem)] leading-[1.5] text-[#0C4323]/85 sm:pb-8 sm:pr-16`}
                    >
                      {item.a}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
