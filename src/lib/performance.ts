/**
 * Performance monitoring and optimisation utilities
 */

/**
 * Detects device capabilities and returns performance tier
 */
export function getDevicePerformanceTier(): 'low' | 'medium' | 'high' {
  if (typeof window === 'undefined') return 'medium';

  // Check if running on mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  // Check hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency || 4;

  // Check memory (if available)
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;

  // Determine tier
  if (isMobile) {
    if (memory && memory < 4) return 'low';
    if (cores < 4) return 'low';
    return 'medium';
  }

  // Desktop
  if (cores >= 8 && (!memory || memory >= 8)) return 'high';
  if (cores >= 4 && (!memory || memory >= 4)) return 'medium';
  return 'low';
}

/**
 * FPS Monitor class for tracking frame rates
 */
export class FPSMonitor {
  private frames: number[] = [];
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
    this.frames.push(fps);

    // Keep only last 60 frames (1 second at 60fps)
    if (this.frames.length > 60) {
      this.frames.shift();
    }

    // Calculate average FPS
    const avgFps = this.frames.reduce((a, b) => a + b, 0) / this.frames.length;

    if (this.callback) {
      this.callback(Math.round(avgFps));
    }

    this.rafId = requestAnimationFrame(this.tick);
  };

  getAverageFPS(): number {
    if (this.frames.length === 0) return 60;
    return Math.round(this.frames.reduce((a, b) => a + b, 0) / this.frames.length);
  }
}

/**
 * Get recommended particle count based on device performance
 */
export function getRecommendedParticleCount(tier?: 'low' | 'medium' | 'high'): number {
  const deviceTier = tier || getDevicePerformanceTier();

  switch (deviceTier) {
    case 'low':
      return 2000;
    case 'medium':
      return 3500;
    case 'high':
      return 5000;
    default:
      return 3500;
  }
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Check if user prefers reduced data
 */
export function prefersReducedData(): boolean {
  if (typeof window === 'undefined') return false;
  const connection = (navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string }
  }).connection;

  return connection?.saveData === true || connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g';
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
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
