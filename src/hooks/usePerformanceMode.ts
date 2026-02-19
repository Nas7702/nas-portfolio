"use client";

import { useEffect, useState } from "react";
import {
  type PerformanceMode,
  type ShaderQuality,
  getDevicePerformanceTier,
} from "@/lib/performance";

export type { PerformanceMode } from "@/lib/performance";

const SHADER_QUALITY_BY_MODE: Record<PerformanceMode, ShaderQuality> = {
  high: "high",
  medium: "medium",
  low: "low",
  minimal: "minimal",
};

export function getShaderQualityFromPerformanceMode(mode: PerformanceMode): ShaderQuality {
  return SHADER_QUALITY_BY_MODE[mode];
}

/**
 * Hook to determine optimal performance mode based on device capabilities and user preferences
 */
export function usePerformanceMode(): PerformanceMode {
  const [mode, setMode] = useState<PerformanceMode>("medium");

  useEffect(() => {
    setMode(getDevicePerformanceTier());
  }, []);

  return mode;
}
