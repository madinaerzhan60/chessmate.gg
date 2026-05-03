import Link from 'next/link';
import { NeonCard } from '@/components/ui/NeonCard';
import { NeonButton } from '@/components/ui/NeonButton';

const modes = [
  { href: '/play/ai', title: 'vs AI', desc: 'Choose level 1-8 and play against engine.' },
  { href: '/play/local', title: 'Local 2P', desc: 'Pass-and-play on one device.' },
  { href: '/play/demo-room', title: 'Online vs Friend', desc: 'Share room URL with a friend.' }
];

export default function PlayPage() {
  return (
    <div className="space-y-6">
      <h1 className="neon-heading text-3xl">Choose Mode</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {modes.map((mode) => (
          <NeonCard key={mode.title}>
            <h2 className="font-[Orbitron] text-xl text-[#ff3359]">{mode.title}</h2>
            <p className="mt-2 text-sm text-textSecondary">{mode.desc}</p>
            <Link href={mode.href} className="mt-4 inline-block">
              <NeonButton>Enter</NeonButton>
            </Link>
          </NeonCard>
        ))}
      </div>
    </div>
  );
}
