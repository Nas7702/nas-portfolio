"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import ScrollReveal from "./ScrollReveal";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export default function Hero() {
  const { mounted } = useTheme();
  const prefersReduced = useReducedMotion();

  const sectionRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const layer1Ref = useRef<HTMLDivElement | null>(null);
  const layer2Ref = useRef<HTMLDivElement | null>(null);
  const layer3Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (prefersReduced) return; // Disable for reduced motion

    const PX_SCROLL = 72;
    const PX_TILT = 34;
    const BG_SCROLL = 110;
    const BG_TILT = 60;
    const BG_MAX_X = 110;
    const BG_MAX_Y = 150;
    const BG_MAX_ROTATE = 2.4;
    const BG_SCALE = 1.24;
    const MULTS = [0.6, 1.2, 1.8];
    const layers = [layer1Ref, layer2Ref, layer3Ref];

    const targets = layers.map(() => ({ x: 0, y: 0 }));
    const currents = layers.map(() => ({ x: 0, y: 0 }));
    const bgTarget = { x: 0, y: 0, rotate: 0 };
    const bgCurrent = { x: 0, y: 0, rotate: 0 };

    let rafId: number | null = null;
    let lastPointer = { x: 0, y: 0, has: false };

    const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

    const computeTargets = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();

      // Scroll progress relative to hero height (positive when scrolling down)
      const scrollProgress = clamp(-rect.top / rect.height, -1.2, 1.2);
      const scrollY = scrollProgress * PX_SCROLL;

      // Pointer normalization relative to section center
      let pointerXNorm = 0;
      let pointerYNorm = 0;
      if (lastPointer.has) {
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        pointerXNorm = clamp((lastPointer.x - cx) / (rect.width / 2), -1, 1);
        pointerYNorm = clamp((lastPointer.y - cy) / (rect.height / 2), -1, 1);
      }
      const pointerX = pointerXNorm * PX_TILT;
      const pointerY = pointerYNorm * PX_TILT;

      layers.forEach((ref, i) => {
        const mult = MULTS[i] ?? 1;
        targets[i].x = pointerX * mult;
        targets[i].y = (pointerY + scrollY) * mult;
      });

      bgTarget.x = clamp(pointerXNorm * BG_TILT, -BG_MAX_X, BG_MAX_X);
      bgTarget.y = clamp((pointerYNorm * BG_TILT) + (scrollProgress * BG_SCROLL), -BG_MAX_Y, BG_MAX_Y);
      bgTarget.rotate = clamp(pointerXNorm * -3.5, -BG_MAX_ROTATE, BG_MAX_ROTATE);
    };

    const tick = () => {
      const EASE = 0.28; // snappier response
      let needsNext = false;
      layers.forEach((ref, i) => {
        const el = ref.current;
        if (!el) return;
        currents[i].x += (targets[i].x - currents[i].x) * EASE;
        currents[i].y += (targets[i].y - currents[i].y) * EASE;
        el.style.transform = `translate3d(-50%, -50%, 0) translate3d(${currents[i].x}px, ${currents[i].y}px, 0)`;
        needsNext = true;
      });
      const bgEl = bgRef.current;
      if (bgEl) {
        bgCurrent.x += (bgTarget.x - bgCurrent.x) * 0.18;
        bgCurrent.y += (bgTarget.y - bgCurrent.y) * 0.18;
        bgCurrent.rotate += (bgTarget.rotate - bgCurrent.rotate) * 0.12;

        const clampedX = clamp(bgCurrent.x, -BG_MAX_X, BG_MAX_X);
        const clampedY = clamp(bgCurrent.y, -BG_MAX_Y, BG_MAX_Y);
        const clampedRotate = clamp(bgCurrent.rotate, -BG_MAX_ROTATE, BG_MAX_ROTATE);

        bgEl.style.transform = `translate3d(${clampedX}px, ${clampedY}px, 0) rotate(${clampedRotate}deg) scale(${BG_SCALE})`;
        needsNext = true;
      }
      if (needsNext) rafId = requestAnimationFrame(tick);
    };

    const onPointerMove = (e: PointerEvent) => {
      lastPointer = { x: e.clientX, y: e.clientY, has: true };
      computeTargets();
    };

    const onScrollOrResize = () => {
      computeTargets();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    computeTargets();
    rafId = requestAnimationFrame(tick);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [prefersReduced]);

  if (!mounted) {
    return null;
  }

  return (
    <section ref={sectionRef} className="relative overflow-hidden -mt-16 pt-24 pb-16 md:pt-32 md:pb-24 bg-gray-50 dark:bg-transparent transition-colors duration-300">
      {/* Static base gradient to prevent edge exposure - Dark Mode Only */}
      <div
        aria-hidden
        className="absolute inset-0 hidden dark:block bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.75)_0%,rgba(2,6,23,0.95)_70%,rgba(0,0,0,1)_100%)]"
      />

      {/* Light Mode Background Gradient */}
      <div
        aria-hidden
        className="absolute inset-0 dark:hidden bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,rgba(255,255,255,0)_70%)]"
      />

      {/* Bokeh background cluster - Dark Mode Only */}
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform pointer-events-none hidden dark:block"
        aria-hidden
        style={{ transform: "scale(1.2)" }}
      >
        <div className="absolute inset-0">
          <Image
            src="/images/bokeh-lights-dark-background.jpg"
            alt="Abstract bokeh lights background"
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 object-cover object-center blur-[16px] brightness-[0.55]"
          />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.22)_0%,rgba(15,23,42,0.86)_58%,rgba(3,7,18,0.94)_100%)]" />
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.18'%3E%3Ccircle cx='7' cy='7' r='7'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
      </div>

      {/* Parallax layers */}
      {!prefersReduced && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div
            ref={layer1Ref}
            className="absolute top-1/2 left-1/2 w-[140%] h-[140%] opacity-[0.24] will-change-transform mix-blend-screen"
            style={{
              background:
                "radial-gradient(60% 60% at 30% 30%, rgba(59,130,246,0.34) 0%, rgba(59,130,246,0.16) 40%, rgba(59,130,246,0) 70%)",
            }}
          />
          <div
            ref={layer2Ref}
            className="absolute top-1/2 left-1/2 w-[130%] h-[130%] opacity-[0.22] will-change-transform mix-blend-screen"
            style={{
              background:
                "radial-gradient(55% 55% at 70% 60%, rgba(59,130,246,0.30) 0%, rgba(59,130,246,0.14) 42%, rgba(59,130,246,0) 72%)",
            }}
          />
          <div
            ref={layer3Ref}
            className="absolute top-1/2 left-1/2 w-[150%] h-[150%] opacity-[0.18] will-change-transform mix-blend-screen"
            style={{
              background:
                "radial-gradient(50% 50% at 50% 80%, rgba(125,211,252,0.26) 0%, rgba(125,211,252,0.12) 38%, rgba(125,211,252,0) 70%)",
            }}
          />
        </div>
      )}

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 md:flex-row md:items-center md:gap-16">
        <ScrollReveal direction="up" delay={0.1}>
          <div className="flex max-w-2xl flex-col gap-8">
            <div className="flex flex-col gap-4 text-left">
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-gray-500 dark:text-white/40">
                Welcome
              </p>
              <h1 className="space-y-5 font-semibold text-gray-900 dark:text-white">
                <span className="relative inline-block w-fit text-5xl leading-tight sm:text-6xl md:text-7xl">
                  <span
                    aria-hidden
                    className="absolute inset-0 -z-10 rounded-full bg-blue-500/25 blur-[60px] dark:bg-blue-500/25 opacity-0 dark:opacity-100"
                  />
                  <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-blue-600 dark:from-blue-100 dark:via-sky-300 dark:to-blue-400 text-transparent bg-clip-text drop-shadow-sm dark:drop-shadow-[0_0_30px_rgba(56,189,248,0.45)]">
                    I&apos;m Nas
                  </span>
                </span>
                <div className="flex flex-wrap items-center gap-3 text-2xl text-gray-700 dark:text-white/85 sm:text-3xl md:text-4xl">
                  <span className="inline-flex items-center rounded-full border border-gray-200 dark:border-white/15 bg-white/60 dark:bg-white/5 px-5 py-2 text-sm font-medium uppercase tracking-[0.35em] text-gray-600 dark:text-white/70 sm:text-base backdrop-blur-sm shadow-sm dark:shadow-none">
                    Data Science
                  </span>
                  <span className="text-blue-500 dark:text-blue-400">×</span>
                  <span className="inline-flex items-center rounded-full border border-gray-200 dark:border-white/15 bg-white/60 dark:bg-white/5 px-5 py-2 text-sm font-medium uppercase tracking-[0.35em] text-gray-600 dark:text-white/70 sm:text-base backdrop-blur-sm shadow-sm dark:shadow-none">
                    Visual Storytelling
                  </span>
                </div>
              </h1>
              <p className="text-lg text-gray-600 dark:text-white/70 md:text-xl">
                I turn data into decisions and ideas into cinematic visuals for businesses.
              </p>
              <a
                href="https://www.stancefitness.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit text-sm font-medium text-blue-600 dark:text-blue-500 transition-colors duration-200 hover:text-blue-500 dark:hover:text-blue-400 hover:underline"
              >
                Currently at Stance Fitness
              </a>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="#work"
                aria-label="Skip to Work hub"
                title="View my work"
                className="inline-flex h-12 items-center justify-center rounded-full bg-blue-600 px-8 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-700 shadow-lg shadow-blue-600/20"
              >
                View my work
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-full border border-gray-300 dark:border-white/20 px-8 text-sm font-semibold text-gray-700 dark:text-white transition-all duration-200 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-500 bg-white/50 dark:bg-transparent"
              >
                Hire me
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
