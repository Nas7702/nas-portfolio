"use client";

import PageTransition from "./components/PageTransition";
import Hero from "./components/Hero";
import ScrollReveal from "./components/ScrollReveal";

export default function Home() {
  return (
    <PageTransition>
      <Hero />

      <section
        id="work"
        tabIndex={-1}
        className="relative py-16 md:py-24 scroll-mt-24 md:scroll-mt-32"
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(17,24,39,0.9)_0%,_rgba(17,24,39,0.75)_100%)]" />

        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-6">
          <h2 className="sr-only">Work</h2>


          <div className="grid gap-6 md:grid-cols-2">
            <ScrollReveal direction="up" delay={0.15}>
              <a
                href="/tech"
                className="group flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-6 transition duration-200 hover:border-blue-500 hover:shadow-lg/10"
              >
                <div className="flex flex-col gap-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/40">
                      Data & Development
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold text-white">
                      Data & Development
                    </h3>
                  </div>
                  <ul className="flex flex-col gap-2 text-sm text-white/70">
                    <li>Analytics dashboards</li>
                    <li>Algorithm R&amp;D</li>
                    <li>Python pipelines</li>
                  </ul>
                </div>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-blue-500 transition group-hover:translate-x-1">
                  See projects →
                </span>
              </a>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <a
                href="/create"
                className="group flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-6 transition duration-200 hover:border-blue-500 hover:shadow-lg/10"
              >
                <div className="flex flex-col gap-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/40">
                      Content & Visuals
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold text-white">
                      Content & Visuals
                    </h3>
                  </div>
                  <ul className="flex flex-col gap-2 text-sm text-white/70">
                    <li>Brand films</li>
                    <li>Product reels</li>
                    <li>Photo sets</li>
                  </ul>
                </div>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-blue-500 transition group-hover:translate-x-1">
                  See projects →
                </span>
              </a>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <ScrollReveal direction="up" delay={0.1}>
        <footer className="py-12 flex gap-6 flex-wrap items-center justify-center border-t border-white/10 bg-black/30 backdrop-blur">
          <div className="text-center">
            <p className="text-white/80 mb-2">
              <strong className="font-semibold text-white">Naseem Hoque</strong> - Data Analyst & Visual Storyteller
            </p>
            <p className="text-sm text-white/60">
              Transforming Data & Capturing Stories
            </p>
          </div>
        </footer>
      </ScrollReveal>
    </PageTransition>
  );
}
