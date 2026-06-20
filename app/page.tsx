"use client";

import Hero from "@/components/Hero";
import TrustBand from "@/components/TrustBand";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import useFadeIn from "@/components/useFadeIn";

export default function HomePage() {
  useFadeIn();

  return (
    <>
      <Hero />
      <TrustBand />
      <Stats />
      <Services />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}
