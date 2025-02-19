"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef } from "react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const tabs = [
  { value: "saved", label: "Saved" },
  { value: "top-picks", label: "Top Picks" },
  { value: "recently-added", label: "Recently Added" },
  { value: "trending", label: "Trending" },
  { value: "dev-choice", label: "Dev Choice" },
  { value: "unique", label: "Unique" },
  { value: "hidden-gems", label: "Hidden Gems" },
  { value: "modern", label: "Modern" },
  { value: "medieval", label: "Medieval" },
  { value: "fantasy", label: "Fantasy" },
  { value: "sci-fi", label: "Sci-Fi" },
  { value: "natural", label: "Natural" },
  { value: "vibrant", label: "Vibrant" },
  { value: "pastel", label: "Pastel" },
  { value: "monochrome", label: "Monochrome" },
]

export function PaletteTabs() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return
    const scrollAmount = 200
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="absolute -left-4 top-1/2 z-10 size-8 -translate-y-1/2 rounded-full bg-zinc-900/50 backdrop-blur-sm"
        onClick={() => scroll("left")}
      >
        <ChevronLeft className="size-4" />
      </Button>
      <div ref={scrollRef} className="no-scrollbar mask-horizontal overflow-x-auto scroll-smooth">
        <Tabs defaultValue="saved" className="w-full">
          <TabsList className="inline-flex w-auto gap-2 bg-transparent p-0">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="rounded-full data-[state=active]:bg-zinc-800">
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-1/2 z-10 size-8 -translate-y-1/2 rounded-full bg-zinc-900/50 backdrop-blur-sm"
        onClick={() => scroll("right")}
      >
        <ChevronRight className="size-4" />
      </Button>
    </div>
  )
}

