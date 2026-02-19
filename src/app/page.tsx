"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import PageTransition from "./components/PageTransition";
import LoadingSkeleton from "./components/LoadingSkeleton";

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
      <main className="flex flex-col w-full min-h-screen pb-32">
        <Suspense fallback={<LoadingSkeleton variant="hero" />}>
          <Hero />
        </Suspense>
        <Suspense fallback={<LoadingSkeleton variant="bento" />}>
          <BentoGrid />
        </Suspense>
      </main>
    </PageTransition>
  );
}
