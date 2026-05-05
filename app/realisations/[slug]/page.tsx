import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Bebas_Neue } from "next/font/google";
import { notFound } from "next/navigation";
import RealisationBackNav from "@/components/realisations/RealisationBackNav";
import {
  REALISATIONS,
  type GallerySlide,
  type Realisation,
  getRealisationBySlug,
  getRealisationExtraGallery,
} from "@/lib/realisations-data";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return REALISATIONS.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const r = getRealisationBySlug(slug);
  if (!r) return { title: "Réalisation — Vallerio Studio" };
  const desc = r.caseStudy
    ? `${r.caseStudy.summary.slice(0, 155)}${r.caseStudy.summary.length > 155 ? "…" : ""}`
    : r.status;
  return {
    title: `${r.title} — Réalisations · Vallerio Studio`,
    description: desc,
  };
}

const eyebrow =
  "font-sans text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-[#0C4323]/55 sm:text-[0.7rem]";
const eyebrowOnDark =
  "font-sans text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-[#FDF6EC]/65 sm:text-[0.7rem]";
const body =
  "m-0 font-sans text-[1rem] leading-[1.7] text-[#0C4323]/92 sm:text-[1.05rem] sm:leading-[1.78]";
const bodyOnDark =
  "m-0 font-sans text-[1rem] leading-[1.7] text-[#FDF6EC]/92 sm:text-[1.05rem] sm:leading-[1.78]";

const figureShell =
  "relative m-0 overflow-hidden rounded-2xl border border-[#0C4323]/10 bg-[#0C4323]/[0.03] shadow-[0_28px_70px_-32px_rgba(12,67,35,0.18)] sm:rounded-3xl";

function ProjectFigure({
  slide,
  priority,
}: {
  slide: GallerySlide;
  priority?: boolean;
}) {
  return (
    <figure className={figureShell}>
      <div className="relative aspect-[16/10] w-full sm:aspect-[16/9]">
        <Image
          src={slide.src}
          alt={slide.alt}
          fill
          className="object-cover object-top"
          sizes="(max-width: 1024px) 100vw, 1024px"
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
  children,
}: {
  num: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-6 lg:grid-cols-[8.5rem_1fr] lg:gap-12 xl:gap-16">
      <header className="flex items-baseline gap-4 lg:flex-col lg:items-start lg:gap-3">
        <span
          className={`${bebas.className} text-[clamp(2rem,4.6vw,3.4rem)] leading-none text-[#156332]`}
          aria-hidden
        >
          {num}
        </span>
        <h2 className="m-0 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-[#0C4323]/65 sm:text-[0.8rem]">
          {title}
        </h2>
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

  const extras = getRealisationExtraGallery(r);
  const cs = r.caseStudy;
  const heroSlide: GallerySlide = { src: r.image, alt: r.imageAlt };
  const nextProject = getNextProject(r);

  // Distribution stratégique des images : une après chaque section narrative
  // jusqu'à 3, puis le reste en grille avant le bilan. Garantit un rythme
  // texte ↔ image cohérent quel que soit le nombre de captures.
  const imgAfterContext = extras[0];
  const imgAfterSolution = extras[1];
  const imgAfterMethodology = extras[2];
  const trailingImages = extras.slice(3);

  return (
    <main className="min-h-svh bg-[#FDF6EC] pb-32 pt-28 text-[#0C4323] sm:pb-44 sm:pt-32 md:pb-52 md:pt-40">
      <div className="mx-auto max-w-5xl px-5 sm:px-10 md:px-16">
        <RealisationBackNav />

        {/* ── HEADER ─────────────────────────────────────── */}
        <header className="mb-14 sm:mb-20 md:mb-24">
          <p className={`${eyebrow} mb-5 sm:mb-7`}>
            Étude de cas · {r.status}
          </p>
          <h1
            className={`${bebas.className} m-0 text-[clamp(2.6rem,9vw,6rem)] font-normal uppercase leading-[0.92] tracking-[-0.02em]`}
          >
            {r.title}
          </h1>
          {cs ? (
            <p className="mt-8 max-w-[44rem] font-sans text-[clamp(1.05rem,1.6vw,1.4rem)] leading-[1.55] text-[#0C4323]/82 sm:mt-10">
              {cs.summary}
            </p>
          ) : null}
        </header>

        {/* ── HERO IMAGE ─────────────────────────────────── */}
        <ProjectFigure slide={heroSlide} priority />

        {cs ? (
          <div className="mt-20 flex flex-col gap-20 sm:mt-24 sm:gap-24 md:gap-28">
            {/* 01 — CONTEXTE */}
            <NumberedSection num="01" title="Contexte & cibles">
              <p className={`${body} max-w-[44rem]`}>{cs.context}</p>
            </NumberedSection>

            {imgAfterContext ? <ProjectFigure slide={imgAfterContext} /> : null}

            {/* 02 — PROBLÉMATIQUE & RÉPONSE — duo contrasté */}
            <NumberedSection num="02" title="Problématique & réponse">
              <div className="grid gap-5 md:grid-cols-2 md:gap-6">
                <article className="rounded-2xl border border-[#0C4323]/14 bg-white/65 p-6 sm:p-8 md:p-9">
                  <p className={eyebrow}>Le besoin</p>
                  <p className={`${body} mt-4 sm:mt-5`}>{cs.problem}</p>
                </article>
                <article className="rounded-2xl bg-[#0C4323] p-6 text-[#FDF6EC] shadow-[0_24px_60px_-30px_rgba(12,67,35,0.4)] sm:p-8 md:p-9">
                  <p className={eyebrowOnDark}>La réponse</p>
                  <p className={`${bodyOnDark} mt-4 sm:mt-5`}>{cs.solution}</p>
                </article>
              </div>
            </NumberedSection>

            {imgAfterSolution ? <ProjectFigure slide={imgAfterSolution} /> : null}

            {/* 03 — DÉMARCHE */}
            <NumberedSection num="03" title="Démarche & priorités">
              <p className={`${body} max-w-[44rem]`}>{cs.methodology}</p>
            </NumberedSection>

            {imgAfterMethodology ? (
              <ProjectFigure slide={imgAfterMethodology} />
            ) : null}

            {/* 04 — LIVRABLES + STACK */}
            <NumberedSection num="04" title="Livrables & technique">
              <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
                <div>
                  <p className={`${eyebrow} mb-5 sm:mb-6`}>Livrables</p>
                  <ol className="m-0 list-none space-y-4 p-0 sm:space-y-5">
                    {cs.deliverables.map((item, i) => (
                      <li
                        key={item}
                        className="flex gap-4 border-b border-[#0C4323]/10 pb-4 font-sans text-[0.96rem] leading-[1.6] text-[#0C4323]/92 last:border-b-0 last:pb-0 sm:gap-5 sm:text-[1rem] sm:leading-[1.65]"
                      >
                        <span
                          className={`${bebas.className} mt-[0.05em] shrink-0 text-[1.05rem] leading-none text-[#156332] sm:text-[1.15rem]`}
                          aria-hidden
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0">{item}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <div>
                  <p className={`${eyebrow} mb-5 sm:mb-6`}>Périmètre technique</p>
                  <ul className="m-0 flex flex-wrap gap-x-2.5 gap-y-3 p-0">
                    {cs.stack.map((tech) => (
                      <li key={tech} className="max-w-full">
                        <span className="inline-block max-w-full rounded-full border border-[#0C4323]/22 bg-[#FDF6EC] px-3.5 py-2 font-sans text-[0.72rem] font-medium uppercase leading-snug tracking-[0.14em] text-[#0C4323]/85">
                          {tech}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </NumberedSection>

            {/* IMAGES RESTANTES — grille 2 colonnes en desktop */}
            {trailingImages.length > 0 ? (
              <div
                className={
                  trailingImages.length >= 2
                    ? "grid gap-5 sm:gap-6 md:grid-cols-2 md:gap-8"
                    : ""
                }
              >
                {trailingImages.map((slide, i) => (
                  <ProjectFigure key={`${r.slug}-trail-${i}`} slide={slide} />
                ))}
              </div>
            ) : null}

            {/* 05 — BILAN */}
            <NumberedSection num="05" title="Bilan">
              <div className="rounded-2xl border border-[#156332]/22 bg-[#156332]/[0.07] p-6 sm:p-8 md:p-10">
                <p className={`${body} max-w-[44rem]`}>{cs.outcomes}</p>
              </div>
            </NumberedSection>
          </div>
        ) : null}

        {/* ── PROJET SUIVANT ─────────────────────────────── */}
        <div className="mt-24 border-t border-[#0C4323]/15 pt-10 sm:mt-32 sm:pt-12">
          <Link
            href={`/realisations/${nextProject.slug}`}
            className="group flex flex-col gap-3 rounded-2xl px-1 py-2 outline-none transition-colors focus-visible:bg-[#0C4323]/5 sm:flex-row sm:items-end sm:justify-between sm:gap-6"
            aria-label={`Voir le projet suivant : ${nextProject.title}`}
          >
            <div>
              <p className={`${eyebrow} mb-2`}>Projet suivant</p>
              <p
                className={`${bebas.className} text-[clamp(1.6rem,5vw,3rem)] uppercase leading-[0.95] tracking-[-0.01em] text-[#0C4323] transition-colors group-hover:text-[#156332]`}
              >
                {nextProject.title}
              </p>
              <p className={`${eyebrow} mt-1 normal-case tracking-[0.18em]`}>
                {nextProject.status}
              </p>
            </div>
            <span
              aria-hidden
              className={`${bebas.className} text-[1.4rem] uppercase tracking-[0.18em] text-[#0C4323]/55 transition-transform group-hover:translate-x-1 sm:text-[1.6rem]`}
            >
              Voir →
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
