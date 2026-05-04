'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { CoachPanel } from '@/components/coach/CoachPanel';
import { ChessBoard } from '@/components/board/ChessBoard';
import { PageFrame } from '@/components/layout/PageFrame';
import { api } from '@/lib/api';

export default function AnalyzePage() {
  const { gameId } = useParams<{ gameId: string }>();
  const [pgn, setPgn] = useState('');
  const [loadState, setLoadState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    setLoadState('loading');
    setLoadError(null);
    setPgn('');

    api
      .get(`/games/${gameId}`)
      .then((response) => {
        if (!active) return;
        const loadedPgn = response.data?.pgn ?? '';
        setPgn(loadedPgn);
        setLoadState(loadedPgn ? 'ready' : 'error');
        setLoadError(loadedPgn ? null : 'Game data was found, but PGN is empty.');
      })
      .catch(() => {
        if (!active) return;
        setLoadState('error');
        setLoadError('Could not load the saved game for analysis.');
      });

    return () => {
      active = false;
    };
  }, [gameId]);

  return (
    <PageFrame
      eyebrow="POST-GAME REVIEW"
      title={`Game Analysis #${gameId}`}
      description="A landing-style analysis workspace with the same red glow, deep black surface, and premium coaching panel framing."
    >
      <div className="mb-4 rounded-xl border border-[#ff0033]/30 bg-[#1a0a0f] p-3 text-sm text-textSecondary">
        {loadState === 'loading' ? 'Loading saved game...' : null}
        {loadState === 'ready' ? 'Game loaded. You can run AI coaching now.' : null}
        {loadState === 'error' ? loadError ?? 'Unable to load game.' : null}
      </div>
      <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
        <div>
          <ChessBoard aiLevel={0} />
        </div>
        <CoachPanel pgn={pgn} style="tal" />
      </div>
    </PageFrame>
  );
}
