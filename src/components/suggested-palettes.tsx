"use client"

import { Heart, User } from "lucide-react"

export function SuggestedPalettes() {
  const suggestions = [
    {
      id: 1,
      title: "Crimson Forest",
      author: "netherking",
      likes: "2.1k",
      colors: ["#8B0000", "#800000", "#A52A2A", "#B22222", "#DC143C"],
    },
    {
      id: 2,
      title: "Basalt Deltas",
      author: "lavawalker",
      likes: "1.8k",
      colors: ["#696969", "#800000", "#A0522D", "#8B4513", "#CD853F"],
    },
  ]

  return (
    <div className="grid gap-3">
      {suggestions.map((palette) => (
        <div key={palette.id} className="flex items-center gap-4 rounded-lg border border-zinc-800 bg-zinc-900 p-3">
          <div className="flex flex-1 items-center gap-3">
            <div className="grid grid-cols-5 gap-1">
              {palette.colors.map((color) => (
                <div key={color} className="aspect-square w-6 rounded-sm" style={{ backgroundColor: color }} />
              ))}
            </div>
            <div>
              <h3 className="font-medium text-white">{palette.title}</h3>
              <div className="flex items-center gap-2">
                <User className="size-3 text-zinc-400" />
                <span className="text-xs text-zinc-400">{palette.author}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="size-3 text-zinc-400" />
            <span className="text-xs text-zinc-400">{palette.likes}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

