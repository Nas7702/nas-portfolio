"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";

const BAR_EASE = [0.76, 0, 0.24, 1] as const;

/**
 * Letterbox wipe played on every route change — two background bars
 * open from the centre seam like a film cut, linking pages visually.
 * Skipped on first load (the homepage has its own intro) and for
 * users who prefer reduced motion.
 */
export default function RouteReveal() {
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();
  const prevPath = useRef(pathname);
  const [playKey, setPlayKey] = useState<string | null>(null);

  useEffect(() => {
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;
    setPlayKey(`${pathname}-${Date.now()}`);
    const t = window.setTimeout(() => setPlayKey(null), 950);
    return () => window.clearTimeout(t);
  }, [pathname]);

  if (prefersReduced || !playKey) return null;

  return (
    <div key={playKey} aria-hidden="true" className="fixed inset-0 z-[120] pointer-events-none">
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.75, ease: BAR_EASE, delay: 0.05 }}
        className="absolute inset-x-0 top-0 h-1/2 origin-top bg-background"
      />
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.75, ease: BAR_EASE, delay: 0.05 }}
        className="absolute inset-x-0 bottom-0 h-1/2 origin-bottom bg-background"
      />
      {/* Champagne seam that flares as the cut opens */}
      <motion.div
        initial={{ scaleX: 0.3, opacity: 0.9 }}
        animate={{ scaleX: 1.05, opacity: 0 }}
        transition={{ duration: 0.65, ease: BAR_EASE }}
        className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-accent/80 to-transparent"
      />
      {/* Light bloom at the cut point */}
      <motion.div
        initial={{ opacity: 0.5, scale: 0.5 }}
        animate={{ opacity: 0, scale: 1.7 }}
        transition={{ duration: 0.85, ease: "easeOut" }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vmin] h-[55vmin] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(199, 165, 101, 0.22), transparent 62%)",
        }}
      />
    </div>
  );
}
