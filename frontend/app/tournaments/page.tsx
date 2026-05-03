import { NeonCard } from '@/components/ui/NeonCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { PageFrame } from '@/components/layout/PageFrame';

export default function TournamentsPage() {
  return (
    <PageFrame
      eyebrow="COMPETITIVE EVENTS"
      title="Tournaments"
      description="Swiss brackets and high-contrast event cards designed to sit inside the same visual world as the landing page."
    >
      <NeonCard className="border-white/5 bg-black/35">
        <h2 className="font-[Orbitron] text-lg text-[#ff3359]">Weekly Swiss #42</h2>
        <p className="mt-2 text-sm text-textSecondary">32 players • Starts in 2h • Time control: Blitz 5+0</p>
        <NeonButton className="mt-4">Register</NeonButton>
      </NeonCard>
    </PageFrame>
  );
}
