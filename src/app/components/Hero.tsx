"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HeroInkShaderScene } from "./HeroInkShaderScene";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100svh-11rem)] md:min-h-[calc(100vh-4rem)] w-full flex flex-col items-center justify-center pt-6 sm:pt-10 md:pt-0 pb-20 overflow-hidden bg-background">
      {/* Ink shader background */}
      <HeroInkShaderScene />

      {/* Atmospheric vignette */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 86% 66% at 34% 50%, rgba(212, 199, 179, 0.08) 0%, rgba(212, 199, 179, 0.03) 52%, transparent 78%)",
        }}
      />

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left px-6 sm:px-8 md:px-4 max-w-5xl mx-auto w-full">
        {/* Film-slate metadata strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.1 }}
          className="flex items-center gap-3 mb-8 text-[0.6rem] font-medium tracking-[0.3em] uppercase text-muted-foreground/70"
        >
          <span>Yorkshire, UK</span>
          <span aria-hidden="true" className="w-1 h-1 rounded-full bg-accent/60" />
          <span>Est. 2020</span>
          <span aria-hidden="true" className="w-1 h-1 rounded-full bg-accent/60" />
          <span className="text-accent/90">Accepting Commissions</span>
        </motion.div>

        <h1 className="text-cine text-[clamp(2.75rem,8.5vw,7rem)] text-foreground mb-4">
          <motion.span
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: EASE }}
            className="block"
          >
            Commercial Video.
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45, ease: EASE }}
            className="flex items-baseline gap-3 md:gap-5 mt-1 justify-center md:justify-start"
          >
            <motion.span
              aria-hidden="true"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, delay: 0.7, ease: EASE }}
              className="w-4 md:w-16 h-px bg-gradient-to-r from-accent/70 to-foreground/10 self-center flex-shrink-0 origin-left"
            />
            <em className="text-foreground/85 font-normal">Built Around Results.</em>
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65, ease: EASE }}
          className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-xl mb-12 leading-relaxed text-left md:text-left"
        >
          Brand films, Meta ads, and content that has a job to do.
          <br />
          Based in Yorkshire, working across the UK.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85, ease: EASE }}
          className="flex flex-col sm:flex-row gap-5 items-center md:items-start"
        >
          <Link
            href="/create"
            className="group relative inline-flex items-center gap-3 px-9 py-3.5 rounded-sm border border-accent/40 text-foreground text-xs font-medium tracking-[0.2em] uppercase overflow-hidden transition-colors duration-500 hover:border-accent"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"
            />
            <span className="relative z-10 group-hover:text-accent-foreground transition-colors duration-500">
              See My Work
            </span>
            <span
              aria-hidden="true"
              className="relative z-10 text-accent/70 group-hover:text-accent-foreground transition-colors duration-500"
            >
              →
            </span>
          </Link>
          <Link
            href="/contact#calendly"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 decoration-accent/40 hover:decoration-accent"
          >
            Book a Free Call
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-5 md:bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-sans text-[0.6rem] font-medium tracking-[0.3em] uppercase text-foreground/30">
            Scroll
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-accent/50 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
