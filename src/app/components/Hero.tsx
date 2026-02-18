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

  const particleColor = theme === "dark" ? "#39ff88" : "#16a34a";

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
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center mb-6"
        >
          <Image
            src="/logos/darkmode-inline.png"
            alt="Nas.Create"
            width={320}
            height={80}
            className="object-contain drop-shadow-[0_0_20px_rgba(57,255,136,0.25)] mb-4"
            priority
          />
          <span className="block text-2xl md:text-3xl font-normal text-muted-foreground">
            Commercial Video. Built Around Results.
          </span>
          <span className="relative mt-3 inline-flex items-center gap-2 text-lg md:text-xl text-foreground/80 hover:text-foreground transition-colors cursor-default group">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
            Available for projects
            <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent group-hover:via-emerald-400 transition-all duration-300" />
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10"
        >
          Brand films, Meta ads, and content that has a job to do.
          Based in Yorkshire, working across the UK.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/create"
            className="px-8 py-3 rounded-full bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50"
          >
            See My Work
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3 rounded-full border border-foreground/20 text-foreground font-medium hover:bg-foreground/5 transition-colors"
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
