"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode, useState, useEffect } from "react";
import { debounce } from "@/lib/performance";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    // Debounced so rapid window resizing doesn't flood setState calls
    const debouncedCheck = debounce(check, 150);
    window.addEventListener("resize", debouncedCheck, { passive: true });
    return () => window.removeEventListener("resize", debouncedCheck);
  }, [breakpoint]);

  return isMobile;
}

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  threshold = 0.08,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const revealMargin = isMobile ? "0px 0px 120px 0px" : "0px 0px 220px 0px";
  const revealAmount = isMobile ? Math.min(threshold, 0.03) : Math.min(threshold, 0.08);

  const isInView = useInView(ref, {
    once: true,
    margin: revealMargin,
    amount: revealAmount,
  });

  const offset = isMobile ? 20 : 60;

  const directionOffset = {
    up: { y: offset, x: 0 },
    down: { y: -offset, x: 0 },
    left: { y: 0, x: offset },
    right: { y: 0, x: -offset },
  };

  const variants = {
    hidden: {
      opacity: 0,
      y: directionOffset[direction].y,
      x: directionOffset[direction].x,
      scale: isMobile ? 0.98 : 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.25, 0.25, 0.75] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
