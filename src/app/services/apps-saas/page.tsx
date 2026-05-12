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

/** Palette alignée sur la carte Apps · SaaS (#0C4323). */
const PAGE_BG = "#EDF4EF";
const INK = "#0C4323";
const ACCENT = "#2D8C4E";
const SURFACE = "#0C4323";

export const metadata: Metadata = {
  title: "Apps & SaaS — Produit sur-mesure",
  description:
    "Tableaux de bord, plateformes métier et outils internes sur-mesure. Du MVP à la mise en production : specs claires, stack moderne, transfert et documentation.",
  alternates: { canonical: "/services/apps-saas" },
};

type Format = {
  name: string;
  duree: string;
  cible: string;
  inclus: ReadonlyArray<string>;
};

const FORMATS: ReadonlyArray<Format> = [
  {
    name: "MVP produit",
    duree: "8 à 14 semaines",
    cible: "Équipes qui veulent tester une idée avec un vrai produit",
    inclus: [
      "Ateliers besoin et carte des parcours utilisateurs prioritaires",
      "Scope fonctionnel figé par jalons — pas de backlog infini au départ",
      "Interface sobre, accessible et prête pour vos premiers utilisateurs",
      "Mise en ligne, URL sécurisée et mini-guide pour votre équipe",
    ],
  },
  {
    name: "Plateforme métier",
    duree: "3 à 6 mois",
    cible: "Ops, administratif, logistique — données et workflows centralisés",
    inclus: [
      "Rôles et permissions adaptés à vos équipes (admin, lecture seule, etc.)",
      "Écrans tableau de bord, listes, filtres et exports utiles au quotidien",
      "Connexion aux briques existantes quand c’est raisonnable (API, CSV…)",
      "Recette utilisateur et corrections avant bascule progressive",
    ],
  },
  {
    name: "Scale & intégrations",
    duree: "continu",
    cible: "Produit déjà en ligne qui doit grossir sans casser",
    inclus: [
      "Renfort perf, fiabilité et observabilité de base (logs, alertes)",
      "Intégrations API, webhooks ou synchros avec vos outils métier",
      "Roadmap par trimestre ou sprint avec arbitrage business / technique",
      "Option maintenance dédiée alignée sur notre offre Run",
    ],
  },
];

const INCLUS: ReadonlyArray<string> = [
  "Préparation du projet : objectifs, utilisateurs, risques et hors-scope écrits",
  "Architecture pragmatique — pas de sur-ingénierie pour un besoin simple",
  "Stack moderne (ex. Next.js, TypeScript) et déploiement maîtrisé",
  "Authentification et contrôle d’accès quand le métier l’exige",
  "Contrôle qualité manuel + garde-fous techniques avant mise en prod",
  "Repo et documentation de prise en main pour vos développeurs ou les nôtres",
  "Passage de relais : démo enregistrée ou session live selon votre préférence",
];

const HORS_PERIMETRE: ReadonlyArray<string> = [
  "Audit de sécurité « niveau banque » ou pentest exhaustif hors périmètre classique",
  "Modèles IA ou data science lourds non liés à votre flux applicatif",
  "Hardware, firmware ou apps mobiles natives si le besoin ne les impose pas",
  "Support utilisateur 24/7 ou astreinte sans contrat et équipe dédiée",
  "Reprise d’un legacy opaque sans accès documentation ni propriétaire métier",
  "Conformité juridique poussée seule — nous intégrons les contraintes connues, pas le cabinet d’avocats",
];

type Step = { n: string; title: string; desc: string };

const STEPS: ReadonlyArray<Step> = [
  {
    n: "01",
    title: "Immersion",
    desc: "On clarifie le problème métier, qui utilise l’outil et ce qui ferait échec du projet. Sans ça, aucun backlog tenable.",
  },
  {
    n: "02",
    title: "Spécification",
    desc: "Écrans clés, règles métiers et priorités sont validés par écrit — wireframes ou prototype léger si nécessaire.",
  },
  {
    n: "03",
    title: "Construction",
    desc: "Développement par jalons avec démos régulières. Vous voyez le produit grandir, pas un tunnel de trois mois sans nouvelles.",
  },
  {
    n: "04",
    title: "Qualité",
    desc: "Tests des parcours critiques, sécurité de base (sessions, droits, données sensibles) et corrections avant prod.",
  },
  {
    n: "05",
    title: "Mise en ligne & transfert",
    desc: "Déploiement, URL, sauvegardes et guide court. Les évolutions suivantes peuvent être traitées en sprint ou via maintenance.",
  },
];

type QA = { q: string; a: string };

const FAQ: ReadonlyArray<QA> = [
  {
    q: "Combien coûte un MVP ou une plateforme ?",
    a: "Ça dépend du nombre d’écrans, des rôles, des intégrations et du niveau de finition. Après un atelier ou questionnaire ciblé, on vous envoie une fourchette puis un devis détaillé par jalons — pas de surprise sur le périmètre initial.",
  },
  {
    q: "Combien de temps pour une première version utilisable ?",
    a: "Pour un MVP focalisé, comptez souvent deux à trois mois calendaires selon les validations de votre côté. Une plateforme métier plus large peut s’étaler sur un trimestre ou plus — le planning est fixé avec vous avant signature.",
  },
  {
    q: "Le code et les données m’appartiennent-ils ?",
    a: "Oui : après paiement des jalons convenus, le dépôt et les livrables vous sont transférés selon le contrat. Les données restent les vôtres ; nous ne les revendons pas et nous configurons l’hébergement pour que vous puissiez reprendre la main.",
  },
  {
    q: "Que se passe-t-il après la mise en ligne ?",
    a: "Vous pouvez enchaîner sur une formule maintenance (mises à jour, petites évolutions) ou garder une équipe interne avec la doc fournie. Les grosses features hors périmètre font l’objet d’un nouveau chiffrage.",
  },
  {
    q: "Comment gérez-vous le RGPD et les données personnelles ?",
    a: "On intègre les bases : consentements si besoin, droits utilisateurs simples, hébergement et flux raisonnables. Pour les analyses juridiques fines ou les traitements sensibles, on collabore avec vos conseils ou des experts dédiés.",
  },
];

const PRODUCT_REALISATIONS = REALISATIONS;

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
          className={`${bebas.className} text-[clamp(2rem,4.6vw,3.4rem)] leading-none`}
          style={{ color: ACCENT }}
          aria-hidden
        >
          {num}
        </span>
        <h2 className="m-0 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-[#0C4323]/58 sm:text-[0.8rem]">
          {title}
        </h2>
      </header>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

export default function ServiceAppsSaasPage() {
  return (
    <main
      className="min-h-svh pb-32 pt-28 sm:pb-44 sm:pt-32 md:pb-52 md:pt-40"
      style={{ backgroundColor: PAGE_BG, color: INK }}
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-10 md:px-16">
        <ServiceBackNav linkClassName="group inline-flex items-center gap-2 font-sans text-[0.68rem] font-medium uppercase tracking-[0.22em] text-[#0C4323] opacity-80 transition-opacity hover:opacity-100" />

        <ServiceRevealClient />

        <header data-reveal className="svc-reveal mt-2 mb-16 sm:mt-0 sm:mb-24 md:mb-28">
          <p className="mb-5 font-sans text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-[#0C4323]/72 sm:mb-7 sm:text-[0.7rem]">
            Service · Produit sur-mesure
          </p>
          <h1
            className={`${bebas.className} m-0 text-[clamp(2.6rem,9vw,6rem)] font-normal uppercase leading-[0.92] tracking-[-0.02em]`}
          >
            Apps &amp; SaaS
          </h1>
          <p
            className={`${cormorant.className} mt-8 max-w-[44rem] text-[clamp(1.1rem,1.7vw,1.5rem)] italic leading-[1.5] sm:mt-10`}
            style={{ color: `${INK}E6` }}
          >
            Tableaux de bord, plateformes et outils internes — un produit qui{" "}
            <span className="not-italic font-medium">sert vos opérations</span>,
            pas une démo gadget oubliée après livraison.
          </p>
        </header>

        <ul data-reveal className="svc-stagger m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-3 sm:gap-4">
          {[
            { k: "MVP", v: "priorités métier avant la feature factory" },
            { k: "Stack", v: "moderne, lisible, documentée" },
            { k: "Prod", v: "mise en ligne et transfert assumés" },
          ].map((kpi) => (
            <li
              key={kpi.k}
              className="rounded-2xl border bg-white/80 p-5 sm:p-6"
              style={{ borderColor: `${SURFACE}22` }}
            >
              <p
                className={`${bebas.className} m-0 text-[clamp(1.6rem,3.4vw,2.4rem)] leading-none`}
                style={{ color: ACCENT }}
              >
                {kpi.k}
              </p>
              <p
                className="mt-2 font-sans text-[0.86rem] leading-[1.5] sm:text-[0.92rem]"
                style={{ color: `${INK}CC` }}
              >
                {kpi.v}
              </p>
            </li>
          ))}
        </ul>

        <div data-reveal className="svc-stagger mt-20 grid gap-5 md:grid-cols-2 md:gap-6">
          <article
            className="rounded-2xl border bg-white/82 p-6 sm:p-8 md:p-9"
            style={{ borderColor: `${SURFACE}20` }}
          >
            <p className="m-0 font-sans text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-[#0C4323]/72 sm:text-[0.7rem]">
              Pour qui c’est
            </p>
            <ul className="mt-5 m-0 list-none space-y-3 p-0 sm:mt-6 sm:space-y-3.5">
              {[
                "Excel et les fichiers partagés ne suffisent plus pour suivre votre activité.",
                "Vous voulez un outil web central pour vos équipes ou vos partenaires.",
                "Vous avez validé le problème côté métier mais pas encore le bon produit.",
                "Vous cherchez une équipe qui livre en français avec des jalons clairs.",
              ].map((line) => (
                <li
                  key={line}
                  className="flex gap-3 font-sans text-[0.96rem] leading-[1.6] sm:text-[1rem]"
                  style={{ color: `${INK}EB` }}
                >
                  <span
                    className="mt-[0.55rem] inline-block size-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: SURFACE }}
                    aria-hidden
                  />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </article>

          <article
            className="rounded-2xl p-6 text-[#FDF6EC] shadow-[0_24px_60px_-30px_rgba(12,67,35,0.4)] sm:p-8 md:p-9"
            style={{ backgroundColor: SURFACE }}
          >
            <p className="m-0 font-sans text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-[#FDF6EC]/65 sm:text-[0.7rem]">
              Ce que ça peut vous apporter
            </p>
            <ul className="mt-5 m-0 list-none space-y-3 p-0 sm:mt-6 sm:space-y-3.5">
              {[
                "Un flux métier fluide : moins de copier-coller, moins d’erreurs humaines.",
                "Une base logicielle propre pour itérer sans tout réécrire à chaque release.",
                "Une relation où le périmètre et les livrables sont explicités — pas le flou artistique.",
                "Un produit hébergé et documenté, prêt à être repris en interne ou avec nous.",
              ].map((line) => (
                <li
                  key={line}
                  className="flex gap-3 font-sans text-[0.96rem] leading-[1.6] text-[#FDF6EC]/92 sm:text-[1rem]"
                >
                  <span
                    className="mt-[0.55rem] inline-block size-1.5 shrink-0 rounded-full bg-[#FDF6EC]/55"
                    aria-hidden
                  />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-24 sm:mt-28 md:mt-32">
          <NumberedSection num="01" title="Trois formats, une exigence">
            <p
              className="max-w-[44rem] font-sans text-[1rem] leading-[1.7] sm:text-[1.05rem] sm:leading-[1.78]"
              style={{ color: `${INK}EB` }}
            >
              Du MVP à la plateforme qui grossit : on dimensionne le projet avec
              vous. Même exigence partout — specs lisibles, code maintenable,
              transfert assumé.
            </p>
            <ul className="mt-10 m-0 grid list-none grid-cols-1 gap-4 p-0 lg:grid-cols-3 lg:gap-5">
              {FORMATS.map((f, i) => (
                <li
                  key={f.name}
                  className="flex flex-col rounded-2xl border bg-white/72 p-6 sm:p-7"
                  style={{ borderColor: `${SURFACE}22` }}
                >
                  <p
                    className={`${bebas.className} m-0 text-[0.78rem] uppercase tracking-[0.24em]`}
                    style={{ color: ACCENT }}
                  >
                    Format 0{i + 1}
                  </p>
                  <h3
                    className={`${bebas.className} m-0 mt-4 text-[clamp(1.4rem,2.4vw,1.85rem)] uppercase leading-[1] tracking-[-0.005em]`}
                  >
                    {f.name}
                  </h3>
                  <dl
                    className="mt-5 grid grid-cols-1 gap-y-3 font-sans text-[0.85rem] leading-[1.5] sm:text-[0.9rem]"
                    style={{ color: `${INK}D9` }}
                  >
                    <div className="flex flex-col">
                      <dt className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-[#0C4323]/58">
                        Horizon
                      </dt>
                      <dd className="m-0 mt-1">{f.duree}</dd>
                    </div>
                    <div className="flex flex-col">
                      <dt className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-[#0C4323]/58">
                        Cible type
                      </dt>
                      <dd className="m-0 mt-1">{f.cible}</dd>
                    </div>
                  </dl>
                  <ul
                    className="mt-5 m-0 list-none space-y-2 border-t p-0 pt-4 font-sans text-[0.88rem] leading-[1.55] sm:text-[0.92rem]"
                    style={{
                      borderColor: `${SURFACE}18`,
                      color: `${INK}E6`,
                    }}
                  >
                    {f.inclus.map((it) => (
                      <li key={it} className="flex gap-2.5">
                        <span
                          className={`${bebas.className} mt-[0.05em] shrink-0 text-[0.95rem] leading-none`}
                          style={{ color: ACCENT }}
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

        <div className="mt-24 sm:mt-28 md:mt-32">
          <NumberedSection num="02" title="Inclus & hors périmètre">
            <div className="grid gap-5 md:grid-cols-2 md:gap-6">
              <article
                className="rounded-2xl border bg-white/82 p-6 sm:p-8 md:p-9"
                style={{ borderColor: `${SURFACE}20` }}
              >
                <p className="m-0 font-sans text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-[#0C4323]/72 sm:text-[0.7rem]">
                  Toujours inclus
                </p>
                <ul className="mt-5 m-0 list-none space-y-3.5 p-0 sm:mt-6">
                  {INCLUS.map((item, i) => (
                    <li
                      key={item}
                      className="flex gap-4 border-b border-[#0C4323]/14 pb-3.5 font-sans text-[0.95rem] leading-[1.6] text-[#0C4323]/92 last:border-b-0 last:pb-0 sm:text-[1rem]"
                    >
                      <span
                        className={`${bebas.className} mt-[0.05em] shrink-0 text-[1rem] leading-none sm:text-[1.1rem]`}
                        style={{ color: ACCENT }}
                        aria-hidden
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0">{item}</span>
                    </li>
                  ))}
                </ul>
              </article>

              <article
                className="rounded-2xl p-6 text-[#FDF6EC] shadow-[0_24px_60px_-30px_rgba(12,67,35,0.4)] sm:p-8 md:p-9"
                style={{ backgroundColor: SURFACE }}
              >
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
                  Une fonctionnalité hors liste ? On la chiffre à part avec une
                  estimation honnête — pas de scope creep déguisé en « petite
                  modif ».
                </p>
              </article>
            </div>
          </NumberedSection>
        </div>

        <div className="mt-24 sm:mt-28 md:mt-32">
          <NumberedSection num="03" title="Comment on travaille">
            <p
              className="max-w-[44rem] font-sans text-[1rem] leading-[1.7] sm:text-[1.05rem] sm:leading-[1.78]"
              style={{ color: `${INK}EB` }}
            >
              Cinq étapes pour passer du besoin flou au logiciel en production.
              Chaque phase produit des livrables ou des décisions traçables.
            </p>
            <ol className="mt-10 m-0 list-none space-y-5 p-0 sm:space-y-6">
              {STEPS.map((s) => (
                <li
                  key={s.n}
                  className="grid gap-3 rounded-2xl border bg-white/65 p-6 sm:grid-cols-[5rem_1fr] sm:items-start sm:gap-6 sm:p-7 md:p-8"
                  style={{ borderColor: `${SURFACE}18` }}
                >
                  <span
                    className={`${bebas.className} text-[clamp(2rem,3.6vw,2.8rem)] leading-none`}
                    style={{ color: ACCENT }}
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
                    <p
                      className="mt-3 m-0 font-sans text-[0.96rem] leading-[1.65] sm:text-[1rem] sm:leading-[1.7]"
                      style={{ color: `${INK}E6` }}
                    >
                      {s.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </NumberedSection>
        </div>

        <div className="mt-24 sm:mt-28 md:mt-32">
          <NumberedSection num="04" title="Du web vitrine au produit">
            <p
              className="max-w-[44rem] font-sans text-[1rem] leading-[1.7] sm:text-[1.05rem] sm:leading-[1.78]"
              style={{ color: `${INK}EB` }}
            >
              Nos études de cas montrent la même exigence appliquée aux interfaces
              et aux parcours — ouvrez un projet pour voir méthode et résultat.
            </p>
            <ul className="mt-10 m-0 grid list-none grid-cols-1 gap-5 p-0 md:grid-cols-3 md:gap-6">
              {PRODUCT_REALISATIONS.map((r) => (
                <li key={r.slug} className="m-0">
                  <Link
                    href={`/realisations/${r.slug}`}
                    className="group block rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[#0C4323]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF4EF]"
                    aria-label={`Voir l’étude de cas : ${r.title}`}
                  >
                    <figure
                      className="relative m-0 overflow-hidden rounded-2xl border bg-[#0C4323]/[0.06] shadow-[0_20px_50px_-28px_rgba(12,67,35,0.26)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5"
                      style={{ borderColor: `${SURFACE}22` }}
                    >
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
                        className={`${bebas.className} m-0 text-[clamp(1.15rem,1.7vw,1.45rem)] uppercase leading-[1] tracking-[-0.005em] transition-colors group-hover:text-[#2D8C4E]`}
                        style={{ color: INK }}
                      >
                        {r.title}
                      </h3>
                      <span
                        className={`${bebas.className} text-[0.95rem] uppercase tracking-[0.18em] text-[#0C4323]/48 transition-transform group-hover:translate-x-1`}
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

        <div className="mt-24 sm:mt-28 md:mt-32">
          <NumberedSection num="05" title="Questions fréquentes">
            <ul className="m-0 list-none p-0">
              {FAQ.map((item, i) => (
                <li
                  key={item.q}
                  className="border-t border-[#0C4323]/28 last:border-b last:border-[#0C4323]/28"
                >
                  <details className="group">
                    <summary
                      className={`${bebas.className} flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-[clamp(1.05rem,1.7vw,1.65rem)] uppercase tracking-[0.005em] outline-none transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[#2D8C4E] focus-visible:ring-2 focus-visible:ring-[#0C4323]/38 focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF4EF] sm:gap-6 sm:py-7 [&::-webkit-details-marker]:hidden`}
                    >
                      <span className="flex-1 leading-[1.15] sm:leading-[1.05]">
                        <span
                          className="mr-3 font-sans text-[0.7rem] font-medium uppercase tracking-[0.22em]"
                          style={{ color: ACCENT }}
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
                      className={`${cormorant.className} m-0 max-w-[42rem] pb-6 pr-2 text-[clamp(1rem,1.35vw,1.4rem)] leading-[1.5] sm:pb-7 sm:pr-16`}
                      style={{ color: `${INK}D9` }}
                    >
                      {item.a}
                    </p>
                  </details>
                </li>
              ))}
            </ul>
          </NumberedSection>
        </div>

        <div className="mt-24 sm:mt-28 md:mt-32">
          <section
            data-nav-theme="dark"
            data-reveal
            className="svc-reveal relative overflow-hidden rounded-3xl px-6 py-14 text-[#FDF6EC] shadow-[0_28px_80px_-30px_rgba(12,67,35,0.42)] sm:px-10 sm:py-20 md:px-14 md:py-24"
            style={{ backgroundColor: SURFACE }}
            aria-label="Discutons de votre produit applicatif"
          >
            <div className="relative z-10 flex flex-col items-center text-center">
              <p className="font-sans text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-[#FDF6EC]/65 sm:text-[0.7rem]">
                Prochaine étape
              </p>
              <h2
                className={`${bebas.className} m-0 mt-5 text-[clamp(2.2rem,7vw,5.5rem)] font-normal uppercase leading-[0.95] tracking-[-0.015em] sm:mt-6 sm:leading-[0.9]`}
              >
                Parlons de votre produit
              </h2>
              <p
                className={`${cormorant.className} mt-6 max-w-[36rem] text-[clamp(1rem,1.4vw,1.4rem)] italic leading-[1.45] text-[#FDF6EC]/85 sm:mt-7`}
              >
                Décrivez le problème métier — pas seulement la techno souhaitée —
                et on vous dit vite si on peut vous accompagner et sous quel
                format.
              </p>
              <Link
                href="/contact"
                className={`${bebas.className} group mt-9 inline-flex items-center gap-2.5 rounded-full bg-[#FDF6EC] px-7 py-3 text-[0.85rem] uppercase tracking-[0.2em] text-[#0C4323] transition-[transform,background-color,color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-transparent hover:text-[#FDF6EC] hover:shadow-[0_0_0_2px_#FDF6EC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDF6EC]/70 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0C4323] sm:mt-12 sm:gap-3 sm:px-11 sm:py-4 sm:text-[1rem] sm:tracking-[0.22em]`}
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
