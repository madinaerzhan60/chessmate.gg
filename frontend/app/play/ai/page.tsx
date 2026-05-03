'use client';

import { NeonButton } from '@/components/ui/NeonButton';
import { PageFrame } from '@/components/layout/PageFrame';
import { useState } from 'react';
import { ChessBoard } from '@/components/board/ChessBoard';
import { CoachPanel } from '@/components/coach/CoachPanel';
import { StyleSelector } from '@/components/coach/StyleSelector';

export default function PlayAiPage() {
  const [level, setLevel] = useState(4);
  const [style, setStyle] = useState<'tal' | 'karpov' | 'carlsen'>('carlsen');

  return (
    <PageFrame
      eyebrow="AI BATTLE MODE"
      title="Play vs AI"
      description="Tune the engine, pick a coach style, and drop into a high-contrast duel with the same red-neon visual language as the landing page."
      actions={<NeonButton>Start Match</NeonButton>}
    >
      <div className="space-y-4">
        <div className="rounded-2xl border border-white/5 bg-black/30 p-4 backdrop-blur-md">
          <div className="flex flex-wrap items-center gap-3">
            <label className="text-sm text-textSecondary" htmlFor="level">
              AI Level: {level}
            </label>
            <input
              id="level"
              type="range"
              min={1}
              max={8}
              value={level}
              onChange={(e) => setLevel(Number(e.target.value))}
              className="accent-[#ff0033]"
            />
          </div>
        </div>
        <StyleSelector style={style} onChange={setStyle} />
        <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
          <ChessBoard aiLevel={level} />
          <CoachPanel pgn="" style={style} />
        </div>
      </div>
    </PageFrame>
  );
}
