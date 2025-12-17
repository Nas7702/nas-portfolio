"use client";

import { motion } from "framer-motion";
import { useRef, ReactNode } from "react";
import ScrollReveal from "../components/ScrollReveal";
import PageTransition from "../components/PageTransition";
import { GraduationCap, Dumbbell, Sparkles, Camera, LucideIcon } from "lucide-react";

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const timelineEvents: TimelineEvent[] = [
    {
      year: "2020 to Present",
      title: "Freelance Videography & Media",
      category: "Creative",
      description: (
        <>
          <span className="block leading-relaxed text-neutral-200">
            Freelance <span className="font-semibold">videography</span> and media since 2020, filming <span className="font-semibold">brand content</span>, <span className="font-semibold">sports coverage</span>, and promotional pieces for local businesses.
          </span>
          <span className="block mt-3 leading-relaxed text-neutral-200">
            Focused on <span className="font-semibold">cinematic storytelling</span>, client relationships, and repeat work to scale.
          </span>
        </>
      ),
      Icon: Camera,
    },
    {
      year: "Sep 2022 to Jun 2025",
      title: "Computer Science (Software Engineering)",
      category: "Technical",
      description: (
        <>
          <span className="block leading-relaxed text-neutral-200">
            Studied at the University of Sheffield.{" "}
            <span className="font-semibold">Dissertation (Barbell AI)</span>:{" "}
            <span className="font-semibold">real-time bar speed</span> from lift video for objective calls, feeding future work with{" "}
            <a
              href="https://stancefitness.co/"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 decoration-white/30 hover:decoration-white/60"
            >
              Stance Fitness
            </a>
            .
          </span>
          <span className="block mt-3 leading-relaxed text-neutral-200">
            Built <span className="font-semibold">full-stack projects</span> and <span className="font-semibold">Python</span>/<span className="font-semibold">Java</span> tools, while filming student sport events.
          </span>
        </>
      ),
      Icon: GraduationCap,
    },
    {
      year: "Feb 2025 to Present",
      title: "Stance Fitness",
      category: "Technical",
      description: (
        <>
          <span className="block leading-relaxed text-neutral-200">
            Pulled <span className="font-semibold">production data</span> to analyse algorithm performance, built <span className="font-semibold">evaluation tools</span> to compare versions against ground truth (e.g., linear encoder), and filmed brand content for Stance.
          </span>
          <a
            href="https://stancefitness.co/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 mt-3 text-[#e5d7ff] bg-gradient-to-r from-[#792EFE]/18 via-[#792EFE]/12 to-[#792EFE]/18 border border-[#792EFE]/40 rounded-full px-3 py-1 text-sm hover:from-[#792EFE]/22 hover:to-[#792EFE]/22 transition-colors w-fit shadow-[0_8px_30px_-12px_rgba(121,46,254,0.45)]"
          >
            Visit Stance Fitness
            <span aria-hidden className="text-[#e5d7ff]">↗</span>
          </a>
        </>
      ),
      Icon: Dumbbell,
    },
    {
      year: "Present",
      title: "Building & Creating",
      category: "Creative",
      description: (
        <span className="text-neutral-200">
          Bridging <span className="font-semibold">software development</span>, <span className="font-semibold">analytical precision</span>, and <span className="font-semibold">creative storytelling</span>. Open to new roles across tech and media.
        </span>
      ),
      Icon: Sparkles,
    },
  ];

  return (
    <PageTransition>
      <div ref={containerRef} className="min-h-screen bg-background pb-32 pt-24">
        {/* Hero */}
        <ScrollReveal className="max-w-4xl mx-auto px-6 mb-24 text-center" direction="up" delay={0} threshold={0.15}>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">
            About Me
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            I combine software, data, and media to ship products and clear stories.
          </p>
        </ScrollReveal>

        {/* Scrollytelling Timeline */}
        <div className="max-w-5xl mx-auto px-6 relative">
          {/* Vertical Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-blue-400 to-blue-600 opacity-20 md:-translate-x-1/2" />

          <div className="space-y-24">
            {timelineEvents.map((event, index) => (
              <ScrollReveal key={index} direction="up" delay={0.05 * index} threshold={0.2}>
                <TimelineItem event={event} index={index} />
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Principles Grid */}
        <div className="max-w-6xl mx-auto px-6 mt-32">
          <ScrollReveal direction="up" delay={0} threshold={0.15}>
            <h2 className="text-3xl font-bold text-center mb-16">Core Principles</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal direction="up" delay={0.05}>
              <PrincipleCard
                title="Clarity over Noise"
                description="Whether it's a dataset or a video edit, I strip away the non-essential to let the core message shine."
                delay={0}
              />
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.12}>
              <PrincipleCard
                title="Speed with Taste"
                description="Rapid iteration doesn't mean cutting corners. I build fast, but I build with craftsmanship."
                delay={0}
              />
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.18}>
              <PrincipleCard
                title="Athlete's Mindset"
                description="Consistency, discipline, and continuous improvement. The work is never done; it just gets better."
                delay={0}
              />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

interface TimelineEvent {
  year: string;
  title: string;
  category: "Technical" | "Creative";
  description: ReactNode;
  Icon: LucideIcon;
}

function TimelineItem({ event, index }: { event: TimelineEvent; index: number }) {
  const isEven = index % 2 === 0;
  const Icon = event.Icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex flex-col md:flex-row items-center gap-8 ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Icon Point */}
      <div className="absolute left-6 md:left-1/2 w-12 h-12 -translate-x-1/2 bg-background border-2 border-primary rounded-full flex items-center justify-center z-10 shadow-lg shadow-primary/20 text-primary">
        <Icon size={20} />
      </div>

      {/* Content Card */}
      <div className={`w-full md:w-1/2 pl-20 md:pl-0 ${isEven ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"}`}>
        <div className="bg-card border border-border p-6 rounded-2xl hover:border-primary/50 transition-colors group relative overflow-hidden shadow-lg shadow-primary/5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-mono text-primary">{event.year}</span>
            <span
              className={`text-[11px] px-2 py-1 rounded-full border ${
                event.category === "Technical"
                  ? "bg-blue-500/10 border-blue-400/40 text-blue-200"
                  : "bg-accent/10 border-accent/40 text-accent"
              }`}
            >
              {event.category}
            </span>
          </div>
          <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{event.title}</h3>
          <p className="text-muted-foreground relative z-10">{event.description}</p>
        </div>
      </div>

      {/* Empty half for layout balance */}
      <div className="hidden md:block w-1/2" />
    </motion.div>
  );
}

function PrincipleCard({ title, description, delay }: { title: string; description: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="bg-card border border-border p-8 rounded-2xl text-center hover:bg-accent/5 transition-colors hover:scale-105 duration-300"
    >
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
}
