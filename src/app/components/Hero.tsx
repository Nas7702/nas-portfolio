"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useState, useRef, Suspense } from "react";
import * as random from "maath/random/dist/maath-random.esm";
import { motion } from "framer-motion";
import Link from "next/link";
import * as THREE from "three";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ParticleCloud(props: any) {
  const ref = useRef<THREE.Points>(null);
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }) as Float32Array);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#3b82f6" // Blue color
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

function Scene() {
  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <ParticleCloud />
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
          className="mb-6"
        >
          <Link
            href="/contact"
            className="inline-block px-3 py-1 text-sm font-mono rounded-full bg-accent/10 text-accent mb-4 border border-accent/20 hover:bg-accent/15 transition-colors"
          >
            Available for new projects
          </Link>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50"
        >
          Nas
          <span className="block text-2xl md:text-3xl font-normal mt-2 text-muted-foreground">
            Developer & Creative Professional
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10"
        >
          Bridging the gap between analytical precision and creative storytelling.
          I build intelligent systems and capture cinematic moments.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/tech"
            className="px-8 py-3 rounded-full bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors"
          >
            View Technical Work
          </Link>
          <Link
            href="/create"
            className="px-8 py-3 rounded-full border border-foreground/20 hover:bg-foreground/5 transition-colors"
          >
            View Creative Work
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-foreground/50 to-transparent" />
      </motion.div>
    </section>
  );
}
