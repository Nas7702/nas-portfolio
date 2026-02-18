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
  Mail,
  CheckCircle2,
  ClipboardList,
  Aperture,
  PackageCheck,
} from "lucide-react";
import PageTransition from "../components/PageTransition";
import ScrollReveal from "../components/ScrollReveal";

const WHATSAPP_HREF =
  "https://wa.me/447475437833?text=Hi%20Nas%2C%20I%27d%20like%20to%20discuss%20a%20project.";
const EMAIL_HREF =
  "mailto:nascreate0@gmail.com?subject=New%20enquiry%20from%20nascreate.com&body=Hi%20Nas%2C%0AProject%20type%3A%20%5BVideo%2FPhoto%2FEvent%5D%0ABudget%3A%20%5B%5D%0ATimeline%3A%20%5B%5D";

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

const colorMap: Record<string, { bg: string; icon: string; border: string; badge: string }> = {
  emerald: {
    bg: "from-emerald-500/10 to-emerald-500/5",
    icon: "bg-emerald-500/15 text-emerald-400",
    border: "hover:border-emerald-500/40",
    badge: "text-emerald-400",
  },
  teal: {
    bg: "from-teal-500/10 to-teal-500/5",
    icon: "bg-teal-500/15 text-teal-400",
    border: "hover:border-teal-500/40",
    badge: "text-teal-400",
  },
  green: {
    bg: "from-green-500/10 to-green-500/5",
    icon: "bg-green-500/15 text-green-400",
    border: "hover:border-green-500/40",
    badge: "text-green-400",
  },
  cyan: {
    bg: "from-cyan-500/10 to-cyan-500/5",
    icon: "bg-cyan-500/15 text-cyan-400",
    border: "hover:border-cyan-500/40",
    badge: "text-cyan-400",
  },
};

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Brief",
    description:
      "Tell me what the project needs to achieve, your rough timeline, and your budget. No lengthy forms. A message is enough to get started.",
  },
  {
    number: "02",
    icon: Aperture,
    title: "Shoot",
    description:
      "I handle the planning, the kit, and the crew if needed. On the day, you focus on your business. I focus on getting the shots.",
  },
  {
    number: "03",
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
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Video and photography built around your business goals. Every project starts with a brief and ends with content that has a job to do.
          </p>
        </ScrollReveal>

        {/* Service Cards */}
        <div className="max-w-6xl mx-auto px-6 mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              const c = colorMap[service.color];
              return (
                <ScrollReveal key={service.slug} direction="up" delay={0.05 * index} threshold={0.1}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className={`group relative bg-card border border-border ${c.border} rounded-3xl p-8 transition-colors duration-300 overflow-hidden h-full flex flex-col`}
                  >
                    {/* Gradient wash */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${c.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                    <div className="relative z-10 flex flex-col h-full">
                      {/* Icon + Title */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-2xl ${c.icon} flex items-center justify-center flex-shrink-0`}>
                          <Icon size={22} />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-foreground">{service.title}</h2>
                          <p className={`text-sm font-medium mt-0.5 ${c.badge}`}>{service.tagline}</p>
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
                            <CheckCircle2 size={15} className={c.badge} />
                            {item}
                          </li>
                        ))}
                      </ul>

                      {/* CTA */}
                      <Link
                        href={`/contact?service=${service.slug}`}
                        className={`inline-flex items-center gap-2 text-sm font-semibold ${c.badge} group-hover:translate-x-1 transition-transform duration-200`}
                      >
                        Get a quote <ArrowRight size={15} />
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
            <h2 className="text-3xl font-bold text-center mb-4">How It Works</h2>
            <p className="text-muted-foreground text-center max-w-xl mx-auto mb-16">
              No complicated process. Three steps from first message to finished files.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line (desktop only) */}
            <div className="hidden md:block absolute top-10 left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] h-px bg-gradient-to-r from-emerald-500/30 via-green-400/30 to-teal-500/30" />

            {steps.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <ScrollReveal key={step.number} direction="up" delay={0.08 * index} threshold={0.1}>
                  <div className="relative flex flex-col items-center text-center">
                    {/* Number badge */}
                    <div className="relative mb-6">
                      <div className="w-20 h-20 rounded-full bg-card border-2 border-emerald-500/40 flex items-center justify-center shadow-lg shadow-emerald-500/10 z-10 relative">
                        <StepIcon size={28} className="text-emerald-400" />
                      </div>
                      <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center">
                        {index + 1}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
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
          <div className="relative overflow-hidden rounded-3xl bg-card border border-border p-12 text-center">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/8 via-transparent to-teal-500/8 pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to start?</h2>
              <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
                Drop me a message with your project idea. I&apos;ll come back to you within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition-colors shadow-lg shadow-emerald-500/20"
                >
                  <MessageCircle size={20} />
                  WhatsApp me
                </a>
                <a
                  href={EMAIL_HREF}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-card border border-border hover:border-emerald-500/40 hover:bg-emerald-500/5 font-semibold transition-all"
                >
                  <Mail size={20} />
                  Send an email
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </PageTransition>
  );
}
