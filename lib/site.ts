export const SITE_NAME = "Vallerio Studio";

/**
 * Origine publique du site, sans slash final (sitemap, robots, Open Graph).
 * Sur Vercel, définir `NEXT_PUBLIC_SITE_URL` vers le domaine canonique
 * (ex. https://www.valleriostudio.fr) pour les URLs absolues correctes.
 */
export function getSiteOrigin(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  if (process.env.VERCEL_URL)
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  return "http://localhost:3000";
}
