'use client';

import Link from 'next/link';
import { Crown, Flame, LineChart, Swords } from 'lucide-react';
import { BrandLogo } from '@/components/layout/BrandLogo';

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-[linear-gradient(180deg,rgba(6,6,6,0.88),rgba(6,6,6,0.62))] backdrop-blur-xl">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        <BrandLogo />
        <div className="hidden items-center gap-2 md:flex">
          <Link href="/play" className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-2 text-sm text-white transition duration-200 hover:-translate-y-0.5 hover:border-[#ff1a00]/30 hover:bg-[#ff1a00]/10 hover:shadow-[0_0_18px_rgba(255,26,0,0.15)]">
            <Swords className="h-4 w-4 text-[#ff6b6b]" /> Play
          </Link>
          <Link href="/puzzles" className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-2 text-sm text-white transition duration-200 hover:-translate-y-0.5 hover:border-[#ff1a00]/30 hover:bg-[#ff1a00]/10 hover:shadow-[0_0_18px_rgba(255,26,0,0.15)]">
            <Flame className="h-4 w-4 text-[#ff6b6b]" /> Puzzles
          </Link>
          <Link href="/leaderboard" className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-2 text-sm text-white transition duration-200 hover:-translate-y-0.5 hover:border-[#ff1a00]/30 hover:bg-[#ff1a00]/10 hover:shadow-[0_0_18px_rgba(255,26,0,0.15)]">
            <LineChart className="h-4 w-4 text-[#ff6b6b]" /> Leaderboard
          </Link>
          <Link href="/upgrade" className="inline-flex items-center gap-2 rounded-full border border-[#ff1a00]/30 bg-[linear-gradient(180deg,rgba(255,26,0,0.18),rgba(255,26,0,0.06))] px-4 py-2 text-sm font-semibold text-white shadow-[0_0_18px_rgba(255,26,0,0.12)] transition duration-200 hover:-translate-y-0.5 hover:border-[#ff1a00]/50 hover:shadow-[0_0_26px_rgba(255,26,0,0.2)]">
            <Crown className="h-4 w-4" /> Pro
          </Link>
        </div>
      </nav>
    </header>
  );
}
