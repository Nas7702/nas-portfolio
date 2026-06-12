"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

interface CineSectionTitleProps {
  eyebrow: string;
  title: string;
  sub?: string;
  /** Oversized ghost word drifting behind the heading on scroll */
  ghost: string;
  className?: string;
}

/**
 * Section header with a giant ghost word in display italic behind it,
 * drifting horizontally against scroll for cinematic depth.
 */
export default function CineSectionTitle({ eyebrow, title, sub, ghost, className = "" }: CineSectionTitleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const ghostX = useTransform(scrollYProgress, [0, 1], ["7%", "-7%"]);

  return (
    <div ref={ref} className={`relative text-center ${className}`}>
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-x-0 -top-6 md:-top-12 flex justify-center overflow-hidden"
      >
        <motion.span
          style={prefersReduced ? undefined : { x: ghostX }}
          className="whitespace-nowrap font-display italic font-light leading-none text-[clamp(4.5rem,14vw,11rem)] text-foreground/[0.05] will-change-transform"
        >
          {ghost}
        </motion.span>
      </span>
      <p className="eyebrow mb-3 text-accent relative">{eyebrow}</p>
      <h2 className="text-cine text-4xl md:text-6xl text-foreground mb-3 relative">{title}</h2>
      {sub && <p className="text-muted-foreground relative">{sub}</p>}
    </div>
  );
}
