"use client";

import { Heart, Share2, User } from "lucide-react";

import { Button } from "@/components/ui/button";

export function SelectedPalette() {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-white">Nether Loving</h2>
          <div className="flex items-center gap-2">
            <User className="size-4 text-zinc-400" />
            <span className="text-sm text-zinc-400">littlemcgee</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Heart className="size-4 text-zinc-400" />
            <span className="text-sm text-zinc-400">4.3k</span>
          </div>
          <Button variant="ghost" size="icon">
            <Share2 className="size-4" />
          </Button>
        </div>
      </div>
      <div className="mb-4 grid grid-cols-5 gap-3">
        {["#FF0000", "#8B0000", "#FF3030", "#FF4040", "#FF1111"].map(
          (color) => (
            <div
              key={color}
              className="group relative aspect-square cursor-pointer rounded-md"
              style={{ backgroundColor: color }}
            >
              <div className="absolute inset-0 flex items-center justify-center rounded-md bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="text-xs font-mono text-white">{color}</span>
              </div>
            </div>
          )
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {["nether", "red", "survival-friendly", "fun"].map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-zinc-800 px-2 py-1 text-xs text-zinc-400"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
