'use client';

import { useParams } from 'next/navigation';
import { CoachPanel } from '@/components/coach/CoachPanel';
import { ChessBoard } from '@/components/board/ChessBoard';

export default function AnalyzePage() {
  const { gameId } = useParams<{ gameId: string }>();

  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
      <div>
        <h1 className="neon-heading mb-4 text-3xl">Game Analysis #{gameId}</h1>
        <ChessBoard aiLevel={0} />
      </div>
      <CoachPanel pgn="" style="tal" />
    </div>
  );
}
