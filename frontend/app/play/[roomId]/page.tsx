'use client';

import { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { ChessBoard } from '@/components/board/ChessBoard';
import { useSocket } from '@/hooks/useSocket';
import { NeonButton } from '@/components/ui/NeonButton';

export default function RoomPage() {
  const params = useParams<{ roomId: string }>();
  const { connected } = useSocket(params.roomId);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>('idle');

  const inviteLink = useMemo(() => {
    if (typeof window === 'undefined') return `https://chessmate-gg.vercel.app/play/${params.roomId}`;
    return `${window.location.origin}/play/${params.roomId}`;
  }, [params.roomId]);

  const copyInviteLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus('idle'), 1800);
    } catch {
      setCopyStatus('failed');
      setTimeout(() => setCopyStatus('idle'), 1800);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="neon-heading text-3xl">Room: {params.roomId}</h1>
      <div className="rounded-xl border border-[#ff0033]/30 bg-[#1a0a0f] p-3">
        <p className="text-sm text-textSecondary">Invite link:</p>
        <p className="mt-1 break-all text-sm text-white">{inviteLink}</p>
        <div className="mt-3 flex items-center gap-2">
          <NeonButton variant="secondary" onClick={copyInviteLink}>
            Copy Link
          </NeonButton>
          {copyStatus === 'copied' ? <span className="text-xs text-[#ff3359]">Copied</span> : null}
          {copyStatus === 'failed' ? <span className="text-xs text-[#ff3359]">Copy failed</span> : null}
        </div>
      </div>
      {!connected ? <div className="rounded-xl border border-[#ff0033]/40 bg-[#22080f] p-3 text-sm">Reconnecting...</div> : null}
      <ChessBoard aiLevel={0} />
    </div>
  );
}
