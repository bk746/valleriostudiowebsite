import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Bebas_Neue, Cormorant_Garamond } from "next/font/google";
import ServiceBackNav from "@/components/services/ServiceBackNav";
import ServiceRevealClient from "@/components/services/ServiceRevealClient";
import {
  SERVICE_MAIN,
  SERVICE_PAGE_SHELL,
  ServiceCtaFinal,
  ServiceEngagementBand,
  ServiceFormatsList,
  ServiceHeroCtas,
  ServiceKpiBand,
  ServiceNumberedSection,
} from "@/components/services/ServicePageParts";
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
  title: "Identité visuelle — Branding & direction artistique",
  description:
    "Logo, charte graphique, direction artistique : une marque reconnaissable au premier regard, cohérente du web au print. Livrables sources et guide d’usage.",
  alternates: { canonical: "/services/identite-visuelle" },
};

type Format = {
  name: string;
  duree: string;
  cible: string;
  inclus: ReadonlyArray<string>;
};

const FORMATS: ReadonlyArray<Format> = [
  {
    name: "Logo & fondations",
    duree: "2 à 4 semaines",
    cible: "Créateurs, indépendants, jeunes marques",
    inclus: [
      "Audit rapide de votre contexte et de vos usages",
      "Logo principal + déclinaisons (clair / sombre / monochrome)",
      "Palette chromatique et premières règles typographiques",
      "Fichiers sources vectoriels + exports PNG / SVG prêts à l’emploi",
    ],
  },
  {
    name: "Identité complète",
    duree: "4 à 8 semaines",
    cible: "Marques en croissance, refonte d’image, équipes qui déclinent",
    inclus: [
      "Charte graphique web & print (couleurs, typo, grilles)",
      "Bibliothèque de motifs, icônes ou signatures selon le besoin",
      "Gabarits réseaux sociaux et déclinaisons prioritaires",
      "Guide d’usage : bonnes pratiques, dos & don’ts, exemples",
    ],
  },
  {
    name: "DA & campagnes",
    duree: "sur devis",
    cible: "Lancements, saisons, collections, événements",
    inclus: [
      "Direction artistique pour une campagne ou un univers saisonnier",
      "Storyboards visuels et système de blocs réutilisables",
      "Coordination avec vos shootings ou banques d’images",
      "Kit livrable pour votre équipe ou vos prestataires médias",
    ],
  },
];

const INCLUS: ReadonlyArray<string> = [
  "Brief créatif et validation des objectifs avant les premières pistes",
  "Moodboards et directions explorées avant verrouillage du logo",
  "Contrastes et lisibilité testés pour usages web et impression courante",
  "Palette RGB / HEX pour le digital + repères CMYK ou Pantone si besoin",
  "Polices : sélection, licences expliquées, fichiers fournis ou liens",
  "Guide PDF et dossier source organisé (AI / SVG / PDF selon le périmètre)",
  "Point de contrôle avec vous avant livraison finale des fichiers",
];

const HORS_PERIMETRE: ReadonlyArray<string> = [
  "Shooting photo ou vidéo sur site (en option avec partenaires)",
  "Naming ou recherche de marque juridique exhaustive (en option)",
  "Intégration ou développement du site web complet — voir Site Internet",
  "Community management ou création de contenus quotidiens",
  "Packaging industriel complexe ou mise en page catalogue long courrier",
  "Traduction multilingue des supports sans réédition graphique",
];

type Step = { n: string; title: string; desc: string };

const STEPS: ReadonlyArray<Step> = [
  {
    n: "01",
    title: "Immersion",
    desc: "Échanges sur votre histoire, vos concurrents et où votre marque doit apparaître (web, print, réseaux). On fixe les priorités et ce qui doit être reconnaissable en premier.",
  },
  {
    n: "02",
    title: "Stratégie & pistes",
    desc: "Territoires visuels, références et pistes de logo ou de système graphique. On choisit une direction avant de passer aux finitions — pas de douze logos jetables.",
  },
  {
    n: "03",
    title: "Design système",
    desc: "Construction du logo, des couleurs, des typographies et des règles de mise en page. Vous validez par jalons : fondations, puis déclinaisons.",
  },
  {
    n: "04",
    title: "Livrables",
    desc: "Exports nets pour tous vos usages, dossier source rangé, guide d’usage clair. Vos prestataires ou votre équipe peuvent décliner sans nous appeler à chaque slide.",
  },
  {
    n: "05",
    title: "Transmission",
    desc: "Passage en revue des fichiers, réponses aux questions de mise en œuvre. Les évolutions futures (nouvelle gamme, nouvelle campagne) peuvent faire l’objet d’un complément.",
  },
];

type QA = { q: string; a: string };

const FAQ: ReadonlyArray<QA> = [
  {
    q: "Combien coûte une identité visuelle avec vous ?",
    a: "Ça dépend du périmètre : logo seul, charte complète ou accompagnement campagne. Après un court échange, on vous propose une fourchette puis un devis détaillé — sans engagement avant validation.",
  },
  {
    q: "Combien de propositions de logo recevrai-je ?",
    a: "On travaille par directions validées : une à trois pistes fortes selon le budget, puis affinage jusqu’au logo final. L’objectif n’est pas le volume de dessins, mais une solution durable et alignée avec votre positionnement.",
  },
  {
    q: "Les fichiers m’appartiennent-ils ?",
    a: "Oui, sous réserve du paiement du projet et du respect des licences de polices tiers. Vous recevez les fichiers sources nécessaires pour faire évoluer la marque avec nous ou avec un autre prestataire.",
  },
  {
    q: "Pouvez-vous aussi faire mon site après la charte ?",
    a: "Oui — la charte alimente directement notre offre Site Internet : composants, couleurs et typo sont repris pour un rendu cohérent. Les deux peuvent être enchaînés ou séparés selon votre calendrier.",
  },
  {
    q: "Travaillez-vous avec des clients hors Annecy ?",
    a: "Oui, en visio. Les livrables sont numériques ; les échanges structurés et les validations écrites gardent le projet fluide quelle que soit la distance.",
  },
];

const BRANDING_REALISATIONS = REALISATIONS;

const FORMATS_INTRO =
  "Selon votre stade — démarrer, structurer ou amplifier — on calibre le livrable. Partout la même exigence : cohérence, fichiers exploitables et guide pour que la marque vive sans vous.";

const CTA_DESCRIPTION =
  "Un échange de 30 minutes pour comprendre où vous en êtes, ce qu’il vous manque et ce qu’on peut livrer ensemble — sans jargon ni engagement avant devis.";

export default function ServiceIdentiteVisuellePage() {
  return (
    <main className={SERVICE_MAIN}>
      <div className={SERVICE_PAGE_SHELL}>
        <ServiceBackNav />
        <ServiceRevealClient />

        {/* ── HERO ───────────────────────────────────────────── */}
        <header data-reveal className="svc-reveal mt-2 mb-16 sm:mt-0 sm:mb-24 md:mb-28">
          <p className="mb-5 font-sans text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-[#1D1D1F]/55 sm:mb-7 sm:text-[0.7rem]">
            Service · Branding · DA
          </p>
          <h1
            className={`${bebas.className} m-0 text-[clamp(2.6rem,10vw,8.5rem)] font-normal uppercase leading-[0.92] tracking-[-0.02em]`}
          >
            Identité visuelle
          </h1>
          <p
            className={`${cormorant.className} mt-8 max-w-[54rem] text-[clamp(1.1rem,1.9vw,1.75rem)] italic leading-[1.5] text-[#1D1D1F]/90 sm:mt-10`}
          >
            Logo, charte, direction artistique — une marque reconnaissable au{" "}
            <span className="not-italic font-medium">premier regard</span>,
            cohérente du site aux réseaux et au print.
          </p>
          <ServiceHeroCtas />
        </header>

        <ServiceKpiBand
          items={[
            { k: "Vectoriel", v: "sources livrées pour tous vos supports" },
            { k: "Contrastes", v: "lisibilité web & impression courante" },
            { k: "Guide", v: "règles d’usage pour décliner sans dérive" },
            { k: "Sources", v: "AI, SVG et PDF organisés à la livraison" },
          ]}
        />

        <ServiceEngagementBand
          items={[
            {
              t: "Fichiers à vous",
              d: "Logo, charte et sources vous appartiennent après livraison — sans abonnement caché.",
            },
            {
              t: "Directions validées",
              d: "Une direction retenue avant la finition — pas de douze logos jetables.",
            },
            {
              t: "Devis fixe",
              d: "Le prix annoncé est le prix payé. Pas de surprise en fin de projet.",
            },
            {
              t: "Réponse sous 24 h",
              d: "Un seul interlocuteur, joignable, du brief à la transmission des fichiers.",
            },
          ]}
        />

        {/* ── POUR QUI / CE QUE ÇA PEUT VOUS APPORTER ──────── */}
        <div data-reveal className="svc-stagger mt-20 grid gap-5 md:grid-cols-2 md:gap-6">
          <article className="rounded-[1.75rem] bg-[#F5F5F7] p-6 sm:p-8 md:p-9">
            <p className="m-0 font-sans text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-[#1D1D1F]/55 sm:text-[0.7rem]">
              Pour qui c’est
            </p>
            <ul className="mt-5 m-0 list-none space-y-3 p-0 sm:mt-6 sm:space-y-3.5">
              {[
                "Vous lancez une marque et vous voulez une base graphique solide dès le départ.",
                "Votre image actuelle ne reflète plus votre niveau ou votre marché.",
                "Plusieurs personnes créent vos visuels sans fichier commun — tout diverge.",
                "Vous préparez un site ou une campagne et il vous manque un système clair.",
              ].map((line) => (
                <li
                  key={line}
                  className="flex gap-3 font-sans text-[0.96rem] leading-[1.6] text-[#1D1D1F]/92 sm:text-[1rem]"
                >
                  <span
                    className="mt-[0.55rem] inline-block size-1.5 shrink-0 rounded-full bg-[#0071E3]"
                    aria-hidden
                  />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-[1.75rem] bg-[#1D1D1F] p-6 text-[#FFFFFF] sm:p-8 md:p-9">
            <p className="m-0 font-sans text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-[#FFFFFF]/65 sm:text-[0.7rem]">
              Ce que ça peut vous apporter
            </p>
            <ul className="mt-5 m-0 list-none space-y-3 p-0 sm:mt-6 sm:space-y-3.5">
              {[
                "Une reconnaissance immédiate : votre marque se lit avant même le texte.",
                "Moins de friction en interne : tout le monde applique les mêmes règles.",
                "Des briefs plus simples avec photographes, imprimeurs ou médias.",
                "Une valeur perçue alignée avec votre positionnement — pas avec un template générique.",
              ].map((line) => (
                <li
                  key={line}
                  className="flex gap-3 font-sans text-[0.96rem] leading-[1.6] text-[#FFFFFF]/92 sm:text-[1rem]"
                >
                  <span
                    className="mt-[0.55rem] inline-block size-1.5 shrink-0 rounded-full bg-[#FFFFFF]/55"
                    aria-hidden
                  />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        {/* ── FORMATS ──────────────────────────────────────── */}
        <div className="mt-24 sm:mt-28 md:mt-32">
          <ServiceNumberedSection num="01" title="Trois formats, une exigence">
            <ServiceFormatsList intro={FORMATS_INTRO} formats={FORMATS} />
          </ServiceNumberedSection>
        </div>

        {/* ── INCLUS / HORS PERIMETRE ──────────────────────── */}
        <div className="mt-24 sm:mt-28 md:mt-32">
          <ServiceNumberedSection num="02" title="Inclus & hors périmètre">
            <div className="grid gap-5 md:grid-cols-2 md:gap-6">
              <article className="rounded-[1.75rem] bg-[#F5F5F7] p-6 sm:p-8 md:p-9">
                <p className="m-0 font-sans text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-[#1D1D1F]/55 sm:text-[0.7rem]">
                  Toujours inclus
                </p>
                <ul className="mt-5 m-0 list-none space-y-3.5 p-0 sm:mt-6">
                  {INCLUS.map((item, i) => (
                    <li
                      key={item}
                      className="flex gap-4 border-b border-[#1D1D1F]/10 pb-3.5 font-sans text-[0.95rem] leading-[1.6] text-[#1D1D1F]/92 last:border-b-0 last:pb-0 sm:text-[1rem]"
                    >
                      <span
                        className={`${bebas.className} mt-[0.05em] shrink-0 text-[1rem] leading-none text-[#0071E3] sm:text-[1.1rem]`}
                        aria-hidden
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0">{item}</span>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="rounded-[1.75rem] bg-[#1D1D1F] p-6 text-[#FFFFFF] sm:p-8 md:p-9">
                <p className="m-0 font-sans text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-[#FFFFFF]/65 sm:text-[0.7rem]">
                  Hors périmètre
                </p>
                <ul className="mt-5 m-0 list-none space-y-3.5 p-0 sm:mt-6">
                  {HORS_PERIMETRE.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 border-b border-[#FFFFFF]/15 pb-3.5 font-sans text-[0.95rem] leading-[1.6] text-[#FFFFFF]/90 last:border-b-0 last:pb-0 sm:text-[1rem]"
                    >
                      <span
                        className="mt-[0.65rem] inline-block h-[1.5px] w-3 shrink-0 bg-[#FFFFFF]/55"
                        aria-hidden
                      />
                      <span className="min-w-0">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 font-sans text-[0.78rem] leading-[1.55] text-[#FFFFFF]/70 sm:text-[0.82rem]">
                  Ce qui est hors périmètre peut être ajouté en option avec un devis
                  séparé — on vous dit franchement ce qui est pertinent.
                </p>
              </article>
            </div>
          </ServiceNumberedSection>
        </div>

        {/* ── PROCESS ──────────────────────────────────────── */}
        <div className="mt-24 sm:mt-28 md:mt-32">
          <ServiceNumberedSection num="03" title="Comment on travaille">
            <p className="max-w-[44rem] font-sans text-[1rem] leading-[1.7] text-[#1D1D1F]/92 sm:text-[1.05rem] sm:leading-[1.78]">
              Cinq étapes, des validations écrites entre chaque phase. Vous savez
              toujours où on en est — et pourquoi on propose telle option plutôt
              qu’une autre.
            </p>
            <ol className="mt-10 m-0 list-none space-y-5 p-0 sm:space-y-6">
              {STEPS.map((s) => (
                <li
                  key={s.n}
                  className="grid gap-3 rounded-[1.75rem] bg-[#F5F5F7] p-6 sm:grid-cols-[5rem_1fr] sm:items-start sm:gap-6 sm:p-7 md:p-8"
                >
                  <span
                    className={`${bebas.className} text-[clamp(2rem,3.6vw,2.8rem)] leading-none text-[#0071E3]`}
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
                    <p className="mt-3 m-0 font-sans text-[0.96rem] leading-[1.65] text-[#1D1D1F]/90 sm:text-[1rem] sm:leading-[1.7]">
                      {s.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </ServiceNumberedSection>
        </div>

        {/* ── PREUVES ──────────────────────────────────────── */}
        <div id="preuves" className="mt-24 scroll-mt-28 sm:mt-28 md:mt-32">
          <ServiceNumberedSection num="04" title="Ils l’ont déjà fait">
            <p className="max-w-[44rem] font-sans text-[1rem] leading-[1.7] text-[#1D1D1F]/92 sm:text-[1.05rem] sm:leading-[1.78]">
              Projets où la direction artistique et l’univers graphique sont au cœur
              du rendu. Ouvrez une étude de cas pour voir le contexte et les
              livrables.
            </p>
            <ul className="mt-10 m-0 grid list-none grid-cols-1 gap-5 p-0 md:grid-cols-3 md:gap-6">
              {BRANDING_REALISATIONS.map((r) => (
                <li key={r.slug} className="m-0">
                  <Link
                    href={`/realisations/${r.slug}`}
                    className="group block rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[#1D1D1F]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFFFF]"
                    aria-label={`Voir l’étude de cas : ${r.title}`}
                  >
                    <figure className="relative m-0 overflow-hidden rounded-2xl border border-[#1D1D1F]/10 bg-[#1D1D1F]/[0.03] shadow-[0_20px_50px_-28px_rgba(0,0,0,0.25)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5">
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
                        className={`${bebas.className} m-0 text-[clamp(1.15rem,1.7vw,1.45rem)] uppercase leading-[1] tracking-[-0.005em] text-[#1D1D1F] transition-colors group-hover:text-[#0071E3]`}
                      >
                        {r.title}
                      </h3>
                      <span
                        className={`${bebas.className} text-[0.95rem] uppercase tracking-[0.18em] text-[#1D1D1F]/55 transition-transform group-hover:translate-x-1`}
                        aria-hidden
                      >
                        →
                      </span>
                    </div>
                    <p className="mt-1 m-0 font-sans text-[0.74rem] font-medium uppercase tracking-[0.22em] text-[#1D1D1F]/55">
                      {r.status}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </ServiceNumberedSection>
        </div>

        {/* ── FAQ ──────────────────────────────────────────── */}
        <div className="mt-24 sm:mt-28 md:mt-32">
          <ServiceNumberedSection num="05" title="Questions fréquentes">
            <ul className="m-0 list-none p-0">
              {FAQ.map((item, i) => (
                <li
                  key={item.q}
                  className="border-t border-[#1D1D1F]/12 last:border-b last:border-[#1D1D1F]/12"
                >
                  <details className="group">
                    <summary
                      className={`${bebas.className} flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-[clamp(1.05rem,1.7vw,1.65rem)] uppercase tracking-[0.005em] outline-none transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[#0071E3] focus-visible:ring-2 focus-visible:ring-[#1D1D1F]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFFFF] sm:gap-6 sm:py-7 [&::-webkit-details-marker]:hidden`}
                    >
                      <span className="flex-1 leading-[1.15] sm:leading-[1.05]">
                        <span
                          className="mr-3 font-sans text-[0.7rem] font-medium uppercase tracking-[0.22em] text-[#86868B]"
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
                      className={`${cormorant.className} m-0 max-w-[42rem] pb-6 pr-2 text-[clamp(1rem,1.35vw,1.4rem)] leading-[1.5] text-[#1D1D1F]/85 sm:pb-7 sm:pr-16`}
                    >
                      {item.a}
                    </p>
                  </details>
                </li>
              ))}
            </ul>
          </ServiceNumberedSection>
        </div>

        {/* ── CTA FINAL ────────────────────────────────────── */}
        <div className="mt-24 sm:mt-28 md:mt-32">
          <ServiceCtaFinal
            title="Parlons de votre marque"
            description={CTA_DESCRIPTION}
            ariaLabel="Discutons de votre identité visuelle"
          />
        </div>
      </div>
    </main>
  );
}
