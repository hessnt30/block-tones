"use client";

import * as THREE from "three";
import { useEffect, useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import image from "../vanilla/stripped_spruce_log_top.png";

export default function MinecraftScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    camera.position.set(5, 5, 10);
    controls.update();

    // Basic lighting
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 10, 10).normalize();
    scene.add(light);

    // Load texture
    const loader = new THREE.TextureLoader();
    const texture = loader.load("/vanilla/stripped_spruce_log_top.png");

    // Create a simple house
    const house = new THREE.Group();

    const createBlock = (
      x: number,
      y: number,
      z: number,
      texture: THREE.Texture,
      type: string
    ) => {
      let depth = 0;
      let width = 0;
      let height = 0;
      if (type === "block") {
        depth = 1;
        width = 1;
        height = 1;
      } else if (type === "slab") {
        depth = 1;
        width = 1;
        height = 0.5;
      }
      const geometry = new THREE.BoxGeometry(width, height, depth);
      const material = new THREE.MeshStandardMaterial({ map: texture });
      const shape = new THREE.Mesh(geometry, material);
      shape.position.set(x, y, z);
      return shape;
    };

    // Simple structure (walls)
    for (let x = 0; x < 5; x++) {
      for (let y = 0; y < 5; y++) {
        for (let z = 0; z < 5; z++) {
          house.add(createBlock(x, 0, z, texture, "block")); // Floor
          if (y === 4) {
            house.add(createBlock(x, y - 0.25, z, texture, "slab")); // roof
          } else if (x === 0) {
            house.add(createBlock(x, y, z, texture, "block")); // wall
          } else if (x === 4) {
            house.add(createBlock(x, y, z, texture, "block")); // wall
          } else if (z === 0 || z === 4) {
            house.add(createBlock(x, y, z, texture, "block")); // wall
          }
        }
      }
    }

    scene.add(house);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Resize handling
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} />;
}
