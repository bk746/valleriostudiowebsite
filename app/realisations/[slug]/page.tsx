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
    <figure className={`${figureShell} ${blockGap}`}>
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
    <main className="min-h-svh bg-[#FDF6EC] pb-32 pt-28 text-[#0C4323] sm:pb-48 sm:pt-32 md:pb-52 md:pt-40">
      <div className="mx-auto max-w-4xl px-5 sm:px-10 md:px-16">
        <RealisationBackNav />

        <header className="border-b border-[#0C4323]/25 pb-12 sm:pb-16 md:pb-20">
          <h1
            className={`${bebas.className} m-0 text-[clamp(2.5rem,10vw,5rem)] font-normal uppercase leading-[0.92] tracking-[-0.02em]`}
          >
            {r.title}
            <span className="sr-only">
              {" "}
              — {r.status}
            </span>
          </h1>
          {cs ? (
            <p className={`${body} mt-6 max-w-[40rem] border-l-2 border-[#0C4323]/25 pl-4 sm:mt-8 sm:pl-5`}>
              {cs.summary}
            </p>
          ) : null}
        </header>

        {!cs ? <InlineProjectFigure slide={heroSlide} priority /> : null}

        {cs ? (
          <div className="mt-16 flex flex-col gap-16 sm:mt-20 sm:gap-20 md:gap-28">
            <section>
              <h2 className={sectionTitle}>Contexte & cibles</h2>
              <p className={`${body} mt-5 max-w-[40rem] sm:mt-6`}>{cs.context}</p>
            </section>

            <InlineProjectFigure slide={heroSlide} priority />

            <div className="grid gap-10 sm:grid-cols-2 sm:gap-12 md:gap-14">
              <section className="rounded-2xl border border-[#0C4323]/12 bg-[#EDEAE4]/60 px-6 py-9 sm:px-8 sm:py-11 md:py-12">
                <h2 className={sectionTitle}>Problématique</h2>
                <p className={`${body} mt-5 sm:mt-6`}>{cs.problem}</p>
              </section>
              <section className="rounded-2xl border border-[#0C4323]/12 bg-white/50 px-6 py-9 sm:px-8 sm:py-11 md:py-12">
                <h2 className={sectionTitle}>Solution retenue</h2>
                <p className={`${body} mt-5 sm:mt-6`}>{cs.solution}</p>
              </section>
            </div>

            {extraGallery[0] ? (
              <InlineProjectFigure slide={extraGallery[0]} />
            ) : null}

            <section className="rounded-2xl border border-[#0C4323]/10 bg-white/40 px-6 py-9 sm:px-10 sm:py-12 md:px-12 md:py-14">
              <h2 className={sectionTitle}>Démarche & priorités</h2>
              <p className={`${body} mt-5 sm:mt-6`}>{cs.methodology}</p>
            </section>

            {extraGallery[1] ? (
              <InlineProjectFigure slide={extraGallery[1]} />
            ) : null}

            <div className="rounded-2xl border border-[#0C4323]/10 bg-[#EDEAE4]/35 px-6 py-10 sm:px-10 sm:py-14 md:px-12 md:py-16">
              <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
                <section>
                  <h2 className={sectionTitle}>Livrables</h2>
                  <ul className="mt-6 list-none space-y-4 p-0 sm:mt-7">
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
                <section className="lg:pt-0">
                  <h2 className={sectionTitle}>Périmètre technique</h2>
                  <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-4 sm:mt-7">
                    {cs.stack.map((tech) => (
                      <li key={tech} className="max-w-full">
                        <span className="inline-block max-w-full rounded-full border border-[#0C4323]/18 bg-[#FDF6EC] px-3.5 py-2 font-sans text-[0.72rem] font-medium uppercase leading-snug tracking-[0.12em] text-[#0C4323]/85">
                          {tech}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>

            {extraGallery[2] ? (
              <InlineProjectFigure slide={extraGallery[2]} />
            ) : null}

            {extraGallery.slice(3).map((slide, i) => (
              <InlineProjectFigure key={`${r.slug}-tail-${i}`} slide={slide} />
            ))}

            <section className="border border-[#0C4323]/12 bg-[#0C4323]/[0.04] px-6 py-10 sm:rounded-2xl sm:px-10 sm:py-14 md:px-12 md:py-16">
              <h2 className={sectionTitle}>Bilan</h2>
              <p className={`${body} mt-5 max-w-[40rem] sm:mt-6`}>{cs.outcomes}</p>
            </section>
          </div>
        ) : null}
      </div>
    </main>
  );
}
