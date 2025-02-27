import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

type Block = {
  id: string;
  name: string;
  texture: string;
};

export function BlockPicker() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [blocks, setBlocks] = useState<Block[]>([]);

  useEffect(() => {
    fetch("/api/blocks")
      .then((res) => res.json())
      .then((data) => setBlocks(data))
      .catch((err) => console.error("Error fetching blocks:", err));
  }, []);

  const filteredBlocks = blocks.filter((block) => {
    const matchesSearch = block.name
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900">
      <div className="border-b border-zinc-800 p-4">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search blocks..."
            className="pl-8"
          />
        </div>
      </div>
      <Tabs value={category} onValueChange={setCategory}>
        <TabsContent value={category} className="m-0">
          <div className="grid max-h-[400px] grid-cols-6 gap-2 overflow-y-auto p-4">
            {filteredBlocks.map((block) => (
              <button key={block.id} className="relative group">
                <div className="w-full aspect-square overflow-hidden">
                  <Image
                    src={block.texture}
                    alt={block.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover image-rendering-pixelated"
                  />
                </div>
                <div className="absolute bottom-0 left-0 w-full bg-black/70 text-white text-xs text-center opacity-0 transition-opacity group-hover:opacity-100">
                  {block.name}
                </div>
              </button>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
