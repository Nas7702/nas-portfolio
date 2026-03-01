"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useDemandDrivenAnimation } from "@/hooks/useDemandDrivenAnimation";
import { useSceneVisibility } from "@/hooks/useSceneVisibility";
import { useTheme } from "./ThemeProvider";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

// 3-octave variant — lighter than the hero's 5-octave version.
// Stripped of sparkle and sun rays; just the base turbulent smoke.
const fragmentShader = `
  precision mediump float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec3 uColourA;
  uniform vec3 uColourB;
  uniform float uIntensity;

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
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 3; i++) {
      value += amplitude * noise(p);
      p = p * 2.03;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    float t = uTime;
    float aspect = uResolution.x / uResolution.y;
    vec2 centred = (vUv - 0.5) * vec2(aspect, 1.0);

    vec2 warp = vec2(
      fbm(centred * 1.1 + vec2(t * 0.18, -t * 0.14)),
      fbm(centred * 1.1 + vec2(-t * 0.12, t * 0.16))
    ) - 0.5;
    vec2 flowUv = centred + warp * 0.28;

    float base = fbm(flowUv * 2.4 + vec2(t * 0.18, -t * 0.14));
    float detail = fbm(flowUv * 4.2 + vec2(-t * 0.10, t * 0.16));
    float ink = smoothstep(0.22, 0.80, base * 0.62 + detail * 0.38);

    vec3 colour = mix(uColourA, uColourB, ink * uIntensity);

    // Radial fade — in UV space this is circular, which in a portrait-oriented
    // canvas translates to a tall oval in screen space. Allows a gentle halo
    // to bleed past the figure's edges where the PNG is transparent.
    float dist = length(vUv - 0.5) * 2.0;
    float edgeMask = smoothstep(1.35, 0.25, dist);

    gl_FragColor = vec4(colour, ink * 0.25 * edgeMask);
  }
`;

interface SmokePlaneProps {
  isLightTheme: boolean;
  active: boolean;
}

function SmokePlane({ isLightTheme, active }: SmokePlaneProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size, invalidate } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uColourA: { value: new THREE.Color(0.023, 0.024, 0.027) },
      uColourB: { value: new THREE.Color(0.14, 0.15, 0.19) },
      uIntensity: { value: 0.8 },
    }),
    []
  );

  useEffect(() => {
    uniforms.uResolution.value.set(size.width, size.height);
    invalidate();
  }, [size.width, size.height, uniforms, invalidate]);

  useEffect(() => {
    if (isLightTheme) {
      uniforms.uColourA.value.setRGB(0.935, 0.930, 0.921);
      uniforms.uColourB.value.setRGB(0.70, 0.68, 0.65);
      uniforms.uIntensity.value = 0.62;
    } else {
      uniforms.uColourA.value.setRGB(0.023, 0.024, 0.027);
      uniforms.uColourB.value.setRGB(0.14, 0.15, 0.19);
      uniforms.uIntensity.value = 0.80;
    }
    invalidate();
  }, [isLightTheme, uniforms, invalidate]);

  const handleStep = useCallback(
    (deltaSeconds: number) => {
      if (!materialRef.current) return;
      // 0.07 — roughly half the hero's minimum speed
      materialRef.current.uniforms.uTime.value += deltaSeconds * 0.07;
      invalidate();
    },
    [invalidate]
  );

  useDemandDrivenAnimation({
    enabled: active,
    maxFps: 30,
    onStep: handleStep,
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

export function PortraitSmoke() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { theme } = useTheme();
  const isVisible = useSceneVisibility(containerRef, {
    disableWhenHidden: true,
    rootMargin: "100px 0px",
  });

  const isLightTheme = theme === "light";
  const active = isVisible && !prefersReduced;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {!prefersReduced && (
        <Canvas
          frameloop="demand"
          dpr={[1, 1]}
          gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        >
          <SmokePlane isLightTheme={isLightTheme} active={active} />
        </Canvas>
      )}
    </div>
  );
}
