// Server Component — pas de "use client".
// Hero, TrustBand, Services, HowItWorks, Testimonials, CTA sont rendus
// en HTML côté serveur (indexables immédiatement par Google).
// Stats et FAQ restent des client islands ("use client" dans leurs fichiers).

import Hero from "@/components/Hero";
import TrustBand from "@/components/TrustBand";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import FadeInObserver from "@/components/FadeInObserver";

export default function HomePage() {
  return (
    <>
      {/* Monte l'IntersectionObserver pour les animations .fi → .fi.v */}
      <FadeInObserver />
      <Hero />
      <TrustBand />
      <Stats />
      <Services />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
