"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import TiltCard from "./TiltCard";

const EASE = [0.22, 1, 0.36, 1] as const;

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 44 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};

// Spotlight wrapper — neutral white shimmer, no brand colour bleed
function SpotlightWrapper({
  as: Tag,
  href,
  className,
  children,
  external,
}: {
  as: "link" | "anchor";
  href: string;
  className: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (overlayRef.current) {
      overlayRef.current.style.opacity = "1";
      overlayRef.current.style.background = `radial-gradient(320px circle at ${x}px ${y}px, rgba(255,255,255,0.04), transparent 70%)`;
    }
  };

  const handleMouseLeave = () => {
    if (overlayRef.current) {
      overlayRef.current.style.opacity = "0";
    }
  };

  const overlay = (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-700"
      style={{ opacity: 0 }}
    />
  );

  if (Tag === "anchor") {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={className}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {overlay}
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {overlay}
      {children}
    </Link>
  );
}

export default function BentoGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 pt-10 pb-16 md:py-20">
      <div className="mb-12 flex items-end justify-between">
        <div className="w-full text-center md:text-left">
          <p className="eyebrow mb-3">Selected Work</p>
          <h2 className="text-cine text-4xl md:text-5xl text-foreground">
            At a Glance
          </h2>
        </div>
        <span className="text-xs text-muted-foreground hidden md:block pb-1 flex-shrink-0">Yorkshire, UK</span>
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={gridVariants}
        className="grid grid-cols-1 md:grid-cols-3 md:auto-rows-[270px] gap-3"
      >

        {/* Creative Portfolio — dominant cinematic panel */}
        <motion.div variants={cardVariants} className="col-span-1 md:col-span-2 md:row-span-2 min-h-[320px] md:min-h-0">
        <TiltCard maxTilt={3}>
        <Link
          href="/create"
          className="group relative block h-full w-full overflow-hidden rounded-sm min-h-[320px] md:min-h-0"
        >
          {/* Full-bleed cinematic backdrop */}
          <div className="absolute inset-0 bg-[url('/images/bokeh-lights-dark-background.jpg')] bg-cover bg-center grayscale brightness-[0.45] group-hover:brightness-[0.55] group-hover:scale-[1.03] transition-all duration-700 ease-out" />
          {/* Bottom-weighted gradient so text is legible */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

          {/* Oversized ghost numeral — signature anchor */}
          <span
            aria-hidden="true"
            className="absolute top-4 right-6 z-10 font-display italic font-light text-white/[0.12] text-7xl md:text-8xl leading-none select-none group-hover:text-white/[0.18] transition-colors duration-700"
          >
            I
          </span>

          <div className="relative z-10 flex flex-col justify-end h-full p-8 md:p-10">
            <h3 className="font-display font-light text-3xl md:text-[2.75rem] text-white mb-3 leading-tight">
              Creative Portfolio
            </h3>
            <p className="text-white/55 max-w-sm text-sm leading-relaxed mb-7">
              Brand films, Meta ads, event coverage and commercial photography.
            </p>
            <div className="flex items-center gap-3 text-white/45 group-hover:text-accent transition-colors duration-500">
              <span className="w-6 h-px bg-current group-hover:w-10 transition-all duration-500" />
              <span className="text-[0.65rem] tracking-[0.25em] uppercase">View the work</span>
            </div>
          </div>
        </Link>
        </TiltCard>
        </motion.div>

        {/* About */}
        <motion.div variants={cardVariants} className="col-span-1 min-h-[200px] md:min-h-0">
        <TiltCard maxTilt={6}>
        <SpotlightWrapper
          as="link"
          href="/about"
          className="group relative block h-full w-full overflow-hidden rounded-sm bg-card border border-border p-8 min-h-[200px] md:min-h-0 transition-all duration-300 hover:border-foreground/20"
        >
          <span
            aria-hidden="true"
            className="absolute top-2 right-5 z-0 font-display italic font-light text-foreground/[0.07] text-6xl leading-none select-none group-hover:text-foreground/[0.12] transition-colors duration-700"
          >
            II
          </span>
          <div className="relative z-10 flex flex-col justify-between h-full">
            <span aria-hidden="true" className="w-8 h-px bg-accent/40" />
            <div>
              <h3 className="font-display font-light text-2xl text-foreground mb-2">About</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">How I got here and what I&apos;m working on.</p>
            </div>
            <span className="text-foreground/25 group-hover:text-accent text-[0.65rem] tracking-[0.2em] uppercase transition-colors duration-300">
              Read →
            </span>
          </div>
        </SpotlightWrapper>
        </TiltCard>
        </motion.div>

        {/* Contact */}
        <motion.div variants={cardVariants} className="col-span-1 min-h-[200px] md:min-h-0">
        <TiltCard maxTilt={6}>
        <SpotlightWrapper
          as="link"
          href="/contact#calendly"
          className="group relative block h-full w-full overflow-hidden rounded-sm bg-card border border-border p-8 min-h-[200px] md:min-h-0 transition-all duration-300 hover:border-foreground/20"
        >
          <span
            aria-hidden="true"
            className="absolute top-2 right-5 z-0 font-display italic font-light text-foreground/[0.07] text-6xl leading-none select-none group-hover:text-foreground/[0.12] transition-colors duration-700"
          >
            III
          </span>
          <div className="relative z-10 flex flex-col justify-between h-full">
            <span aria-hidden="true" className="w-8 h-px bg-accent/40" />
            <div>
              <h3 className="font-display font-light text-2xl text-foreground mb-2">Get in Touch</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Book a free call and let&apos;s talk through what you need.</p>
            </div>
            <span className="text-foreground/25 group-hover:text-accent text-[0.65rem] tracking-[0.2em] uppercase transition-colors duration-300">
              Book your free call →
            </span>
          </div>
        </SpotlightWrapper>
        </TiltCard>
        </motion.div>

        {/* Services — full-width editorial strip */}
        <motion.div variants={cardVariants} className="col-span-1 md:col-span-3">
        <SpotlightWrapper
          as="link"
          href="/services"
          className="group relative block h-full w-full overflow-hidden rounded-sm bg-card border border-border px-8 py-7 transition-all duration-300 hover:border-foreground/20"
        >
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-5 h-full">
            <div className="flex items-center gap-5">
              <span aria-hidden="true" className="font-display italic font-light text-foreground/[0.15] text-4xl leading-none select-none">IV</span>
              <h3 className="font-display font-light text-2xl text-foreground">Services</h3>
            </div>
            <div className="grid grid-cols-2 md:flex md:flex-wrap gap-x-8 gap-y-2 flex-1 md:justify-center">
              {["Videography", "Photography", "Event Coverage", "Post-Production"].map((service) => (
                <span
                  key={service}
                  className="text-[0.65rem] text-muted-foreground/60 tracking-[0.15em] uppercase group-hover:text-muted-foreground transition-colors duration-400"
                >
                  {service}
                </span>
              ))}
            </div>
            <span className="text-foreground/25 group-hover:text-accent text-[0.65rem] tracking-[0.2em] uppercase transition-colors duration-300 md:flex-shrink-0">
              View Services →
            </span>
          </div>
        </SpotlightWrapper>
        </motion.div>

      </motion.div>

      {/* Discreet social link — moved out of grid */}
      <div aria-hidden="true" className="hairline mt-10" />
      <div className="mt-5 flex justify-end">
        <a
          href="https://www.instagram.com/nas.create/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[0.6rem] text-muted-foreground/40 hover:text-muted-foreground/70 tracking-[0.3em] uppercase transition-colors duration-300"
        >
          @nas.create
        </a>
      </div>
    </section>
  );
}
