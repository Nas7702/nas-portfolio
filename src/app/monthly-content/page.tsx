import { Metadata } from "next";
import Image from "next/image";
import { Video, Camera, Scissors, FileText, Zap, Clock, Calendar, Users, Utensils, Briefcase, ArrowRight } from "lucide-react";
import Link from "next/link";
import PageTransition from "../components/PageTransition";
import ScrollReveal from "../components/ScrollReveal";
import AnalyticsLink from "../components/AnalyticsLink";
import FAQAccordion from "./components/FAQAccordion";
import ScrollToExamples from "./components/ScrollToExamples";
import LeadCapture from "./components/LeadCapture";
import LandingCTA from "./components/LandingCTA";
import PricingSection from "./components/PricingSection";
import { monthlyContentCopy } from "./content";

export const metadata: Metadata = {
  title: "Monthly Content Packages | Nas.Create",
  description:
    "One shoot. Weeks of content. Monthly video and photo packages for online coaches, food businesses, and local services. Short-form ready content delivered to your inbox.",
  openGraph: {
    title: "Monthly Content Packages | Nas.Create",
    description:
      "One shoot. Weeks of content. Monthly video and photo packages for online coaches, food businesses, and local services.",
    url: "https://nascreate.com/monthly-content",
    siteName: "Nas.Create",
    images: [
      {
        url: "/images/bokeh-lights-dark-background.jpg",
        width: 1200,
        height: 630,
        alt: "Monthly Content Packages - Nas.Create",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Monthly Content Packages | Nas.Create",
    description:
      "One shoot. Weeks of content. Monthly video and photo packages for online coaches, food businesses, and local services.",
    images: ["/images/bokeh-lights-dark-background.jpg"],
  },
  alternates: {
    canonical: "https://nascreate.com/monthly-content",
  },
};

const { deliverables: copyDeliverables, audienceCards, processSteps: copyProcessSteps, faqItems: copyFaqItems, trustBullets, packages } = monthlyContentCopy;

const deliverables = [
  {
    icon: Video,
    title: "Short-form Reels",
    description: copyDeliverables.videoContent.items[0],
  },
  {
    icon: Camera,
    title: "Talking Heads",
    description: copyDeliverables.videoContent.items[1],
  },
  {
    icon: Scissors,
    title: "B-roll Packs",
    description: copyDeliverables.videoContent.items[2],
  },
  {
    icon: FileText,
    title: "Raw Footage",
    description: copyDeliverables.videoContent.items[3],
  },
  {
    icon: Zap,
    title: "Photo Assets",
    description: copyDeliverables.photoContent.items[0],
  },
  {
    icon: Clock,
    title: "Full Usage Rights",
    description: copyDeliverables.extras.items[2],
  },
];

const audiences = [
  {
    icon: Users,
    title: audienceCards[0].title,
    description: audienceCards[0].bullets.join(" "),
  },
  {
    icon: Utensils,
    title: audienceCards[1].title,
    description: audienceCards[1].bullets.join(" "),
  },
  {
    icon: Briefcase,
    title: audienceCards[2].title,
    description: audienceCards[2].bullets.join(" "),
  },
];

const processSteps = copyProcessSteps.map((step, i) => ({
  step: String(i + 1).padStart(2, "0"),
  title: step.title,
  description: step.description,
}));

const faqItems = copyFaqItems.map((item) => ({
  question: item.question,
  answer: item.answer,
}));

// Placeholder example media – replace src/thumbnail with real assets
const exampleMedia = [
  { id: 1, thumbnail: "/images/portfolio/sheffield-powerlifting/fitness/DSC00947.jpg", alt: "Example fitness content" },
  { id: 2, thumbnail: "/images/portfolio/sheffield-powerlifting/fitness/DSC00944.jpg", alt: "Example gym content" },
  { id: 3, thumbnail: "/images/portfolio/sheffield-powerlifting/fitness/DSC00917.jpg", alt: "Example coaching content" },
  { id: 4, thumbnail: "/images/Automotive/DSC07610-Enhanced-NR.jpg", alt: "Example brand content" },
  { id: 5, thumbnail: "/images/Automotive/DSC07646-Enhanced-NR.jpg", alt: "Example product content" },
  { id: 6, thumbnail: "/images/Automotive/DSC07747-Enhanced-NR.jpg", alt: "Example lifestyle content" },
];

export default function MonthlyContentPage() {
  return (
    <PageTransition>
      <div className="theme-landing-light min-h-screen">
        {/* ═══════════════════════════════════════════════════════════════════
            HEADER / LOGO BAR
        ═══════════════════════════════════════════════════════════════════ */}
        <header className="sticky top-0 z-50 bg-[var(--background)]/95 backdrop-blur-sm border-b border-border/50">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <Image
              src="/logos/new-logo_dark_wide.png"
              alt="Nas.Create"
              width={160}
              height={50}
              className="h-10 md:h-12 w-auto"
              priority
            />
            <Link
              href="/contact?src=monthly_content_header"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-accent-foreground font-medium text-sm hover:bg-accent/90 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </header>

        {/* ═══════════════════════════════════════════════════════════════════
            HERO SECTION
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="relative py-20 md:py-28 px-6 overflow-hidden">
          {/* Subtle gradient background */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent pointer-events-none"
          />

          <div className="max-w-5xl mx-auto text-center relative z-10">
            <ScrollReveal direction="up" delay={0}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                {monthlyContentCopy.heroHeadline}
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.15}>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                {monthlyContentCopy.heroSubheadline}
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <LandingCTA source="monthly_content_hero" size="md" />
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="#packages"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border hover:border-accent/50 font-medium transition-colors"
                >
                  View Packages
                  <ArrowRight size={16} />
                </Link>
                <ScrollToExamples className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors font-medium px-6 py-3">
                  See examples
                  <ArrowRight size={16} />
                </ScrollToExamples>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.25}>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground mt-8">
                {trustBullets.map((bullet) => (
                  <span key={bullet} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {bullet}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            PROOF / SHOWREEL SECTION
        ═══════════════════════════════════════════════════════════════════ */}
        <section id="examples" className="py-20 px-6 bg-card/40">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal direction="up" delay={0}>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                One Shoot. <span className="text-accent">Weeks of Content.</span>
              </h2>
              <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
                {monthlyContentCopy.proofSubheadline}
              </p>
            </ScrollReveal>

            {/* Showreel Embed Placeholder */}
            <ScrollReveal direction="up" delay={0.1}>
              <div className="relative aspect-video rounded-3xl overflow-hidden border border-border bg-secondary/50 mb-16">
                {/* Replace the div below with an iframe once you have a showreel URL */}
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  {/* Placeholder – swap for real embed */}
                  <div className="text-center">
                    <Video size={48} className="mx-auto mb-4 opacity-40" />
                    <p className="text-sm opacity-60">Showreel coming soon</p>
                  </div>
                  {/*
                  <iframe
                    src="YOUR_SHOWREEL_URL"
                    title="Showreel"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                  */}
                </div>
              </div>
            </ScrollReveal>

            {/* Examples Grid */}
            <ScrollReveal direction="up" delay={0.15}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {exampleMedia.map((item) => (
                  <div
                    key={item.id}
                    className="relative aspect-square rounded-2xl overflow-hidden border border-border bg-secondary/30 group"
                  >
                    <Image
                      src={item.thumbnail}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 768px) 33vw, 50vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            DELIVERABLES SECTION
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal direction="up" delay={0}>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                What You Get
              </h2>
              <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
                Everything you need to keep your content game strong—without lifting a finger.
              </p>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {deliverables.map((item, index) => {
                const Icon = item.icon;
                return (
                  <ScrollReveal key={item.title} direction="up" delay={0.05 * index}>
                    <div className="bg-card border border-border rounded-2xl p-6 h-full transition-all shadow-sm hover:shadow-md hover:border-accent/40">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                        <Icon size={24} className="text-accent" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            WHO IT'S FOR SECTION
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="py-20 px-6 bg-card/40">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal direction="up" delay={0}>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                Who This Is For
              </h2>
              <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
                Built for busy founders and creators who know content is king—but don&apos;t have time to be their own videographer.
              </p>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-6">
              {audiences.map((item, index) => {
                const Icon = item.icon;
                return (
                  <ScrollReveal key={item.title} direction="up" delay={0.08 * index}>
                    <div className="bg-card border border-border rounded-3xl p-8 h-full text-center transition-all shadow-sm hover:shadow-md hover:border-accent/40">
                      <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-5">
                        <Icon size={28} className="text-accent" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            PROCESS SECTION
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal direction="up" delay={0}>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                How It Works
              </h2>
              <p className="text-muted-foreground text-center max-w-xl mx-auto mb-16">
                Three simple steps from idea to inbox.
              </p>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-8">
              {processSteps.map((step, index) => (
                <ScrollReveal key={step.step} direction="up" delay={0.1 * index}>
                  <div className="relative">
                    {/* Connector line (hidden on last item) */}
                    {index < processSteps.length - 1 && (
                      <div
                        aria-hidden
                        className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-border to-transparent -translate-x-4"
                      />
                    )}
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center mb-5">
                        <span className="text-accent font-bold text-xl">
                          {step.step}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            PRICING SECTION
        ═══════════════════════════════════════════════════════════════════ */}
        <PricingSection packages={packages} />

        {/* ═══════════════════════════════════════════════════════════════════
            FAQ SECTION
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal direction="up" delay={0}>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground text-center mb-12">
                Got questions? Here are the answers.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1}>
              <FAQAccordion items={faqItems} />
            </ScrollReveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            FINAL CTA SECTION
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="py-24 px-6 bg-card/40">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal direction="up" delay={0}>
              <div className="text-center mb-12">
                <Calendar size={48} className="mx-auto mb-6 text-accent" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {monthlyContentCopy.ctaHeadline}
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
                  {monthlyContentCopy.ctaScarcity}
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Lead Capture Form */}
              <ScrollReveal direction="up" delay={0.1}>
                <LeadCapture />
              </ScrollReveal>

              {/* Email Alternative */}
              <ScrollReveal direction="up" delay={0.15}>
                <div className="bg-card border border-border rounded-2xl p-6 md:p-8 text-center h-full flex flex-col justify-center">
                  <h3 className="text-xl font-bold mb-3">
                    Prefer email?
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    No problem. Head to the contact page and send me a message there instead.
                  </p>
                  <AnalyticsLink
                    href="/contact?src=monthly_content_footer"
                    event="monthly_content_footer_contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-border hover:border-accent/50 font-semibold transition-colors"
                  >
                    Go to Contact
                    <ArrowRight size={16} />
                  </AnalyticsLink>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
