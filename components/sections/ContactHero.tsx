import { Bebas_Neue, Cormorant_Garamond } from "next/font/google";
import { HeroTitleLetters } from "./HeroTitleLetters";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["400", "500"],
  style: ["italic"],
  subsets: ["latin"],
  display: "swap",
});

const TITLE = "Contact";

export default function ContactHero() {
  return (
    <section
      className={`${bebas.className} relative flex min-h-[100dvh] w-full flex-col bg-[#FDF6EC] px-5 pb-6 pt-28 text-[#0C4323] sm:px-12 sm:pb-7 sm:pt-40 md:pt-48`}
      aria-label="Contact — hero"
    >
      <div className="flex flex-1 flex-col items-center justify-center gap-5 sm:gap-7">
        <p className="text-center text-[0.65rem] font-medium uppercase tracking-[0.28em] opacity-70 sm:text-[clamp(0.7rem,1vw,1rem)] sm:tracking-[0.32em]">
          Travaillons ensemble
        </p>

        <h1
          className="text-center text-[clamp(3.5rem,17vw,15rem)] font-normal leading-[0.95] text-black sm:leading-none"
          aria-label={TITLE}
        >
          <HeroTitleLetters text={TITLE} />
        </h1>

        <p
          className={`${cormorant.className} max-w-[36rem] text-center text-[clamp(1rem,1.4vw,1.45rem)] italic leading-[1.4] opacity-85`}
        >
          Présentez-nous votre projet — on revient vers vous sous{" "}
          <span className="not-italic font-medium">24 h</span>.
        </p>
      </div>

      <div className="flex flex-col items-start justify-between gap-3 text-[0.7rem] sm:flex-row sm:items-end sm:gap-4 sm:text-xs md:text-sm">
        <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 md:gap-10">
          <a
            href="mailto:hello@valleriostudio.fr"
            className="underline decoration-[#0C4323]/30 underline-offset-4 transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:decoration-[#0C4323]"
          >
            hello@valleriostudio.fr
          </a>
          <span className="opacity-60">Annecy · 9h–18h</span>
        </div>
        <span aria-hidden className="shrink-0 opacity-60">
          ↓ Formulaire
        </span>
      </div>
    </section>
  );
}
