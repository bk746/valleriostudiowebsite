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
  title: "Maintenance — Run & performance",
  description:
    "Mises à jour, sécurité, sauvegardes et performances : gardez votre site rapide, stable et à jour. Formules mensuelles ou interventions ponctuelles.",
  alternates: { canonical: "/services/maintenance" },
};

type Format = {
  name: string;
  duree: string;
  cible: string;
  inclus: ReadonlyArray<string>;
};

const FORMATS: ReadonlyArray<Format> = [
  {
    name: "Essentiel",
    duree: "engagement mensuel",
    cible: "Vitrines et sites peu complexes",
    inclus: [
      "Mises à jour de sécurité et correctifs critiques du stack",
      "Sauvegardes planifiées + test de restauration documenté",
      "Veille disponibilité basique et alerte en cas de panne",
      "1 ticket email / mois pour petit correctif contenu ou typo",
    ],
  },
  {
    name: "Standard",
    duree: "engagement mensuel",
    cible: "PME, sites avec formulaires ou e-commerce léger",
    inclus: [
      "Tout le périmètre Essentiel",
      "Contrôle Core Web Vitals et optimisations courantes",
      "Plusieurs interventions contenu ou mineures dans la limite horaire",
      "Synthèse mensuelle : ce qui a été fait, ce qu’il reste à surveiller",
    ],
  },
  {
    name: "Partenaire",
    duree: "sur-mesure",
    cible: "Trafic soutenu, équipes internes, besoin de réactivité",
    inclus: [
      "Temps dédié plus large et priorité sur la file d’attente",
      "Coordination avec votre marketing ou votre DSI",
      "Préparation aux pics (soldes, campagnes, embauches)",
      "Évolutions hors périmètre chiffrées à part avec transparence",
    ],
  },
];

const INCLUS: ReadonlyArray<string> = [
  "Audit initial ou reprise : stack, hébergement, risques et accès sécurisés",
  "Planning de mises à jour — pas de surprise la veille d’un weekend chargé",
  "Sauvegardes conservées hors site ou redondantes selon votre hébergement",
  "Journal des interventions : vous savez qui a touché quoi et quand",
  "Correctifs liés aux versions (régressions mineures) dans la limite du contrat",
  "Canal prioritaire type email ou ticket avec temps de réponse selon la formule",
  "Point régulier ou rapport court — vous n’êtes jamais dans le flou",
];

const HORS_PERIMETRE: ReadonlyArray<string> = [
  "Refonte graphique complète ou nouveau parcours utilisateur",
  "Nouvelles fonctionnalités majeures (tunnel, CRM, paiements complexes, intégrations lourdes)",
  "Production de contenus marketing ou community management",
  "Migration serveur ou changement d’hébergeur sans cadrage préalable",
  "Audit légal / RGPD exhaustif ou mise en conformité fine hors périmètre web",
  "Sites non audités par nous : un passage découverte reste obligatoire avant run",
];

type Step = { n: string; title: string; desc: string };

const STEPS: ReadonlyArray<Step> = [
  {
    n: "01",
    title: "Découverte",
    desc: "On prend connaissance du site, des accès, de l’historique et des douleurs récurrentes. Pas de maintenance aveugle : on documente la baseline.",
  },
  {
    n: "02",
    title: "Contrat & jalons",
    desc: "Formule, temps inclus, délais de réponse et exclusions sont écrits noir sur blanc. Vous validez avant le premier cycle.",
  },
  {
    n: "03",
    title: "Run",
    desc: "Mises à jour, vérifications, sauvegardes et petites corrections dans le temps prévu. Les urgences critiques passent devant le reste.",
  },
  {
    n: "04",
    title: "Pilotage",
    desc: "Synthèse ou ticket récap : ce qui a été traité, ce qui mérite un budget projet à part. Pas de travail fantôme.",
  },
  {
    n: "05",
    title: "Évolution",
    desc: "Quand le besoin dépasse la maintenance, on vous propose un devis clair — refonte, nouvelle page, perf approfondie — sans vous enfermer.",
  },
];

type QA = { q: string; a: string };

const FAQ: ReadonlyArray<QA> = [
  {
    q: "Combien coûte la maintenance par mois ?",
    a: "Ça dépend de la complexité du site, du trafic et du temps inclus. Après un court audit ou questionnaire, on vous propose une formule Essentiel, Standard ou Partenaire avec un montant fixe mensuel — pas de kilométrage opaque.",
  },
  {
    q: "Mon site n’a pas été fait par vous : ça pose problème ?",
    a: "Non, mais on commence toujours par une prise en main : lecture du code, accès, sauvegardes, risques. Si le socle est trop fragile, on vous le dit avant d’engager la récurrence — mieux vaut un chantier court que des rustines sans fin.",
  },
  {
    q: "Que se passe-t-il en cas d’urgence (site down) ?",
    a: "Selon la formule, vous avez un canal prioritaire et un objectif de première réponse. On diagnostique, on restaure ou on corrige ce qui bloque, puis on vous explique la cause pour éviter que ça revienne.",
  },
  {
    q: "Puis-je résilier ou passer à une formule inférieure ?",
    a: "Oui, avec un préavis défini au contrat — en général un mois. On vous remet les accès et une mini-fiche d’état pour le prestataire suivant si vous changez.",
  },
  {
    q: "Les mises à jour peuvent-elles casser mon site ?",
    a: "C’est pour ça qu’on procède par environnement ou sauvegarde avant mise à jour selon le setup. En cas de régression, on rollback ou on corrige dans la limite du temps prévu ; les cas lourds sont annoncés avant intervention.",
  },
];

const MAINT_REALISATIONS = REALISATIONS;

const FORMATS_INTRO =
  "Du site vitrine au flux régulier : on aligne le niveau de service avec votre risque et votre trafic. Partout la même exigence — transparence sur le temps et les limites.";

export default function ServiceMaintenancePage() {
  return (
    <main className={SERVICE_MAIN}>
      <div className={SERVICE_PAGE_SHELL}>
        <ServiceBackNav />
        <ServiceRevealClient />

        {/* ── HERO ───────────────────────────────────────────── */}
        <header data-reveal className="svc-reveal mt-2 mb-16 sm:mt-0 sm:mb-24 md:mb-28">
          <p className="mb-5 font-sans text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-[#1D1D1F]/55 sm:mb-7 sm:text-[0.7rem]">
            Service · Run · Performance
          </p>
          <h1
            className={`${bebas.className} m-0 text-[clamp(2.6rem,10vw,8.5rem)] font-normal uppercase leading-[0.92] tracking-[-0.02em]`}
          >
            Maintenance
          </h1>
          <p
            className={`${cormorant.className} mt-8 max-w-[54rem] text-[clamp(1.1rem,1.9vw,1.75rem)] italic leading-[1.5] text-[#1D1D1F]/90 sm:mt-10`}
          >
            Mises à jour, vitesse et sécurité — un site{" "}
            <span className="not-italic font-medium">vivant</span>, jamais laissé
            à l’abandon après la mise en ligne.
          </p>
          <ServiceHeroCtas />
        </header>

        <ServiceKpiBand
          items={[
            { k: "MAJ", v: "sécurité & dépendances suivies" },
            { k: "Backup", v: "sauvegardes et plan de restauration" },
            { k: "Perf", v: "Core Web Vitals surveillés en Standard +" },
            { k: "24h", v: "objectif de première réponse selon formule" },
          ]}
        />

        <ServiceEngagementBand
          items={[
            {
              t: "Contrat écrit",
              d: "Formule, temps inclus, délais et exclusions posés noir sur blanc avant le premier cycle.",
            },
            {
              t: "Sauvegardes",
              d: "Planifiées, conservées hors site ou redondantes — avec test de restauration documenté.",
            },
            {
              t: "Journal",
              d: "Chaque intervention est tracée : vous savez qui a touché quoi et quand.",
            },
            {
              t: "Réponse 24h",
              d: "Canal prioritaire et objectif de première réponse selon votre formule.",
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
                "Votre site est en ligne mais vous n’avez pas le temps de suivre les mises à jour.",
                "Vous craignez une panne ou une faille sans savoir par où commencer.",
                "Vous voulez quelqu’un qui connaît votre stack et répond quand ça compte.",
                "Vous préparez une saison chargée et vous avez besoin d’un filet de sécurité.",
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
                "Moins de stress : quelqu’un surveille la santé technique du site.",
                "Moins d’incidents évitables grâce aux mises à jour et aux sauvegardes.",
                "Des temps de chargement maîtrisés — les visiteurs restent, Google aussi.",
                "Une relation claire : vous savez ce qui est inclus et ce qui est en projet séparé.",
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
          <ServiceNumberedSection num="01" title="Trois formules, une exigence">
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
                  Besoin d’un chantier ponctuel ? On le chiffre à part — la
                  maintenance reste prévisible, le reste reste explicite.
                </p>
              </article>
            </div>
          </ServiceNumberedSection>
        </div>

        {/* ── PROCESS ──────────────────────────────────────── */}
        <div className="mt-24 sm:mt-28 md:mt-32">
          <ServiceNumberedSection num="03" title="Comment on travaille">
            <p className="max-w-[44rem] font-sans text-[1rem] leading-[1.7] text-[#1D1D1F]/92 sm:text-[1.05rem] sm:leading-[1.78]">
              Cinq étapes pour passer du « site livré » au « site sous contrôle
              ». Chaque phase est traçable — vous n’achetez pas une boîte noire.
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
          <ServiceNumberedSection num="04" title="Des sites qu’on fait vivre">
            <p className="max-w-[44rem] font-sans text-[1rem] leading-[1.7] text-[#1D1D1F]/92 sm:text-[1.05rem] sm:leading-[1.78]">
              Nos réalisations peuvent être suivies en maintenance — ou servir
              de référence niveau finition. Ouvrez une étude de cas pour le
              détail.
            </p>
            <ul className="mt-10 m-0 grid list-none grid-cols-1 gap-5 p-0 md:grid-cols-3 md:gap-6">
              {MAINT_REALISATIONS.map((r) => (
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
            title="Parlons de votre site au quotidien"
            description="Un court échange pour comprendre votre stack, votre trafic et le niveau de tranquillité dont vous avez besoin — puis une proposition claire."
            ariaLabel="Discutons de votre maintenance"
          />
        </div>
      </div>
    </main>
  );
}
