import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Bebas_Neue, Cormorant_Garamond } from "next/font/google";
import ServiceBackNav from "@/components/services/ServiceBackNav";
import ServiceRevealClient from "@/components/services/ServiceRevealClient";
import { REALISATIONS } from "@/lib/realisations-data";
import { NEXT_IMAGE_QUALITY_RASTER } from "@/lib/image-defaults";

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

export const metadata: Metadata = {
  title: "Site Internet — Conception sur-mesure",
  description:
    "Vitrines, landing pages et e-commerces pensés pour convertir. Performance, SEO technique, design soigné — un site qui transforme vos visiteurs en demandes de devis.",
  alternates: { canonical: "/services/site-internet" },
};

/* ────────────────────────────────────────────────────────────
   Données du service — gardées dans le fichier de la page :
   un seul service pour le moment, pas besoin d’abstraction.
   On pourra extraire en `lib/services-data.ts` quand on
   créera les pages identité / maintenance / apps.
   ──────────────────────────────────────────────────────────── */

type Format = {
  name: string;
  duree: string;
  cible: string;
  inclus: ReadonlyArray<string>;
};

const FORMATS: ReadonlyArray<Format> = [
  {
    name: "Vitrine professionnelle",
    duree: "2 à 4 semaines",
    cible: "Artisans, indépendants, cabinets, PME",
    inclus: [
      "4 à 8 pages structurées (accueil, services, à propos, contact)",
      "Direction artistique sur-mesure",
      "Formulaire de contact + emails transactionnels",
      "SEO technique et indexation Google",
    ],
  },
  {
    name: "Landing page conversion",
    duree: "1 à 2 semaines",
    cible: "Lancement produit, campagne, levée d’ops",
    inclus: [
      "Page longue scénarisée (problème → preuve → CTA)",
      "Copywriting orienté action en partenariat",
      "Tracking analytics et pixels prêts",
      "Variante A/B possible dès la mise en ligne",
    ],
  },
  {
    name: "E-commerce sur-mesure",
    duree: "4 à 8 semaines",
    cible: "Marques jeunes, catalogues courts, vente directe",
    inclus: [
      "Fiches produits, panier, paiement Stripe",
      "Gestion de stock simple et tableau de bord",
      "Pages marque & univers cohérents avec la vitrine",
      "Conformité RGPD et CGV intégrées",
    ],
  },
];

const INCLUS: ReadonlyArray<string> = [
  "Direction artistique alignée sur votre image",
  "Performance Core Web Vitals (LCP, CLS, INP) sous les bons seuils",
  "SEO technique : balises, sitemap, robots, Open Graph",
  "Accessibilité de base : contrastes, navigation clavier, structure sémantique",
  "Responsive mobile / tablette / desktop, testé sur vrais appareils",
  "Formation à la prise en main et documentation écrite",
  "Mise en ligne, recette navigateurs et 30 jours de suivi inclus",
];

const HORS_PERIMETRE: ReadonlyArray<string> = [
  "Rédaction longue ou stratégie éditoriale poussée (en option)",
  "Production photo / vidéo professionnelle (en option)",
  "Campagnes publicitaires payantes (Ads, Meta, SEA)",
  "Maintenance long terme — voir notre offre Maintenance",
  "Refonte multi-langues complexe (devis dédié)",
  "Intégrations CRM / ERP métier sur-mesure",
];

type Step = { n: string; title: string; desc: string };

const STEPS: ReadonlyArray<Step> = [
  {
    n: "01",
    title: "Cadrage",
    desc: "Un appel de 30 minutes pour aligner l’objectif business avant le pixel : qui visez-vous, quelle action attendre, quels contenus existent déjà.",
  },
  {
    n: "02",
    title: "Direction",
    desc: "Pistes visuelles, ton de voix et arborescence validés avant toute maquette finie. On évite les allers-retours coûteux plus tard.",
  },
  {
    n: "03",
    title: "Design",
    desc: "Maquettes desktop et mobile des pages-clés. Vous validez bloc par bloc — pas de surprise au moment du dev.",
  },
  {
    n: "04",
    title: "Intégration",
    desc: "Code propre, performances mesurées, SEO technique inclus. Recette navigateurs et appareils réels avant la mise en ligne.",
  },
  {
    n: "05",
    title: "Mise en ligne & suivi",
    desc: "Déploiement, branchement domaine, formation à la mise à jour. On reste joignable les 30 premiers jours pour les ajustements.",
  },
];

type QA = { q: string; a: string };

const FAQ: ReadonlyArray<QA> = [
  {
    q: "Combien coûte un site fait avec vous ?",
    a: "Chaque projet est sur-mesure : le tarif dépend du périmètre, du nombre de pages et des fonctionnalités. On vous envoie une fourchette claire après un appel de 30 minutes — gratuit, sans engagement, et avant tout devis détaillé.",
  },
  {
    q: "En combien de temps mon site sera-t-il en ligne ?",
    a: "2 à 4 semaines pour une vitrine, 1 à 2 pour une landing, 4 à 8 pour un e-commerce. Les délais sont garantis par jalons écrits dès le cadrage — on tient les dates, ou on vous prévient avant qu’elles glissent.",
  },
  {
    q: "Qui rédige les textes et fournit les photos ?",
    a: "On vous accompagne sur la structure, les accroches et la hiérarchie de lecture. La rédaction longue et la production photo / vidéo sont en option — on peut s’en occuper ou travailler avec vos prestataires existants.",
  },
  {
    q: "Le site sera-t-il bien référencé sur Google ?",
    a: "Le SEO technique est inclus dans tous nos sites : structure propre, performances, balisage, sitemap, Open Graph. Le SEO de contenu (mots-clés, articles, netlinking) est un travail à part qu’on cadre avec vous si vous le souhaitez.",
  },
  {
    q: "Pourrai-je modifier mon site moi-même après livraison ?",
    a: "Oui. On vous remet un site simple à mettre à jour, avec une formation rapide pour gérer vos contenus en autonomie. On reste joignable en cas de doute, et la maintenance long terme est disponible en offre dédiée.",
  },
];

const WEB_REALISATIONS = REALISATIONS;

/* ────────────────────────────────────────────────────────────
   Sous-composants — internes à la page, pas de réutilisation
   immédiate ailleurs, donc on évite de polluer `components/`.
   ──────────────────────────────────────────────────────────── */

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
    <section data-reveal className="svc-reveal grid gap-6 lg:grid-cols-[8.5rem_1fr] lg:gap-12 xl:gap-16">
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

export default function ServiceSiteInternetPage() {
  return (
    <main className="min-h-svh bg-[#FDF6EC] pb-32 pt-28 text-[#0C4323] sm:pb-44 sm:pt-32 md:pb-52 md:pt-40">
      <div className="mx-auto max-w-5xl px-5 sm:px-10 md:px-16">
        <ServiceBackNav />
        <ServiceRevealClient />

        {/* ── HERO ───────────────────────────────────────────── */}
        <header data-reveal className="svc-reveal mt-2 mb-16 sm:mt-0 sm:mb-24 md:mb-28">
          <p className="mb-5 font-sans text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-[#0C4323]/55 sm:mb-7 sm:text-[0.7rem]">
            Service · Web — Conversion
          </p>
          <h1
            className={`${bebas.className} m-0 text-[clamp(2.6rem,9vw,6rem)] font-normal uppercase leading-[0.92] tracking-[-0.02em]`}
          >
            Site Internet
          </h1>
          <p
            className={`${cormorant.className} mt-8 max-w-[44rem] text-[clamp(1.1rem,1.7vw,1.5rem)] italic leading-[1.5] text-[#0C4323]/90 sm:mt-10`}
          >
            Votre site n’est pas une vitrine décorative. C’est un commercial
            disponible <span className="not-italic font-medium">24h/24</span>{" "}
            qui rassure, qualifie et transforme un visiteur en demande de
            devis.
          </p>
        </header>

        {/* ── BANDEAU INDICATEURS ──────────────────────────── */}
        <ul data-reveal className="svc-stagger m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-3 sm:gap-4">
          {[
            { k: "< 2 s", v: "au premier rendu mesuré" },
            { k: "100 %", v: "responsive, testé sur vrais appareils" },
            { k: "SEO", v: "technique inclus dès la livraison" },
          ].map((kpi) => (
            <li
              key={kpi.k}
              className="rounded-2xl border border-[#0C4323]/14 bg-white/55 p-5 sm:p-6"
            >
              <p
                className={`${bebas.className} m-0 text-[clamp(1.6rem,3.4vw,2.4rem)] leading-none text-[#156332]`}
              >
                {kpi.k}
              </p>
              <p className="mt-2 font-sans text-[0.86rem] leading-[1.5] text-[#0C4323]/80 sm:text-[0.92rem]">
                {kpi.v}
              </p>
            </li>
          ))}
        </ul>

        {/* ── POUR QUI / CE QUE ÇA PEUT VOUS APPORTER ──────── */}
        <div data-reveal className="svc-stagger mt-20 grid gap-5 md:grid-cols-2 md:gap-6">
          <article className="rounded-2xl border border-[#0C4323]/14 bg-white/65 p-6 sm:p-8 md:p-9">
            <p className="m-0 font-sans text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-[#0C4323]/55 sm:text-[0.7rem]">
              Pour qui c’est
            </p>
            <ul className="mt-5 m-0 list-none space-y-3 p-0 sm:mt-6 sm:space-y-3.5">
              {[
                "Vous lancez ou repositionnez une activité et vous avez besoin d’un site crédible.",
                "Vous avez déjà un site, mais il ne reflète plus votre niveau ou ne convertit pas.",
                "Vous voulez un commercial qui tourne 24h/24, sans dépendre d’une équipe interne.",
                "Vous êtes prêt à investir dans la qualité plutôt que dans un template à 30 € / mois.",
              ].map((line) => (
                <li
                  key={line}
                  className="flex gap-3 font-sans text-[0.96rem] leading-[1.6] text-[#0C4323]/92 sm:text-[1rem]"
                >
                  <span className="mt-[0.55rem] inline-block size-1.5 shrink-0 rounded-full bg-[#156332]" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl bg-[#0C4323] p-6 text-[#FDF6EC] shadow-[0_24px_60px_-30px_rgba(12,67,35,0.4)] sm:p-8 md:p-9">
            <p className="m-0 font-sans text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-[#FDF6EC]/65 sm:text-[0.7rem]">
              Ce que ça peut vous apporter
            </p>
            <ul className="mt-5 m-0 list-none space-y-3 p-0 sm:mt-6 sm:space-y-3.5">
              {[
                "Une vitrine crédible qui rassure en quelques secondes — au niveau de votre positionnement.",
                "Plus de demandes utiles : parcours, messages et appels à l’action calibrés pour convertir.",
                "Une base SEO technique et des performances mesurées pour être vu et garder vos visiteurs.",
                "Un site durable que vous pouvez faire évoluer avec nous ou en autonomie après formation.",
              ].map((line) => (
                <li
                  key={line}
                  className="flex gap-3 font-sans text-[0.96rem] leading-[1.6] text-[#FDF6EC]/92 sm:text-[1rem]"
                >
                  <span className="mt-[0.55rem] inline-block size-1.5 shrink-0 rounded-full bg-[#FDF6EC]/55" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        {/* ── FORMATS ──────────────────────────────────────── */}
        <div className="mt-24 sm:mt-28 md:mt-32">
          <NumberedSection num="01" title="Trois formats, une exigence">
            <p className="max-w-[44rem] font-sans text-[1rem] leading-[1.7] text-[#0C4323]/92 sm:text-[1.05rem] sm:leading-[1.78]">
              Selon votre objectif — crédibiliser, lancer ou vendre — on
              calibre le périmètre. Tous les formats partagent la même
              exigence : design soigné, performance mesurée, SEO technique
              inclus.
            </p>
            <ul className="mt-10 m-0 grid list-none grid-cols-1 gap-4 p-0 lg:grid-cols-3 lg:gap-5">
              {FORMATS.map((f, i) => (
                <li
                  key={f.name}
                  className="flex flex-col rounded-2xl border border-[#0C4323]/14 bg-white/55 p-6 sm:p-7"
                >
                  <p
                    className={`${bebas.className} m-0 text-[0.78rem] uppercase tracking-[0.24em] text-[#156332]`}
                  >
                    Format 0{i + 1}
                  </p>
                  <h3
                    className={`${bebas.className} m-0 mt-4 text-[clamp(1.4rem,2.4vw,1.85rem)] uppercase leading-[1] tracking-[-0.005em]`}
                  >
                    {f.name}
                  </h3>
                  <dl className="mt-5 grid grid-cols-1 gap-y-3 font-sans text-[0.85rem] leading-[1.5] text-[#0C4323]/85 sm:text-[0.9rem]">
                    <div className="flex flex-col">
                      <dt className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-[#0C4323]/55">
                        Durée
                      </dt>
                      <dd className="m-0 mt-1">{f.duree}</dd>
                    </div>
                    <div className="flex flex-col">
                      <dt className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-[#0C4323]/55">
                        Cible type
                      </dt>
                      <dd className="m-0 mt-1">{f.cible}</dd>
                    </div>
                  </dl>
                  <ul className="mt-5 m-0 list-none space-y-2 border-t border-[#0C4323]/12 p-0 pt-4 font-sans text-[0.88rem] leading-[1.55] text-[#0C4323]/90 sm:text-[0.92rem]">
                    {f.inclus.map((it) => (
                      <li key={it} className="flex gap-2.5">
                        <span
                          className={`${bebas.className} mt-[0.05em] shrink-0 text-[0.95rem] leading-none text-[#156332]`}
                          aria-hidden
                        >
                          →
                        </span>
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </NumberedSection>
        </div>

        {/* ── INCLUS / HORS PERIMETRE ──────────────────────── */}
        <div className="mt-24 sm:mt-28 md:mt-32">
          <NumberedSection num="02" title="Inclus & hors périmètre">
            <div className="grid gap-5 md:grid-cols-2 md:gap-6">
              <article className="rounded-2xl border border-[#0C4323]/14 bg-white/65 p-6 sm:p-8 md:p-9">
                <p className="m-0 font-sans text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-[#0C4323]/55 sm:text-[0.7rem]">
                  Toujours inclus
                </p>
                <ul className="mt-5 m-0 list-none space-y-3.5 p-0 sm:mt-6">
                  {INCLUS.map((item, i) => (
                    <li
                      key={item}
                      className="flex gap-4 border-b border-[#0C4323]/10 pb-3.5 font-sans text-[0.95rem] leading-[1.6] text-[#0C4323]/92 last:border-b-0 last:pb-0 sm:text-[1rem]"
                    >
                      <span
                        className={`${bebas.className} mt-[0.05em] shrink-0 text-[1rem] leading-none text-[#156332] sm:text-[1.1rem]`}
                        aria-hidden
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0">{item}</span>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="rounded-2xl bg-[#0C4323] p-6 text-[#FDF6EC] shadow-[0_24px_60px_-30px_rgba(12,67,35,0.4)] sm:p-8 md:p-9">
                <p className="m-0 font-sans text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-[#FDF6EC]/65 sm:text-[0.7rem]">
                  Hors périmètre
                </p>
                <ul className="mt-5 m-0 list-none space-y-3.5 p-0 sm:mt-6">
                  {HORS_PERIMETRE.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 border-b border-[#FDF6EC]/15 pb-3.5 font-sans text-[0.95rem] leading-[1.6] text-[#FDF6EC]/90 last:border-b-0 last:pb-0 sm:text-[1rem]"
                    >
                      <span
                        className="mt-[0.65rem] inline-block h-[1.5px] w-3 shrink-0 bg-[#FDF6EC]/55"
                        aria-hidden
                      />
                      <span className="min-w-0">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 font-sans text-[0.78rem] leading-[1.55] text-[#FDF6EC]/70 sm:text-[0.82rem]">
                  Tout ce qui est hors périmètre peut être ajouté en option,
                  avec un devis dédié — on préfère être clair dès le départ.
                </p>
              </article>
            </div>
          </NumberedSection>
        </div>

        {/* ── PROCESS ──────────────────────────────────────── */}
        <div className="mt-24 sm:mt-28 md:mt-32">
          <NumberedSection num="03" title="Comment on travaille">
            <p className="max-w-[44rem] font-sans text-[1rem] leading-[1.7] text-[#0C4323]/92 sm:text-[1.05rem] sm:leading-[1.78]">
              Cinq étapes, validées une par une. À chaque jalon, vous savez
              exactement où on en est et ce qui reste à faire — pas de zone
              grise, pas de surprise en fin de projet.
            </p>
            <ol className="mt-10 m-0 list-none space-y-5 p-0 sm:space-y-6">
              {STEPS.map((s) => (
                <li
                  key={s.n}
                  className="grid gap-3 rounded-2xl border border-[#0C4323]/12 bg-white/55 p-6 sm:grid-cols-[5rem_1fr] sm:items-start sm:gap-6 sm:p-7 md:p-8"
                >
                  <span
                    className={`${bebas.className} text-[clamp(2rem,3.6vw,2.8rem)] leading-none text-[#156332]`}
                    aria-hidden
                  >
                    {s.n}
                  </span>
                  <div>
                    <h3
                      className={`${bebas.className} m-0 text-[clamp(1.4rem,2.6vw,2rem)] uppercase leading-[1] tracking-[-0.005em]`}
                    >
                      {s.title}
                    </h3>
                    <p className="mt-3 m-0 font-sans text-[0.96rem] leading-[1.65] text-[#0C4323]/90 sm:text-[1rem] sm:leading-[1.7]">
                      {s.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </NumberedSection>
        </div>

        {/* ── PREUVES ──────────────────────────────────────── */}
        <div className="mt-24 sm:mt-28 md:mt-32">
          <NumberedSection num="04" title="Ils l’ont déjà fait">
            <p className="max-w-[44rem] font-sans text-[1rem] leading-[1.7] text-[#0C4323]/92 sm:text-[1.05rem] sm:leading-[1.78]">
              Trois projets récents, trois ambiances. Cliquez pour ouvrir
              l’étude de cas complète — contexte, problématique, livrables et
              bilan.
            </p>
            <ul className="mt-10 m-0 grid list-none grid-cols-1 gap-5 p-0 md:grid-cols-3 md:gap-6">
              {WEB_REALISATIONS.map((r) => (
                <li key={r.slug} className="m-0">
                  <Link
                    href={`/realisations/${r.slug}`}
                    className="group block rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[#0C4323]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDF6EC]"
                    aria-label={`Voir l’étude de cas : ${r.title}`}
                  >
                    <figure className="relative m-0 overflow-hidden rounded-2xl border border-[#0C4323]/10 bg-[#0C4323]/[0.03] shadow-[0_20px_50px_-28px_rgba(12,67,35,0.25)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5">
                      <div className="relative aspect-[16/10] w-full">
                        <Image
                          src={r.image}
                          alt={r.imageAlt}
                          fill
                          className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 360px"
                          quality={NEXT_IMAGE_QUALITY_RASTER}
                        />
                      </div>
                    </figure>
                    <div className="mt-4 flex items-baseline justify-between gap-3">
                      <h3
                        className={`${bebas.className} m-0 text-[clamp(1.15rem,1.7vw,1.45rem)] uppercase leading-[1] tracking-[-0.005em] text-[#0C4323] transition-colors group-hover:text-[#156332]`}
                      >
                        {r.title}
                      </h3>
                      <span
                        className={`${bebas.className} text-[0.95rem] uppercase tracking-[0.18em] text-[#0C4323]/55 transition-transform group-hover:translate-x-1`}
                        aria-hidden
                      >
                        →
                      </span>
                    </div>
                    <p className="mt-1 m-0 font-sans text-[0.74rem] font-medium uppercase tracking-[0.22em] text-[#0C4323]/55">
                      {r.status}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </NumberedSection>
        </div>

        {/* ── FAQ ──────────────────────────────────────────── */}
        <div className="mt-24 sm:mt-28 md:mt-32">
          <NumberedSection num="05" title="Questions fréquentes">
            <ul className="m-0 list-none p-0">
              {FAQ.map((item, i) => (
                <li
                  key={item.q}
                  className="border-t border-[#0C4323]/30 last:border-b last:border-[#0C4323]/30"
                >
                  {/* `<details>` natif — pas besoin de client component, accessible par défaut. */}
                  <details className="group">
                    <summary
                      className={`${bebas.className} flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-[clamp(1.05rem,1.7vw,1.65rem)] uppercase tracking-[0.005em] outline-none transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[#156332] focus-visible:ring-2 focus-visible:ring-[#0C4323]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDF6EC] sm:gap-6 sm:py-7 [&::-webkit-details-marker]:hidden`}
                    >
                      <span className="flex-1 leading-[1.15] sm:leading-[1.05]">
                        <span
                          className="mr-3 font-sans text-[0.7rem] font-medium uppercase tracking-[0.22em] text-[#156332]"
                          aria-hidden
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {item.q}
                      </span>
                      <span
                        aria-hidden
                        className="relative flex size-6 shrink-0 items-center justify-center sm:size-7"
                      >
                        <span className="absolute h-[1.5px] w-full bg-current" />
                        <span className="absolute h-full w-[1.5px] bg-current transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-open:scale-y-0" />
                      </span>
                    </summary>
                    <p
                      className={`${cormorant.className} m-0 max-w-[42rem] pb-6 pr-2 text-[clamp(1rem,1.35vw,1.4rem)] leading-[1.5] text-[#0C4323]/85 sm:pb-7 sm:pr-16`}
                    >
                      {item.a}
                    </p>
                  </details>
                </li>
              ))}
            </ul>
          </NumberedSection>
        </div>

        {/* ── CTA FINAL ────────────────────────────────────── */}
        <div className="mt-24 sm:mt-28 md:mt-32">
          <section
            data-nav-theme="dark"
            data-reveal
            className="svc-reveal relative overflow-hidden rounded-3xl bg-[#343d33] px-6 py-14 text-[#FDF6EC] shadow-[0_28px_80px_-30px_rgba(0,0,0,0.45)] sm:px-10 sm:py-20 md:px-14 md:py-24"
            aria-label="Discutons de votre projet de site"
          >
            <div className="relative z-10 flex flex-col items-center text-center">
              <p className="font-sans text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-[#FDF6EC]/65 sm:text-[0.7rem]">
                Prochaine étape
              </p>
              <h2
                className={`${bebas.className} m-0 mt-5 text-[clamp(2.2rem,7vw,5.5rem)] font-normal uppercase leading-[0.95] tracking-[-0.015em] sm:mt-6 sm:leading-[0.9]`}
              >
                Parlons de votre site
              </h2>
              <p
                className={`${cormorant.className} mt-6 max-w-[36rem] text-[clamp(1rem,1.4vw,1.4rem)] italic leading-[1.45] text-[#FDF6EC]/85 sm:mt-7`}
              >
                Un appel de 30 minutes, gratuit et sans engagement. On
                clarifie l’objectif, le périmètre et un ordre de grandeur — et
                on vous dit honnêtement si on est le bon partenaire.
              </p>
              <Link
                href="/contact"
                className={`${bebas.className} group mt-9 inline-flex items-center gap-2.5 rounded-full bg-[#FDF6EC] px-7 py-3 text-[0.85rem] uppercase tracking-[0.2em] text-[#0C4323] transition-[transform,background-color,color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-transparent hover:text-[#FDF6EC] hover:shadow-[0_0_0_2px_#FDF6EC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDF6EC]/70 focus-visible:ring-offset-4 focus-visible:ring-offset-[#343d33] sm:mt-12 sm:gap-3 sm:px-11 sm:py-4 sm:text-[1rem] sm:tracking-[0.22em]`}
              >
                Discutons de votre projet
                <span
                  aria-hidden
                  className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
              <p className="mt-6 font-sans text-[0.74rem] uppercase tracking-[0.22em] text-[#FDF6EC]/55 sm:mt-8 sm:text-[0.78rem]">
                Réponse personnalisée sous 24 h · Annecy · à distance
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
