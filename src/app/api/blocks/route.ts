import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  const blocksDir = path.join(process.cwd(), "public/vanilla/");
  const files = fs.readdirSync(blocksDir);

  const blocks = files
    .filter((file) => file.endsWith(".png"))
    .map((file) => ({
      id: file.replace(".png", ""),
      name: file.replace(/_/g, " ").replace(".png", ""),
      texture: `/vanilla/${file}`,
      category: "unknown", // Could be determined based on filename or another method
    }));

  return NextResponse.json(blocks);
}
