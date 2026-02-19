/**
 * Performance monitoring and optimisation utilities
 */

export type PerformanceMode = "low" | "medium" | "high" | "minimal";
export type ShaderQuality = "high" | "medium" | "low" | "minimal";

export interface ShaderQualityProfile {
  dpr: [number, number];
  maxFps: number;
  useWebGL: boolean;
}

const SHADER_QUALITY_CAP_STORAGE_KEY = "nas:shader-quality-cap";
const SHADER_QUALITY_ORDER: ShaderQuality[] = ["minimal", "low", "medium", "high"];

export const SHADER_QUALITY_PROFILES: Record<ShaderQuality, ShaderQualityProfile> = {
  high: {
    dpr: [1, 1.2],
    maxFps: 60,
    useWebGL: true,
  },
  medium: {
    dpr: [1, 1],
    maxFps: 45,
    useWebGL: true,
  },
  low: {
    dpr: [0.7, 0.85],
    maxFps: 30,
    useWebGL: true,
  },
  minimal: {
    dpr: [0.7, 0.8],
    maxFps: 24,
    useWebGL: false,
  },
};

/**
 * Detects device capabilities and returns performance tier
 */
export function getDevicePerformanceTier(): PerformanceMode {
  if (typeof window === "undefined") return "medium";

  if (prefersReducedMotion() || prefersReducedData()) {
    return "minimal";
  }

  // Check if running on mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  // Check hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency || 4;

  // Check memory (if available)
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 0;
  const dpr = window.devicePixelRatio || 1;

  // Conservative mobile strategy: keep quality lower by default.
  if (isMobile) {
    if ((memory > 0 && memory <= 3) || cores <= 3 || dpr >= 3) return "minimal";
    return "low";
  }

  // Desktop: only grant "high" to clearly strong hardware.
  if ((memory > 0 && memory <= 3) || cores <= 2) return "minimal";
  if (cores >= 10 && (memory === 0 || memory >= 12) && dpr <= 2) return "high";
  if (cores >= 6 && (memory === 0 || memory >= 6)) return "medium";
  return "low";
}

export function getShaderQualityProfile(quality: ShaderQuality): ShaderQualityProfile {
  return SHADER_QUALITY_PROFILES[quality];
}

export function downgradeShaderQuality(quality: ShaderQuality): ShaderQuality {
  switch (quality) {
    case "high":
      return "medium";
    case "medium":
      return "low";
    case "low":
      return "low";
    default:
      return "minimal";
  }
}

export function getShaderQualityDowngradeThreshold(quality: ShaderQuality): number | null {
  switch (quality) {
    case "high":
      return 50;
    case "medium":
      return 42;
    case "low":
      return null;
    default:
      return null;
  }
}

function isShaderQuality(value: string): value is ShaderQuality {
  return value === "high" || value === "medium" || value === "low" || value === "minimal";
}

export function getSessionShaderQualityCap(): ShaderQuality | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = sessionStorage.getItem(SHADER_QUALITY_CAP_STORAGE_KEY);
    if (!stored || !isShaderQuality(stored)) return null;
    return stored;
  } catch {
    return null;
  }
}

export function setSessionShaderQualityCap(quality: ShaderQuality): void {
  if (typeof window === "undefined") return;

  try {
    sessionStorage.setItem(SHADER_QUALITY_CAP_STORAGE_KEY, quality);
  } catch {
    // no-op
  }
}

export function applySessionShaderQualityCap(quality: ShaderQuality): ShaderQuality {
  const rawCap = getSessionShaderQualityCap();
  const cap =
    rawCap === "minimal" && !prefersReducedMotion() && !prefersReducedData()
      ? "low"
      : rawCap;
  if (!cap) return quality;

  const requestedIndex = SHADER_QUALITY_ORDER.indexOf(quality);
  const capIndex = SHADER_QUALITY_ORDER.indexOf(cap);
  if (requestedIndex === -1 || capIndex === -1) return quality;
  return requestedIndex > capIndex ? cap : quality;
}

/**
 * FPS Monitor class for tracking frame rates
 */
export class FPSMonitor {
  private frames: number[] = [];
  private runningSum: number = 0; // maintained incrementally — O(1) average instead of O(n) reduce per frame
  private lastTime: number = performance.now();
  private callback?: (fps: number) => void;
  private rafId?: number;
  private running: boolean = false;

  constructor(callback?: (fps: number) => void) {
    this.callback = callback;
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.lastTime = performance.now();
    this.tick();
  }

  stop() {
    this.running = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
  }

  private tick = () => {
    if (!this.running) return;

    const now = performance.now();
    const delta = now - this.lastTime;
    this.lastTime = now;

    const fps = 1000 / delta;
    this.runningSum += fps;
    this.frames.push(fps);

    // Keep only last 60 frames (1 second at 60fps)
    if (this.frames.length > 60) {
      this.runningSum -= this.frames.shift()!;
    }

    const avgFps = this.runningSum / this.frames.length;

    if (this.callback) {
      this.callback(Math.round(avgFps));
    }

    this.rafId = requestAnimationFrame(this.tick);
  };

  getAverageFPS(): number {
    if (this.frames.length === 0) return 60;
    return Math.round(this.runningSum / this.frames.length);
  }
}

/**
 * Get recommended particle count based on device performance
 */
export function getRecommendedParticleCount(tier?: PerformanceMode): number {
  const deviceTier = tier || getDevicePerformanceTier();

  switch (deviceTier) {
    case "minimal":
      return 0;
    case "low":
      return 2000;
    case "medium":
      return 3500;
    case "high":
      return 5000;
    default:
      return 3500;
  }
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Check if user prefers reduced data
 */
export function prefersReducedData(): boolean {
  if (typeof window === "undefined") return false;
  const connection = (navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string }
  }).connection;

  return (
    connection?.saveData === true ||
    connection?.effectiveType === "slow-2g" ||
    connection?.effectiveType === "2g"
  );
}

/**
 * Debounce function for performance
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function for performance
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
