"use client";

import { useCallback, useEffect, useState } from "react";
import {
  applySessionShaderQualityCap,
  downgradeShaderQuality,
  getShaderQualityDowngradeThreshold,
  setSessionShaderQualityCap,
  type ShaderQuality,
} from "@/lib/performance";

interface UseAdaptiveShaderQualityOptions {
  requestedQuality: ShaderQuality;
  enableAdaptiveDowngrade?: boolean;
}

export function useAdaptiveShaderQuality({
  requestedQuality,
  enableAdaptiveDowngrade = true,
}: UseAdaptiveShaderQualityOptions) {
  const [quality, setQuality] = useState<ShaderQuality>(() =>
    applySessionShaderQualityCap(requestedQuality)
  );

  useEffect(() => {
    setQuality(applySessionShaderQualityCap(requestedQuality));
  }, [requestedQuality]);

  const reportAverageFps = useCallback(
    (averageFps: number) => {
      if (!enableAdaptiveDowngrade) return;

      setQuality((current) => {
        const threshold = getShaderQualityDowngradeThreshold(current);
        if (threshold === null || averageFps >= threshold) {
          return current;
        }

        const downgraded = downgradeShaderQuality(current);
        if (downgraded !== current) {
          setSessionShaderQualityCap(downgraded);
        }
        return downgraded;
      });
    },
    [enableAdaptiveDowngrade]
  );

  return {
    quality,
    reportAverageFps,
  };
}
