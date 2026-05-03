'use client';

import Link from 'next/link';
import { Crown } from 'lucide-react';

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-red-900/30 bg-black/70 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        <Link href="/" className="neon-heading text-xl font-black text-white md:text-2xl">
          CHECKMATE.GG
        </Link>
        <div className="flex items-center gap-4 text-sm text-textSecondary">
          <Link href="/play" className="transition hover:text-neonRed">
            Play
          </Link>
          <Link href="/puzzles" className="transition hover:text-neonRed">
            Puzzles
          </Link>
          <Link href="/leaderboard" className="transition hover:text-neonRed">
            Leaderboard
          </Link>
          <Link href="/upgrade" className="inline-flex items-center gap-1 rounded-full border border-red-500/30 px-3 py-1 text-neonRed">
            <Crown className="h-4 w-4" /> Pro
          </Link>
        </div>
      </nav>
    </header>
  );
}
