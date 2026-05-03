'use client';

import { useParams } from 'next/navigation';
import { HeatmapChart } from '@/components/profile/HeatmapChart';
import { OpeningStats } from '@/components/profile/OpeningStats';
import { AchievementBadge } from '@/components/profile/AchievementBadge';
import { EloChange } from '@/components/ui/EloChange';
import { PlayerCard } from '@/components/ui/PlayerCard';
import { PageFrame } from '@/components/layout/PageFrame';

export default function ProfilePage() {
  const { username } = useParams<{ username: string }>();

  return (
    <PageFrame
      eyebrow="PLAYER PROFILE"
      title={String(username)}
      description="A chess passport page styled to match the landing page's neon-red visual system."
    >
      <div className="space-y-4">
        <PlayerCard name={username} rating={1820} avatar="https://placehold.co/100x100" timer="10:00" />
        <div className="grid gap-4 md:grid-cols-2">
          <div className="neon-card border-white/5 bg-black/35 p-4">
            <h2 className="font-[Orbitron] text-xl text-[#ff3359]">Stats</h2>
            <p className="mt-2 text-sm text-textSecondary">Playing since 2024</p>
            <EloChange delta={12} />
          </div>
          <OpeningStats />
        </div>
        <HeatmapChart />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <AchievementBadge title="First Blood" unlocked />
          <AchievementBadge title="Puzzle Maniac" unlocked={false} />
          <AchievementBadge title="On Fire" unlocked />
          <AchievementBadge title="Grandmaster Grade" unlocked={false} />
        </div>
      </div>
    </PageFrame>
  );
}
