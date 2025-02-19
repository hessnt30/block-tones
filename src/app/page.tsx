"use client";

import { Search } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MinecraftScene } from "@/components/minecraft-scene";
import { PaletteGrid } from "@/components/palette-grid";
import { PaletteTabs } from "@/components/palette-tabs";
import { SelectedPalette } from "@/components/selected-palette";
import { SuggestedPalettes } from "@/components/suggested-palettes";

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container grid flex-1 gap-6 py-6 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="h-[500px] rounded-lg border bg-background">
            <MinecraftScene />
          </div>
          <SelectedPalette />
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Suggestions</h2>
            <SuggestedPalettes />
          </div>
        </div>
        <div className="space-y-6">
          <PaletteTabs />
          <PaletteGrid />
        </div>
      </main>
    </div>
  );
}
