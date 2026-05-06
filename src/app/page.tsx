import type { Metadata } from "next";
import HomeSectionHashScroll from "@/components/layouts/HomeSectionHashScroll";
import Hero from "@/components/sections/Hero";
import HeroText from "@/components/sections/HeroText";
import Services from "@/components/sections/Services";
import Approche from "@/components/sections/Approche";
import Realisations from "@/components/sections/Realisations";
import Cta from "@/components/sections/Cta";
import Faq from "@/components/sections/Faq";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <main id="site-home-main" className="relative flex flex-1 flex-col">
      <HomeSectionHashScroll />
      <Hero />
      <HeroText />
      <Services />
      <Approche />
      <Realisations />
      <Cta />
      <Faq />
    </main>
  );
}
