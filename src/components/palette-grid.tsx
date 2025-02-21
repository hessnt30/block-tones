"use client";

import { PaletteCard } from "@/components/palette-card";

// Sample palette data
const palettes = [
  {
    id: 1,
    title: "Medieval Cool",
    author: "littlemcgee",
    likes: "4.3k",
    palette: {
      wall: "pale_oak_planks.png",
      base: "stone_bricks.png",
      roof: "deepslate_bricks.png",
      door: "dark_oak",
      frame: "stripped_dark_oak_log.png",
    },
    tags: ["medieval", "cool", "survival-friendly", "fun"],
    createdAt: new Date("2024-02-15"),
  },
  {
    id: 2,
    title: "Desert Dreams",
    author: "blockmaster",
    likes: "2.1k",
    palette: {
      wall: "spruce_planks.png",
      base: "cobblestone.png",
      roof: "deepslate_tiles.png",
      door: "spruce",
      frame: "stripped_dark_oak_log.png",
    },
    tags: ["desert", "warm", "natural"],
    createdAt: new Date("2024-02-14"),
  },
];

export function PaletteGrid() {
  return (
    <div className="grid gap-3">
      {palettes.map((palette) => (
        <PaletteCard key={palette.id} paletteCard={palette} />
      ))}
    </div>
  );
}
