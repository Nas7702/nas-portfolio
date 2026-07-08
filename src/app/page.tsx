"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import PageTransition from "./components/PageTransition";
import LoadingSkeleton from "./components/LoadingSkeleton";
import KineticMarquee from "./components/KineticMarquee";
import FeaturedWorkStrip from "./components/FeaturedWorkStrip";
import CreativeCTA from "./components/CreativeCTA";

// Dynamic imports for heavy components
const Hero = dynamic(() => import("./components/Hero"), {
  loading: () => <LoadingSkeleton variant="hero" />,
  ssr: false, // WebGL shader canvas requires client-side rendering
});

const BentoGrid = dynamic(() => import("./components/BentoGrid"), {
  loading: () => <LoadingSkeleton variant="bento" />,
});

export default function Home() {
  return (
    <PageTransition>
      <main className="flex flex-col w-full min-h-screen pb-16">
        <Suspense fallback={<LoadingSkeleton variant="hero" />}>
          <Hero />
        </Suspense>
        <KineticMarquee />
        <FeaturedWorkStrip />
        <Suspense fallback={<LoadingSkeleton variant="bento" />}>
          <BentoGrid />
        </Suspense>

        {/* Closing CTA */}
        <section className="max-w-4xl mx-auto px-6 pt-14 pb-6 text-center w-full">
          <p className="eyebrow mb-3">Get in Touch</p>
          <h2 className="text-cine text-4xl md:text-5xl text-foreground mb-6">
            Got a project? Let&apos;s talk.
          </h2>
          <CreativeCTA source="home_footer" className="justify-center" />
        </section>
      </main>
    </PageTransition>
  );
}
