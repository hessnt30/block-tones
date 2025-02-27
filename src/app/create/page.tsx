"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BlockPicker } from "@/components/block-picker";
import { MinecraftScene } from "@/components/minecraft-scene";
import { useSelectedPaletteStore } from "@/zustand/useSelectedPaletteStore";
import { Palette } from "@/types";
import Image from "next/image";

export default function CreatePage() {
  const { selectedPalette, setPalette } = useSelectedPaletteStore();
  const [paletteName, setPaletteName] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const updateBlock = (key: keyof Palette, texture: string) => {
    if (!selectedPalette) return;
    setPalette({ ...selectedPalette, [key]: texture });
  };

  const clearBlock = (key: keyof Palette) => {
    if (!selectedPalette) return;
    setPalette({ ...selectedPalette, [key]: "" });
  };

  const addTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim() && tags.length < 8) {
      setTags([...tags, tagInput.trim().toLowerCase()]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = () => {
    console.log({
      name: paletteName,
      palette: selectedPalette,
      tags,
    });
  };

  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Create New Palette</h1>
        <p className="text-zinc-400">
          Select textures for different parts of your Minecraft palette.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="space-y-4">
            <Label htmlFor="name">Palette Name</Label>
            <Input
              id="name"
              value={paletteName}
              onChange={(e) => setPaletteName(e.target.value)}
              placeholder="Enter a name for your palette"
              className="max-w-md"
            />
          </div>
          <div className="space-y-4">
            <Label>Selected Blocks</Label>
            <div className="grid grid-cols-5 gap-2">
              {selectedPalette &&
                Object.entries(selectedPalette).map(([key, texture]) => (
                  <div
                    key={key}
                    className="relative aspect-square rounded-lg border-2 border-dashed border-zinc-800 bg-zinc-900"
                  >
                    {texture ? (
                      <>
                        <Image
                          src={`/vanilla/${texture}`}
                          alt={key}
                          width={16}
                          height={16}
                          className="w-full h-full image-rendering-pixelated rounded-lg"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute -right-2 -top-2 size-6 rounded-full bg-zinc-950"
                          onClick={() =>
                            clearBlock(key as keyof typeof selectedPalette)
                          }
                        >
                          <X className="size-4" />
                        </Button>
                        <span>{key}</span>
                      </>
                    ) : (
                      <div className="flex size-full items-center justify-center text-zinc-600">
                        <Plus className="size-4" />
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
          <div className="space-y-4">
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 rounded-full bg-zinc-800 px-2 py-1 text-sm text-zinc-300"
                >
                  {tag}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-4"
                    onClick={() => removeTag(tag)}
                  >
                    <X className="size-3" />
                  </Button>
                </span>
              ))}
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={addTag}
                placeholder="Add a tag..."
                className="!mt-0 w-32 flex-grow"
              />
            </div>
          </div>
          <Button
            className="w-full max-w-md"
            disabled={!paletteName || tags.length === 0}
            onClick={handleSubmit}
          >
            Create Palette
          </Button>
        </div>
        <div className="space-y-6">
          <div className="h-[500px] rounded-lg border bg-background">
            <MinecraftScene />
          </div>
          <BlockPicker />
        </div>
      </div>
    </div>
  );
}
