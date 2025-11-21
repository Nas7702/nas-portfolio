"use client";

import { useEffect, useRef } from "react";
import PageTransition from "../components/PageTransition";
import ScrollReveal from "../components/ScrollReveal";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";

function useHeroParallax(
  sectionRef: React.RefObject<HTMLElement | null>,
  bgRef: React.RefObject<HTMLDivElement | null>
) {
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    const BG_SCROLL = 90;
    const BG_TILT = 42;
    const BG_MAX_X = 120;
    const BG_MAX_Y = 170;
    const BG_MAX_ROTATE = 2.5;
    const BG_SCALE = 1.2;
    const bgTarget = { x: 0, y: 0, rotate: 0 };
    const bgCurrent = { x: 0, y: 0, rotate: 0 };
    let rafId: number | null = null;
    let lastPointer = { x: 0, y: 0, has: false };

    const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

    const computeTargets = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const scrollProgress = clamp(-rect.top / rect.height, -1.2, 1.2);

      let pointerXNorm = 0;
      let pointerYNorm = 0;
      if (lastPointer.has) {
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        pointerXNorm = clamp((lastPointer.x - cx) / (rect.width / 2), -1, 1);
        pointerYNorm = clamp((lastPointer.y - cy) / (rect.height / 2), -1, 1);
      }

      bgTarget.x = clamp(pointerXNorm * BG_TILT, -BG_MAX_X, BG_MAX_X);
      bgTarget.y = clamp((pointerYNorm * BG_TILT) + (scrollProgress * BG_SCROLL), -BG_MAX_Y, BG_MAX_Y);
      bgTarget.rotate = clamp(pointerXNorm * -2.6, -BG_MAX_ROTATE, BG_MAX_ROTATE);
    };

    const tick = () => {
      const bgEl = bgRef.current;
      if (!bgEl) return;

      bgCurrent.x += (bgTarget.x - bgCurrent.x) * 0.15;
      bgCurrent.y += (bgTarget.y - bgCurrent.y) * 0.15;
      bgCurrent.rotate += (bgTarget.rotate - bgCurrent.rotate) * 0.1;

      const clampedX = clamp(bgCurrent.x, -BG_MAX_X, BG_MAX_X);
      const clampedY = clamp(bgCurrent.y, -BG_MAX_Y, BG_MAX_Y);
      const clampedRotate = clamp(bgCurrent.rotate, -BG_MAX_ROTATE, BG_MAX_ROTATE);
      bgEl.style.transform = `translate3d(${clampedX}px, ${clampedY}px, 0) rotate(${clampedRotate}deg) scale(${BG_SCALE})`;
      rafId = requestAnimationFrame(tick);
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
  }, [prefersReduced, sectionRef, bgRef]);
}

export default function SoftwarePage() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);

  useHeroParallax(sectionRef, bgRef);

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header Section */}
        <section ref={sectionRef} className="relative overflow-hidden py-20 px-8">
          <div
            aria-hidden
            className="absolute inset-0 hidden dark:block bg-[radial-gradient(circle_at_center,rgba(17,24,39,0.8)_0%,rgba(2,6,23,0.96)_70%,rgba(0,0,0,1)_100%)]"
          />

          {/* Light Mode Gradient */}
          <div
            aria-hidden
            className="absolute inset-0 dark:hidden bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,rgba(255,255,255,0)_70%)]"
          />

          <div
            ref={bgRef}
            className="pointer-events-none absolute inset-0 will-change-transform hidden dark:block"
            aria-hidden
            style={{ transform: "scale(1.18)" }}
          >
            <div className="absolute inset-0">
              <Image
                src="/images/bokeh-lights-dark-background.jpg"
                alt="Abstract tech bokeh backdrop"
                fill
                priority
                sizes="100vw"
                className="absolute inset-0 object-cover object-center blur-[12px] brightness-[0.65]"
              />
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.25)_0%,rgba(17,24,39,0.88)_60%,rgba(2,6,23,0.94)_100%)]" />
            <div
              className="absolute inset-0 opacity-[0.1]"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.16'%3E%3Ccircle cx='7' cy='7' r='7'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
              }}
            />
          </div>
          <div className="relative max-w-6xl mx-auto text-center">
            <ScrollReveal direction="up" delay={0.1}>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Technical Projects
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                A collection of data science projects and software applications that demonstrate my analytical
                skills and technical expertise. From machine learning models to interactive dashboards and web applications.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.5}>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                  Python & Data Science
                </span>
                <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">
                  Java Development
                </span>
                <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm font-medium">
                  React & Next.js
                </span>
                <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">
                  Vercel Deployment
                </span>
                <span className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-full text-sm font-medium">
                  Machine Learning
                </span>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Coming Soon Section */}
        <section className="pb-20 px-8">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal direction="up" delay={0.2}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 shadow-xl border border-gray-200 dark:border-gray-700 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-8">
                  <span className="text-white text-4xl">🔬</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Technical Projects Coming Soon
                </h3>

                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  I&apos;m currently documenting and preparing detailed case studies for my technical projects, including
                  machine learning models, data analytics dashboards, and full-stack applications.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Data Science Projects</h4>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                      <li className="flex items-center gap-2">
                        <span className="text-blue-500">•</span>
                        Customer Churn Prediction Models
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-blue-500">•</span>
                        Sales Analytics Dashboards
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-blue-500">•</span>
                        Market Sentiment Analysis
                      </li>
                    </ul>
                  </div>

                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Software Applications</h4>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                      <li className="flex items-center gap-2">
                        <span className="text-purple-500">•</span>
                        Interactive Web Applications
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-purple-500">•</span>
                        Automation & Workflow Tools
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-purple-500">•</span>
                        API Development & Integration
                      </li>
                    </ul>
                  </div>
                </div>

                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Each project will include detailed case studies, technical challenges, and measurable results.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/contact"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                  >
                    Get Notified When Live
                  </a>
                  <a
                    href="/create"
                    className="px-6 py-3 border border-green-300 dark:border-green-600 text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-800/20 font-medium rounded-lg transition-colors"
                  >
                    View Creative Work
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Skills Highlight Section */}
        <section className="py-16 px-8 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal direction="up" delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12">
                Technical Expertise
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <ScrollReveal direction="up" delay={0.2}>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    Python
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 font-medium">
                    Data Science
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.3}>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                    Java
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 font-medium">
                    Backend Development
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.4}>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                    NextJS
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 font-medium">
                    Web Development
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.5}>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                    Vercel
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 font-medium">
                    Cloud Deployment
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-8">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal direction="up" delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Let&apos;s Solve Problems Together
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Have a data challenge or need a custom software solution? I&apos;d love to help turn your data into insights
                and ideas into applications.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.5}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
                >
                  Start a Project
                </a>
                <a
                  href="/create"
                  className="px-8 py-4 border border-green-300 dark:border-green-600 text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-800/20 font-medium rounded-xl transition-colors"
                >
                  View Creative Work
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </div>

      {/* Commented out until real projects are ready */}
      {/* <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      /> */}
    </PageTransition>
  );
}
