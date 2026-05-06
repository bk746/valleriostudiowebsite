import type { Metadata } from "next";
import ContactHero from "@/components/sections/ContactHero";
import ContactForm from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Vallerio Studio à Annecy : parlez-nous de votre projet web ou digital. Réponse personnalisée sous 24 h.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactForm />
    </>
  );
}
