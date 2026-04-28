import { Bebas_Neue, Cormorant_Garamond } from "next/font/google";
import { HeroValuePropClient } from "./HeroValuePropClient";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["400", "500"],
  style: ["italic"],
  subsets: ["latin"],
  display: "swap",
});

const COPY =
  "VOTRE SITE n'est pas une simple VITRINE — c'est votre MEILLEUR COMMERCIAL. " +
  "Disponible 24 heures sur 24, il rassure vos visiteurs et les pousse à vous contacter.";

export default function HeroText() {
  return (
    <HeroValuePropClient
      bebasClassName={bebas.className}
      cormorantClassName={cormorant.className}
      fullTextForA11y={COPY}
    />
  );
}
