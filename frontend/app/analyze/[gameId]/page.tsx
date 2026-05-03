'use client';

import { useParams } from 'next/navigation';
import { CoachPanel } from '@/components/coach/CoachPanel';
import { ChessBoard } from '@/components/board/ChessBoard';
import { PageFrame } from '@/components/layout/PageFrame';

export default function AnalyzePage() {
  const { gameId } = useParams<{ gameId: string }>();

  return (
    <PageFrame
      eyebrow="POST-GAME REVIEW"
      title={`Game Analysis #${gameId}`}
      description="A landing-style analysis workspace with the same red glow, deep black surface, and premium coaching panel framing."
    >
      <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
        <div>
          <ChessBoard aiLevel={0} />
        </div>
        <CoachPanel pgn="" style="tal" />
      </div>
    </PageFrame>
  );
}
