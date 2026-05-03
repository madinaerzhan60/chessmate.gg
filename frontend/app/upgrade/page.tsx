import { NeonCard } from '@/components/ui/NeonCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { PageFrame } from '@/components/layout/PageFrame';

export default function UpgradePage() {
  return (
    <PageFrame
      eyebrow="SUBSCRIPTION"
      title="Upgrade to Pro"
      description="Pricing cards with the same neon framing and red-glow treatment as the landing page."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <NeonCard className="border-white/5 bg-black/35">
          <h2 className="font-[Orbitron] text-xl text-white">FREE</h2>
          <ul className="mt-2 space-y-1 text-sm text-textSecondary">
            <li>✓ Unlimited games vs AI (L1-4)</li>
            <li>✓ 10 puzzles/day</li>
            <li>✓ Basic profile</li>
            <li>✗ Limited multiplayer</li>
          </ul>
        </NeonCard>
        <NeonCard className="border-[#ff0033]/40 bg-[linear-gradient(180deg,rgba(255,26,0,0.12),rgba(10,10,10,0.9))] shadow-[0_0_20px_rgba(255,0,51,0.35)]">
          <h2 className="font-[Orbitron] text-xl text-[#ff3359]">PRO — $7.99/mo</h2>
          <ul className="mt-2 space-y-1 text-sm text-textSecondary">
            <li>✓ Unlimited multiplayer</li>
            <li>✓ Full analysis and all coach styles</li>
            <li>✓ Voice coach, premium themes</li>
            <li>✓ Clan and tournament creation</li>
          </ul>
          <NeonButton className="mt-4">Start Pro</NeonButton>
        </NeonCard>
      </div>
    </PageFrame>
  );
}
