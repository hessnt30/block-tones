"use client"

import { Search } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MinecraftScene } from "@/components/minecraft-scene"
import { PaletteGrid } from "@/components/palette-grid"
import { PaletteTabs } from "@/components/palette-tabs"
import { SelectedPalette } from "@/components/selected-palette"
import { SuggestedPalettes } from "@/components/suggested-palettes"

export default function Page() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <header className="border-b border-zinc-800 bg-zinc-900/50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="size-8 rounded bg-gradient-to-br from-indigo-500 to-purple-500" />
              <div>
                <h1 className="text-lg font-bold text-white">BlockTones</h1>
                <p className="text-xs text-zinc-400">Mix. Match. Build.</p>
              </div>
            </Link>
            <div className="relative w-[300px]">
              <Search className="absolute left-2 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
              <Input className="pl-8" placeholder="Search palettes..." />
            </div>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-sm text-white hover:text-zinc-300">
              Home
            </Link>
            <Link href="/about" className="text-sm text-white hover:text-zinc-300">
              About
            </Link>
            <Link href="/create" className="text-sm text-white hover:text-zinc-300">
              Create
            </Link>
            <Button>Sign In</Button>
          </nav>
        </div>
      </header>
      <main className="container grid flex-1 gap-6 py-6 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="h-[500px] rounded-lg border border-zinc-800 bg-zinc-900">
            <MinecraftScene />
          </div>
          <SelectedPalette />
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-white">Suggestions</h2>
            <SuggestedPalettes />
          </div>
        </div>
        <div className="space-y-6">
          <PaletteTabs />
          <PaletteGrid />
        </div>
      </main>
    </div>
  )
}

