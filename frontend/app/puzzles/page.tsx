import { NeonCard } from '@/components/ui/NeonCard';
import { NeonButton } from '@/components/ui/NeonButton';

export default function PuzzlesPage() {
  return (
    <div className="space-y-4">
      <h1 className="neon-heading text-3xl">Daily Puzzles</h1>
      <NeonCard>
        <p className="text-sm text-textSecondary">🔥 Streak: 7 days</p>
        <p className="mt-2 text-sm text-textSecondary">Theme: Fork | Difficulty: 2 | Time bonus enabled</p>
        <NeonButton className="mt-4">Start Puzzle</NeonButton>
      </NeonCard>
    </div>
  );
}
