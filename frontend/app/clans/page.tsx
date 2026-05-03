import { NeonCard } from '@/components/ui/NeonCard';
import { NeonButton } from '@/components/ui/NeonButton';

export default function ClansPage() {
  return (
    <div className="space-y-4">
      <h1 className="neon-heading text-3xl">Clans</h1>
      <NeonCard>
        <h2 className="font-[Orbitron] text-lg text-[#ff3359]">Create or Join Clan</h2>
        <p className="mt-2 text-sm text-textSecondary">Compete in clan wars and climb collective ELO ladders.</p>
        <div className="mt-4 flex gap-2">
          <NeonButton>Create Clan</NeonButton>
          <NeonButton variant="secondary">Browse Clans</NeonButton>
        </div>
      </NeonCard>
    </div>
  );
}
