"use client";

import { useEffect, useState } from "react";
import type { RefObject } from "react";

interface UseSceneVisibilityOptions {
  disableWhenHidden: boolean;
  rootMargin?: string;
}

export function useSceneVisibility<T extends HTMLElement>(
  targetRef: RefObject<T | null>,
  options: UseSceneVisibilityOptions
): boolean {
  const { disableWhenHidden, rootMargin = "120px 0px" } = options;
  const [inViewport, setInViewport] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    if (!disableWhenHidden) {
      setInViewport(true);
      return;
    }

    const node = targetRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setInViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInViewport(entry.isIntersecting);
      },
      {
        threshold: 0.01,
        rootMargin,
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [disableWhenHidden, rootMargin, targetRef]);

  useEffect(() => {
    if (!disableWhenHidden) {
      setPageVisible(true);
      return;
    }

    const updateVisibility = () => {
      setPageVisible(document.visibilityState === "visible");
    };

    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, [disableWhenHidden]);

  return disableWhenHidden ? inViewport && pageVisible : true;
}
