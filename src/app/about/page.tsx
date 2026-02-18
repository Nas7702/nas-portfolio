"use client";

import { motion } from "framer-motion";
import { useRef, ReactNode } from "react";
import ScrollReveal from "../components/ScrollReveal";
import PageTransition from "../components/PageTransition";
import { Camera, Clapperboard, Sparkles, Trophy, LucideIcon } from "lucide-react";

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const timelineEvents: TimelineEvent[] = [
    {
      year: "2020",
      title: "Picking Up the Camera",
      category: "Creative",
      description: (
        <>
          <span className="block leading-relaxed text-foreground/90">
            Started filming and editing as a passion project — sports events, local businesses, anything that told a story worth telling.
          </span>
          <span className="block mt-3 leading-relaxed text-foreground/90">
            That curiosity quickly turned into <span className="font-semibold">paid work</span>, and a brand was born.
          </span>
        </>
      ),
      Icon: Camera,
    },
    {
      year: "2022 – 2025",
      title: "Sharpening the Craft",
      category: "Creative",
      description: (
        <>
          <span className="block leading-relaxed text-foreground/90">
            Studied at the University of Sheffield — a background in <span className="font-semibold">software engineering</span> that sharpened how I think about systems, storytelling structure, and delivering results under pressure.
          </span>
          <span className="block mt-3 leading-relaxed text-foreground/90">
            All while filming <span className="font-semibold">student sport events</span>, building a client base, and developing a cinematic eye.
          </span>
        </>
      ),
      Icon: Clapperboard,
    },
    {
      year: "2024 – 2025",
      title: "Event Coverage & Brand Films",
      category: "Creative",
      description: (
        <>
          <span className="block leading-relaxed text-foreground/90">
            Covered <span className="font-semibold">Sheffield Varsity</span> across multiple sports — basketball, powerlifting, and more. Produced brand films for fitness clients, automotive brands, and coaching businesses.
          </span>
          <span className="block mt-3 leading-relaxed text-foreground/90">
            Building a reputation for <span className="font-semibold">cinematic quality</span> and fast turnaround.
          </span>
        </>
      ),
      Icon: Trophy,
    },
    {
      year: "Now",
      title: "Growing Nas.Create",
      category: "Creative",
      description: (
        <span className="text-foreground/90">
          Expanding into <span className="font-semibold">larger event coverage</span>, brand partnerships, and building a media business that clients come back to. If you have a story worth telling — let&apos;s tell it.
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
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400">
            About Me
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            I tell stories through a lens. From sport events to brand films — I capture moments that matter.
          </p>
        </ScrollReveal>

        {/* Scrollytelling Timeline */}
        <div className="max-w-5xl mx-auto px-6 relative">
          {/* Vertical Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-green-400 to-teal-500 opacity-20 md:-translate-x-1/2" />

          <div className="space-y-24">
            {timelineEvents.map((event, index) => (
              <ScrollReveal key={index} direction="up" delay={0.05 * index} threshold={0.2}>
                <TimelineItem event={event} />
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Principles Grid */}
        <div className="max-w-6xl mx-auto px-6 mt-32">
          <ScrollReveal direction="up" delay={0} threshold={0.15}>
            <h2 className="text-3xl font-bold text-center mb-16">How I Work</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal direction="up" delay={0.05}>
              <PrincipleCard
                title="Story First"
                description="Every frame serves the narrative. I don't just film — I find the angle that makes people feel something."
                delay={0}
              />
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.12}>
              <PrincipleCard
                title="Craft Over Speed"
                description="Quality that clients come back for. I move fast but I never cut corners on the details that matter."
                delay={0}
              />
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.18}>
              <PrincipleCard
                title="Athlete's Eye"
                description="I understand sport from the inside. That instinct for the decisive moment is what separates good coverage from great coverage."
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
  category: "Creative";
  description: ReactNode;
  Icon: LucideIcon;
}

function TimelineItem({ event }: { event: TimelineEvent }) {
  const Icon = event.Icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col md:flex-row items-center gap-8"
    >
      {/* Icon Point */}
      <div className="absolute left-6 md:left-1/2 w-12 h-12 -translate-x-1/2 bg-background border-2 border-emerald-500 rounded-full flex items-center justify-center z-10 shadow-lg shadow-emerald-500/20 text-emerald-400">
        <Icon size={20} />
      </div>

      {/* Content Card */}
      <div className="w-full md:w-1/2 pl-20 md:pl-0 md:pr-16 md:text-right">
        <div className="bg-card border border-border p-6 rounded-2xl hover:border-emerald-500/50 transition-colors group relative overflow-hidden shadow-lg shadow-emerald-500/5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-mono text-emerald-400">{event.year}</span>
          </div>
          <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">{event.title}</h3>
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
      className="bg-card border border-border p-8 rounded-2xl text-center hover:bg-emerald-500/5 hover:border-emerald-500/30 transition-colors hover:scale-105 duration-300"
    >
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
}
