"use client";

import { format } from "date-fns";
import { Heart, User } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";

// Sample palette data
const palettes = [
  {
    id: 1,
    title: "Nether Loving",
    author: "littlemcgee",
    likes: "4.3k",
    colors: ["#FF0000", "#8B0000", "#FF3030", "#FF4040", "#FF1111"],
    tags: ["nether", "red", "survival-friendly", "fun"],
    createdAt: new Date("2024-02-15"),
  },
  {
    id: 2,
    title: "Desert Dreams",
    author: "blockmaster",
    likes: "2.1k",
    colors: ["#DAA520", "#D2691E", "#F4A460", "#DEB887", "#CD853F"],
    tags: ["desert", "warm", "natural"],
    createdAt: new Date("2024-02-14"),
  },
  // Add more palettes...
];

export function PaletteGrid() {
  return (
    <div className="grid gap-3">
      {palettes.map((palette) => (
        <div
          key={palette.id}
          className="rounded-lg border border-zinc-800 bg-zinc-900 p-3"
        >
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="size-3 text-zinc-400" />
              <span className="text-xs text-zinc-400">{palette.author}</span>
              <span className="text-xs text-zinc-500">
                {format(palette.createdAt, "MMM d, yyyy")}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="size-3 text-zinc-400" />
              <span className="text-xs text-zinc-400">{palette.likes}</span>
            </div>
          </div>
          <div className="mb-3 grid grid-cols-5 gap-1.5">
            {palette.colors.map((color) => (
              <div
                key={color}
                className="aspect-square rounded"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <div className="mb-3">
            <h3 className="text-sm font-medium text-white">{palette.title}</h3>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {palette.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <Button variant="secondary" size="sm" className="w-full text-xs">
            Try it out
          </Button>
        </div>
      ))}
    </div>
  );
}
