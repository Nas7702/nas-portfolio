"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useAdaptiveShaderQuality } from "@/hooks/useAdaptiveShaderQuality";
import { useDemandDrivenAnimation } from "@/hooks/useDemandDrivenAnimation";
import { usePerformanceMode, getShaderQualityFromPerformanceMode } from "@/hooks/usePerformanceMode";
import { useSceneVisibility } from "@/hooks/useSceneVisibility";
import { getShaderQualityProfile, type ShaderQuality } from "@/lib/performance";
import { useTheme } from "./ThemeProvider";

const SPEED_BY_QUALITY: Record<ShaderQuality, number> = {
  high: 0.16,
  medium: 0.11,
  low: 0.08,
  minimal: 0,
};

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

interface HeroShaderOptions {
  precision: "highp" | "mediump";
  octaves: number;
  includeSparkle: boolean;
  includeRays: boolean;
}

function buildHeroFragmentShader(options: HeroShaderOptions): string {
  const sunRayFunction = options.includeRays
    ? `
  float sunRays(vec2 p, float t) {
    vec2 source = vec2(-0.62, 0.28);
    vec2 rel = p - source;
    float radius = length(rel);
    float angle = atan(rel.y, rel.x);

    float spokes = sin(angle * 12.0 + t * 1.25 + fbm(rel * 2.35) * 2.35) * 0.5 + 0.5;
    float beam = smoothstep(0.62, 1.0, spokes);
    float flicker = 0.86 + 0.14 * sin(t * 0.86 + angle * 1.7);
    float noiseBreakup = fbm(vec2(angle * 2.2 - t * 0.22, radius * 6.8 + t * 0.36));
    float breakupMask = smoothstep(0.35, 0.9, noiseBreakup);

    float distanceFade = smoothstep(1.75, 0.05, radius);
    float edgeMask = smoothstep(0.75, -0.4, p.x) * smoothstep(0.85, -0.75, p.y);

    return beam * flicker * breakupMask * distanceFade * edgeMask;
  }
`
    : "";

  const sparkleExpression = options.includeSparkle
    ? `
    float sparkleField = fbm(flowUv * 14.0 + vec2(t * 1.2, -t * 1.1));
    float sparkleMask = smoothstep(0.9, 0.994, sparkleField) * smoothstep(0.24, 0.9, ink);
    vec3 sparkle = vec3(sparkleMask * uSparkle);
`
    : `
    vec3 sparkle = vec3(0.0);
`;

  const rayExpression = options.includeRays
    ? `
    float rays = sunRays(flowUv, t);
    vec3 rayColour = mix(uColourB, uRayTint, 0.66);
    vec3 rayLayer = rayColour * pow(rays, 1.3) * uRayStrength * (1.0 - ink * 0.36);
`
    : `
    vec3 rayLayer = vec3(0.0);
`;

  return `
  precision ${options.precision} float;

  varying vec2 vUv;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec3 uColourA;
  uniform vec3 uColourB;
  uniform vec3 uRayTint;
  uniform float uIntensity;
  uniform float uSparkle;
  uniform float uRayStrength;
  uniform float uVignetteStrength;

  float random(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);

    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
      (c - a) * u.y * (1.0 - u.x) +
      (d - b) * u.x * u.y;
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;

    for (int i = 0; i < ${options.octaves}; i++) {
      value += amplitude * noise(p);
      p = p * 2.03;
      amplitude *= 0.5;
    }

    return value;
  }

  mat2 rotate2D(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
  }
${sunRayFunction}
  void main() {
    float t = uTime;
    vec2 centred = (vUv - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);

    vec2 warp = vec2(
      fbm(centred * 1.5 + vec2(t * 0.42, -t * 0.3)),
      fbm(centred * 1.5 + vec2(-t * 0.35, t * 0.38))
    ) - 0.5;

    vec2 flowUv = centred + warp * 0.48;
    flowUv = rotate2D(sin(t * 0.15) * 0.2) * flowUv;

    float base = fbm(flowUv * 2.2 + vec2(t * 0.56, -t * 0.43));
    float smoke = fbm(flowUv * 3.2 + vec2(base * 1.55 + t * 0.33, -t * 0.25));
    float detail = fbm(flowUv * 5.2 + vec2(-t * 0.2, t * 0.3));

    float ridges = pow(1.0 - abs(smoke * 2.0 - 1.0), 1.25);
    float veil = fbm(flowUv * 1.05 + vec2(t * 0.08, -t * 0.06));
    float ink = smoothstep(0.18, 0.84, smoke * 0.54 + detail * 0.16 + ridges * 0.26);

    vec3 blended = mix(uColourA, uColourB, ink);
    blended = mix(blended, mix(uColourA, uColourB, veil), 0.05 * uIntensity);
${sparkleExpression}
${rayExpression}
    float vignette = smoothstep(1.48, 0.2, length(centred));
    float vignetteMix = mix(1.0, vignette, uVignetteStrength);
    vec3 finalColour = (mix(uColourA, blended, uIntensity) + sparkle + rayLayer) * vignetteMix;

    gl_FragColor = vec4(finalColour, 0.9);
  }
`;
}

const HERO_FRAGMENT_SHADERS: Record<Exclude<ShaderQuality, "minimal">, string> = {
  high: buildHeroFragmentShader({
    precision: "highp",
    octaves: 5,
    includeSparkle: true,
    includeRays: true,
  }),
  medium: buildHeroFragmentShader({
    precision: "highp",
    octaves: 4,
    includeSparkle: true,
    includeRays: true,
  }),
  low: buildHeroFragmentShader({
    precision: "mediump",
    octaves: 3,
    includeSparkle: false,
    includeRays: false,
  }),
};

interface InkPlaneProps {
  speed: number;
  maxFps: number;
  quality: Exclude<ShaderQuality, "minimal">;
  isLightTheme: boolean;
  active: boolean;
  onAverageFps: (averageFps: number) => void;
}

function InkPlane({
  speed,
  maxFps,
  quality,
  isLightTheme,
  active,
  onAverageFps,
}: InkPlaneProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size, invalidate } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uColourA: { value: new THREE.Color(0.023, 0.024, 0.027) },
      uColourB: { value: new THREE.Color(0.13, 0.14, 0.16) },
      uRayTint: { value: new THREE.Color(0.69, 0.7, 0.67) },
      uIntensity: { value: 0.88 },
      uSparkle: { value: 0.075 },
      uRayStrength: { value: 0.18 },
      uVignetteStrength: { value: 0.48 },
    }),
    []
  );

  useEffect(() => {
    uniforms.uResolution.value.set(size.width, size.height);
    invalidate();
  }, [size.height, size.width, uniforms, invalidate]);

  useEffect(() => {
    if (isLightTheme) {
      uniforms.uColourA.value.setRGB(0.947, 0.942, 0.934);
      uniforms.uColourB.value.setRGB(0.765, 0.752, 0.732);
      uniforms.uRayTint.value.setRGB(0.91, 0.885, 0.84);
      uniforms.uIntensity.value = quality === "low" ? 0.72 : 0.82;
      uniforms.uSparkle.value = quality === "high" ? 0.014 : 0.01;
      uniforms.uRayStrength.value = quality === "low" ? 0.0 : 0.15;
      uniforms.uVignetteStrength.value = quality === "low" ? 0.18 : 0.25;
      invalidate();
      return;
    }

    uniforms.uColourA.value.setRGB(0.023, 0.024, 0.027);
    uniforms.uColourB.value.setRGB(0.13, 0.14, 0.16);
    uniforms.uRayTint.value.setRGB(0.69, 0.7, 0.67);
    uniforms.uIntensity.value = quality === "low" ? 0.84 : 0.92;
    uniforms.uSparkle.value = quality === "high" ? 0.05 : 0.03;
    uniforms.uRayStrength.value = quality === "low" ? 0.0 : 0.14;
    uniforms.uVignetteStrength.value = quality === "low" ? 0.28 : 0.38;
    invalidate();
  }, [isLightTheme, quality, uniforms, invalidate]);

  const handleStep = useCallback(
    (deltaSeconds: number) => {
      if (!materialRef.current) return;
      materialRef.current.uniforms.uTime.value += deltaSeconds * speed;
      invalidate();
    },
    [invalidate, speed]
  );

  useDemandDrivenAnimation({
    enabled: active,
    maxFps,
    onStep: handleStep,
    onSample: onAverageFps,
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={HERO_FRAGMENT_SHADERS[quality]}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

function InkFallback({ isLightTheme }: { isLightTheme: boolean }) {
  const background = isLightTheme
    ? "radial-gradient(circle at 28% 44%, rgba(242, 236, 228, 0.94) 0%, rgba(226, 217, 204, 0.92) 50%, rgba(213, 202, 186, 0.93) 100%)"
    : "radial-gradient(circle at 30% 42%, rgba(13, 15, 18, 0.95) 0%, rgba(16, 19, 24, 0.92) 52%, rgba(9, 12, 16, 0.95) 100%)";

  return <div className="absolute inset-0" aria-hidden="true" style={{ background }} />;
}

function isWebGLSupported(): boolean {
  if (typeof window === "undefined") return false;

  try {
    const canvas = document.createElement("canvas");
    const context =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    return Boolean(context);
  } catch {
    return false;
  }
}

export interface HeroInkShaderSceneProps {
  qualityOverride?: ShaderQuality;
  disableWhenHidden?: boolean;
  maxFpsOverride?: number;
}

export function HeroInkShaderScene({
  qualityOverride,
  disableWhenHidden = true,
  maxFpsOverride,
}: HeroInkShaderSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const performanceMode = usePerformanceMode();
  const prefersReduced = useReducedMotion();
  const { theme } = useTheme();
  const [webglAvailable, setWebglAvailable] = useState(true);

  useEffect(() => {
    setWebglAvailable(isWebGLSupported());
  }, []);

  const baseQuality = prefersReduced
    ? "minimal"
    : qualityOverride ?? getShaderQualityFromPerformanceMode(performanceMode);
  const { quality, reportAverageFps } = useAdaptiveShaderQuality({
    requestedQuality: baseQuality,
    enableAdaptiveDowngrade: false,
  });

  const visibilityActive = useSceneVisibility(containerRef, {
    disableWhenHidden,
    rootMargin: "160px 0px",
  });

  const profile = getShaderQualityProfile(quality);
  const maxFps = maxFpsOverride ?? profile.maxFps;
  const shouldRenderWebGL = webglAvailable && profile.useWebGL;
  const active = shouldRenderWebGL && visibilityActive;
  const shaderQuality: Exclude<ShaderQuality, "minimal"> = quality === "high" ? "high" : quality === "medium" ? "medium" : "low";
  const speed = SPEED_BY_QUALITY[quality];
  const isLightTheme = theme === "light";

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
      <InkFallback isLightTheme={isLightTheme} />
      {shouldRenderWebGL && (
        <Canvas
          frameloop="demand"
          dpr={profile.dpr}
          gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        >
          <InkPlane
            speed={speed}
            maxFps={maxFps}
            quality={shaderQuality}
            isLightTheme={isLightTheme}
            active={active}
            onAverageFps={reportAverageFps}
          />
        </Canvas>
      )}
    </div>
  );
}
