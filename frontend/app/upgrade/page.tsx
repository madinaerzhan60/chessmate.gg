import { NeonCard } from '@/components/ui/NeonCard';
import { NeonButton } from '@/components/ui/NeonButton';

export default function UpgradePage() {
  return (
    <div className="space-y-4">
      <h1 className="neon-heading text-3xl">Upgrade to Pro</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <NeonCard>
          <h2 className="font-[Orbitron] text-xl text-white">FREE</h2>
          <ul className="mt-2 space-y-1 text-sm text-textSecondary">
            <li>✓ Unlimited games vs AI (L1-4)</li>
            <li>✓ 10 puzzles/day</li>
            <li>✓ Basic profile</li>
            <li>✗ Limited multiplayer</li>
          </ul>
        </NeonCard>
        <NeonCard className="border-[#ff0033]/40 shadow-[0_0_20px_rgba(255,0,51,0.35)]">
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
    </div>
  );
}
