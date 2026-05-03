'use client';

import { useParams } from 'next/navigation';
import { ChessBoard } from '@/components/board/ChessBoard';
import { useSocket } from '@/hooks/useSocket';

export default function RoomPage() {
  const params = useParams<{ roomId: string }>();
  const { connected } = useSocket(params.roomId);

  return (
    <div className="space-y-4">
      <h1 className="neon-heading text-3xl">Room: {params.roomId}</h1>
      {!connected ? <div className="rounded-xl border border-[#ff0033]/40 bg-[#22080f] p-3 text-sm">Reconnecting...</div> : null}
      <ChessBoard aiLevel={0} />
    </div>
  );
}
