'use client';

import { NeonButton } from '@/components/ui/NeonButton';

interface GameControlsProps {
  onReset: () => void;
  onFlip: () => void;
  onSave: () => void;
  canSave: boolean;
}

export function GameControls({ onReset, onFlip, onSave, canSave }: GameControlsProps) {
  return (
    <div className="neon-card flex gap-2 p-3">
      <NeonButton variant="secondary" onClick={onSave} disabled={!canSave}>
        Save Game
      </NeonButton>
      <NeonButton variant="secondary" onClick={onFlip}>
        Flip Board
      </NeonButton>
      <NeonButton variant="secondary" onClick={onReset}>
        New Game
      </NeonButton>
    </div>
  );
}
