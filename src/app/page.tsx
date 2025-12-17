"use client";

import PageTransition from "./components/PageTransition";
import Hero from "./components/Hero";
import BentoGrid from "./components/BentoGrid";

export default function Home() {
  return (
    <PageTransition>
      <main className="flex flex-col w-full min-h-screen pb-32">
        <Hero />
        <BentoGrid />
      </main>
    </PageTransition>
  );
}
