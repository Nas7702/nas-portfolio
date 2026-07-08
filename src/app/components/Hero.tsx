"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { HeroInkShaderScene } from "./HeroInkShaderScene";
import Magnetic from "./Magnetic";

const EASE = [0.22, 1, 0.36, 1] as const;
const BAR_EASE = [0.76, 0, 0.24, 1] as const;
const INTRO_KEY = "nas-intro-seen";
const WORDMARK = "Nas Create";

/**
 * Once-per-session cinematic title card: the wordmark blurs in over
 * black, a champagne hairline draws beneath it, then the screen splits
 * open like letterbox bars lifting. Click anywhere to skip.
 */
function CinematicIntro({ onReveal, onDone }: { onReveal: () => void; onDone: () => void }) {
  const [exiting, setExiting] = useState(false);
  const revealedRef = useRef(false);

  const startExit = useCallback(() => {
    if (revealedRef.current) return;
    revealedRef.current = true;
    setExiting(true);
    onReveal();
  }, [onReveal]);

  useEffect(() => {
    if (!exiting) {
      const t = window.setTimeout(startExit, 2000);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(onDone, 1000);
    return () => window.clearTimeout(t);
  }, [exiting, startExit, onDone]);

  return (
    <div
      role="presentation"
      onClick={startExit}
      className="fixed inset-0 z-[130] flex items-center justify-center"
    >
      {/* Letterbox halves */}
      <motion.div
        initial={false}
        animate={{ scaleY: exiting ? 0 : 1 }}
        transition={{ duration: 0.9, ease: BAR_EASE }}
        className="absolute inset-x-0 top-0 h-1/2 origin-top bg-background"
      />
      <motion.div
        initial={false}
        animate={{ scaleY: exiting ? 0 : 1 }}
        transition={{ duration: 0.9, ease: BAR_EASE }}
        className="absolute inset-x-0 bottom-0 h-1/2 origin-bottom bg-background"
      />

      {/* Title card */}
      <motion.div
        animate={exiting ? { opacity: 0, y: -30, filter: "blur(8px)" } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: EASE }}
        className="relative flex flex-col items-center gap-5 px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="eyebrow text-accent"
        >
          Est. 2020 &middot; Yorkshire
        </motion.p>

        <div className="text-cine text-[clamp(3rem,11vw,8rem)] text-foreground flex" aria-label={WORDMARK}>
          {WORDMARK.split("").map((ch, i) => (
            <motion.span
              key={`${ch}-${i}`}
              aria-hidden="true"
              initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.25 + i * 0.05, ease: EASE }}
            >
              {ch === " " ? " " : ch}
            </motion.span>
          ))}
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.1, delay: 0.7, ease: EASE }}
          className="h-px w-44 md:w-72 bg-gradient-to-r from-transparent via-accent/80 to-transparent"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-[0.6rem] font-medium tracking-[0.35em] uppercase text-muted-foreground/80"
        >
          Commercial Video &amp; Photography
        </motion.p>
      </motion.div>
    </div>
  );
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

const charVariants = {
  hidden: { y: "120%", rotate: 7 },
  show: (i: number) => ({
    y: "0%",
    rotate: 0,
    transition: { duration: 0.85, ease: EASE, delay: i * 0.03 },
  }),
};

/** Per-character mask reveal — letters rise out of an overflow clip. */
function MaskedLine({ text, offset = 0, className = "" }: { text: string; offset?: number; className?: string }) {
  // Characters are grouped per word so lines never break mid-word.
  let charIndex = offset;
  return (
    <span className={`block overflow-hidden pb-[0.08em] -mb-[0.08em] ${className}`}>
      {text.split(" ").map((word, wi, words) => (
        <span key={`${word}-${wi}`} className="inline-block whitespace-nowrap">
          {word.split("").map((ch, ci) => {
            const i = charIndex++;
            return (
              <motion.span
                key={`${ch}-${ci}`}
                custom={i}
                variants={charVariants}
                className="inline-block will-change-transform origin-bottom-left"
              >
                {ch}
              </motion.span>
            );
          })}
          {wi < words.length - 1 ? <span className="inline-block">&nbsp;</span> : null}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Decide once on the client whether the intro should play this session
  const [wantsIntro] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try {
      return !window.sessionStorage.getItem(INTRO_KEY);
    } catch {
      return false;
    }
  });
  const [revealed, setRevealed] = useState(false);
  const [introDone, setIntroDone] = useState(false);

  const showIntro = wantsIntro && !prefersReduced && !introDone;
  const heroReady = !showIntro || revealed;

  useEffect(() => {
    if (!wantsIntro || prefersReduced) return;
    try {
      window.sessionStorage.setItem(INTRO_KEY, "1");
    } catch {
      /* private browsing — intro simply replays */
    }
  }, [wantsIntro, prefersReduced]);

  // Scroll-out parallax: content drifts up and fades as the hero scrolls away
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const backdropScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[calc(100svh-11rem)] md:min-h-[calc(100vh-4rem)] w-full flex flex-col items-center justify-center pt-6 sm:pt-10 md:pt-0 pb-20 overflow-hidden bg-background"
    >
      {showIntro && (
        <CinematicIntro onReveal={() => setRevealed(true)} onDone={() => setIntroDone(true)} />
      )}

      {/* Ink shader background with slow scroll zoom */}
      <motion.div
        aria-hidden="true"
        style={prefersReduced ? undefined : { scale: backdropScale }}
        className="absolute inset-0 will-change-transform"
      >
        <HeroInkShaderScene />
      </motion.div>

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
      <motion.div
        initial="hidden"
        animate={heroReady ? "show" : "hidden"}
        variants={containerVariants}
        style={prefersReduced ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left px-6 sm:px-8 md:px-4 max-w-5xl mx-auto w-full"
      >
        {/* Film-slate metadata strip — items wrap as whole units on narrow screens */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-1.5 mb-8 text-[0.6rem] font-medium tracking-[0.3em] uppercase text-muted-foreground/70"
        >
          <span className="whitespace-nowrap">Yorkshire, UK</span>
          <span aria-hidden="true" className="w-1 h-1 rounded-full bg-accent/60" />
          <span className="whitespace-nowrap">Est. 2020</span>
          <span aria-hidden="true" className="w-1 h-1 rounded-full bg-accent/60" />
          <span className="whitespace-nowrap text-accent/90">Available for Projects</span>
        </motion.div>

        <h1
          className="text-cine text-[clamp(2.75rem,8.5vw,7rem)] text-foreground mb-4"
          aria-label="Commercial Video. Built Around Results."
        >
          <span aria-hidden="true">
            <MaskedLine text="Commercial Video." />
          </span>
          <span
            aria-hidden="true"
            className="flex items-baseline gap-3 md:gap-5 mt-1 justify-center md:justify-start"
          >
            <motion.span
              variants={{
                hidden: { scaleX: 0 },
                show: { scaleX: 1, transition: { duration: 1.1, ease: EASE, delay: 0.6 } },
              }}
              className="w-4 md:w-16 h-px bg-gradient-to-r from-accent/70 to-foreground/10 self-center flex-shrink-0 origin-left"
            />
            <em className="text-foreground/85 font-normal">
              <MaskedLine text="Built Around Results." offset={14} />
            </em>
          </span>
        </h1>

        <motion.p
          variants={itemVariants}
          className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-xl mb-12 leading-relaxed text-left md:text-left"
        >
          Brand films, Meta ads, and content that has a job to do.
          <br />
          Based in Yorkshire, working across the UK.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-5 items-center md:items-start"
        >
          <Magnetic strength={0.3}>
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
          </Magnetic>
          <Link
            href="/contact#calendly"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 decoration-accent/40 hover:decoration-accent"
          >
            Book a Free Call
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: heroReady ? 1 : 0 }}
        transition={{ delay: 1.2, duration: 1 }}
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
