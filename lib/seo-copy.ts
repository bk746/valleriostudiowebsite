/** Titres et descriptions partagées (metadata, JSON-LD, réseaux). */
export const SITE_DEFAULT_TITLE =
  "Vallerio Studio — Création de sites web & design digital à Annecy";

export const SITE_DESCRIPTION =
  "Vallerio Studio est un studio digital basé à Annecy : stratégie, design UX/UI et développement de sites web vitrines ou sur mesure pour marques et entreprises. Nous concevons des expériences en ligne claires, soignées et orientées conversion en Haute-Savoie et au-delà.";

export const CONTACT_EMAIL_DISPLAY = "hello@valleriostudio.fr";

/** Numéro WhatsApp au format E.164 sans + (ex. 33781990761). */
export const CONTACT_WHATSAPP_E164 = "33781990761";

export function getContactWhatsAppE164(): string {
  const fromEnv = process.env.NEXT_PUBLIC_WHATSAPP_PHONE?.trim();
  const raw = fromEnv || CONTACT_WHATSAPP_E164;
  return raw.replace(/\D/g, "");
}

export function getWhatsAppHref(
  text = "Bonjour Vallerio, je souhaite discuter d'un projet.",
): string | null {
  const phone = getContactWhatsAppE164();
  if (!phone) return null;
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
