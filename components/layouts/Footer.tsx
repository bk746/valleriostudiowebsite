import Link from "next/link";
import { Bebas_Neue, Cormorant_Garamond } from "next/font/google";
import { HeroTitleLetters } from "@/components/sections/HeroTitleLetters";
import TransitionLink from "@/components/layouts/TransitionLink";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["400", "500"],
  style: ["italic", "normal"],
  subsets: ["latin"],
  display: "swap",
});

type NavLink =
  | { kind: "default"; label: string; href: string }
  | { kind: "transition"; label: string; href: string; targetId: string; transitionLabel: string };

const NAV_LINKS: ReadonlyArray<NavLink> = [
  { kind: "default", label: "Accueil", href: "/" },
  { kind: "default", label: "À propos", href: "/a-propos" },
  {
    kind: "transition",
    label: "Services",
    href: "/#services",
    targetId: "services",
    transitionLabel: "Services",
  },
  {
    kind: "transition",
    label: "Réalisations",
    href: "/#realisations",
    targetId: "realisations",
    transitionLabel: "Réalisations",
  },
  {
    kind: "transition",
    label: "FAQ",
    href: "/#faq",
    targetId: "faq",
    transitionLabel: "FAQ",
  },
  { kind: "default", label: "Contact", href: "/contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      data-nav-theme="dark"
      className="relative z-[70] flex min-h-[100svh] w-full flex-col overflow-hidden bg-[#343d33] text-[#FDF6EC] shadow-[0_-18px_60px_-12px_rgba(0,0,0,0.35)] md:h-[100svh] md:min-h-[640px]"
      aria-label="Pied de page"
    >
      <div className="flex flex-1 flex-col px-5 pb-6 pt-16 sm:px-10 sm:pt-24 md:px-14 md:pt-28">
        {/* ── GRID 4 COLONNES ──────────────────────────────── */}
        <div className="grid flex-1 grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-8 md:grid-cols-4 md:gap-10">
          {/* Col 1 — Manifeste */}
          <div className="flex flex-col gap-4">
            <p
              className={`${cormorant.className} m-0 text-[clamp(1.4rem,1.7vw,1.9rem)] italic leading-[1.15]`}
            >
              Une fois. Bien fait.
            </p>
            <p className="m-0 max-w-[18rem] text-[0.78rem] leading-relaxed text-[#FDF6EC]/65 sm:text-[0.82rem]">
              Nouveaux projets :{" "}
              <a
                href="mailto:hello@valleriostudio.fr"
                className="text-[#FDF6EC] underline decoration-[#FDF6EC]/30 underline-offset-4 transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[#FDF6EC] hover:decoration-[#FDF6EC]"
              >
                hello@valleriostudio.fr
              </a>
            </p>
          </div>

          {/* Col 2 — Navigation */}
          <nav aria-label="Navigation pied de page">
            <ul className="m-0 list-none p-0">
              {NAV_LINKS.map((l) => {
                const className = `${bebas.className} text-[clamp(0.9rem,1.05vw,1.05rem)] uppercase tracking-[0.18em] text-[#FDF6EC]/80 transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[#FDF6EC]`;
                return (
                  <li key={l.href} className="mb-2 last:mb-0">
                    {l.kind === "transition" ? (
                      <TransitionLink
                        href={l.href}
                        label={l.transitionLabel}
                        targetId={l.targetId}
                        className={className}
                      >
                        {l.label}
                      </TransitionLink>
                    ) : (
                      <Link href={l.href} className={className}>
                        {l.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Col 3 — Horaires + Siège */}
          <div className="flex flex-col gap-7">
            <div>
              <h3
                className={`${bebas.className} mb-2 text-[0.78rem] uppercase tracking-[0.24em] text-[#FDF6EC]/55`}
              >
                Horaires
              </h3>
              <p className="m-0 text-[0.82rem] leading-relaxed text-[#FDF6EC]/85 sm:text-[0.88rem]">
                Ouvert du lundi au vendredi
                <br />
                9h — 18h
              </p>
            </div>
            <div>
              <h3
                className={`${bebas.className} mb-2 text-[0.78rem] uppercase tracking-[0.24em] text-[#FDF6EC]/55`}
              >
                Siège
              </h3>
              <p className="m-0 text-[0.82rem] leading-relaxed text-[#FDF6EC]/85 sm:text-[0.88rem]">
                74000 Annecy
                <br />
                France
                <br />
                <span className="text-[#FDF6EC]/55">74 — Haute-Savoie</span>
              </p>
            </div>
          </div>

          {/* Col 4 — Éditeur + Mentions */}
          <div className="flex flex-col gap-7">
            <div>
              <h3
                className={`${bebas.className} mb-2 text-[0.78rem] uppercase tracking-[0.24em] text-[#FDF6EC]/55`}
              >
                Éditeur
              </h3>
              <p className="m-0 text-[0.82rem] leading-relaxed text-[#FDF6EC]/85 sm:text-[0.88rem]">
                Keryan Bouzerda
                <br />
                <span className="text-[#FDF6EC]/55">Entrepreneur individuel</span>
              </p>
              <dl className="mt-3 grid grid-cols-1 gap-y-0.5 text-[0.74rem] leading-relaxed text-[#FDF6EC]/55 sm:text-[0.78rem]">
                <div className="flex gap-2">
                  <dt className="shrink-0">SIRET</dt>
                  <dd className="m-0">10135441300011</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="shrink-0">SIREN</dt>
                  <dd className="m-0">101354413</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="shrink-0">APE</dt>
                  <dd className="m-0">02.01Z</dd>
                </div>
              </dl>
            </div>

            <Link
              href="/mentions-legales"
              className={`${bebas.className} inline-flex w-fit items-center gap-2 text-[0.78rem] uppercase tracking-[0.24em] text-[#FDF6EC]/85 transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[#FDF6EC]`}
            >
              Mentions légales
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        {/* ── HAIRLINE + COPYRIGHT ─────────────────────────── */}
        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-[#FDF6EC]/15 pt-5 text-[0.7rem] uppercase tracking-[0.24em] text-[#FDF6EC]/55 sm:mt-12 sm:flex-row sm:text-[0.74rem]">
          <span>© {year} Vallerio — Keryan Bouzerda</span>
          <span>Conçu &amp; codé à Annecy</span>
        </div>
      </div>

      {/* ── WORDMARK GÉANT ───────────────────────────────── */}
      <div className="relative mt-auto w-full overflow-hidden">
        <h2
          className={`${bebas.className} m-0 px-2 pb-2 text-center text-[clamp(3rem,15vw,12rem)] font-normal leading-none text-[#FDF6EC] sm:px-4 sm:pb-3`}
          aria-label="Vallerio Studio"
        >
          <HeroTitleLetters text="Vallerio Studio" />
        </h2>
      </div>
    </footer>
  );
}
