import type { Metadata } from "next";
import Image from "next/image";
import { Bebas_Neue } from "next/font/google";
import { notFound } from "next/navigation";
import RealisationBackNav from "@/components/realisations/RealisationBackNav";
import {
  REALISATIONS,
  type GallerySlide,
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

const sectionTitle =
  "m-0 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[#0C4323]/65";
const body =
  "m-0 font-sans text-[0.95rem] leading-[1.65] text-[#0C4323] sm:text-[1.02rem] sm:leading-[1.7]";

const figureShell =
  "relative m-0 overflow-hidden rounded-2xl border border-[#0C4323]/10 bg-[#0C4323]/[0.03] shadow-[0_24px_60px_-28px_rgba(12,67,35,0.12)] sm:rounded-3xl";

function InlineProjectFigure({
  slide,
  priority,
}: {
  slide: GallerySlide;
  priority?: boolean;
}) {
  return (
    <figure className={`${figureShell} my-10 sm:my-12`}>
      <div className="relative aspect-[16/10] w-full sm:aspect-[16/9]">
        <Image
          src={slide.src}
          alt={slide.alt}
          fill
          className="object-cover object-top"
          sizes="(max-width: 896px) 100vw, 896px"
          priority={priority}
        />
      </div>
      <figcaption className="sr-only">{slide.alt}</figcaption>
    </figure>
  );
}

export default async function RealisationPage({ params }: Props) {
  const { slug } = await params;
  const r = getRealisationBySlug(slug);
  if (!r) notFound();

  const extraGallery = getRealisationExtraGallery(r);
  const cs = r.caseStudy;
  const heroSlide: GallerySlide = { src: r.image, alt: r.imageAlt };

  return (
    <main className="min-h-svh bg-[#FDF6EC] pb-24 pt-28 text-[#0C4323] sm:pb-32 sm:pt-32 md:pt-36">
      <div className="mx-auto max-w-4xl px-5 sm:px-8 md:px-12">
        <RealisationBackNav />

        <header className="border-b-2 border-[#0C4323] pb-8 sm:pb-10">
          <p
            className={`${bebas.className} mb-2 text-[0.85rem] uppercase tracking-[0.28em] text-[#0C4323]/55 sm:text-[0.95rem]`}
          >
            {r.index} — {r.status}
          </p>
          <h1
            className={`${bebas.className} m-0 text-[clamp(2.5rem,10vw,5rem)] font-normal uppercase leading-[0.92] tracking-[-0.02em]`}
          >
            {r.title}
          </h1>
          {cs ? (
            <p className={`${body} mt-5 max-w-[40rem] border-l-2 border-[#0C4323]/25 pl-4 sm:mt-6 sm:pl-5`}>
              {cs.summary}
            </p>
          ) : null}
        </header>

        {!cs ? <InlineProjectFigure slide={heroSlide} priority /> : null}

        {cs ? (
          <>
            <section className="mt-10 sm:mt-12">
              <h2 className={sectionTitle}>Contexte & cibles</h2>
              <p className={`${body} mt-3 max-w-[40rem]`}>{cs.context}</p>
            </section>

            <InlineProjectFigure slide={heroSlide} priority />

            <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
              <section className="rounded-2xl border border-[#0C4323]/12 bg-[#EDEAE4]/60 px-5 py-6 sm:px-6 sm:py-8">
                <h2 className={sectionTitle}>Problématique</h2>
                <p className={`${body} mt-3`}>{cs.problem}</p>
              </section>
              <section className="rounded-2xl border border-[#0C4323]/12 bg-white/50 px-5 py-6 sm:px-6 sm:py-8">
                <h2 className={sectionTitle}>Solution retenue</h2>
                <p className={`${body} mt-3`}>{cs.solution}</p>
              </section>
            </div>

            {extraGallery[0] ? (
              <InlineProjectFigure slide={extraGallery[0]} />
            ) : null}

            <section className="rounded-2xl border border-[#0C4323]/10 bg-white/40 px-5 py-6 sm:px-7 sm:py-8">
              <h2 className={sectionTitle}>Démarche & priorités</h2>
              <p className={`${body} mt-3`}>{cs.methodology}</p>
            </section>

            {extraGallery[1] ? (
              <InlineProjectFigure slide={extraGallery[1]} />
            ) : null}

            <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-10">
              <section>
                <h2 className={sectionTitle}>Livrables</h2>
                <ul className="mt-4 list-none space-y-2.5 p-0">
                  {cs.deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 font-sans text-[0.92rem] leading-relaxed text-[#0C4323] sm:text-[0.98rem]"
                    >
                      <span className="mt-[0.35em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#0C4323]/45" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
              <section>
                <h2 className={sectionTitle}>Périmètre technique</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {cs.stack.map((tech) => (
                    <li key={tech}>
                      <span className="inline-block rounded-full border border-[#0C4323]/18 bg-[#FDF6EC] px-3 py-1.5 font-sans text-[0.72rem] font-medium uppercase tracking-[0.12em] text-[#0C4323]/85">
                        {tech}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {extraGallery[2] ? (
              <InlineProjectFigure slide={extraGallery[2]} />
            ) : null}

            {extraGallery.slice(3).map((slide, i) => (
              <InlineProjectFigure key={`${r.slug}-tail-${i}`} slide={slide} />
            ))}

            <section className="border border-[#0C4323]/12 bg-[#0C4323]/[0.04] px-5 py-6 sm:rounded-2xl sm:px-7 sm:py-8">
              <h2 className={sectionTitle}>Bilan</h2>
              <p className={`${body} mt-3 max-w-[40rem]`}>{cs.outcomes}</p>
            </section>
          </>
        ) : null}
      </div>
    </main>
  );
}
