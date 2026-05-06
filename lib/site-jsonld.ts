import {
  CONTACT_EMAIL_DISPLAY,
  SITE_DEFAULT_TITLE,
  SITE_DESCRIPTION,
} from "@/lib/seo-copy";
import { SITE_NAME, getSiteOrigin } from "@/lib/site";
import { SITE_KEYWORDS } from "@/lib/site-keywords";

function uniqueTrimmedKeywords(limit: number): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const entry of SITE_KEYWORDS) {
    const t = entry.trim();
    if (!t || seen.has(t)) continue;
    seen.add(t);
    out.push(t);
    if (out.length >= limit) break;
  }
  return out;
}

/** JSON-LD @graph (Organization + WebSite) pour factuel Google / enrichissements. */
export function getSiteJsonLdScriptContent(): string {
  const url = getSiteOrigin();
  const knowsAbout = uniqueTrimmedKeywords(160);

  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": `${url}/#organization`,
        name: SITE_NAME,
        legalName: SITE_NAME,
        alternateName: ["Vallerio", "Vallerio studio", "Studio Vallerio"],
        url,
        email: CONTACT_EMAIL_DISPLAY,
        description: SITE_DESCRIPTION,
        knowsAbout,
        areaServed: [
          { "@type": "City", name: "Annecy" },
          { "@type": "AdministrativeArea", name: "Haute-Savoie" },
          { "@type": "Country", name: "France" },
        ],
        availableLanguage: ["French"],
        slogan: SITE_DEFAULT_TITLE,
        serviceType: [
          "Création de sites web vitrines et sur mesure",
          "Design UX et UI",
          "Développement front-end",
          "SEO technique et performance web",
          "Accompagnement et refonte digitale",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        url,
        name: SITE_NAME,
        alternateName: [SITE_DEFAULT_TITLE],
        description: SITE_DESCRIPTION,
        inLanguage: "fr-FR",
        publisher: { "@id": `${url}/#organization` },
      },
    ],
  });
}
