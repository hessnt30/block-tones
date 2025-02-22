import { Search } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { ThemeSwitcher } from "./theme-switcher";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="border-b bg-background flex flex-1 justify-center">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="size-8 rounded bg-gradient-to-br from-indigo-500 to-purple-500" />
            <div>
              <h1 className="text-lg font-bold">BlockTones</h1>
              <p className="text-xs text-foreground-muted">
                Mix. Match. Build.
              </p>
            </div>
          </Link>
          <div className="relative w-[300px]">
            <Search className="absolute left-2 top-1/2 size-4 -translate-y-1/2" />
            <Input className="pl-8" placeholder="Search palettes..." />
          </div>
        </div>
        <nav className="flex items-center gap-6">
          <ThemeSwitcher />

          <Link href="/" className="text-sm ">
            Home
          </Link>
          <Link href="/about" className="text-sm ">
            About
          </Link>
          <Link href="/create" className="text-sm ">
            Create
          </Link>
          {/* <Button>Sign In</Button> */}
          <div>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </nav>
      </div>
    </header>
  );
}
