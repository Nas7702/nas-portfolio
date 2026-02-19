"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useState, useRef, Suspense, useMemo } from "react";
import * as random from "maath/random/dist/maath-random.esm";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
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

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="flex flex-col items-center mb-6"
        >
          <Image
            src="/logos/darkmode-inline.png"
            alt="Nas.Create"
            width={320}
            height={80}
            className="object-contain mb-6 hidden dark:block"
            priority
          />
          <Image
            src="/logos/lightmode-inline.png"
            alt="Nas.Create"
            width={320}
            height={80}
            className="object-contain mb-6 block dark:hidden"
            priority
          />
          <h1 className="font-display font-light text-4xl md:text-6xl tracking-tight text-foreground mb-3">
            Commercial Video.<br />
            <em>Built Around Results.</em>
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
          Brand films, Meta ads, and content that has a job to do.
          Based in Yorkshire, working across the UK.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <Link
            href="/create"
            className="px-8 py-3 rounded-sm bg-accent text-accent-foreground font-medium hover:opacity-90 transition-opacity"
          >
            See My Work
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
        <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-foreground/50 to-transparent" />
      </motion.div>
    </section>
  );
}
