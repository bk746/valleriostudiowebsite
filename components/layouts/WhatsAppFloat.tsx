import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getWhatsAppHref } from "@/lib/seo-copy";
import { SITE_NAME } from "@/lib/site";

export default function WhatsAppFloat() {
  const href = getWhatsAppHref();
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Contacter ${SITE_NAME} sur WhatsApp`}
      className="fixed right-[max(1.25rem,env(safe-area-inset-right,0px))] bottom-[max(1.25rem,env(safe-area-inset-bottom,0px))] z-[90] inline-flex size-14 items-center justify-center rounded-full bg-[#25D366] text-[#FFFFFF] outline-none transition-[opacity,background-color] duration-200 ease-out hover:bg-[#22C55E] focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFFFF] active:opacity-90 sm:right-[max(1.75rem,env(safe-area-inset-right,0px))] sm:bottom-[max(1.75rem,env(safe-area-inset-bottom,0px))] sm:size-[3.75rem]"
    >
      <FontAwesomeIcon icon={faWhatsapp} className="text-[1.65rem] sm:text-[1.85rem]" />
    </a>
  );
}
