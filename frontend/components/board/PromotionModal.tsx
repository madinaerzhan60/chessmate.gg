'use client';

import { NeonCard } from '@/components/ui/NeonCard';
import { NeonButton } from '@/components/ui/NeonButton';

interface PromotionModalProps {
  open: boolean;
  onPick: (piece: 'q' | 'r' | 'b' | 'n') => void;
}

export function PromotionModal({ open, onPick }: PromotionModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <NeonCard className="w-full max-w-sm">
        <h3 className="font-[Orbitron] text-lg text-[#ff3359]">Promote Pawn</h3>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {[
            { code: 'q', label: 'Queen' },
            { code: 'r', label: 'Rook' },
            { code: 'b', label: 'Bishop' },
            { code: 'n', label: 'Knight' }
          ].map((piece) => (
            <NeonButton key={piece.code} variant="secondary" onClick={() => onPick(piece.code as 'q' | 'r' | 'b' | 'n')}>
              {piece.label}
            </NeonButton>
          ))}
        </div>
      </NeonCard>
    </div>
  );
}
