'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { NeonCard } from '@/components/ui/NeonCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { PageFrame } from '@/components/layout/PageFrame';

const modes = [
  { href: '/play/ai', title: 'vs AI', desc: 'Choose level 1-8 and play against engine.' },
  { href: '/play/local', title: 'Local 2P', desc: 'Pass-and-play on one device.' },
  { href: '/play/demo-room', title: 'Online vs Friend', desc: 'Share room URL with a friend.' }
];

export default function PlayPage() {
  const router = useRouter();
  const [inviteStatus, setInviteStatus] = useState<'idle' | 'copied' | 'failed'>('idle');

  const createRoomId = () => `room-${Math.random().toString(36).slice(2, 8)}-${Date.now().toString(36).slice(-4)}`;

  const createAndOpenRoom = () => {
    const roomId = createRoomId();
    router.push(`/play/${roomId}`);
  };

  const createAndCopyInvite = async () => {
    const roomId = createRoomId();
    const origin = window.location.origin;
    const inviteLink = `${origin}/play/${roomId}`;

    try {
      await navigator.clipboard.writeText(inviteLink);
      setInviteStatus('copied');
      setTimeout(() => setInviteStatus('idle'), 1800);
      router.push(`/play/${roomId}`);
    } catch {
      setInviteStatus('failed');
      setTimeout(() => setInviteStatus('idle'), 1800);
      router.push(`/play/${roomId}`);
    }
  };

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
            {mode.title === 'Online vs Friend' ? (
              <div className="mt-4 space-y-2">
                <div className="flex flex-wrap gap-2">
                  <NeonButton onClick={createAndOpenRoom}>Create Room</NeonButton>
                  <NeonButton variant="secondary" onClick={createAndCopyInvite}>
                    Create + Copy Invite
                  </NeonButton>
                </div>
                <Link href={mode.href} className="inline-block">
                  <NeonButton variant="secondary">Open Demo Room</NeonButton>
                </Link>
                {inviteStatus === 'copied' ? <p className="text-xs text-[#ff3359]">Invite link copied.</p> : null}
                {inviteStatus === 'failed' ? <p className="text-xs text-[#ff3359]">Failed to copy. Link still opened.</p> : null}
              </div>
            ) : (
              <Link href={mode.href} className="mt-4 inline-block">
                <NeonButton>Enter</NeonButton>
              </Link>
            )}
          </NeonCard>
        ))}
      </div>
    </PageFrame>
  );
}
