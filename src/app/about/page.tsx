import type { Metadata } from "next";
import Image from "next/image";
import PageTransition from "../components/PageTransition";
import ScrollReveal from "../components/ScrollReveal";
import AnalyticsLink from "../components/AnalyticsLink";

export const metadata: Metadata = {
  title: "About — Nas | Data & Visuals for Sports & Tech",
  description:
    "I blend data analysis with cinematic storytelling to turn training data and product insight into content that moves people.",
};

export default function AboutPage() {
  return (
    <PageTransition>
      <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white">
        {/* Hero */}
        <section aria-labelledby="about-hero-title" className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
          <Image
            src="/images/bokeh-lights-dark-background.jpg"
            alt="Abstract bokeh lights background"
            fill
            sizes="100vw"
            className="absolute inset-0 object-cover object-center scale-105 blur-[18px] brightness-[0.45]"
            priority={false}
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/60 to-transparent" />
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -top-20 -left-20 w-[60vw] h-[40vh]" style={{ background: "radial-gradient(600px 300px at 10% 20%, rgba(57,255,136,0.05), transparent 60%)" }} />
            <div className="absolute -bottom-24 -right-24 w-[70vw] h-[50vh]" style={{ background: "radial-gradient(800px 400px at 85% 80%, rgba(57,255,136,0.04), transparent 65%)" }} />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
            <ScrollReveal direction="up" delay={0.1}>
              <header className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/40">About</p>
                <h1 id="about-hero-title" className="mt-3 text-4xl sm:text-5xl md:text-6xl font-bold text-white">
                  Data & Visuals
              </h1>
                <p className="mt-4 text-lg md:text-xl text-gray-300">
                  I blend data analysis with cinematic storytelling to turn training data and product insight into content that moves people.
                </p>
              </header>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.25}>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <AnalyticsLink
                  href="/tech"
                  event="about_cta_view_work"
                  ariaLabel="View work (Technical)"
                  title="View Work"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-blue-600 px-8 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
                >
                  View Work
                </AnalyticsLink>
                <AnalyticsLink
                  href="/contact"
                  event="about_cta_contact"
                  ariaLabel="Start a project"
                  title="Start a Project"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 px-8 text-sm font-semibold text-blue-500 transition-colors duration-200 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
                >
                  Start a Project
                </AnalyticsLink>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.35}>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Micro proof">
                {[
                  "5+ years active"
                ].map((chip) => (
                  <li key={chip} className="list-none">
                    <span className="inline-flex items-center rounded-full border border-white/10 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
                      {chip}
                    </span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
                  </div>
        </section>

        {/* What I do */}
        <section aria-labelledby="about-what-title" className="py-16 md:py-20 px-6">
          <div className="mx-auto w-full max-w-6xl">
            <ScrollReveal direction="up" delay={0.1}>
              <h2 id="about-what-title" className="text-2xl md:text-3xl font-semibold">What I do</h2>
              <p className="mt-3 max-w-3xl text-gray-300">
                I work across two tracks that reinforce each other. The data work sharpens the story; the visuals make the insight land.
              </p>
            </ScrollReveal>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <ScrollReveal direction="up" delay={0.2}>
                <article className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <header className="mb-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/40">Data & Development</p>
                    <h3 className="mt-2 text-xl font-semibold">Data & Development</h3>
                  </header>
                  <ul className="mb-4 list-disc space-y-2 pl-5 text-sm text-white">
                    <li>Analytics dashboards that inform product decisions</li>
                    <li>Algorithm R&D for velocity/IMU datasets</li>
                    <li>Python pipelines that make messy data usable</li>
                  </ul>
                  <AnalyticsLink
                    href="/tech"
                    event="about_link_tech"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
                    ariaLabel="See Technical"
                    title="See Technical"
                  >
                    See Technical →
                  </AnalyticsLink>
                </article>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.25}>
                <article className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <header className="mb-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/40">Content & Visuals</p>
                    <h3 className="mt-2 text-xl font-semibold">Content & Visuals</h3>
                  </header>
                  <ul className="mb-4 list-disc space-y-2 pl-5 text-sm text-white">
                    <li>Brand films for launches and features</li>
                    <li>Product reels that highlight benefits fast</li>
                    <li>Event/photo sets with clean, premium grading</li>
                  </ul>
                  <AnalyticsLink
                    href="/create"
                    event="about_link_creative"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
                    ariaLabel="See Creative"
                    title="See Creative"
                  >
                    See Creative →
                  </AnalyticsLink>
                </article>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="up" delay={0.35}>
              <p className="mt-6 text-sm text-gray-300">
                <span className="font-medium text-white/70">Tooling:</span> Python, Next.js, SQL · DaVinci, Lightroom, Photoshop
              </p>
            </ScrollReveal>
                  </div>
        </section>

        {/* Proof */}
        {/* <section aria-labelledby="about-proof-title" className="py-16 md:py-20 px-6 bg-panel">
          <div className="mx-auto w-full max-w-6xl">
            <ScrollReveal direction="up" delay={0.1}>
              <h2 id="about-proof-title" className="text-2xl md:text-3xl font-semibold">Proof</h2>
            </ScrollReveal>

            <div className="mt-6 grid gap-6 md:grid-cols-[2fr_1fr]">
              <ScrollReveal direction="up" delay={0.2}>
                <blockquote className="rounded-2xl border border-subtle bg-muted p-6 text-dim backdrop-blur">
                  <p className="text-base leading-relaxed text-text">
                    “Nas turned noisy training telemetry into a clear narrative. The dashboard shipped on time and the launch film drove real engagement.”
                  </p>
                  <footer className="mt-4 text-sm text-white/70">
                    <span className="font-semibold text-text">A. Patel</span>, Product Lead, Fitness Tech
                  </footer>
                </blockquote>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.25}>
                <ul className="rounded-2xl border border-subtle bg-muted p-6 text-sm leading-6 text-text">
                  <li>Improved barbell event detection accuracy by X%</li>
                  <li>Cut edit turnaround from X→Y for a client</li>
                  <li>Grew IG reach by X% for a product launch</li>
                </ul>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="up" delay={0.35}>
              <div className="mt-6">
                <AnalyticsLink
                  href="/contact"
                  event="about_cta_contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-accent focus:outline-none focus:ring-2 ring-accent ring-offset-bg"
                  ariaLabel="Contact after proof"
                  title="Start a Project"
                >
                  Start a Project →
                </AnalyticsLink>
              </div>
            </ScrollReveal>
          </div>
        </section> */}

        {/* Timeline */}
        <section aria-labelledby="about-timeline-title" className="py-16 md:py-20 px-6">
          <div className="mx-auto w-full max-w-6xl">
            <ScrollReveal direction="up" delay={0.1}>
              <h2 id="about-timeline-title" className="text-2xl md:text-3xl font-semibold">Timeline</h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <ol className="mt-6 grid gap-4 md:grid-cols-4">
                <li className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <h3 className="text-base font-semibold">Uni</h3>
                  <p className="mt-1 text-sm text-gray-300">Data + CS modules. Built first Python data tools.</p>
                  <p className="text-sm text-gray-300">Shot student sport events.</p>
                </li>
                <li className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <h3 className="text-base font-semibold">Stance</h3>
                  <p className="mt-1 text-sm text-gray-300">Deployed training dashboards. Filmed brand content.</p>
                  <p className="text-sm text-gray-300">Learned velocity/IMU nuances.</p>
                </li>
                <li className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <h3 className="text-base font-semibold">Freelance</h3>
                  <p className="mt-1 text-sm text-gray-300">Highlights across sport + tech. Faster edit pipelines.</p>
                  <p className="text-sm text-gray-300">Case-led reels and photo sets.</p>
                </li>
                <li className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <h3 className="text-base font-semibold">Now</h3>
                  <p className="mt-1 text-sm text-gray-300">Open to build or film. Sharpening algorithms + cinema.</p>
                  <p className="text-sm text-gray-300">Hands-on, outcome-first.</p>
                </li>
              </ol>
            </ScrollReveal>
          </div>
        </section>

        {/* Principles */}
        <section aria-labelledby="about-principles-title" className="py-16 md:py-20 px-6">
          <div className="mx-auto w-full max-w-6xl">
            <ScrollReveal direction="up" delay={0.1}>
              <h2 id="about-principles-title" className="text-2xl md:text-3xl font-semibold">Principles</h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <div className="mt-6 grid gap-6 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-lg font-semibold">Clarity over noise</h3>
                  <p className="mt-2 text-sm text-gray-300">Every chart/cut serves one message.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-lg font-semibold">Speed with taste</h3>
                  <p className="mt-2 text-sm text-gray-300">Move fast, protect quality.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-lg font-semibold">Athlete’s mindset</h3>
                  <p className="mt-2 text-sm text-gray-300">Reps, review, refine.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Final CTA */}
        <section aria-labelledby="about-final-cta-title" className="py-16 md:py-24 px-6">
          <div className="mx-auto w-full max-w-4xl text-center">
            <ScrollReveal direction="up" delay={0.1}>
              <h2 id="about-final-cta-title" className="text-3xl md:text-4xl font-bold">Got something to build or film?</h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.25}>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <AnalyticsLink
                  href="/contact"
                  event="about_cta_contact"
                  ariaLabel="Start a Project"
                  title="Start a Project"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-blue-600 px-8 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
                >
                  Start a Project
                </AnalyticsLink>
                <AnalyticsLink
                  href="/tech"
                  event="about_cta_view_work"
                  ariaLabel="See Work"
                  title="See Work"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 px-8 text-sm font-semibold text-blue-500 transition-colors duration-200 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
                >
                  See Work
                </AnalyticsLink>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
