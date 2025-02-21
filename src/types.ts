export type Palette = {
  wall: string;
  base: string;
  roof: string;
  door: string;
  frame: string;
};

export type PaletteCard = {
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
