"use client";

import { OrbitControls, useTexture } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import * as THREE from "three";

export function MinecraftScene() {
  return (
    <Canvas shadows camera={{ position: [10, 10, 10], fov: 25 }}>
      <Suspense fallback={null}>
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

function MinecraftBlock({
  position,
  texture,
}: {
  position: [number, number, number];
  texture: string;
}) {
  const tex = useTexture(texture);

  return (
    <mesh castShadow receiveShadow position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial map={tex} />
    </mesh>
  );
}

function MinecraftSlab({
  position,
  texture,
}: {
  position: [number, number, number];
  texture: string;
}) {
  const tex = useTexture(texture);

  return (
    <mesh castShadow receiveShadow position={position}>
      <boxGeometry args={[1, 0.5, 1]} />
      <meshStandardMaterial map={tex} />
    </mesh>
  );
}

function MinecraftStair({
  position,
  texture,
}: {
  position: [number, number, number];
  texture: string;
}) {
  const tex = useTexture(texture);

  return (
    <mesh castShadow receiveShadow position={position}>
      <boxGeometry args={[0.5, 0.5, 1]} />
      <meshStandardMaterial map={tex} />
    </mesh>
  );
}

function MinecraftDoorTop({
  position,
  texture,
}: {
  position: [number, number, number];
  texture: string;
}) {
  const tex = useTexture(texture);

  return (
    <mesh castShadow receiveShadow position={position}>
      <boxGeometry args={[1, 1, 0.25]} />
      <meshStandardMaterial map={tex} />
    </mesh>
  );
}

function MinecraftDoorBottom({
  position,
  texture,
}: {
  position: [number, number, number];
  texture: string;
}) {
  const tex = useTexture(texture);

  return (
    <mesh castShadow receiveShadow position={position}>
      <boxGeometry args={[1, 1, 0.25]} />
      <meshStandardMaterial map={tex} />
    </mesh>
  );
}

function MinecraftHouse() {
  const textures = {
    wood: "/vanilla/oak_planks.png",
    stone: "/vanilla/stone.png",
    cobble_stone: "/vanilla/cobblestone.png",
    stone_bricks: "/vanilla/stone_bricks.png",
    glass: "/vanilla/glass.png",
    door_top: "/vanilla/oak_door_top.png",
    door_bottom: "/vanilla/oak_door_bottom.png",
  };

  const blocks = [];

  // Floor
  for (let x = 0; x < 6; x++) {
    for (let z = 0; z < 6; z++) {
      blocks.push(
        <MinecraftBlock
          key={`floor-${x}-${z}`}
          position={[x, 0, z]}
          texture={textures.stone_bricks}
        />
      );
    }
  }

  // Walls
  for (let y = 1; y < 5; y++) {
    for (let x = 0; x < 6; x++) {
      // leave hole in wall for door
      // if ((x === 2 || x === 3) && (y === 1 || y === 2)) continue;
      blocks.push(
        <MinecraftBlock
          key={`wall-x-${x}-${y}`}
          position={[x, y, 0]}
          texture={textures.wood}
        />
      );
      blocks.push(
        <MinecraftBlock
          key={`wall-x-${x}-${y}-back`}
          position={[x, y, 5]}
          texture={textures.wood}
        />
      );
    }
    for (let z = 1; z < 5; z++) {
      blocks.push(
        <MinecraftBlock
          key={`wall-z-${z}-${y}`}
          position={[0, y, z]}
          texture={textures.wood}
        />
      );
      blocks.push(
        <MinecraftBlock
          key={`wall-z-${z}-${y}-right`}
          position={[5, y, z]}
          texture={textures.wood}
        />
      );
    }
  }

  for (let y = 5; y < 7; y++) {
    if (y == 5) {
      for (let x = 1; x < 5; x++) {
        blocks.push(
          <MinecraftBlock
            key={`top-wall-z-${x}-${y}-${0}`}
            position={[x, y, 0]}
            texture={textures.wood}
          />
        );

        blocks.push(
          <MinecraftBlock
            key={`top-wall-z-${x}-${y}-${5}-back`}
            position={[x, y, 5]}
            texture={textures.wood}
          />
        );
      }
    }

    if (y === 6) {
      for (let x = 2; x < 4; x++) {
        blocks.push(
          <MinecraftBlock
            key={`top-wall-z-${x}-${y}-${0}`}
            position={[x, y, 0]}
            texture={textures.wood}
          />
        );

        blocks.push(
          <MinecraftBlock
            key={`top-wall-z-${x}-${y}-${5}-back`}
            position={[x, y, 5]}
            texture={textures.wood}
          />
        );
      }
    }
  }

  // Roof -- rightside
  for (let x = 0; x < 1; x++) {
    for (let y = 5; y <= 7; y++) {
      for (let z = -1; z < 7; z++) {
        blocks.push(
          <MinecraftSlab
            key={`slab-roof-${x}-${y}-${z}`}
            position={[x + (y - 5), y - 0.25, z]}
            texture={textures.cobble_stone}
          />
        );

        blocks.push(
          <MinecraftStair
            key={`stair-roof-${x}-${y}-${z}`}
            position={[x + (y - 5) + 0.25, y + 0.25, z]}
            texture={textures.cobble_stone}
          />
        );
      }
    }
  }

  for (let x = 1; x < 2; x++) {
    for (let y = 5; y < 7; y++) {
      for (let z = -1; z < 7; z++) {
        blocks.push(
          <MinecraftSlab
            key={`slab-roof-${x}-${y}-${z}`}
            position={[x + (y - 5), y + 0.25, z]}
            texture={textures.cobble_stone}
          />
        );

        blocks.push(
          <MinecraftStair
            key={`stair-roof-${x}-${y}-${z}`}
            position={[x + (y - 5) - 0.25, y - 0.25, z]}
            texture={textures.cobble_stone}
          />
        );
      }
    }
  }

  // Roof -- leftside
  for (let x = 5; x < 6; x++) {
    for (let y = 5; y <= 7; y++) {
      for (let z = -1; z < 7; z++) {
        blocks.push(
          <MinecraftSlab
            key={`slab-roof-${x}-${y}-${z}`}
            position={[x - (y - 5), y - 0.25, z]}
            texture={textures.cobble_stone}
          />
        );
        blocks.push(
          <MinecraftStair
            key={`stair-roof-${x}-${y}-${z}`}
            position={[x - (y - 5) - 0.25, y + 0.25, z]}
            texture={textures.cobble_stone}
          />
        );
      }
    }
  }

  for (let x = 4; x < 5; x++) {
    for (let y = 5; y < 7; y++) {
      for (let z = -1; z < 7; z++) {
        blocks.push(
          <MinecraftSlab
            key={`slab-roof-${x}-${y}-${z}`}
            position={[x - (y - 5), y + 0.25, z]}
            texture={textures.cobble_stone}
          />
        );
        blocks.push(
          <MinecraftStair
            key={`stair-roof-${x}-${y}-${z}`}
            position={[x - (y - 5) + 0.25, y - 0.25, z]}
            texture={textures.cobble_stone}
          />
        );
      }
    }
  }

  // Roof - apex
  for (let z = -1; z < 6; z++) {
    blocks.push(
      <MinecraftSlab
        key={`slab-roof-${2}-${7}-${z}`}
        position={[2, 7 - 0.25, z]}
        texture={textures.cobble_stone}
      />
    );

    // console.log("placed block at ", x + (y - 5), y + 0.25);
  }

  // Door
  blocks.push(
    <MinecraftDoorTop
      key="door1-top"
      position={[2, 2, -0.4]}
      texture={textures.door_top}
    />
  );
  blocks.push(
    <MinecraftDoorBottom
      key="door1-bottom"
      position={[2, 1, -0.4]}
      texture={textures.door_bottom}
    />
  );
  blocks.push(
    <MinecraftDoorTop
      key="door2-top"
      position={[3, 2, -0.4]}
      texture={textures.door_top}
    />
  );

  blocks.push(
    <MinecraftDoorBottom
      key="door2-bottom"
      position={[3, 1, -0.4]}
      texture={textures.door_bottom}
    />
  );

  // Windows
  blocks.push(
    <MinecraftBlock
      key="window-left"
      position={[1, 2, 0]}
      texture={textures.glass}
    />
  );
  blocks.push(
    <MinecraftBlock
      key="window-right"
      position={[4, 2, 0]}
      texture={textures.glass}
    />
  );

  return <group>{blocks}</group>;
}
