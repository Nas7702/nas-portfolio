"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Clapperboard,
  Camera,
  Trophy,
  Palette,
  ArrowRight,
  MessageCircle,
  Calendar,
  CheckCircle2,
  ClipboardList,
  Aperture,
  PackageCheck,
} from "lucide-react";
import PageTransition from "../components/PageTransition";
import ScrollReveal from "../components/ScrollReveal";

const WHATSAPP_HREF =
  "https://wa.me/447475437833?text=Hi%20Nas%2C%20I%27d%20like%20to%20discuss%20a%20project.";
const CALENDLY_HREF = "https://calendly.com/nas-create0/30min";

const services = [
  {
    slug: "videography",
    icon: Clapperboard,
    title: "Videography",
    tagline: "Video that earns its place in your marketing.",
    description:
      "Every shoot starts with a brief. What does this video need to do? Drive sales, build trust, fill a funnel? That answer shapes the shot list, the structure, and the edit.",
    includes: [
      "Brand films & company stories",
      "Meta & social media ads",
      "Service business promos",
      "Fitness & lifestyle content",
    ],
    color: "emerald",
  },
  {
    slug: "photography",
    icon: Camera,
    title: "Photography",
    tagline: "Stills that work as hard as your business does.",
    description:
      "Commercial photography for brands that need images with a purpose. Product, portrait, lifestyle. Shot to match your brand and ready for wherever you need them.",
    includes: [
      "Commercial & product photography",
      "Fitness & lifestyle shoots",
      "Team & headshot sessions",
      "Event photography",
    ],
    color: "teal",
  },
  {
    slug: "event-coverage",
    icon: Trophy,
    title: "Event Coverage",
    tagline: "You run the event. I make sure it lives on.",
    description:
      "Multi-camera coverage that captures the energy, the moments, and the story. From single-day conferences to multi-day sporting events. I've done it, and I know what to look for.",
    includes: [
      "Live sporting events",
      "Corporate conferences & launches",
      "Multi-day project coverage",
      "Same-day turnaround available",
    ],
    color: "green",
  },
  {
    slug: "post-production",
    icon: Palette,
    title: "Post-Production",
    tagline: "The edit is where the story gets told.",
    description:
      "Got footage that needs finishing? Cut, colour, sound. I'll take it from raw to ready, whether it's your rushes or a shoot I've done.",
    includes: [
      "Video editing & assembly",
      "Colour grading",
      "Sound design & mixing",
      "Subtitles & motion graphics",
    ],
    color: "cyan",
  },
];


const steps = [
  {
    number: "01",
    icon: Calendar,
    title: "Free Call",
    description:
      "Start with a free 30-minute call. We'll talk through exactly what you need, plus your timeline and budget.",
  },
  {
    number: "02",
    icon: ClipboardList,
    title: "Plan",
    description:
      "I turn that call into a clear production plan: concept, shot list, schedule, and deliverables.",
  },
  {
    number: "03",
    icon: Aperture,
    title: "Shoot",
    description:
      "I handle the planning, the kit, and the crew if needed. On the day, you focus on your business. I focus on getting the shots.",
  },
  {
    number: "04",
    icon: PackageCheck,
    title: "Deliver",
    description:
      "You'll get your files in the formats you need, on time, with revisions included. No chasing, no surprises.",
  },
];

export default function ServicesPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background pb-32 pt-24">

        {/* Hero */}
        <ScrollReveal className="max-w-4xl mx-auto px-6 mb-24 text-center" direction="up" delay={0} threshold={0.1}>
          <p className="eyebrow mb-4">What We Offer</p>
          <h1 className="font-display font-light text-5xl md:text-7xl tracking-tight mb-6 text-foreground">
            Services
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Video and photography built around your business goals. Every project starts with a brief and ends with content that has a job to do.
          </p>
        </ScrollReveal>

        {/* Service Cards */}
        <div className="max-w-6xl mx-auto px-6 mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <ScrollReveal key={service.slug} direction="up" delay={0.05 * index} threshold={0.1}>
                  <motion.div
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative bg-card border border-border hover:border-foreground/20 rounded-sm p-8 transition-colors duration-300 h-full flex flex-col"
                  >
                    <div className="flex flex-col h-full">
                      {/* Icon + Title */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-11 h-11 rounded-sm bg-secondary flex items-center justify-center flex-shrink-0 text-foreground">
                          <Icon size={20} />
                        </div>
                        <div>
                          <h2 className="font-display font-light text-xl text-foreground">{service.title}</h2>
                          <p className="text-sm text-muted-foreground mt-0.5">{service.tagline}</p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                        {service.description}
                      </p>

                      {/* Includes */}
                      <ul className="space-y-2 mb-8 flex-grow">
                        {service.includes.map((item) => (
                          <li key={item} className="flex items-center gap-2.5 text-sm text-foreground/80">
                            <CheckCircle2 size={14} className="text-accent flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>

                      {/* CTA */}
                      <Link
                        href={`/contact?service=${service.slug}#calendly`}
                        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground group-hover:translate-x-1 transition-all duration-200"
                      >
                        Book a free call <ArrowRight size={14} />
                      </Link>
                    </div>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* How It Works */}
        <div className="max-w-6xl mx-auto px-6 mb-32">
          <ScrollReveal direction="up" delay={0} threshold={0.1}>
            <p className="eyebrow text-center mb-3">The Process</p>
            <h2 className="font-display font-light text-3xl md:text-4xl text-center tracking-tight mb-4">How It Works</h2>
            <p className="text-muted-foreground text-center max-w-xl mx-auto mb-16">
              Four clear steps from first conversation to final delivery.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connector line (large desktop only) */}
            <div className="hidden lg:block absolute top-10 left-[calc(12.5%+1.5rem)] right-[calc(12.5%+1.5rem)] h-px bg-border/60" />

            {steps.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <ScrollReveal key={step.number} direction="up" delay={0.08 * index} threshold={0.1}>
                  <div className="relative flex flex-col items-center text-center">
                    {/* Number badge */}
                    <div className="relative mb-6">
                      <div className="w-20 h-20 rounded-sm bg-card border border-border flex items-center justify-center z-10 relative">
                        <StepIcon size={26} className="text-foreground" />
                      </div>
                      <span className="absolute -top-2 -right-2 w-6 h-6 rounded-sm bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center">
                        {index + 1}
                      </span>
                    </div>
                    <h3 className="font-display font-light text-xl mb-3">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                      {step.description}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* CTA Banner */}
        <ScrollReveal className="max-w-4xl mx-auto px-6" direction="up" delay={0} threshold={0.1}>
          <div className="rounded-sm bg-card border border-border p-12 text-center">
            <p className="eyebrow mb-4">Get Started</p>
            <h2 className="font-display font-light text-3xl md:text-4xl tracking-tight mb-4">Ready to start?</h2>
            <p className="text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
              Book a free 30-minute call and we&apos;ll talk through exactly what you need before we plan anything else.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={CALENDLY_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-sm bg-accent hover:opacity-90 text-accent-foreground font-semibold transition-opacity"
              >
                <Calendar size={18} />
                Book a free call
              </a>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-sm bg-card border border-border hover:border-foreground/20 hover:bg-secondary font-medium transition-all"
              >
                <MessageCircle size={18} />
                Or message on WhatsApp
              </a>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </PageTransition>
  );
}
