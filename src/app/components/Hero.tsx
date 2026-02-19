"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useState, useRef, Suspense, useMemo } from "react";
import * as random from "maath/random/dist/maath-random.esm";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import * as THREE from "three";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";
import { getRecommendedParticleCount } from "@/lib/performance";
import { useTheme } from "./ThemeProvider";

interface ParticleCloudProps {
  particleCount?: number;
  color?: string;
}

function ParticleCloud({ particleCount = 3500, color = "#3b82f6" }: ParticleCloudProps) {
  const ref = useRef<THREE.Points>(null);
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(particleCount), { radius: 1.5 }) as Float32Array
  );

  const prefersReduced = useReducedMotion();

  useFrame((state, delta) => {
    if (ref.current && !prefersReduced) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={color}
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

function Scene() {
  const performanceMode = usePerformanceMode();
  const prefersReduced = useReducedMotion();
  const { theme } = useTheme();

  const particleCount = useMemo(() => {
    if (prefersReduced || performanceMode === 'minimal') return 0;

    const tier: 'low' | 'medium' | 'high' =
      (performanceMode === 'low' || performanceMode === 'medium' || performanceMode === 'high')
        ? performanceMode
        : 'low';
    return getRecommendedParticleCount(tier);
  }, [performanceMode, prefersReduced]);

  const particleColor = theme === "dark" ? "#00C896" : "#00875A";

  if (prefersReduced || particleCount === 0) {
    return null;
  }

  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <ParticleCloud particleCount={particleCount} color={particleColor} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] w-full flex flex-col items-center justify-start md:justify-center pt-6 sm:pt-10 md:pt-0 pb-20 overflow-hidden bg-background">
      {/* 3D Background */}
      <Scene />

      {/* Atmospheric accent light */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 35% 45%, rgba(0, 200, 150, 0.04) 0%, transparent 70%)'
        }}
      />

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left px-4 max-w-4xl mx-auto">
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
            className="mb-6 hidden dark:block"
            priority
          />
          <Image
            src="/logos/lightmode-inline.png"
            alt="Nas.Create"
            width={320}
            height={57}
            className="mb-6 block dark:hidden"
          />
          <h1 className="font-display font-light text-5xl md:text-7xl tracking-[-0.03em] leading-[1.05] text-foreground mb-3">
            Commercial Video.
            <span className="flex items-baseline gap-3 mt-1 justify-center md:justify-start">
              <span aria-hidden="true" className="w-8 md:w-12 h-px bg-foreground/20 mb-2 flex-shrink-0" />
              <em className="text-foreground/85">Built Around Results.</em>
            </span>
          </h1>
          <span className="relative mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-default group">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse flex-shrink-0" />
            Available for projects
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="text-base md:text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed"
        >
          Brand films, Meta ads, and content that has a job to do. <br />
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
            className="group relative inline-flex items-center gap-2 px-8 py-3 rounded-sm bg-accent text-accent-foreground font-medium hover:opacity-90 transition-all overflow-hidden"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
            />
            See My Work
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
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
