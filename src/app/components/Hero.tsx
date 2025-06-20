"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, OrbitControls } from "@react-three/drei";
import { useRef, useState } from "react";
import { Mesh } from "three";
import { useTheme } from "./ThemeProvider";

// Floating Code Snippet Component
function FloatingCode({ position, code, language, color }: {
  position: [number, number, number];
  code: string;
  language: string;
  color: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Float
      speed={0.8}
      rotationIntensity={0.3}
      floatIntensity={1}
      floatingRange={[-0.1, 0.1]}
    >
      <Text
        position={position}
        fontSize={hovered ? 0.3 : 0.25}
        color={hovered ? "#ffffff" : color}
        anchorX="center"
        anchorY="middle"
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        {code}
      </Text>

      {/* Language label */}
      <Text
        position={[position[0], position[1] - 0.4, position[2]]}
        fontSize={hovered ? 0.14 : 0.12}
        color={hovered ? "#ffffff" : color}
        anchorX="center"
        anchorY="middle"
      >
        {language}
      </Text>

      {/* Enhanced background plane for better readability */}
      <mesh position={[position[0], position[1], position[2] - 0.1]} scale={hovered ? 1.3 : 1.1}>
        <planeGeometry args={[2.0, 0.8]} />
        <meshBasicMaterial
          color={hovered ? "#1a1a2e" : "#0f172a"}
          transparent
          opacity={hovered ? 0.7 : 0.5}
        />
      </mesh>
    </Float>
  );
}

// Data Node Component
function DataNode({ position, color, size = 0.1 }: {
  position: [number, number, number];
  color: string;
  size?: number;
}) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * (hovered ? 1 : 0.5);
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * (hovered ? 0.3 : 0.1);
    }
  });

  return (
    <Float
      speed={hovered ? 1.5 : 1}
      rotationIntensity={hovered ? 0.8 : 0.5}
      floatIntensity={hovered ? 1.2 : 0.8}
    >
      <mesh
        ref={meshRef}
        position={position}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        scale={hovered ? 1.8 : 1}
      >
        <octahedronGeometry args={[size]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={hovered ? 0.9 : 0.7}
          emissive={color}
          emissiveIntensity={hovered ? 0.5 : 0.1}
          roughness={hovered ? 0.1 : 0.3}
          metalness={hovered ? 0.9 : 0.5}
        />
      </mesh>
    </Float>
  );
}

// Main Scene Component
function Scene() {
  // Code snippets with different languages - spread across full canvas
  const codeSnippets = [
    { code: "def analyze():", language: "Python", position: [-6, 4, -2] as [number, number, number], color: "#3b82f6" },
    { code: "SELECT *", language: "SQL", position: [6, 2, -3] as [number, number, number], color: "#1d4ed8" },
    { code: "const api", language: "JS", position: [-5, -2, 1] as [number, number, number], color: "#60a5fa" },
    { code: "import pd", language: "Python", position: [5, -3, -1] as [number, number, number], color: "#2563eb" },
    { code: "docker run", language: "Docker", position: [-7, 0, 2] as [number, number, number], color: "#1e40af" },
    { code: "git commit", language: "Git", position: [7, 3, 0] as [number, number, number], color: "#3730a3" },
    { code: "npm install", language: "Node", position: [0, 4, -2] as [number, number, number], color: "#4338ca" },
    { code: "from sklearn", language: "ML", position: [0, -4, 1] as [number, number, number], color: "#6366f1" },
  ];

  // Data visualization nodes - spread across full canvas with larger sizes
  const dataNodes = [
    { position: [0, 0, -4] as [number, number, number], color: "#6366f1", size: 0.3 },
    { position: [-3, 2, -3] as [number, number, number], color: "#4f46e5", size: 0.25 },
    { position: [3, -2, -3] as [number, number, number], color: "#22c55e", size: 0.2 },
    { position: [-4, -1, -2] as [number, number, number], color: "#16a34a", size: 0.18 },
    { position: [4, 1, -2] as [number, number, number], color: "#15803d", size: 0.22 },
    { position: [-2, 3, 1] as [number, number, number], color: "#10b981", size: 0.15 },
    { position: [2, -3, 2] as [number, number, number], color: "#059669", size: 0.17 },
  ];

  return (
    <>
      {/* Enhanced Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        color="#ffffff"
      />
      <pointLight position={[-10, -10, -10]} intensity={0.4} color="#6366f1" />
      <pointLight position={[10, 10, 10]} intensity={0.3} color="#22c55e" />

      {/* Floating Code Snippets */}
      {codeSnippets.map((snippet, index) => (
        <FloatingCode
          key={`code-${index}`}
          position={snippet.position}
          code={snippet.code}
          language={snippet.language}
          color={snippet.color}
        />
      ))}

      {/* Data Visualization Nodes */}
      {dataNodes.map((node, index) => (
        <DataNode
          key={`node-${index}`}
          position={node.position}
          color={node.color}
          size={node.size}
        />
      ))}

      {/* Camera Controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.2}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </>
  );
}

// Main Hero Component
export default function Hero() {
  const { mounted } = useTheme();

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <div className="w-full h-[70vh] relative overflow-hidden -mt-16 pt-16 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">
              Hi, I'm Nas
            </h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[70vh] relative overflow-hidden -mt-16 pt-16 bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Three.js Canvas */}
      <Canvas
        camera={{
          position: [0, 0, 10],
          fov: 75
        }}
        className="w-full h-full"
        gl={{
          antialias: true,
          alpha: true
        }}
      >
        <Scene />
      </Canvas>

      {/* Overlay content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center z-10">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 text-white drop-shadow-lg">
            Hi, I'm Nas
          </h1>
          <p className="text-lg md:text-xl mb-2 text-white/85 drop-shadow-md">
            BEng Computer Science (Software Engineering)
          </p>

          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-center gap-4">
              <div className="h-px bg-blue-400/60 flex-1 max-w-16"></div>
              <p className="text-lg md:text-xl text-blue-300 drop-shadow-md font-medium">
                Data Science | Software Engineering
              </p>
              <div className="h-px bg-blue-400/60 flex-1 max-w-16"></div>
            </div>

            <div className="flex items-center justify-center gap-4">
              <div className="h-px bg-green-400/60 flex-1 max-w-16"></div>
              <p className="text-lg md:text-xl text-green-300 drop-shadow-md font-medium">
                Videographer | Content Creator
              </p>
              <div className="h-px bg-green-400/60 flex-1 max-w-16"></div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px bg-gradient-to-r from-blue-400/40 via-green-400/60 to-blue-400/40 flex-1 max-w-24"></div>
            <div className="text-center">
              <p className="text-lg md:text-xl text-white/80 drop-shadow-md mb-1">
                Currently at
              </p>
              <a
                href="https://www.stancefitness.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl md:text-2xl bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent drop-shadow-md font-semibold hover:from-purple-400 hover:via-fuchsia-400 hover:to-pink-400 hover:underline underline-offset-4 transition-all duration-200 pointer-events-auto group"
              >
                Stance Fitness
                <span className="inline-block ml-1 text-sm bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent opacity-70 group-hover:opacity-100 transition-opacity">↗</span>
              </a>
            </div>
            <div className="h-px bg-gradient-to-r from-blue-400/40 via-green-400/60 to-blue-400/40 flex-1 max-w-24"></div>
          </div>

          <p className="text-lg md:text-xl text-white/80 drop-shadow-md">
            Data Scientist & Social Media Marketing
          </p>
        </div>
      </div>

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none" />
    </div>
  );
}
