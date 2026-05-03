import { NeonCard } from '@/components/ui/NeonCard';
import { NeonButton } from '@/components/ui/NeonButton';

export default function TournamentsPage() {
  return (
    <div className="space-y-4">
      <h1 className="neon-heading text-3xl">Tournaments</h1>
      <NeonCard>
        <h2 className="font-[Orbitron] text-lg text-[#ff3359]">Weekly Swiss #42</h2>
        <p className="mt-2 text-sm text-textSecondary">32 players • Starts in 2h • Time control: Blitz 5+0</p>
        <NeonButton className="mt-4">Register</NeonButton>
      </NeonCard>
    </div>
  );
}
