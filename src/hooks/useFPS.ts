"use client";

import { useEffect, useRef, useState } from "react";
import { FPSMonitor } from "@/lib/performance";

/**
 * Hook to monitor FPS in real-time
 */
export function useFPS(enabled = true) {
  const [fps, setFps] = useState<number>(60);
  const monitorRef = useRef<FPSMonitor | null>(null);

  useEffect(() => {
    if (!enabled) {
      monitorRef.current?.stop();
      return;
    }

    if (!monitorRef.current) {
      monitorRef.current = new FPSMonitor(setFps);
    }

    const monitor = monitorRef.current;
    monitor.start();
    return () => monitor.stop();
  }, [enabled]);

  return fps;
}
