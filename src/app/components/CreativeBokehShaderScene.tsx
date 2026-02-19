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
  high: 0.2,
  medium: 0.15,
  low: 0.09,
  minimal: 0,
};

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

interface BokehShaderOptions {
  precision: "highp" | "mediump";
  fbmOctaves: number;
  layers: number;
  blobsPerLayer: number;
  useFastBlob: boolean;
  includeFilmGrain: boolean;
}

function buildBokehFragmentShader(options: BokehShaderOptions): string {
  const blobFunction = options.useFastBlob
    ? `
  float ellipseBlob(vec2 p, vec2 centre, vec2 radii, float angle) {
    vec2 q = rotate2D(angle) * (p - centre);
    vec2 n = q / radii;
    return 1.0 / (1.0 + dot(n, n) * 3.2);
  }
`
    : `
  float ellipseBlob(vec2 p, vec2 centre, vec2 radii, float angle) {
    vec2 q = rotate2D(angle) * (p - centre);
    vec2 n = q / radii;
    return exp(-dot(n, n) * 1.85);
  }
`;

  const filmGrainExpression = options.includeFilmGrain
    ? `
    float grain = hash11(dot(gl_FragCoord.xy, vec2(0.06711, 0.00583)) + t * 0.1) - 0.5;
    colour += grain * 0.01;
`
    : "";

  return `
  precision ${options.precision} float;

  varying vec2 vUv;

  uniform float uTime;
  uniform vec2 uResolution;

  uniform vec3 uBaseWarm;
  uniform vec3 uBaseCool;
  uniform vec3 uLightWarm;
  uniform vec3 uLightCool;
  uniform vec3 uLightNeutral;
  uniform float uAlpha;

  mat2 rotate2D(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
  }

  float hash11(float p) {
    return fract(sin(p * 127.1) * 43758.5453123);
  }

  vec2 hash21(float p) {
    return fract(sin(vec2(p * 37.13, p * 91.71)) * vec2(43758.5453, 12741.349));
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);

    float a = hash11(dot(i, vec2(1.0, 57.0)));
    float b = hash11(dot(i + vec2(1.0, 0.0), vec2(1.0, 57.0)));
    float c = hash11(dot(i + vec2(0.0, 1.0), vec2(1.0, 57.0)));
    float d = hash11(dot(i + vec2(1.0, 1.0), vec2(1.0, 57.0)));

    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < ${options.fbmOctaves}; i++) {
      value += noise(p) * amplitude;
      p *= 2.02;
      amplitude *= 0.5;
    }
    return value;
  }
${blobFunction}
  void main() {
    float t = uTime;
    vec2 uv = (vUv - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);

    float split = smoothstep(-1.05, 1.05, uv.x);
    vec3 base = mix(uBaseWarm, uBaseCool, split * 0.55 + 0.225);

    float warmLeak = exp(-pow((uv.x + 0.58) * 1.45, 2.0)) * 0.08;
    float coolLeak = exp(-pow((uv.x - 0.62) * 1.6, 2.0)) * 0.08;
    base += uLightWarm * warmLeak * 0.14;
    base += uLightCool * coolLeak * 0.14;

    vec3 lights = vec3(0.0);

    for (int layer = 0; layer < ${options.layers}; layer++) {
      float lf = float(layer);
      float depth = 0.34 + lf * 0.3;

      for (int i = 0; i < ${options.blobsPerLayer}; i++) {
        float id = float(i) + lf * 37.7;
        vec2 rndA = hash21(id + 0.13);
        vec2 rndB = hash21(id + 9.71);

        vec2 centre = vec2(
          mix(-1.62, 1.62, rndA.x),
          mix(-1.0, 1.0, rndA.y)
        );

        float speed = mix(0.016, 0.09, rndB.x) * (0.8 + lf * 0.5);
        centre.x += sin(t * speed + rndA.y * 6.2831) * (0.3 + depth * 0.25);
        centre.y += cos(t * speed * 1.28 + rndA.x * 6.2831) * (0.22 + depth * 0.18);

        vec2 radii = vec2(
          mix(0.07, 0.26, rndB.x),
          mix(0.05, 0.2, rndB.y)
        ) * mix(0.62, 1.22, depth);

        float angle = rndA.x * 6.2831 + t * (rndB.y - 0.5) * 0.08;
        float blob = ellipseBlob(uv, centre, radii, angle);

        float intensity = blob * mix(0.08, 0.22, depth) * mix(0.7, 1.0, rndA.y);
        vec3 tint = mix(uLightCool, uLightWarm, rndB.x);
        tint = mix(tint, uLightNeutral, 0.42);
        lights += tint * intensity;
      }
    }

    float atmosphere = fbm(uv * 2.25 + vec2(t * 0.03, -t * 0.02));
    lights += vec3(atmosphere * 0.02);

    float heroCentre = length(uv - vec2(0.0, -0.08));
    float centreMask = smoothstep(0.12, 0.56, heroCentre);
    lights *= mix(0.22, 1.0, centreMask);

    vec3 colour = base + lights;

    float vignette = smoothstep(1.55, 0.28, length(uv));
    colour *= mix(0.78, 1.0, vignette);
${filmGrainExpression}
    gl_FragColor = vec4(colour, uAlpha);
  }
`;
}

const BOKEH_FRAGMENT_SHADERS: Record<Exclude<ShaderQuality, "minimal">, string> = {
  high: buildBokehFragmentShader({
    precision: "highp",
    fbmOctaves: 4,
    layers: 3,
    blobsPerLayer: 14,
    useFastBlob: false,
    includeFilmGrain: true,
  }),
  medium: buildBokehFragmentShader({
    precision: "highp",
    fbmOctaves: 3,
    layers: 3,
    blobsPerLayer: 10,
    useFastBlob: false,
    includeFilmGrain: false,
  }),
  low: buildBokehFragmentShader({
    precision: "mediump",
    fbmOctaves: 2,
    layers: 2,
    blobsPerLayer: 7,
    useFastBlob: true,
    includeFilmGrain: false,
  }),
};

interface BokehPlaneProps {
  speed: number;
  maxFps: number;
  quality: Exclude<ShaderQuality, "minimal">;
  isLightTheme: boolean;
  active: boolean;
  onAverageFps: (averageFps: number) => void;
}

function BokehPlane({
  speed,
  maxFps,
  quality,
  isLightTheme,
  active,
  onAverageFps,
}: BokehPlaneProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size, invalidate } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uBaseWarm: { value: new THREE.Color(0.045, 0.048, 0.053) },
      uBaseCool: { value: new THREE.Color(0.042, 0.047, 0.055) },
      uLightWarm: { value: new THREE.Color(0.2, 0.42, 0.39) },
      uLightCool: { value: new THREE.Color(0.27, 0.33, 0.42) },
      uLightNeutral: { value: new THREE.Color(0.8, 0.84, 0.89) },
      uAlpha: { value: 0.88 },
    }),
    []
  );

  useEffect(() => {
    uniforms.uResolution.value.set(size.width, size.height);
    invalidate();
  }, [size.height, size.width, uniforms, invalidate]);

  useEffect(() => {
    if (isLightTheme) {
      uniforms.uBaseWarm.value.setRGB(0.94, 0.92, 0.89);
      uniforms.uBaseCool.value.setRGB(0.9, 0.88, 0.85);
      uniforms.uLightWarm.value.setRGB(0.72, 0.6, 0.46);
      uniforms.uLightCool.value.setRGB(0.64, 0.58, 0.5);
      uniforms.uLightNeutral.value.setRGB(0.98, 0.96, 0.93);
      uniforms.uAlpha.value = quality === "low" ? 0.47 : 0.54;
      invalidate();
      return;
    }

    uniforms.uBaseWarm.value.setRGB(0.045, 0.048, 0.053);
    uniforms.uBaseCool.value.setRGB(0.042, 0.047, 0.055);
    uniforms.uLightWarm.value.setRGB(0.2, 0.42, 0.39);
    uniforms.uLightCool.value.setRGB(0.27, 0.33, 0.42);
    uniforms.uLightNeutral.value.setRGB(0.8, 0.84, 0.89);
    uniforms.uAlpha.value = quality === "low" ? 0.64 : 0.74;
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
        fragmentShader={BOKEH_FRAGMENT_SHADERS[quality]}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

function BokehFallback({ isLightTheme }: { isLightTheme: boolean }) {
  const background = isLightTheme
    ? "linear-gradient(90deg, rgba(244, 237, 228, 0.94) 0%, rgba(235, 226, 213, 0.9) 100%)"
    : "linear-gradient(90deg, rgba(10, 13, 17, 0.94) 0%, rgba(12, 16, 22, 0.9) 100%)";

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

export interface CreativeBokehShaderSceneProps {
  qualityOverride?: ShaderQuality;
  disableWhenHidden?: boolean;
  maxFpsOverride?: number;
}

export function CreativeBokehShaderScene({
  qualityOverride,
  disableWhenHidden = true,
  maxFpsOverride,
}: CreativeBokehShaderSceneProps) {
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
  });

  const visibilityActive = useSceneVisibility(containerRef, {
    disableWhenHidden,
    rootMargin: "160px 0px",
  });

  const profile = getShaderQualityProfile(quality);
  const maxFps = maxFpsOverride ?? profile.maxFps;
  const shouldRenderWebGL = webglAvailable && profile.useWebGL;
  const active = shouldRenderWebGL && visibilityActive;
  const shaderQuality: Exclude<ShaderQuality, "minimal"> =
    quality === "high" ? "high" : quality === "medium" ? "medium" : "low";
  const speed = SPEED_BY_QUALITY[quality];
  const isLightTheme = theme === "light";

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <BokehFallback isLightTheme={isLightTheme} />
      {shouldRenderWebGL && (
        <Canvas
          frameloop="demand"
          dpr={profile.dpr}
          gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        >
          <BokehPlane
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
