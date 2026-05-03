'use client';

import { NeonButton } from '@/components/ui/NeonButton';

interface GameControlsProps {
  onReset: () => void;
  onFlip: () => void;
}

export function GameControls({ onReset, onFlip }: GameControlsProps) {
  return (
    <div className="neon-card flex gap-2 p-3">
      <NeonButton variant="secondary" onClick={onFlip}>
        Flip Board
      </NeonButton>
      <NeonButton variant="secondary" onClick={onReset}>
        New Game
      </NeonButton>
    </div>
  );
}
