"use client";

import { motion, useScroll } from "framer-motion";
import { useRef } from "react";
import PageTransition from "../components/PageTransition";
import { GraduationCap, Dumbbell, Briefcase, Sparkles } from "lucide-react";

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const timelineEvents = [
    {
      year: "2020",
      title: "University",
      description: "Started my journey in Data Science and Computer Science. Built my first Python tools and started filming student sports events.",
      Icon: GraduationCap,
    },
    {
      year: "2022",
      title: "Stance Fitness",
      description: "Deployed production training dashboards and filmed brand content. Learned the nuances of velocity-based training data.",
      Icon: Dumbbell,
    },
    {
      year: "2023",
      title: "Freelance",
      description: "Expanded into full-stack development and commercial videography. Delivered projects for diverse clients across sport and tech.",
      Icon: Briefcase,
    },
    {
      year: "Present",
      title: "Building & Creating",
      description: "Bridging the gap between analytical precision and creative storytelling. Open for new opportunities.",
      Icon: Sparkles,
    },
  ];

  return (
    <PageTransition>
      <div ref={containerRef} className="min-h-screen bg-background pb-32 pt-24">
        {/* Hero */}
        <div className="max-w-4xl mx-auto px-6 mb-24 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
          >
            About Me
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            I sit at the intersection of logic and creativity. I don't just analyze data; I tell stories with it. I don't just film video; I engineer narratives.
          </motion.p>
        </div>

        {/* Scrollytelling Timeline */}
        <div className="max-w-5xl mx-auto px-6 relative">
          {/* Vertical Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-20 md:-translate-x-1/2" />

          <div className="space-y-24">
            {timelineEvents.map((event, index) => (
              <TimelineItem key={index} event={event} index={index} />
            ))}
          </div>
        </div>

        {/* Principles Grid */}
        <div className="max-w-6xl mx-auto px-6 mt-32">
          <h2 className="text-3xl font-bold text-center mb-16">Core Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PrincipleCard
              title="Clarity over Noise"
              description="Whether it's a dataset or a video edit, I strip away the non-essential to let the core message shine."
              delay={0}
            />
            <PrincipleCard
              title="Speed with Taste"
              description="Rapid iteration doesn't mean cutting corners. I build fast, but I build with craftsmanship."
              delay={0.1}
            />
            <PrincipleCard
              title="Athlete's Mindset"
              description="Consistency, discipline, and continuous improvement. The work is never done; it just gets better."
              delay={0.2}
            />
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

function TimelineItem({ event, index }: { event: any; index: number }) {
  const isEven = index % 2 === 0;
  const Icon = event.Icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
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
        <div className="bg-card border border-border p-6 rounded-2xl hover:border-primary/50 transition-colors group">
          <span className="text-sm font-mono text-primary mb-2 block">{event.year}</span>
          <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{event.title}</h3>
          <p className="text-muted-foreground">{event.description}</p>
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
      viewport={{ once: true }}
      transition={{ delay }}
      className="bg-card border border-border p-8 rounded-2xl text-center hover:bg-accent/5 transition-colors hover:scale-105 duration-300"
    >
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
}
