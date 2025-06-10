"use client";

import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, Text } from "@react-three/drei";
import { useRef } from "react";
import { Mesh } from "three";

// Individual floating geometric shape component
function FloatingShape({ position, color, shape }: {
  position: [number, number, number];
  color: string;
  shape: 'box' | 'sphere' | 'torus' | 'octahedron';
}) {
  const meshRef = useRef<Mesh>(null);

  const renderShape = () => {
    switch (shape) {
      case 'box':
        return <boxGeometry args={[1, 1, 1]} />;
      case 'sphere':
        return <sphereGeometry args={[0.7, 32, 32]} />;
      case 'torus':
        return <torusGeometry args={[0.7, 0.3, 16, 32]} />;
      case 'octahedron':
        return <octahedronGeometry args={[0.8]} />;
    }
  };

  return (
    <Float
      speed={1.5}
      rotationIntensity={1}
      floatIntensity={2}
      floatingRange={[-0.1, 0.1]}
    >
      <mesh ref={meshRef} position={position}>
        {renderShape()}
        <meshStandardMaterial
          color={color}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
}

// Scene component containing all shapes
function Scene() {
  const shapes = [
    { position: [-4, 2, -2] as [number, number, number], color: "#ff6b6b", shape: "box" as const },
    { position: [4, -1, -1] as [number, number, number], color: "#4ecdc4", shape: "sphere" as const },
    { position: [-2, -2, 1] as [number, number, number], color: "#45b7d1", shape: "torus" as const },
    { position: [3, 3, -3] as [number, number, number], color: "#f9ca24", shape: "octahedron" as const },
    { position: [0, 0, -4] as [number, number, number], color: "#f0932b", shape: "box" as const },
    { position: [-3, 1, 2] as [number, number, number], color: "#eb4d4b", shape: "sphere" as const },
    { position: [2, -3, 0] as [number, number, number], color: "#6c5ce7", shape: "torus" as const },
    { position: [1, 2, 3] as [number, number, number], color: "#fd79a8", shape: "octahedron" as const },
  ];

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      {/* Floating shapes */}
      {shapes.map((shape, index) => (
        <FloatingShape
          key={index}
          position={shape.position}
          color={shape.color}
          shape={shape.shape}
        />
      ))}

      {/* Hero text */}
      <Float speed={0.5} rotationIntensity={0} floatIntensity={0.5}>
        <Text
          position={[0, 0, 0]}
          fontSize={2}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          maxWidth={10}
          textAlign="center"
        >
          Welcome to My Portfolio
        </Text>
      </Float>

      {/* Camera controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </>
  );
}

// Main Hero component
export default function Hero() {
  return (
    <div className="w-full h-[70vh] relative overflow-hidden -mt-16 pt-16">
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
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 drop-shadow-lg">
            Portfolio
          </h1>
          <p className="text-xl md:text-2xl text-white/90 drop-shadow-md">
            Creative Developer & Designer
          </p>
        </div>
      </div>

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none" />
    </div>
  );
}
