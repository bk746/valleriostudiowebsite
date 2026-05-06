import { getSiteJsonLdScriptContent } from "@/lib/site-jsonld";

export default function SiteJsonLd() {
  return (
    <script
      type="application/ld+json"
      // JSON auto-échappé ; pas de contenu utilisateur brut.
      dangerouslySetInnerHTML={{ __html: getSiteJsonLdScriptContent() }}
    />
  );
}
