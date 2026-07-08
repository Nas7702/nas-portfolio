"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

const PHRASES = ["Brand Films", "Meta Ads", "Event Coverage", "Commercial Photography"];
const COPIES = 4;

function wrapValue(min: number, max: number, v: number) {
  const range = max - min;
  return min + (((v - min) % range) + range) % range;
}

/**
 * Giant cinematic marquee in display type. Drifts continuously and
 * reacts to scroll velocity — scroll down and it accelerates, scroll
 * up and it reverses, like film scrubbing through a gate.
 */
export default function KineticMarquee({ baseVelocity = -1.4 }: { baseVelocity?: number }) {
  const prefersReduced = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });
  const directionRef = useRef(1);

  const x = useTransform(baseX, (v) => `${wrapValue(-100 / COPIES, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (prefersReduced) return;
    let moveBy = directionRef.current * baseVelocity * (delta / 1000);
    const vf = velocityFactor.get();
    if (vf < 0) directionRef.current = -1;
    else if (vf > 0) directionRef.current = 1;
    moveBy += directionRef.current * moveBy * Math.abs(vf);
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <section
      aria-hidden="true"
      className="relative w-full overflow-hidden py-8 md:py-12 select-none pointer-events-none"
    >
      <motion.div
        style={prefersReduced ? undefined : { x }}
        className="flex whitespace-nowrap will-change-transform"
      >
        {Array.from({ length: COPIES }).map((_, copy) => (
          <div key={copy} className="flex items-baseline shrink-0">
            {PHRASES.map((phrase, i) => (
              <span
                key={`${copy}-${phrase}`}
                className={`text-cine leading-none text-[clamp(2.75rem,8vw,6.5rem)] mr-10 md:mr-16 ${
                  i % 2 === 1 ? "text-stroke-accent italic" : "text-foreground/[0.14] dark:text-foreground/[0.08]"
                }`}
              >
                {phrase}
              </span>
            ))}
          </div>
        ))}
      </motion.div>

      {/* Edge fades so the strip dissolves into the page */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-40 bg-gradient-to-r from-background to-transparent" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-40 bg-gradient-to-l from-background to-transparent" />
    </section>
  );
}
