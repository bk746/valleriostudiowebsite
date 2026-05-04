import type { Metadata } from "next";
import Image from "next/image";
import { Bebas_Neue } from "next/font/google";
import { notFound } from "next/navigation";
import RealisationBackNav from "@/components/realisations/RealisationBackNav";
import {
  REALISATIONS,
  getRealisationBySlug,
  getRealisationGallery,
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
  return {
    title: `${r.title} — Réalisations · Vallerio Studio`,
    description: r.caseStudy
      ? `${r.status}. ${r.caseStudy.problem.slice(0, 120)}…`
      : r.status,
  };
}

export default async function RealisationPage({ params }: Props) {
  const { slug } = await params;
  const r = getRealisationBySlug(slug);
  if (!r) notFound();

  const gallery = getRealisationGallery(r);

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
        </header>

        {r.caseStudy ? (
          <div className="mt-10 grid gap-6 sm:mt-12 sm:grid-cols-2 sm:gap-8">
            <section className="rounded-2xl border border-[#0C4323]/12 bg-[#EDEAE4]/60 px-5 py-6 sm:px-6 sm:py-8">
              <h2 className="m-0 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[#0C4323]/65">
                Problématique
              </h2>
              <p className="mt-3 m-0 font-sans text-[0.95rem] leading-relaxed text-[#0C4323] sm:text-[1.02rem]">
                {r.caseStudy.problem}
              </p>
            </section>
            <section className="rounded-2xl border border-[#0C4323]/12 bg-white/50 px-5 py-6 sm:px-6 sm:py-8">
              <h2 className="m-0 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[#0C4323]/65">
                Réponse
              </h2>
              <p className="mt-3 m-0 font-sans text-[0.95rem] leading-relaxed text-[#0C4323] sm:text-[1.02rem]">
                {r.caseStudy.solution}
              </p>
            </section>
          </div>
        ) : null}

        <div className="mt-12 space-y-6 sm:mt-14 sm:space-y-8">
          {gallery.map((slide, i) => (
            <figure
              key={`${r.slug}-${i}`}
              className="relative m-0 overflow-hidden rounded-2xl border border-[#0C4323]/10 bg-[#0C4323]/[0.03] shadow-[0_24px_60px_-28px_rgba(12,67,35,0.12)] sm:rounded-3xl"
            >
              <div className="relative aspect-[16/10] w-full sm:aspect-[16/9]">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 896px) 100vw, 896px"
                  priority={i === 0}
                />
              </div>
              <figcaption className="sr-only">{slide.alt}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </main>
  );
}
