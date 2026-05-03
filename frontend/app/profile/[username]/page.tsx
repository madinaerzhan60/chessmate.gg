"use client";

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { HeatmapChart } from '@/components/profile/HeatmapChart';
import { OpeningStats } from '@/components/profile/OpeningStats';
import { AchievementBadge } from '@/components/profile/AchievementBadge';
import { EloChange } from '@/components/ui/EloChange';
import { PlayerCard } from '@/components/ui/PlayerCard';
import { PageFrame } from '@/components/layout/PageFrame';
import { api } from '@/lib/api';
import { getAccountName, getSavedGames, setAccountName, type SavedGameRecord } from '@/lib/gameArchive';

export default function ProfilePage() {
  const { username } = useParams<{ username: string }>();
  const routeName = String(username ?? 'guest');
  const [accountName, setLocalAccountName] = useState(routeName);
  const [savedGames, setSavedGames] = useState<SavedGameRecord[]>([]);
  const [profileRating, setProfileRating] = useState(1820);
  const [profileSummary, setProfileSummary] = useState('Local account dashboard.');

  useEffect(() => {
    const storedAccount = getAccountName();
    setLocalAccountName(storedAccount === 'Guest' ? routeName : storedAccount);
    setSavedGames(getSavedGames());

    api
      .get(`/users/${routeName}`)
      .then((response) => {
        setProfileRating(response.data?.rating ?? 1820);
        setProfileSummary(response.data?.bio ?? 'Local account dashboard.');
      })
      .catch(() => {
        setProfileRating(1820);
        setProfileSummary('Local account dashboard.');
      });
  }, [routeName]);

  const accountGames = useMemo(() => savedGames.filter((game) => game.accountName === accountName), [accountName, savedGames]);

  const handleAccountRename = (value: string) => {
    setLocalAccountName(value);
    setAccountName(value);
    setSavedGames(getSavedGames());
  };

  return (
    <PageFrame
      eyebrow="PLAYER PROFILE"
      title={accountName}
      description="A chess passport page styled to match the landing page's neon-red visual system."
    >
      <div className="space-y-4">
        <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
          <PlayerCard name={accountName} rating={profileRating} avatar="https://placehold.co/100x100" timer="10:00" />
          <div className="neon-card border-white/5 bg-black/35 p-4">
            <h2 className="font-[Orbitron] text-xl text-[#ff3359]">Account</h2>
            <p className="mt-2 text-sm text-textSecondary">Rename your local account and keep saved games attached to it.</p>
            <input
              className="mt-4 w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-white outline-none transition focus:border-[#ff0033]"
              value={accountName}
              onChange={(event) => handleAccountRename(event.target.value)}
            />
            <p className="mt-3 text-xs uppercase tracking-[0.22em] text-textSecondary">{profileSummary}</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="neon-card border-white/5 bg-black/35 p-4">
            <h2 className="font-[Orbitron] text-xl text-[#ff3359]">Stats</h2>
            <p className="mt-2 text-sm text-textSecondary">Playing since 2024</p>
            <EloChange delta={12} />
          </div>
          <OpeningStats />
        </div>
        <HeatmapChart />
        <div className="neon-card border-white/5 bg-black/35 p-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-[Orbitron] text-xl text-[#ff3359]">Saved games</h2>
            <span className="text-xs uppercase tracking-[0.22em] text-textSecondary">{accountGames.length} records</span>
          </div>
          <div className="mt-4 space-y-3">
            {accountGames.length > 0 ? (
              accountGames.map((game) => (
                <div key={game.id} className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                    <span className="text-white">{game.result}</span>
                    <span className="font-mono text-textSecondary">{new Date(game.playedAt).toLocaleString()}</span>
                  </div>
                  <p className="mt-2 text-xs text-textSecondary">{game.moves} moves • AI level {game.aiLevel}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-textSecondary">No saved games yet. Finish one game and it will appear here automatically.</p>
            )}
          </div>
        </div>
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
