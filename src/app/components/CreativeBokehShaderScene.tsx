"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { type PerformanceMode, usePerformanceMode } from "@/hooks/usePerformanceMode";
import { useTheme } from "./ThemeProvider";

const SPEED_BY_MODE: Record<PerformanceMode, number> = {
  high: 0.2,
  medium: 0.15,
  low: 0.11,
  minimal: 0.03,
};

const DPR_BY_MODE: Record<PerformanceMode, [number, number]> = {
  high: [1, 1.7],
  medium: [1, 1.4],
  low: [1, 1.2],
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
    for (int i = 0; i < 4; i++) {
      value += noise(p) * amplitude;
      p *= 2.02;
      amplitude *= 0.5;
    }
    return value;
  }

  float ellipseBlob(vec2 p, vec2 centre, vec2 radii, float angle) {
    vec2 q = rotate2D(angle) * (p - centre);
    vec2 n = q / radii;
    return exp(-dot(n, n) * 1.85);
  }

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

    for (int layer = 0; layer < 3; layer++) {
      float lf = float(layer);
      float depth = 0.34 + lf * 0.3;

      for (int i = 0; i < 16; i++) {
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

    float grain = hash11(dot(gl_FragCoord.xy, vec2(0.06711, 0.00583)) + t * 0.1) - 0.5;
    colour += grain * 0.01;

    gl_FragColor = vec4(colour, uAlpha);
  }
`;

interface BokehPlaneProps {
  speed: number;
  isLightTheme: boolean;
}

function BokehPlane({ speed, isLightTheme }: BokehPlaneProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();

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
  }, [size.height, size.width, uniforms]);

  useEffect(() => {
    if (isLightTheme) {
      uniforms.uBaseWarm.value.setRGB(0.92, 0.92, 0.93);
      uniforms.uBaseCool.value.setRGB(0.89, 0.9, 0.93);
      uniforms.uLightWarm.value.setRGB(0.42, 0.62, 0.58);
      uniforms.uLightCool.value.setRGB(0.52, 0.57, 0.67);
      uniforms.uLightNeutral.value.setRGB(0.96, 0.97, 0.98);
      uniforms.uAlpha.value = 0.52;
      return;
    }

    uniforms.uBaseWarm.value.setRGB(0.045, 0.048, 0.053);
    uniforms.uBaseCool.value.setRGB(0.042, 0.047, 0.055);
    uniforms.uLightWarm.value.setRGB(0.2, 0.42, 0.39);
    uniforms.uLightCool.value.setRGB(0.27, 0.33, 0.42);
    uniforms.uLightNeutral.value.setRGB(0.8, 0.84, 0.89);
    uniforms.uAlpha.value = 0.74;
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

function BokehFallback({ isLightTheme }: { isLightTheme: boolean }) {
  const background = isLightTheme
    ? "linear-gradient(90deg, rgba(236,238,241,0.92) 0%, rgba(228,231,237,0.88) 100%)"
    : "linear-gradient(90deg, rgba(10,13,17,0.94) 0%, rgba(12,16,22,0.9) 100%)";

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

export function CreativeBokehShaderScene() {
  const performanceMode = usePerformanceMode();
  const prefersReduced = useReducedMotion();
  const { theme } = useTheme();
  const [webglAvailable, setWebglAvailable] = useState(true);

  useEffect(() => {
    setWebglAvailable(isWebGLSupported());
  }, []);

  const mode: PerformanceMode = prefersReduced ? "minimal" : performanceMode;
  const speed = SPEED_BY_MODE[mode];
  const dpr = DPR_BY_MODE[mode];
  const isLightTheme = theme === "light";

  if (!webglAvailable) {
    return <BokehFallback isLightTheme={isLightTheme} />;
  }

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <BokehFallback isLightTheme={isLightTheme} />
      <Canvas dpr={dpr} gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}>
        <BokehPlane speed={speed} isLightTheme={isLightTheme} />
      </Canvas>
    </div>
  );
}
