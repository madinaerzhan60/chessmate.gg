import { NeonCard } from '@/components/ui/NeonCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { PageFrame } from '@/components/layout/PageFrame';

export default function PuzzlesPage() {
  return (
    <PageFrame
      eyebrow="TACTICAL TRAINING"
      title="Daily Puzzles"
      description="Streaks, themes, and a board-first card layout that matches the landing page's neon aesthetic."
    >
      <NeonCard className="border-white/5 bg-black/35">
        <p className="text-sm text-textSecondary">🔥 Streak: 7 days</p>
        <p className="mt-2 text-sm text-textSecondary">Theme: Fork | Difficulty: 2 | Time bonus enabled</p>
        <NeonButton className="mt-4">Start Puzzle</NeonButton>
      </NeonCard>
    </PageFrame>
  );
}
