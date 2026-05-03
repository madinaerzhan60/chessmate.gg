import { NeonCard } from '@/components/ui/NeonCard';
import { PageFrame } from '@/components/layout/PageFrame';

const players = [
  { rank: 1, username: 'NeonKnight', rating: 2489, wl: '124/34' },
  { rank: 2, username: 'TalProtocol', rating: 2430, wl: '110/40' },
  { rank: 3, username: 'EndgameLab', rating: 2391, wl: '93/36' },
  { rank: 4, username: 'SicilianX', rating: 2345, wl: '88/39' },
  { rank: 5, username: 'CaroCyber', rating: 2310, wl: '80/41' }
];

export default function LeaderboardPage() {
  return (
    <PageFrame
      eyebrow="LIVE RANKINGS"
      title="Leaderboard"
      description="A compact ranking board styled to match the landing page's glow-heavy visual system."
    >
      <NeonCard className="border-white/5 bg-black/35">
        <div className="grid grid-cols-4 border-b border-red-900/30 pb-2 text-xs uppercase text-textSecondary">
          <span>Rank</span>
          <span>Player</span>
          <span>Rating</span>
          <span>W/L</span>
        </div>
        <div className="space-y-2 pt-3">
          {players.map((player) => (
            <div key={player.username} className="grid grid-cols-4 text-sm">
              <span>#{player.rank}</span>
              <span>{player.username}</span>
              <span>{player.rating}</span>
              <span>{player.wl}</span>
            </div>
          ))}
        </div>
      </NeonCard>
    </PageFrame>
  );
}
