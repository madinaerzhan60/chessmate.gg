import Link from 'next/link';
import { NeonCard } from '@/components/ui/NeonCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { PageFrame } from '@/components/layout/PageFrame';

const modes = [
  { href: '/play/ai', title: 'vs AI', desc: 'Choose level 1-8 and play against engine.' },
  { href: '/play/local', title: 'Local 2P', desc: 'Pass-and-play on one device.' },
  { href: '/play/demo-room', title: 'Online vs Friend', desc: 'Share room URL with a friend.' }
];

export default function PlayPage() {
  return (
    <PageFrame
      eyebrow="GAME HUB"
      title="Choose Mode"
      description="A neon-red hub for launching into AI, local, and online games with the same visual energy as the landing page."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {modes.map((mode) => (
          <NeonCard key={mode.title} className="border-white/5 bg-black/35">
            <h2 className="font-[Orbitron] text-xl text-[#ff3359]">{mode.title}</h2>
            <p className="mt-2 text-sm text-textSecondary">{mode.desc}</p>
            <Link href={mode.href} className="mt-4 inline-block">
              <NeonButton>Enter</NeonButton>
            </Link>
          </NeonCard>
        ))}
      </div>
    </PageFrame>
  );
}
