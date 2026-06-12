"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  /** Maximum tilt in degrees */
  maxTilt?: number;
}

/**
 * Pointer-tracked 3D tilt with a champagne specular glare that follows
 * the cursor — gives flat cards physical, filmic depth. Inert on touch
 * devices and for reduced-motion users.
 */
export default function TiltCard({ children, className = "", maxTilt = 5 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const glow = useMotionValue(0);

  const sx = useSpring(px, { stiffness: 180, damping: 22, mass: 0.5 });
  const sy = useSpring(py, { stiffness: 180, damping: 22, mass: 0.5 });
  const glowSpring = useSpring(glow, { stiffness: 160, damping: 26 });

  const rotateY = useTransform(sx, [0, 1], [-maxTilt, maxTilt]);
  const rotateX = useTransform(sy, [0, 1], [maxTilt, -maxTilt]);
  const glareX = useTransform(sx, [0, 1], ["18%", "82%"]);
  const glareY = useTransform(sy, [0, 1], ["18%", "82%"]);
  const glare = useMotionTemplate`radial-gradient(460px circle at ${glareX} ${glareY}, rgba(199, 165, 101, 0.12), transparent 65%)`;

  const handleMove = (e: React.MouseEvent) => {
    if (prefersReduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
    glow.set(1);
  };

  const handleLeave = () => {
    px.set(0.5);
    py.set(0.5);
    glow.set(0);
  };

  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave} style={{ perspective: 1000 }} className={`h-full w-full ${className}`}>
      <motion.div
        style={prefersReduced ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full w-full rounded-sm will-change-transform"
      >
        {children}
        <motion.div
          aria-hidden="true"
          style={{ background: glare, opacity: glowSpring }}
          className="absolute inset-0 z-20 pointer-events-none rounded-[inherit]"
        />
      </motion.div>
    </div>
  );
}
