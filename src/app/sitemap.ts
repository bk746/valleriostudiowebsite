import type { MetadataRoute } from "next";
import { REALISATIONS } from "@/lib/realisations-data";
import { getSiteOrigin } from "@/lib/site";

/**
 * Plan du site natif Next.js App Router (`GET /sitemap.xml`).
 *
 * Routes indexées :
 * - `/` — page d’accueil
 * - `/contact` — contact
 * - `/realisations/[slug]` — chaque étude de cas (paramètres issus de `REALISATIONS`)
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getSiteOrigin();
  const lastModified = new Date();

  /** Chemins statiques hors racine ; la racine est listée séparément. */
  const staticPaths = ["/contact"] as const;

  /** Pages services dédiées — chacune accessible depuis sa carte dans la home. */
  const servicePaths = [
    "/services/site-internet",
    "/services/identite-visuelle",
    "/services/maintenance",
    "/services/apps-saas",
  ] as const;

  const entries: MetadataRoute.Sitemap = [
    {
      url: `${origin}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...staticPaths.map((path) => ({
      url: `${origin}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...servicePaths.map((path) => ({
      url: `${origin}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...REALISATIONS.map((realisation) => ({
      url: `${origin}/realisations/${realisation.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];

  return entries;
}
