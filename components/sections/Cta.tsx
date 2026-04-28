import Link from "next/link";
import { Bebas_Neue } from "next/font/google";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function Cta() {
  return (
    <section
      data-nav-theme="dark"
      className="sticky top-0 z-50 -mt-[100dvh] flex h-[100dvh] w-full flex-col overflow-hidden bg-[#343d33] px-5 text-[#FDF6EC] sm:px-10 sm:shadow-[0_-18px_60px_-12px_rgba(0,0,0,0.35)] md:px-12"
      aria-label="Discutons de votre projet"
    >
      {/* ── Bloc central ─────────────────────────────────── */}
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <h2
          className={`${bebas.className} m-0 text-[clamp(2.8rem,11vw,12rem)] font-normal uppercase leading-[0.92] tracking-[-0.01em] sm:leading-[0.9]`}
        >
          Lancer votre projet
        </h2>

        <Link
          href="/contact"
          className={`${bebas.className} group mt-9 inline-flex items-center gap-2.5 rounded-full bg-[#FDF6EC] px-7 py-3 text-[0.85rem] uppercase tracking-[0.2em] text-[#0C4323] transition-[transform,background-color,color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-transparent hover:text-[#FDF6EC] hover:shadow-[0_0_0_2px_#FDF6EC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDF6EC]/70 focus-visible:ring-offset-4 focus-visible:ring-offset-[#343d33] sm:mt-14 sm:gap-3 sm:px-11 sm:py-4 sm:text-[1rem] sm:tracking-[0.22em]`}
        >
          Discutons de votre projet
          <span
            aria-hidden
            className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
          >
            →
          </span>
        </Link>

        <p
          className={`${bebas.className} mt-12 max-w-[42rem] text-[clamp(0.85rem,1.55vw,1.45rem)] uppercase leading-[1.5] tracking-[0.08em] opacity-90 sm:mt-20 sm:tracking-[0.1em]`}
        >
          Prêt à transformer votre présence digitale ?
          <br className="hidden sm:block" />{" "}
          <span className="sm:hidden"> </span>Discutons de votre projet.
        </p>
      </div>
    </section>
  );
}
