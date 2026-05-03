"use client";

import { useEffect, useState } from 'react';
import { NeonCard } from '@/components/ui/NeonCard';
import { PageFrame } from '@/components/layout/PageFrame';
import { Award, Flame, Medal, Shield, Star, Trophy, TrendingUp, Users } from 'lucide-react';
import { api } from '@/lib/api';

const fallbackPlayers = [
  { rank: 1, username: 'NeonKnight', rating: 2489, wl: '124/34' },
  { rank: 2, username: 'TalProtocol', rating: 2430, wl: '110/40' },
  { rank: 3, username: 'EndgameLab', rating: 2391, wl: '93/36' },
  { rank: 4, username: 'SicilianX', rating: 2345, wl: '88/39' },
  { rank: 5, username: 'CaroCyber', rating: 2310, wl: '80/41' }
];

export default function LeaderboardPage() {
  const [players, setPlayers] = useState(fallbackPlayers);

  useEffect(() => {
    let mounted = true;

    api
      .get('/leaderboard')
      .then((response) => {
        if (!mounted) return;
        const livePlayers = (response.data ?? []).map((player: { username: string; rating: number; country?: string }, index: number) => ({
          rank: index + 1,
          username: player.username,
          rating: player.rating,
          wl: player.country ? player.country : 'Live'
        }));

        if (livePlayers.length > 0) {
          setPlayers(livePlayers);
        }
      })
      .catch(() => {
        if (mounted) setPlayers(fallbackPlayers);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <PageFrame
      eyebrow="LIVE RANKINGS"
      title="Leaderboard"
      description="A compact ranking board styled to match the landing page's glow-heavy visual system, now with icons and stronger hierarchy."
      actions={
        <>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-2 text-sm text-white">
            <Users className="h-4 w-4 text-[#ff6b6b]" /> 14K active
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-2 text-sm text-white">
            <Trophy className="h-4 w-4 text-[#ff6b6b]" /> Season 12
          </div>
        </>
      }
    >
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <NeonCard className="border-white/5 bg-black/35 p-0">
          <div className="flex items-center justify-between border-b border-white/5 px-4 py-3 md:px-5">
            <div className="flex items-center gap-2 text-sm text-textSecondary">
              <TrendingUp className="h-4 w-4 text-[#ff6b6b]" /> Top ladder
            </div>
            <div className="flex items-center gap-2 text-xs text-[#ff6b6b]">
              <Flame className="h-4 w-4" /> Live update
            </div>
          </div>
          <div className="px-4 py-4 md:px-5">
            <div className="grid grid-cols-[1fr,1fr,0.8fr,0.8fr] items-center border-b border-red-900/30 pb-3 text-xs uppercase tracking-[0.22em] text-textSecondary">
              <span>Rank</span>
              <span>Player</span>
              <span>Rating</span>
              <span>W/L</span>
            </div>
            <div className="mt-3 space-y-2">
              {players.map((player) => (
                <div
                  key={player.username}
                  className={`grid grid-cols-[1fr,1fr,0.8fr,0.8fr] items-center rounded-2xl border px-3 py-3 text-sm transition ${
                    player.rank === 1
                      ? 'border-[#ff1a00]/40 bg-[linear-gradient(180deg,rgba(255,26,0,0.12),rgba(255,26,0,0.04))] shadow-[0_0_20px_rgba(255,26,0,0.12)]'
                      : 'border-white/5 bg-white/[0.02] hover:border-[#ff1a00]/25 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-2 font-[Orbitron] text-[#ff6b6b]">
                    {player.rank === 1 ? <Trophy className="h-4 w-4" /> : player.rank === 2 ? <Medal className="h-4 w-4" /> : <Award className="h-4 w-4" />}
                    #{player.rank}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/5 bg-black/40 text-[#ff6b6b] shadow-[0_0_18px_rgba(255,26,0,0.12)]">
                      {player.username.slice(0, 1)}
                    </div>
                    <span className="font-medium text-white">{player.username}</span>
                  </div>
                  <span className="font-mono text-white">{player.rating}</span>
                  <span className="font-mono text-textSecondary">{player.wl}</span>
                </div>
              ))}
            </div>
          </div>
        </NeonCard>

        <div className="grid gap-4">
          <NeonCard className="border-white/5 bg-black/35">
            <div className="flex items-center gap-2 text-sm text-textSecondary">
              <Shield className="h-4 w-4 text-[#ff6b6b]" /> Most stable defenders
            </div>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] px-3 py-3">
                <span>NeonKnight</span>
                <span className="text-[#ff6b6b]">96% win rate</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] px-3 py-3">
                <span>TalProtocol</span>
                <span className="text-[#ff6b6b]">28 streak</span>
              </div>
            </div>
          </NeonCard>
          <NeonCard className="border-white/5 bg-black/35">
            <div className="flex items-center gap-2 text-sm text-textSecondary">
              <Star className="h-4 w-4 text-[#ff6b6b]" /> Rapid risers
            </div>
            <p className="mt-3 text-sm text-textSecondary">Players climbing the ladder with the same aggressive neon energy as the landing page.</p>
          </NeonCard>
        </div>
      </div>
    </PageFrame>
  );
}
