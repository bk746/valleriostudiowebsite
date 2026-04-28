import { Bebas_Neue } from "next/font/google";
import { HeroTitleLetters } from "./HeroTitleLetters";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const HERO_TITLE = "Vallerio Studio";

export default function Hero() {
  return (
    <section
      className={`${bebas.className} sticky top-0 z-0 flex h-[100svh] flex-col bg-[#FDF6EC] px-5 pb-6 pt-0 sm:px-8 md:px-12`}
    >
      <div className="flex flex-1 flex-col items-center justify-center gap-5 -translate-y-6 sm:gap-7 sm:-translate-y-12">
        <h1
          className="text-center text-[clamp(3rem,17vw,15rem)] font-normal leading-[0.92] text-black"
          aria-label={HERO_TITLE}
        >
          <HeroTitleLetters text={HERO_TITLE} />
        </h1>
        <p className="text-center text-[clamp(0.7rem,1.2vw,1.25rem)] font-normal leading-tight tracking-[0.24em] text-black sm:tracking-[0.28em]">
          ON CONÇOIT DES SITES QUI CONVERTISSENT
        </p>
      </div>

      <div className="flex items-end justify-between gap-3 text-[0.7rem] text-black sm:gap-4 sm:text-xs md:text-sm">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-6 md:gap-10">
          <span>Design stratégie conversion</span>
          <span>Agence digital · Annecy</span>
        </div>
        <span
          data-hero-arrow
          className="shrink-0 text-black"
          aria-hidden
        >
          <svg
            width="22"
            height="28"
            viewBox="0 0 22 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="overflow-visible"
          >
            {/* Tige + tête — stroke net, cohérent avec un indicateur de scroll */}
            <path
              d="M11 3v15"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
            <path
              d="M4 18l7 7 7-7"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </section>
  );
}
