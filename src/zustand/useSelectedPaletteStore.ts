import { create } from "zustand";
import { Palette } from "@/types";

type PaletteStore = {
  selectedPalette: Palette | null;
  setPalette: (palette: Palette) => void;
};

const defaultPalette = {
  wall: "oak_planks.png",
  base: "stone_bricks.png",
  roof: "cobblestone.png",
  door: "oak",
  frame: "oak_log.png",
};

export const useSelectedPaletteStore = create<PaletteStore>((set) => ({
  selectedPalette: defaultPalette,
  setPalette: (palette) => set({ selectedPalette: palette }),
}));
