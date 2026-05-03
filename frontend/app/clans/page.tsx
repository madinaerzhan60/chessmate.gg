import { NeonCard } from '@/components/ui/NeonCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { PageFrame } from '@/components/layout/PageFrame';

export default function ClansPage() {
  return (
    <PageFrame
      eyebrow="COMMUNITY WARFARE"
      title="Clans"
      description="Clan battles and city ladder energy styled to match the landing page's red-black identity."
    >
      <NeonCard className="border-white/5 bg-black/35">
        <h2 className="font-[Orbitron] text-lg text-[#ff3359]">Create or Join Clan</h2>
        <p className="mt-2 text-sm text-textSecondary">Compete in clan wars and climb collective ELO ladders.</p>
        <div className="mt-4 flex gap-2">
          <NeonButton>Create Clan</NeonButton>
          <NeonButton variant="secondary">Browse Clans</NeonButton>
        </div>
      </NeonCard>
    </PageFrame>
  );
}
