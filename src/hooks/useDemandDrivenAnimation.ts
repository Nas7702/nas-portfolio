"use client";

import { useEffect, useRef } from "react";

interface UseDemandDrivenAnimationOptions {
  enabled: boolean;
  maxFps: number;
  sampleWindowMs?: number;
  onStep: (deltaSeconds: number, now: number) => void;
  onSample?: (averageFps: number) => void;
}

export function useDemandDrivenAnimation({
  enabled,
  maxFps,
  sampleWindowMs = 4000,
  onStep,
  onSample,
}: UseDemandDrivenAnimationOptions): void {
  const onStepRef = useRef(onStep);
  const onSampleRef = useRef(onSample);

  useEffect(() => {
    onStepRef.current = onStep;
  }, [onStep]);

  useEffect(() => {
    onSampleRef.current = onSample;
  }, [onSample]);

  useEffect(() => {
    if (!enabled) return;

    const fpsLimit = Math.max(1, maxFps);
    const frameInterval = 1000 / fpsLimit;
    let rafId: number | null = null;
    let lastNow = performance.now();
    let sampleStart = lastNow;
    let sampleFrames = 0;

    const tick = (now: number) => {
      const elapsedMs = now - lastNow;
      if (elapsedMs >= frameInterval) {
        lastNow = now;
        sampleFrames += 1;
        const deltaSeconds = Math.min(elapsedMs / 1000, 0.2);
        onStepRef.current(deltaSeconds, now);
      }

      const sampleElapsed = now - sampleStart;
      if (sampleElapsed >= sampleWindowMs) {
        const averageFps = sampleFrames / (sampleElapsed / 1000);
        onSampleRef.current?.(averageFps);
        sampleFrames = 0;
        sampleStart = now;
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [enabled, maxFps, sampleWindowMs]);
}
