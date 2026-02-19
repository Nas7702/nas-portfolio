"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { HeroInkShaderScene } from "./HeroInkShaderScene";

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] w-full flex flex-col items-center justify-center pt-6 sm:pt-10 md:pt-0 pb-20 overflow-hidden bg-background">
      {/* Ink shader background */}
      <HeroInkShaderScene />

      {/* Atmospheric vignette */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 86% 66% at 34% 50%, rgba(232, 228, 218, 0.012) 0%, transparent 74%)'
        }}
      />

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left px-6 sm:px-8 md:px-4 max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="flex flex-col items-center md:items-start mb-6"
        >
          {/* Dark logo: priority because it is visible on first load (site defaults to dark).
              Light logo: no priority — hidden until the user switches theme, so no need to preload it. */}
          <Image
            src="/logos/darkmode-inline.png"
            alt="Nas.Create"
            width={320}
            height={57}
            className="mb-5 hidden dark:block w-[200px] sm:w-[260px] md:w-[320px] h-auto"
            priority
          />
          <Image
            src="/logos/lightmode-inline.png"
            alt="Nas.Create"
            width={320}
            height={57}
            className="mb-5 block dark:hidden w-[200px] sm:w-[260px] md:w-[320px] h-auto"
          />
          <h1 className="font-display font-light text-[2.5rem] sm:text-5xl md:text-7xl tracking-[-0.03em] leading-[1.05] text-foreground mb-3">
            Commercial Video.
            <span className="flex items-baseline gap-2 md:gap-3 mt-1 justify-center md:justify-start">
              <span aria-hidden="true" className="w-3 md:w-12 h-px bg-foreground/20 self-center flex-shrink-0" />
              <em className="text-foreground/85">Built Around Results.</em>
            </span>
          </h1>
          <span className="mt-3 text-[0.65rem] font-medium tracking-[0.25em] uppercase text-muted-foreground/60">
            Currently accepting commissions
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed text-left md:text-left"
        >
          Brand films, Meta ads, and content that has a job to do.<br />
          Based in Yorkshire, working across the UK.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 items-center md:items-start"
        >
          <Link
            href="/create"
            className="group inline-flex items-center gap-3 px-8 py-3 rounded-sm border border-foreground/25 text-foreground text-xs font-medium tracking-[0.2em] uppercase hover:bg-foreground hover:text-background transition-all duration-500"
          >
            See My Work
            <span aria-hidden="true" className="text-foreground/40 group-hover:text-background/60 transition-colors duration-500">→</span>
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 decoration-muted-foreground/30 hover:decoration-foreground/50"
          >
            Work With Me
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-sans text-[0.6rem] font-medium tracking-[0.3em] uppercase text-foreground/30">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-foreground/30 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
