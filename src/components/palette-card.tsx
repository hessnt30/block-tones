"use client";

import { format } from "date-fns";
import { Heart, User } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useSelectedPaletteStore } from "@/zustand/useSelectedPaletteStore";

type PaletteCard = {
  id: number;
  title: string;
  author: string;
  likes: string;
  palette: {
    wall: string;
    base: string;
    roof: string;
    door: string;
    frame: string;
  };
  tags: string[];
  createdAt: Date;
};

type PaletteCardProps = {
  paletteCard: PaletteCard;
};

export function PaletteCard({ paletteCard }: PaletteCardProps) {
  const setPalette = useSelectedPaletteStore((state) => state.setPalette);

  return (
    <div className="rounded-lg border bg-background p-3">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <User className="size-3 text-foreground-muted" />
          <span className="text-xs text-foreground-muted">
            {paletteCard.author}
          </span>
          <span className="text-xs text-foreground-muted">
            {format(paletteCard.createdAt, "MMM d, yyyy")}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Heart className="size-3 text-foreground-muted" />
          <span className="text-xs text-foreground-muted">
            {paletteCard.likes}
          </span>
        </div>
      </div>

      <div className="mb-3 grid grid-cols-5 gap-1.5">
        {Object.values(paletteCard.palette).map((block) => (
          <div
            key={block}
            className="aspect-square rounded overflow-hidden"
            title={block}
          >
            <Image
              src={`/vanilla/${block}`}
              alt={block}
              width={16}
              height={16}
              className="w-full h-full image-rendering-pixelated"
            />
          </div>
        ))}
      </div>

      <div className="mb-3">
        <h3 className="text-sm font-medium text-foreground">
          {paletteCard.title}
        </h3>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {paletteCard.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-secondary px-1.5 py-0.5 text-xs text-secondary-accent"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <Button
        onClick={() => setPalette(paletteCard.palette)}
        variant="secondary"
        size="sm"
        className="w-full text-xs"
      >
        Try it out
      </Button>
    </div>
  );
}
