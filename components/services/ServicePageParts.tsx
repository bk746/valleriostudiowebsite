import Link from "next/link";
import { Bebas_Neue, Cormorant_Garamond } from "next/font/google";

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

export function ServiceNumberedSection({
  num,
  title,
  children,
}: {
  num: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      data-reveal
      className="svc-reveal grid gap-6 lg:grid-cols-[11rem_1fr] lg:gap-16 xl:gap-24"
    >
      <header className="flex items-baseline gap-4 lg:flex-col lg:items-start lg:gap-3">
        <span
          className={`${bebas.className} text-[clamp(2rem,4.6vw,3.4rem)] leading-none text-[#0071E3]`}
          aria-hidden
        >
          {num}
        </span>
        <h2 className="m-0 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-[#1D1D1F]/65 sm:text-[0.8rem]">
          {title}
        </h2>
      </header>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

export function ServiceHeroCtas({ preuvesHref = "#preuves" }: { preuvesHref?: string }) {
  return (
    <div className="mt-9 flex flex-wrap items-center gap-5 sm:mt-11 sm:gap-7">
      <Link
        href="/contact"
        className="inline-flex items-center gap-2 rounded-full bg-[#0071E3] px-6 py-3 font-sans text-[0.92rem] font-medium text-white transition-[transform,background-color] duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#0066CC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3]/40 focus-visible:ring-offset-2 sm:px-7 sm:py-3.5"
      >
        Demander un devis gratuit
        <span aria-hidden>→</span>
      </Link>
      <a
        href={preuvesHref}
        className="font-sans text-[0.92rem] font-medium text-[#0071E3] transition-opacity hover:opacity-70"
      >
        Voir nos réalisations →
      </a>
    </div>
  );
}

export function ServiceKpiBand({
  items,
}: {
  items: ReadonlyArray<{ k: string; v: string }>;
}) {
  return (
    <div data-reveal className="svc-reveal overflow-hidden rounded-[1.75rem] bg-[#F5F5F7]">
      <ul className="m-0 grid list-none grid-cols-2 p-0 md:grid-cols-4">
        {items.map((kpi, i) => (
          <li
            key={kpi.k}
            className={
              "flex flex-col gap-2.5 p-6 sm:p-9 lg:p-10" +
              (i % 2 === 1 ? " border-l border-[#1D1D1F]/8" : "") +
              (i >= 2 ? " border-t border-[#1D1D1F]/8 md:border-t-0" : "") +
              (i === 2 ? " md:border-l" : "")
            }
          >
            <p
              className={`${bebas.className} m-0 text-[clamp(2.1rem,4.5vw,3.6rem)] leading-none text-[#0071E3]`}
            >
              {kpi.k}
            </p>
            <p className="m-0 font-sans text-[0.82rem] leading-[1.5] text-[#1D1D1F]/65 sm:text-[0.88rem]">
              {kpi.v}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className="size-4 shrink-0 text-[#0071E3]"
      aria-hidden
    >
      <circle cx="8" cy="8" r="8" fill="currentColor" opacity="0.12" />
      <path
        d="M4.5 8.2 7 10.6l4.5-5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ServiceEngagementBand({
  items,
}: {
  items: ReadonlyArray<{ t: string; d: string }>;
}) {
  return (
    <ul
      data-reveal
      className="svc-stagger m-0 mt-5 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4"
    >
      {items.map((g) => (
        <li key={g.t} className="rounded-[1.25rem] bg-[#F5F5F7] p-5 sm:p-6">
          <p className="m-0 flex items-center gap-2 font-sans text-[0.9rem] font-semibold text-[#1D1D1F]">
            <CheckIcon />
            {g.t}
          </p>
          <p className="mt-2 m-0 font-sans text-[0.82rem] leading-[1.55] text-[#1D1D1F]/60">
            {g.d}
          </p>
        </li>
      ))}
    </ul>
  );
}

type Format = {
  name: string;
  duree: string;
  cible: string;
  inclus: ReadonlyArray<string>;
};

export function ServiceFormatsList({
  intro,
  formats,
}: {
  intro: string;
  formats: ReadonlyArray<Format>;
}) {
  return (
    <>
      <p className="max-w-[44rem] font-sans text-[1rem] leading-[1.7] text-[#1D1D1F]/92 sm:text-[1.05rem] sm:leading-[1.78]">
        {intro}
      </p>
      <div className="mt-12 sm:mt-14">
        {formats.map((f, i) => (
          <article
            key={f.name}
            className="group grid gap-7 border-t border-[#1D1D1F]/10 py-10 last:border-b last:border-[#1D1D1F]/10 sm:py-12 md:grid-cols-[1.15fr_1fr] md:gap-14 lg:py-16 lg:gap-24"
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <span
                  className={`${bebas.className} text-[0.95rem] leading-none tracking-[0.2em] text-[#0071E3]`}
                  aria-hidden
                >
                  0{i + 1}
                </span>
                <span className="rounded-full bg-[#F5F5F7] px-3.5 py-1.5 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#1D1D1F]/60">
                  {f.duree}
                </span>
              </div>
              <h3
                className={`${bebas.className} m-0 mt-5 text-[clamp(2.1rem,5.5vw,4.8rem)] font-normal uppercase leading-[0.95] tracking-[-0.015em] transition-colors duration-300 ease-out group-hover:text-[#0071E3] sm:mt-6`}
              >
                {f.name}
              </h3>
              <p className="mt-4 m-0 max-w-[30rem] font-sans text-[0.95rem] leading-[1.6] text-[#1D1D1F]/55 sm:mt-5 sm:text-[1rem]">
                Pensé pour : {f.cible.toLowerCase()}.
              </p>
            </div>
            <ul className="m-0 list-none space-y-3.5 self-center p-0 sm:space-y-4">
              {f.inclus.map((it) => (
                <li
                  key={it}
                  className="flex gap-3 font-sans text-[0.92rem] leading-[1.55] text-[#1D1D1F]/85 sm:text-[0.95rem]"
                >
                  <CheckIcon />
                  <span className="min-w-0">{it}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </>
  );
}

export function ServiceCtaFinal({
  title,
  description,
  ariaLabel,
}: {
  title: string;
  description: string;
  ariaLabel: string;
}) {
  return (
    <section
      data-nav-theme="dark"
      data-reveal
      className="svc-reveal relative overflow-hidden rounded-3xl bg-[#1D1D1F] px-6 py-14 text-[#FFFFFF] shadow-[0_28px_80px_-30px_rgba(0,0,0,0.45)] sm:px-10 sm:py-20 md:px-14 md:py-24"
      aria-label={ariaLabel}
    >
      <div className="relative z-10 flex flex-col items-center text-center">
        <p className="font-sans text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-[#FFFFFF]/65 sm:text-[0.7rem]">
          Prochaine étape
        </p>
        <h2
          className={`${bebas.className} m-0 mt-5 text-[clamp(2.2rem,7vw,5.5rem)] font-normal uppercase leading-[0.95] tracking-[-0.015em] sm:mt-6 sm:leading-[0.9]`}
        >
          {title}
        </h2>
        <p
          className={`${cormorant.className} mt-6 max-w-[36rem] text-[clamp(1rem,1.4vw,1.4rem)] italic leading-[1.45] text-[#FFFFFF]/85 sm:mt-7`}
        >
          {description}
        </p>
        <Link
          href="/contact"
          className={`${bebas.className} group mt-9 inline-flex items-center gap-2.5 rounded-full bg-[#0071E3] px-7 py-3 text-[0.85rem] uppercase tracking-[0.2em] text-white transition-[transform,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-[#0066CC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3]/60 focus-visible:ring-offset-4 focus-visible:ring-offset-[#1D1D1F] sm:mt-12 sm:gap-3 sm:px-11 sm:py-4 sm:text-[1rem] sm:tracking-[0.22em]`}
        >
          Discutons de votre projet
          <span
            aria-hidden
            className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
        <p className="mt-6 font-sans text-[0.74rem] uppercase tracking-[0.22em] text-[#FFFFFF]/55 sm:mt-8 sm:text-[0.78rem]">
          Réponse personnalisée sous 24 h · Annecy · à distance
        </p>
      </div>
    </section>
  );
}

export const SERVICE_PAGE_SHELL =
  "mx-auto max-w-[88rem] px-5 sm:px-10 md:px-14 lg:px-20";

export const SERVICE_MAIN =
  "min-h-svh bg-[#FFFFFF] pb-32 pt-28 text-[#1D1D1F] sm:pb-44 sm:pt-32 md:pb-52 md:pt-40";
