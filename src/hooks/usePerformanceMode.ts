"use client";

import { useState, useEffect } from 'react';
import { getDevicePerformanceTier, prefersReducedMotion, prefersReducedData } from '@/lib/performance';

export type PerformanceMode = 'low' | 'medium' | 'high' | 'minimal';

/**
 * Hook to determine optimal performance mode based on device capabilities and user preferences
 */
export function usePerformanceMode(): PerformanceMode {
  const [mode, setMode] = useState<PerformanceMode>('medium');

  useEffect(() => {
    // Check user preferences first
    if (prefersReducedMotion() || prefersReducedData()) {
      setMode('minimal');
      return;
    }

    // Otherwise use device tier
    const tier = getDevicePerformanceTier();
    setMode(tier);
  }, []);

  return mode;
}
