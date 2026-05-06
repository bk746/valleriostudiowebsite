import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Bebas_Neue } from "next/font/google";
import { notFound } from "next/navigation";
import RealisationBackNav from "@/components/realisations/RealisationBackNav";
import { NEXT_IMAGE_QUALITY_RASTER } from "@/lib/image-defaults";
import {
  REALISATIONS,
  type GallerySlide,
  type Realisation,
  getRealisationBySlug,
  getRealisationExtraGallery,
} from "@/lib/realisations-data";

const CASE_STUDY_IMAGE_SIZES_FULL =
  "(max-width: 768px) 100vw, (max-width: 1280px) min(100vw, 1024px), 1280px";
const CASE_STUDY_IMAGE_SIZES_HALF =
  "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 720px";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

type Props = { params: Promise<{ slug: string }> };

/** Styles par `visualShell` de la carte — même grille que la vitrine, ambiance alignée au projet. */
type PageTheme = {
  /** Couleur de texte « document » pour toute la colonne (neutralise `body { color }` en mode sombre système). */
  surfaceText: string;
  main: string;
  eyebrow: string;
  eyebrowOnDark: string;
  body: string;
  bodyOnDark: string;
  figure: string;
  chapo: string;
  num: string;
  sectionH2: string;
  problemCard: string;
  solutionCard: string;
  deliverableLi: string;
  deliverableNum: string;
  techPill: string;
  bilan: string;
  footerBorder: string;
  nextTitle: string;
  nextArrow: string;
  nextFocus: string;
};

const PAGE_THEMES: Record<"default" | "cream" | "warm", PageTheme> = {
  default: {
    surfaceText: "text-[#0C4323]",
    main:
      "min-h-svh bg-[#FDF6EC] pb-32 pt-28 sm:pb-44 sm:pt-32 md:pb-52 md:pt-40",
    eyebrow:
      "font-sans text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-[#0C4323]/55 sm:text-[0.7rem]",
    eyebrowOnDark:
      "font-sans text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-[#FDF6EC]/65 sm:text-[0.7rem]",
    body: "m-0 font-sans text-[1rem] leading-[1.7] text-[#0C4323]/92 sm:text-[1.05rem] sm:leading-[1.78]",
    bodyOnDark:
      "m-0 font-sans text-[1rem] leading-[1.7] text-[#FDF6EC]/92 sm:text-[1.05rem] sm:leading-[1.78]",
    figure:
      "relative m-0 overflow-hidden rounded-2xl border border-[#0C4323]/10 bg-[#0C4323]/[0.03] shadow-[0_28px_70px_-32px_rgba(12,67,35,0.18)] sm:rounded-3xl",
    chapo:
      "mt-8 max-w-[44rem] font-sans text-[clamp(1.05rem,1.6vw,1.4rem)] leading-[1.55] text-[#0C4323]/90 sm:mt-10",
    num: `${bebas.className} text-[clamp(2rem,4.6vw,3.4rem)] leading-none text-[#156332]`,
    sectionH2:
      "m-0 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-[#0C4323]/65 sm:text-[0.8rem]",
    problemCard:
      "rounded-2xl border border-[#0C4323]/14 bg-white/65 p-6 sm:p-8 md:p-9",
    solutionCard:
      "rounded-2xl bg-[#0C4323] p-6 text-[#FDF6EC] shadow-[0_24px_60px_-30px_rgba(12,67,35,0.4)] sm:p-8 md:p-9",
    deliverableLi:
      "flex gap-4 border-b border-[#0C4323]/10 pb-4 font-sans text-[0.96rem] leading-[1.6] text-[#0C4323]/92 last:border-b-0 last:pb-0 sm:gap-5 sm:text-[1rem] sm:leading-[1.65]",
    deliverableNum: `${bebas.className} mt-[0.05em] shrink-0 text-[1.05rem] leading-none text-[#156332] sm:text-[1.15rem]`,
    techPill:
      "inline-block max-w-full rounded-full border border-[#0C4323]/22 bg-[#FDF6EC] px-3.5 py-2 font-sans text-[0.72rem] font-medium uppercase leading-snug tracking-[0.14em] text-[#0C4323]/85",
    bilan:
      "rounded-2xl border border-[#156332]/22 bg-[#156332]/[0.07] p-6 sm:p-8 md:p-10",
    footerBorder: "border-[#0C4323]/15",
    nextTitle: `${bebas.className} text-[clamp(1.6rem,5vw,3rem)] uppercase leading-[0.95] tracking-[-0.01em] text-[#0C4323] transition-colors group-hover:text-[#156332]`,
    nextArrow: `${bebas.className} text-[1.4rem] uppercase tracking-[0.18em] text-[#0C4323]/55 transition-transform group-hover:translate-x-1 sm:text-[1.6rem]`,
    nextFocus: "focus-visible:bg-[#0C4323]/5",
  },
  cream: {
    surfaceText: "text-[#1c1917]",
    main:
      "min-h-svh bg-[#EDEAE4] pb-32 pt-28 sm:pb-44 sm:pt-32 md:pb-52 md:pt-40",
    eyebrow:
      "font-sans text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-[#1c1917]/52 sm:text-[0.7rem]",
    eyebrowOnDark:
      "font-sans text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-[#F5F2EC]/60 sm:text-[0.7rem]",
    body: "m-0 font-sans text-[1rem] leading-[1.7] text-[#292524]/92 sm:text-[1.05rem] sm:leading-[1.78]",
    bodyOnDark:
      "m-0 font-sans text-[1rem] leading-[1.7] text-[#F5F2EC]/92 sm:text-[1.05rem] sm:leading-[1.78]",
    figure:
      "relative m-0 overflow-hidden rounded-2xl border border-black/[0.08] bg-black/[0.02] shadow-[0_28px_70px_-32px_rgba(0,0,0,0.14)] sm:rounded-3xl",
    chapo:
      "mt-8 max-w-[44rem] font-sans text-[clamp(1.05rem,1.6vw,1.4rem)] leading-[1.55] text-[#1c1917]/90 sm:mt-10",
    num: `${bebas.className} text-[clamp(2rem,4.6vw,3.4rem)] leading-none text-[#0C4323]`,
    sectionH2:
      "m-0 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-[#1c1917]/55 sm:text-[0.8rem]",
    problemCard:
      "rounded-2xl border border-black/10 bg-white/60 p-6 shadow-[0_8px_40px_-16px_rgba(0,0,0,0.08)] sm:p-8 md:p-9",
    solutionCard:
      "rounded-2xl bg-[#1a1a1a] p-6 text-[#F5F2EC] shadow-[0_28px_60px_-28px_rgba(0,0,0,0.35)] sm:p-8 md:p-9",
    deliverableLi:
      "flex gap-4 border-b border-black/10 pb-4 font-sans text-[0.96rem] leading-[1.6] text-[#292524]/92 last:border-b-0 last:pb-0 sm:gap-5 sm:text-[1rem] sm:leading-[1.65]",
    deliverableNum: `${bebas.className} mt-[0.05em] shrink-0 text-[1.05rem] leading-none text-[#0C4323] sm:text-[1.15rem]`,
    techPill:
      "inline-block max-w-full rounded-full border border-black/12 bg-[#FDF6EC] px-3.5 py-2 font-sans text-[0.72rem] font-medium uppercase leading-snug tracking-[0.14em] text-[#1c1917]/85",
    bilan:
      "rounded-2xl border border-[#0C4323]/15 bg-white/45 p-6 sm:p-8 md:p-10",
    footerBorder: "border-black/10",
    nextTitle: `${bebas.className} text-[clamp(1.6rem,5vw,3rem)] uppercase leading-[0.95] tracking-[-0.01em] text-[#1c1917] transition-colors group-hover:text-[#0C4323]`,
    nextArrow: `${bebas.className} text-[1.4rem] uppercase tracking-[0.18em] text-[#1c1917]/45 transition-transform group-hover:translate-x-1 sm:text-[1.6rem]`,
    nextFocus: "focus-visible:bg-black/5",
  },
  warm: {
    surfaceText: "text-[#3d1f12]",
    main:
      "min-h-svh bg-[#FFF4E8] pb-32 pt-28 sm:pb-44 sm:pt-32 md:pb-52 md:pt-40",
    eyebrow:
      "font-sans text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-[#5c3018]/55 sm:text-[0.7rem]",
    eyebrowOnDark:
      "font-sans text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-[#FFF8F2]/65 sm:text-[0.7rem]",
    body: "m-0 font-sans text-[1rem] leading-[1.7] text-[#422218]/92 sm:text-[1.05rem] sm:leading-[1.78]",
    bodyOnDark:
      "m-0 font-sans text-[1rem] leading-[1.7] text-[#FFF8F2]/92 sm:text-[1.05rem] sm:leading-[1.78]",
    figure:
      "relative m-0 overflow-hidden rounded-2xl border border-[#e85d22]/15 bg-[#fff0e5] shadow-[0_28px_70px_-32px_rgba(230,90,25,0.15)] sm:rounded-3xl",
    chapo:
      "mt-8 max-w-[44rem] font-sans text-[clamp(1.05rem,1.6vw,1.4rem)] leading-[1.55] text-[#422218]/92 sm:mt-10",
    num: `${bebas.className} text-[clamp(2rem,4.6vw,3.4rem)] leading-none text-[#c2410c]`,
    sectionH2:
      "m-0 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-[#5c3018]/60 sm:text-[0.8rem]",
    problemCard:
      "rounded-2xl border border-[#e85d22]/20 bg-white/70 p-6 sm:p-8 md:p-9",
    solutionCard:
      "rounded-2xl bg-[#9a3412] p-6 text-[#FFF8F2] shadow-[0_24px_60px_-28px_rgba(154,52,18,0.35)] sm:p-8 md:p-9",
    deliverableLi:
      "flex gap-4 border-b border-[#c2410c]/15 pb-4 font-sans text-[0.96rem] leading-[1.6] text-[#422218]/92 last:border-b-0 last:pb-0 sm:gap-5 sm:text-[1rem] sm:leading-[1.65]",
    deliverableNum: `${bebas.className} mt-[0.05em] shrink-0 text-[1.05rem] leading-none text-[#c2410c] sm:text-[1.15rem]`,
    techPill:
      "inline-block max-w-full rounded-full border border-[#e85d22]/25 bg-[#FFF8F2] px-3.5 py-2 font-sans text-[0.72rem] font-medium uppercase leading-snug tracking-[0.14em] text-[#5c3018]/90",
    bilan:
      "rounded-2xl border border-[#f97316]/25 bg-[#ffedd5]/60 p-6 sm:p-8 md:p-10",
    footerBorder: "border-[#e85d22]/20",
    nextTitle: `${bebas.className} text-[clamp(1.6rem,5vw,3rem)] uppercase leading-[0.95] tracking-[-0.01em] text-[#422218] transition-colors group-hover:text-[#c2410c]`,
    nextArrow: `${bebas.className} text-[1.4rem] uppercase tracking-[0.18em] text-[#9a3412]/55 transition-transform group-hover:translate-x-1 sm:text-[1.6rem]`,
    nextFocus: "focus-visible:bg-[#ffedd5]/80",
  },
};

function resolvePageTheme(r: Realisation): PageTheme {
  const shell = r.visualShell ?? "default";
  if (shell === "cream") return PAGE_THEMES.cream;
  if (shell === "warm") return PAGE_THEMES.warm;
  /** `dark` sur la carte = ambiance type vitrine nuit, mais la page étude de cas reste en thème clair lisible. */
  if (shell === "dark") return PAGE_THEMES.default;
  return PAGE_THEMES.default;
}

export function generateStaticParams() {
  return REALISATIONS.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const r = getRealisationBySlug(slug);
  if (!r) return { title: "Réalisation introuvable" };
  const desc = r.caseStudy
    ? `${r.caseStudy.summary.slice(0, 155)}${r.caseStudy.summary.length > 155 ? "…" : ""}`
    : r.status;
  return {
    title: `${r.title} — Réalisation`,
    description: desc,
  };
}

function ProjectFigure({
  slide,
  priority,
  figureClass,
  sizes = CASE_STUDY_IMAGE_SIZES_FULL,
}: {
  slide: GallerySlide;
  priority?: boolean;
  figureClass: string;
  sizes?: string;
}) {
  return (
    <figure className={figureClass}>
      <div className="relative aspect-[16/10] w-full sm:aspect-[16/9]">
        <Image
          src={slide.src}
          alt={slide.alt}
          fill
          className="object-cover object-top"
          sizes={sizes}
          quality={NEXT_IMAGE_QUALITY_RASTER}
          priority={priority}
        />
      </div>
      <figcaption className="sr-only">{slide.alt}</figcaption>
    </figure>
  );
}

function NumberedSection({
  num,
  title,
  numClass,
  h2Class,
  children,
}: {
  num: string;
  title: string;
  numClass: string;
  h2Class: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-6 lg:grid-cols-[8.5rem_1fr] lg:gap-12 xl:gap-16">
      <header className="flex items-baseline gap-4 lg:flex-col lg:items-start lg:gap-3">
        <span className={numClass} aria-hidden>
          {num}
        </span>
        <h2 className={h2Class}>{title}</h2>
      </header>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

function getNextProject(current: Realisation): Realisation {
  const idx = REALISATIONS.findIndex((p) => p.slug === current.slug);
  return REALISATIONS[(idx + 1) % REALISATIONS.length];
}

export default async function RealisationPage({ params }: Props) {
  const { slug } = await params;
  const r = getRealisationBySlug(slug);
  if (!r) notFound();

  const t = resolvePageTheme(r);
  const extras = getRealisationExtraGallery(r);
  const cs = r.caseStudy;
  const heroSlide: GallerySlide = { src: r.image, alt: r.imageAlt };
  const nextProject = getNextProject(r);

  const imgAfterContext = extras[0];
  const imgAfterSolution = extras[1];
  const imgAfterMethodology = extras[2];
  const trailingImages = extras.slice(3);

  return (
    <main className={t.main}>
      <div
        className={`mx-auto max-w-5xl px-5 sm:px-10 md:px-16 ${t.surfaceText}`}
      >
        <RealisationBackNav />

        <header className="mt-2 mb-16 sm:mt-0 sm:mb-24 md:mb-28">
          <p className={`${t.eyebrow} mb-5 sm:mb-7`}>Étude de cas · {r.status}</p>
          <h1
            className={`${bebas.className} m-0 text-[clamp(2.6rem,9vw,6rem)] font-normal uppercase leading-[0.92] tracking-[-0.02em]`}
          >
            {r.title}
          </h1>
          {cs ? <p className={t.chapo}>{cs.summary}</p> : null}
        </header>

        <ProjectFigure slide={heroSlide} priority figureClass={t.figure} />

        {cs ? (
          <div className="mt-20 flex flex-col gap-20 sm:mt-24 sm:gap-24 md:gap-28">
            <NumberedSection
              num="01"
              title="Contexte & cibles"
              numClass={t.num}
              h2Class={t.sectionH2}
            >
              <p className={`${t.body} max-w-[44rem]`}>{cs.context}</p>
            </NumberedSection>

            {imgAfterContext ? (
              <ProjectFigure slide={imgAfterContext} figureClass={t.figure} />
            ) : null}

            <NumberedSection
              num="02"
              title="Problématique & réponse"
              numClass={t.num}
              h2Class={t.sectionH2}
            >
              <div className="grid gap-5 md:grid-cols-2 md:gap-6">
                <article className={t.problemCard}>
                  <p className={t.eyebrow}>Le besoin</p>
                  <p className={`${t.body} mt-4 sm:mt-5`}>{cs.problem}</p>
                </article>
                <article className={t.solutionCard}>
                  <p className={t.eyebrowOnDark}>La réponse</p>
                  <p className={`${t.bodyOnDark} mt-4 sm:mt-5`}>{cs.solution}</p>
                </article>
              </div>
            </NumberedSection>

            {imgAfterSolution ? (
              <ProjectFigure slide={imgAfterSolution} figureClass={t.figure} />
            ) : null}

            <NumberedSection
              num="03"
              title="Démarche & priorités"
              numClass={t.num}
              h2Class={t.sectionH2}
            >
              <p className={`${t.body} max-w-[44rem]`}>{cs.methodology}</p>
            </NumberedSection>

            {imgAfterMethodology ? (
              <ProjectFigure slide={imgAfterMethodology} figureClass={t.figure} />
            ) : null}

            <NumberedSection
              num="04"
              title="Livrables & technique"
              numClass={t.num}
              h2Class={t.sectionH2}
            >
              <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
                <div>
                  <p className={`${t.eyebrow} mb-5 sm:mb-6`}>Livrables</p>
                  <ol className="m-0 list-none space-y-4 p-0 sm:space-y-5">
                    {cs.deliverables.map((item, i) => (
                      <li key={item} className={t.deliverableLi}>
                        <span className={t.deliverableNum} aria-hidden>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0">{item}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <div>
                  <p className={`${t.eyebrow} mb-5 sm:mb-6`}>Périmètre technique</p>
                  <ul className="m-0 flex flex-wrap gap-x-2.5 gap-y-3 p-0">
                    {cs.stack.map((tech) => (
                      <li key={tech} className="max-w-full">
                        <span className={t.techPill}>{tech}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </NumberedSection>

            {trailingImages.length > 0 ? (
              <div
                className={
                  trailingImages.length >= 2
                    ? "grid gap-5 sm:gap-6 md:grid-cols-2 md:gap-8"
                    : ""
                }
              >
                {trailingImages.map((slide, i) => (
                  <ProjectFigure
                    key={`${r.slug}-trail-${i}`}
                    slide={slide}
                    figureClass={t.figure}
                    sizes={
                      trailingImages.length >= 2
                        ? CASE_STUDY_IMAGE_SIZES_HALF
                        : CASE_STUDY_IMAGE_SIZES_FULL
                    }
                  />
                ))}
              </div>
            ) : null}

            <NumberedSection num="05" title="Bilan" numClass={t.num} h2Class={t.sectionH2}>
              <div className={t.bilan}>
                <p className={`${t.body} max-w-[44rem]`}>{cs.outcomes}</p>
              </div>
            </NumberedSection>
          </div>
        ) : null}

        <div className={`mt-24 border-t pt-10 sm:mt-32 sm:pt-12 ${t.footerBorder}`}>
          <Link
            href={`/realisations/${nextProject.slug}`}
            className={`group flex flex-col gap-3 rounded-2xl px-1 py-2 outline-none transition-colors sm:flex-row sm:items-end sm:justify-between sm:gap-6 ${t.nextFocus}`}
            aria-label={`Voir le projet suivant : ${nextProject.title}`}
          >
            <div>
              <p className={`${t.eyebrow} mb-2`}>Projet suivant</p>
              <p className={t.nextTitle}>{nextProject.title}</p>
              <p className={`${t.eyebrow} mt-1 normal-case tracking-[0.18em]`}>
                {nextProject.status}
              </p>
            </div>
            <span aria-hidden className={t.nextArrow}>
              Voir →
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
