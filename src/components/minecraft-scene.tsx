"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";

export function MinecraftScene() {
  return (
    <Canvas shadows camera={{ position: [10, 10, 10], fov: 25 }}>
      <Suspense>
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <MinecraftHouse />
        <OrbitControls makeDefault />
        <color attach="background" args={["#1c1c1c"]} />
      </Suspense>
    </Canvas>
  );
}

function MinecraftHouse() {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.PI / 4;
  }, []);

  return (
    <group ref={groupRef}>
      {/* Base/Floor */}
      <mesh receiveShadow position={[0, -0.5, 0]}>
        <boxGeometry args={[10, 1, 10]} />
        <meshStandardMaterial color="#5c4433" />
      </mesh>

      {/* Walls */}
      {[-4, 4].map((x) => (
        <mesh key={x} castShadow position={[x, 2, 0]}>
          <boxGeometry args={[1, 4, 8]} />
          <meshStandardMaterial color="#c6c6c6" />
        </mesh>
      ))}
      {[-4, 4].map((z) => (
        <mesh key={z} castShadow position={[0, 2, z]}>
          <boxGeometry args={[8, 4, 1]} />
          <meshStandardMaterial color="#c6c6c6" />
        </mesh>
      ))}

      {/* Roof */}
      <mesh castShadow position={[0, 4.5, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[7, 3, 4]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>

      {/* Door */}
      <mesh castShadow position={[0, 1, 4.1]}>
        <boxGeometry args={[2, 3, 0.2]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>

      {/* Windows */}
      {[-2, 2].map((x) => (
        <mesh key={x} castShadow position={[x, 2, 4.1]}>
          <boxGeometry args={[1, 1, 0.1]} />
          <meshStandardMaterial color="#87ceeb" />
        </mesh>
      ))}
    </group>
  );
}
