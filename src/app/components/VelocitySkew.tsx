"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

interface VelocitySkewProps {
  children: React.ReactNode;
  className?: string;
  /** Maximum skew in degrees */
  maxSkew?: number;
}

/**
 * Skews its children against scroll velocity — the content leans into
 * fast scrolls and settles when you stop, like film dragged through a gate.
 */
export default function VelocitySkew({ children, className = "", maxSkew = 2.25 }: VelocitySkewProps) {
  const prefersReduced = useReducedMotion();
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { stiffness: 280, damping: 45, mass: 0.6 });
  const skewY = useTransform(smooth, [-1400, 1400], [maxSkew, -maxSkew], { clamp: true });

  if (prefersReduced) return <div className={className}>{children}</div>;

  return (
    <motion.div style={{ skewY }} className={`will-change-transform ${className}`}>
      {children}
    </motion.div>
  );
}
