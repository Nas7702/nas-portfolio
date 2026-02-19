"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { type PerformanceMode, usePerformanceMode } from "@/hooks/usePerformanceMode";
import { useTheme } from "./ThemeProvider";

const ANIMATION_SPEED: Record<PerformanceMode, number> = {
  high: 0.16,
  medium: 0.125,
  low: 0.09,
  minimal: 0.018,
};

const DPR_BY_MODE: Record<PerformanceMode, [number, number]> = {
  high: [1, 1.75],
  medium: [1, 1.35],
  low: [1, 1.15],
  minimal: [1, 1],
};

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

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

    for (int i = 0; i < 5; i++) {
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

  float sunRays(vec2 p, float t) {
    vec2 source = vec2(-0.62, 0.28);
    vec2 rel = p - source;
    float radius = length(rel);
    float angle = atan(rel.y, rel.x);

    float spokes = sin(angle * 12.0 + t * 1.35 + fbm(rel * 2.6) * 2.6) * 0.5 + 0.5;
    float beam = smoothstep(0.58, 1.0, spokes);
    float flicker = 0.84 + 0.16 * sin(t * 0.92 + angle * 1.9);
    float noiseBreakup = fbm(vec2(angle * 2.6 - t * 0.24, radius * 7.6 + t * 0.4));
    float breakupMask = smoothstep(0.32, 0.92, noiseBreakup);

    float distanceFade = smoothstep(1.9, 0.04, radius);
    float edgeMask = smoothstep(0.75, -0.4, p.x) * smoothstep(0.85, -0.75, p.y);

    return beam * flicker * breakupMask * distanceFade * edgeMask;
  }

  void main() {
    float t = uTime;
    vec2 centred = (vUv - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);

    vec2 warp = vec2(
      fbm(centred * 1.6 + vec2(t * 0.45, -t * 0.32)),
      fbm(centred * 1.6 + vec2(-t * 0.38, t * 0.41))
    ) - 0.5;

    vec2 flowUv = centred + warp * 0.55;
    flowUv = rotate2D(sin(t * 0.16) * 0.22) * flowUv;

    float base = fbm(flowUv * 2.4 + vec2(t * 0.62, -t * 0.47));
    float smoke = fbm(flowUv * 3.6 + vec2(base * 1.8 + t * 0.37, -t * 0.29));
    float detail = fbm(flowUv * 5.8 + vec2(-t * 0.24, t * 0.33));

    float ridges = pow(1.0 - abs(smoke * 2.0 - 1.0), 1.3);
    float veil = fbm(flowUv * 1.15 + vec2(t * 0.09, -t * 0.07));
    float ink = smoothstep(0.18, 0.92, smoke * 0.62 + detail * 0.18 + ridges * 0.12);

    vec3 blended = mix(uColourA, uColourB, ink);
    blended = mix(blended, mix(uColourA, uColourB, veil), 0.06 * uIntensity);

    float sparkleField = fbm(flowUv * 16.0 + vec2(t * 1.4, -t * 1.25));
    float sparkleMask = smoothstep(0.88, 0.995, sparkleField) * smoothstep(0.22, 0.92, ink);
    vec3 sparkle = vec3(sparkleMask * uSparkle);

    float rays = sunRays(flowUv, t);
    vec3 rayColour = mix(uColourB, uRayTint, 0.68);
    vec3 rayLayer = rayColour * pow(rays, 1.35) * uRayStrength * (1.0 - ink * 0.34);

    float vignette = smoothstep(1.52, 0.18, length(centred));
    float vignetteMix = mix(1.0, vignette, uVignetteStrength);
    vec3 finalColour = (mix(uColourA, blended, uIntensity) + sparkle + rayLayer) * vignetteMix;

    gl_FragColor = vec4(finalColour, 0.9);
  }
`;

interface InkPlaneProps {
  speed: number;
  isLightTheme: boolean;
}

function InkPlane({ speed, isLightTheme }: InkPlaneProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uColourA: { value: new THREE.Color(0.023, 0.024, 0.027) },
      uColourB: { value: new THREE.Color(0.085, 0.088, 0.094) },
      uRayTint: { value: new THREE.Color(0.69, 0.7, 0.67) },
      uIntensity: { value: 0.82 },
      uSparkle: { value: 0.075 },
      uRayStrength: { value: 0.18 },
      uVignetteStrength: { value: 0.52 },
    }),
    [size.height, size.width]
  );

  useEffect(() => {
    uniforms.uResolution.value.set(size.width, size.height);
  }, [size.height, size.width, uniforms]);

  useEffect(() => {
    if (isLightTheme) {
      uniforms.uColourA.value.setRGB(0.949, 0.945, 0.936);
      uniforms.uColourB.value.setRGB(0.865, 0.858, 0.846);
      uniforms.uRayTint.value.setRGB(0.92, 0.905, 0.87);
      uniforms.uIntensity.value = 0.62;
      uniforms.uSparkle.value = 0.02;
      uniforms.uRayStrength.value = 0.18;
      uniforms.uVignetteStrength.value = 0.16;
      return;
    }

    uniforms.uColourA.value.setRGB(0.023, 0.024, 0.027);
    uniforms.uColourB.value.setRGB(0.085, 0.088, 0.094);
    uniforms.uRayTint.value.setRGB(0.69, 0.7, 0.67);
    uniforms.uIntensity.value = 0.84;
    uniforms.uSparkle.value = 0.05;
    uniforms.uRayStrength.value = 0.14;
    uniforms.uVignetteStrength.value = 0.42;
  }, [isLightTheme, uniforms]);

  useFrame((_, delta) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value += delta * speed;
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
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

export function HeroInkShaderScene() {
  const performanceMode = usePerformanceMode();
  const prefersReduced = useReducedMotion();
  const { theme } = useTheme();
  const [webglAvailable, setWebglAvailable] = useState(true);

  useEffect(() => {
    setWebglAvailable(isWebGLSupported());
  }, []);

  if (!webglAvailable) {
    return null;
  }

  const speed = prefersReduced ? ANIMATION_SPEED.minimal : ANIMATION_SPEED[performanceMode];
  const dpr = DPR_BY_MODE[performanceMode];

  return (
    <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
      <Canvas
        dpr={dpr}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <InkPlane speed={speed} isLightTheme={theme === "light"} />
      </Canvas>
    </div>
  );
}
