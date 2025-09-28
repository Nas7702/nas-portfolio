"use client";

import { AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

function SpotlightOverlay() {
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const overlayRoot = useMemo(() => (typeof document !== "undefined" ? document.body : null), []);

  // Position state (animated via rAF; we store as refs to avoid re-renders)
  const spotRef = useRef<HTMLDivElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const lastMoveAtRef = useRef<number>(Date.now());
  const targetXRef = useRef<number>(typeof window !== "undefined" ? window.innerWidth / 2 : 0);
  const targetYRef = useRef<number>(typeof window !== "undefined" ? window.innerHeight / 2 : 0);
  const currentXRef = useRef<number>(targetXRef.current);
  const currentYRef = useRef<number>(targetYRef.current);
  const boostRef = useRef<number>(1);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !overlayRoot) return;

    const handlePointerMove = (e: PointerEvent) => {
      lastMoveAtRef.current = Date.now();
      targetXRef.current = e.clientX;
      targetYRef.current = e.clientY;
    };

    const handlePointerOver = (e: PointerEvent) => {
      // Walk composed path to see if any ancestor has data-spotlight
      const path = (e.composedPath && e.composedPath()) || [];
      let boosted = false;
      for (const el of path) {
        if (el && (el as HTMLElement).nodeType === 1) {
          const h = el as HTMLElement;
          if (h.dataset && h.dataset.spotlight !== undefined) {
            boosted = true;
            break;
          }
        }
      }
      boostRef.current = boosted ? 1.6 : 1;
    };

    const handlePointerOut = () => {
      boostRef.current = 1;
    };

    const handleFocusIn = (e: FocusEvent) => {
      let boosted = false;
      let node = e.target as HTMLElement | null;
      while (node && node !== document.body) {
        if (node.dataset && node.dataset.spotlight !== undefined) {
          boosted = true;
          break;
        }
        node = node.parentElement;
      }
      boostRef.current = boosted ? 1.6 : 1;
    };

    const handleFocusOut = () => {
      boostRef.current = 1;
    };

    const handleMouseLeave = () => {
      // Return to center on idle/leave
      targetXRef.current = window.innerWidth / 2;
      targetYRef.current = window.innerHeight / 2;
    };

    if (!prefersReduced) {
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
      window.addEventListener("pointerover", handlePointerOver, { passive: true });
      window.addEventListener("pointerout", handlePointerOut, { passive: true });
      window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
      window.addEventListener("focusin", handleFocusIn, { passive: true } as any);
      window.addEventListener("focusout", handleFocusOut, { passive: true } as any);
    }

    const EASE = 0.18;
    const IDLE_AFTER_MS = 1200;

    const tick = () => {
      const spot = spotRef.current;
      if (spot) {
        const now = Date.now();
        const idle = now - lastMoveAtRef.current > IDLE_AFTER_MS;
        if (idle) {
          targetXRef.current = window.innerWidth / 2;
          targetYRef.current = window.innerHeight / 2;
        }

        currentXRef.current += (targetXRef.current - currentXRef.current) * EASE;
        currentYRef.current += (targetYRef.current - currentYRef.current) * EASE;

        const x = currentXRef.current;
        const y = currentYRef.current;

        // Only transform & opacity
        spot.style.transform = `translate3d(${x}px, ${y}px, 0) translate3d(-50%, -50%, 0)`;
        spot.style.opacity = String(0.08 * boostRef.current);
      }
      animFrameRef.current = window.requestAnimationFrame(tick);
    };

    if (!prefersReduced) {
      animFrameRef.current = window.requestAnimationFrame(tick);
    } else {
      // Reduced motion: static, low intensity at center
      const spot = spotRef.current;
      if (spot) {
        spot.style.transform = `translate3d(50vw, 50vh, 0) translate3d(-50%, -50%, 0)`;
        spot.style.opacity = String(0.05);
      }
    }

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      if (!prefersReduced) {
        window.removeEventListener("pointermove", handlePointerMove as any);
        window.removeEventListener("pointerover", handlePointerOver as any);
        window.removeEventListener("pointerout", handlePointerOut as any);
        window.removeEventListener("mouseleave", handleMouseLeave as any);
        window.removeEventListener("focusin", handleFocusIn as any);
        window.removeEventListener("focusout", handleFocusOut as any);
      }
    };
  }, [mounted, overlayRoot, prefersReduced]);

  if (!mounted || !overlayRoot) return null;

  return createPortal(
    <div className="spotlight-overlay" aria-hidden="true">
      <div
        ref={spotRef}
        className="spotlight-dot"
        style={{
          width: "var(--spotlight-size)",
          height: "var(--spotlight-size)",
        }}
      />
    </div>,
    overlayRoot
  );
}

export default function AnimationWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SpotlightOverlay />
      <AnimatePresence mode="wait" initial={false}>
        {children}
      </AnimatePresence>
    </>
  );
}
