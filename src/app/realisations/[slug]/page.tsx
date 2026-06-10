import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Bebas_Neue } from "next/font/google";
import { notFound } from "next/navigation";
import RealisationBackNav from "@/components/realisations/RealisationBackNav";
import CaseStudyNav from "@/components/realisations/CaseStudyNav";
import ServiceRevealClient from "@/components/services/ServiceRevealClient";
import { NEXT_IMAGE_QUALITY_RASTER } from "@/lib/image-defaults";
import {
  REALISATIONS,
  type GallerySlide,
  type Realisation,
  getRealisationBySlug,
  getRealisationExtraGallery,
} from "@/lib/realisations-data";

const CASE_STUDY_IMAGE_SIZES_FULL =
  "(max-width: 768px) 100vw, (max-width: 1408px) 100vw, 1408px";
const CASE_STUDY_IMAGE_SIZES_HALF =
  "(max-width: 768px) 100vw, (max-width: 1408px) 50vw, 704px";

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
  if (!r) return { title: "Réalisation introuvable" };
  const desc = r.caseStudy
    ? `${r.caseStudy.summary.slice(0, 155)}${r.caseStudy.summary.length > 155 ? "…" : ""}`
    : r.status;
  return {
    title: `${r.title} — Réalisation`,
    description: desc,
  };
}

const FIGURE_CLASS =
  "group relative m-0 overflow-hidden rounded-[1.75rem] bg-[#F5F5F7] sm:rounded-[2rem]";

function ProjectFigure({
  slide,
  priority,
  sizes = CASE_STUDY_IMAGE_SIZES_FULL,
  reveal = true,
}: {
  slide: GallerySlide;
  priority?: boolean;
  sizes?: string;
  reveal?: boolean;
}) {
  return (
    <figure
      {...(reveal ? { "data-reveal": true } : {})}
      className={`${reveal ? "svc-reveal " : ""}${FIGURE_CLASS}`}
    >
      <div className="relative aspect-[16/10] w-full sm:aspect-[16/9]">
        <Image
          src={slide.src}
          alt={slide.alt}
          fill
          className="object-cover object-top motion-safe:transition-transform motion-safe:duration-[1.2s] motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.015]"
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
  id,
  children,
}: {
  num: string;
  title: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      data-reveal
      className="svc-reveal grid scroll-mt-28 gap-6 lg:grid-cols-[11rem_1fr] lg:gap-16 xl:gap-24"
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

const CASE_NAV_ITEMS = [
  { id: "contexte", label: "Contexte", num: "01" },
  { id: "reponse", label: "Réponse", num: "02" },
  { id: "demarche", label: "Démarche", num: "03" },
  { id: "livrables", label: "Livrables", num: "04" },
  { id: "bilan", label: "Bilan", num: "05" },
] as const;

function getNextProject(current: Realisation): Realisation {
  const idx = REALISATIONS.findIndex((p) => p.slug === current.slug);
  return REALISATIONS[(idx + 1) % REALISATIONS.length];
}

const BODY_CLASS =
  "m-0 font-sans text-[1rem] leading-[1.7] text-[#1D1D1F]/92 sm:text-[1.05rem] sm:leading-[1.78]";
const EYEBROW_CLASS =
  "font-sans text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-[#1D1D1F]/55 sm:text-[0.7rem]";
const EYEBROW_DARK_CLASS =
  "font-sans text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-white/65 sm:text-[0.7rem]";

export default async function RealisationPage({ params }: Props) {
  const { slug } = await params;
  const r = getRealisationBySlug(slug);
  if (!r) notFound();

  const extras = getRealisationExtraGallery(r);
  const cs = r.caseStudy;
  const heroSlide: GallerySlide = { src: r.image, alt: r.imageAlt };
  const nextProject = getNextProject(r);

  const imgAfterContext = extras[0];
  const imgAfterSolution = extras[1];
  const imgAfterMethodology = extras[2];
  const trailingImages = extras.slice(3);

  return (
    <main className="min-h-svh bg-white pb-32 pt-28 text-[#1D1D1F] sm:pb-44 sm:pt-32 md:pb-52 md:pt-40">
      <div className="mx-auto max-w-[88rem] px-5 sm:px-10 md:px-14 lg:px-20">
        <RealisationBackNav />
        <ServiceRevealClient />
        {cs ? <CaseStudyNav items={CASE_NAV_ITEMS} /> : null}

        {/* ── HERO ───────────────────────────────────────── */}
        <header data-reveal className="svc-reveal mt-2 mb-14 sm:mt-0 sm:mb-20 md:mb-24">
          <p className={`${EYEBROW_CLASS} mb-5 sm:mb-7`}>
            Étude de cas · {r.status}
          </p>
          <h1
            className={`${bebas.className} m-0 text-[clamp(2.6rem,10vw,8.5rem)] font-normal uppercase leading-[0.92] tracking-[-0.02em]`}
          >
            {r.title}
          </h1>
          {cs ? (
            <p className="mt-8 max-w-[54rem] font-sans text-[clamp(1.05rem,1.9vw,1.6rem)] leading-[1.55] text-[#1D1D1F]/90 sm:mt-10">
              {cs.summary}
            </p>
          ) : null}

          <div className="mt-9 flex flex-wrap items-center gap-5 sm:mt-11 sm:gap-7">
            {r.liveUrl ? (
              <a
                href={r.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#0071E3] px-6 py-3 font-sans text-[0.92rem] font-medium text-white transition-[transform,background-color] duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#0066CC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3]/40 focus-visible:ring-offset-2 sm:px-7 sm:py-3.5"
              >
                Voir le site en ligne
                <svg
                  aria-hidden
                  viewBox="0 0 12 12"
                  fill="none"
                  className="size-3.5 shrink-0"
                >
                  <path
                    d="M2 10 L10 2 M4.5 2 H10 V7.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            ) : null}
            <Link
              href="/contact"
              className="font-sans text-[0.92rem] font-medium text-[#0071E3] transition-opacity hover:opacity-70"
            >
              Un projet similaire ? Parlons-en →
            </Link>
          </div>
        </header>

        <ProjectFigure slide={heroSlide} priority />

        {/* ── FICHE PROJET — bande méta façon specs ──────── */}
        {cs ? (
          <div className="mt-5 overflow-hidden rounded-[1.75rem] bg-[#F5F5F7]">
            <dl data-reveal className="svc-stagger m-0 grid grid-cols-2 md:grid-cols-4">
              {[
                { k: "Statut", v: r.status },
                { k: "Projet", v: r.index },
                { k: "Livrables", v: `${cs.deliverables.length} postes` },
                { k: "Stack", v: cs.stack.slice(0, 2).join(" · ") },
              ].map((meta, i) => (
                <div
                  key={meta.k}
                  className={
                    "flex flex-col gap-2 p-6 sm:p-8 lg:p-9" +
                    (i % 2 === 1 ? " border-l border-[#1D1D1F]/8" : "") +
                    (i >= 2 ? " border-t border-[#1D1D1F]/8 md:border-t-0" : "") +
                    (i === 2 ? " md:border-l" : "")
                  }
                >
                  <dt className={EYEBROW_CLASS}>{meta.k}</dt>
                  <dd
                    className={`${bebas.className} m-0 text-[clamp(1.2rem,2.2vw,1.8rem)] uppercase leading-[1.05] text-[#1D1D1F]`}
                  >
                    {meta.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ) : null}

        {cs ? (
          <div className="mt-20 flex flex-col gap-20 sm:mt-24 sm:gap-24 md:gap-28">
            <NumberedSection num="01" title="Contexte & cibles" id="contexte">
              <p className={`${BODY_CLASS} max-w-[52rem]`}>{cs.context}</p>
            </NumberedSection>

            {imgAfterContext ? <ProjectFigure slide={imgAfterContext} /> : null}

            <NumberedSection num="02" title="Problématique & réponse" id="reponse">
              <div className="grid gap-5 md:grid-cols-2 md:gap-6">
                <article className="rounded-[1.75rem] bg-[#F5F5F7] p-6 sm:p-8 md:p-9">
                  <p className={EYEBROW_CLASS}>Le besoin</p>
                  <p className={`${BODY_CLASS} mt-4 sm:mt-5`}>{cs.problem}</p>
                </article>
                <article className="rounded-[1.75rem] bg-[#1D1D1F] p-6 text-white sm:p-8 md:p-9">
                  <p className={EYEBROW_DARK_CLASS}>La réponse</p>
                  <p className="m-0 mt-4 font-sans text-[1rem] leading-[1.7] text-white/92 sm:mt-5 sm:text-[1.05rem] sm:leading-[1.78]">
                    {cs.solution}
                  </p>
                </article>
              </div>
            </NumberedSection>

            {imgAfterSolution ? <ProjectFigure slide={imgAfterSolution} /> : null}

            <NumberedSection num="03" title="Démarche & priorités" id="demarche">
              <p className={`${BODY_CLASS} max-w-[52rem]`}>{cs.methodology}</p>
            </NumberedSection>

            {imgAfterMethodology ? (
              <ProjectFigure slide={imgAfterMethodology} />
            ) : null}

            <NumberedSection num="04" title="Livrables & technique" id="livrables">
              <div className="grid gap-5 md:gap-6 lg:grid-cols-[1.15fr_1fr]">
                <div className="rounded-[1.75rem] bg-[#F5F5F7] p-6 sm:p-8 md:p-9">
                  <p className={`${EYEBROW_CLASS} mb-5 sm:mb-6`}>Livrables</p>
                  <ol className="m-0 list-none space-y-4 p-0 sm:space-y-5">
                    {cs.deliverables.map((item, i) => (
                      <li
                        key={item}
                        className="flex gap-4 border-b border-[#1D1D1F]/10 pb-4 font-sans text-[0.96rem] leading-[1.6] text-[#1D1D1F]/92 last:border-b-0 last:pb-0 sm:gap-5 sm:text-[1rem] sm:leading-[1.65]"
                      >
                        <span
                          className={`${bebas.className} mt-[0.05em] shrink-0 text-[1.05rem] leading-none text-[#0071E3] sm:text-[1.15rem]`}
                          aria-hidden
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0">{item}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="rounded-[1.75rem] bg-[#1D1D1F] p-6 text-white sm:p-8 md:p-9">
                  <p className={`${EYEBROW_DARK_CLASS} mb-5 sm:mb-6`}>
                    Périmètre technique
                  </p>
                  <ul className="m-0 flex flex-wrap gap-x-2.5 gap-y-3 p-0">
                    {cs.stack.map((tech) => (
                      <li key={tech} className="max-w-full">
                        <span className="inline-block max-w-full rounded-full bg-white/10 px-3.5 py-2 font-sans text-[0.72rem] font-medium uppercase leading-snug tracking-[0.14em] text-white/90">
                          {tech}
                        </span>
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
                    sizes={
                      trailingImages.length >= 2
                        ? CASE_STUDY_IMAGE_SIZES_HALF
                        : CASE_STUDY_IMAGE_SIZES_FULL
                    }
                  />
                ))}
              </div>
            ) : null}

            <NumberedSection num="05" title="Bilan" id="bilan">
              <div className="rounded-[1.75rem] bg-[#F5F5F7] p-6 sm:p-8 md:p-10">
                <p className={`${BODY_CLASS} max-w-[52rem]`}>{cs.outcomes}</p>
              </div>
            </NumberedSection>
          </div>
        ) : null}

        {/* ── CTA + PROJET SUIVANT ───────────────────────── */}
        <div className="mt-24 sm:mt-32">
          <section
            data-nav-theme="dark"
            data-reveal
            className="svc-reveal relative overflow-hidden rounded-3xl bg-[#1D1D1F] px-6 py-14 text-white sm:px-10 sm:py-16 md:px-14"
            aria-label="Discutons de votre projet"
          >
            <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
              <div>
                <p className={EYEBROW_DARK_CLASS}>Prochaine étape</p>
                <h2
                  className={`${bebas.className} m-0 mt-4 text-[clamp(1.9rem,4.5vw,3.6rem)] font-normal uppercase leading-[0.95] tracking-[-0.015em]`}
                >
                  Un projet de ce niveau ?
                </h2>
              </div>
              <Link
                href="/contact"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#0071E3] px-7 py-3.5 font-sans text-[0.95rem] font-medium text-white transition-[transform,background-color] duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#0066CC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3]/60 focus-visible:ring-offset-4 focus-visible:ring-offset-[#1D1D1F]"
              >
                Discutons-en
                <span aria-hidden>→</span>
              </Link>
            </div>
          </section>

          <div
            data-reveal
            className="svc-reveal mt-10 border-t border-[#1D1D1F]/12 pt-10 sm:mt-12 sm:pt-12"
          >
            <Link
              href={`/realisations/${nextProject.slug}`}
              className="group grid gap-6 rounded-2xl px-1 py-2 outline-none transition-colors focus-visible:bg-[#1D1D1F]/5 md:grid-cols-[1fr_minmax(0,26rem)] md:items-center md:gap-12"
              aria-label={`Voir le projet suivant : ${nextProject.title}`}
            >
              <div>
                <p className={`${EYEBROW_CLASS} mb-2`}>Projet suivant</p>
                <p
                  className={`${bebas.className} m-0 text-[clamp(1.8rem,5.5vw,4rem)] uppercase leading-[0.95] tracking-[-0.01em] text-[#1D1D1F] transition-colors duration-300 ease-out group-hover:text-[#0071E3]`}
                >
                  {nextProject.title}
                </p>
                <p className={`${EYEBROW_CLASS} mt-2 normal-case tracking-[0.18em]`}>
                  {nextProject.status}
                </p>
                <span
                  aria-hidden
                  className="mt-5 inline-flex items-center gap-1.5 font-sans text-[0.92rem] font-medium text-[#0071E3] transition-transform duration-300 ease-out group-hover:translate-x-1"
                >
                  Voir l’étude de cas →
                </span>
              </div>
              <figure className="relative m-0 overflow-hidden rounded-[1.5rem] bg-[#F5F5F7] motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={nextProject.image}
                    alt={nextProject.imageAlt}
                    fill
                    className="object-cover object-top motion-safe:transition-transform motion-safe:duration-[1.2s] motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 416px"
                    quality={NEXT_IMAGE_QUALITY_RASTER}
                  />
                </div>
              </figure>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
