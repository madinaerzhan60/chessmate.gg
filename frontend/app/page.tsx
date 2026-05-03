'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { NeonButton } from '@/components/ui/NeonButton';
import { NeonCard } from '@/components/ui/NeonCard';

const features = [
  { title: 'AI Coach', description: 'Groq-powered post-game analysis and plans.' },
  { title: 'Real-time Battles', description: 'Socket rooms with low-latency multiplayer.' },
  { title: 'Daily Puzzles', description: 'Streaks, tactical themes, and progression.' },
  { title: 'Chess Passport', description: 'Your story in data and opening insights.' }
];

export default function HomePage() {
  return (
    <div className="space-y-10 pb-12">
      <section className="relative overflow-hidden rounded-2xl border border-red-900/30 bg-gradient-to-b from-[#12060a] to-[#080808] p-8 md:p-14">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="neon-heading flicker text-4xl font-black md:text-7xl"
        >
          CHECKMATE.GG
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mt-4 text-lg text-textSecondary md:text-2xl"
        >
          Chess. Evolved. Powered by AI.
        </motion.p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/play">
            <NeonButton>PLAY NOW →</NeonButton>
          </Link>
          <NeonButton variant="secondary">WATCH DEMO ▶</NeonButton>
        </div>
        <p className="mt-6 text-sm text-[#ff4b6b]">🔴 2,341 players online | 847 games in progress</p>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <motion.div key={feature.title} whileHover={{ y: -4, rotateX: 3, rotateY: -3 }} transition={{ duration: 0.2 }}>
            <NeonCard className="h-full">
              <h3 className="font-[Orbitron] text-lg text-[#ff3359]">{feature.title}</h3>
              <p className="mt-2 text-sm text-textSecondary">{feature.description}</p>
              <p className="mt-6 font-mono text-xs text-red-400/70">MODULE {String(index + 1).padStart(2, '0')}</p>
            </NeonCard>
          </motion.div>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <NeonCard>
          <h2 className="font-[Orbitron] text-xl text-[#ff3359]">Leaderboard Preview</h2>
          <ul className="mt-3 space-y-2 text-sm text-textSecondary">
            <li>1. NeonKnight — 2489</li>
            <li>2. TalProtocol — 2430</li>
            <li>3. EndgameLab — 2391</li>
            <li>4. SicilianX — 2345</li>
            <li>5. CaroCyber — 2310</li>
          </ul>
        </NeonCard>
        <NeonCard>
          <h2 className="font-[Orbitron] text-xl text-[#ff3359]">Free vs Pro</h2>
          <p className="mt-3 text-sm text-textSecondary">Free: core play + limited analysis.</p>
          <p className="text-sm text-textSecondary">Pro: unlimited multiplayer, full coach styles, premium themes.</p>
          <Link href="/upgrade" className="mt-4 inline-block">
            <NeonButton>See Pricing</NeonButton>
          </Link>
        </NeonCard>
      </section>
    </div>
  );
}
