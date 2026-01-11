"use client";

import { useState, useEffect } from 'react';
import { FPSMonitor } from '@/lib/performance';

/**
 * Hook to monitor FPS in real-time
 */
export function useFPS() {
  const [fps, setFps] = useState<number>(60);
  const [monitor] = useState(() => new FPSMonitor(setFps));

  useEffect(() => {
    monitor.start();
    return () => monitor.stop();
  }, [monitor]);

  return fps;
}
