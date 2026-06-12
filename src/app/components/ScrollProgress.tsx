"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Champagne hairline along the top of the viewport tracking scroll depth. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 inset-x-0 h-[2px] z-[110] origin-left pointer-events-none bg-gradient-to-r from-accent/30 via-accent/80 to-accent"
    />
  );
}
