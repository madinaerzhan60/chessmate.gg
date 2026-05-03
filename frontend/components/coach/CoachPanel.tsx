'use client';

import { useMutation } from '@tanstack/react-query';
import { NeonCard } from '@/components/ui/NeonCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { api } from '@/lib/api';

interface CoachPanelProps {
  pgn: string;
  style: 'tal' | 'karpov' | 'carlsen';
}

export function CoachPanel({ pgn, style }: CoachPanelProps) {
  const analysisMutation = useMutation({
    mutationFn: async () => {
      const response = await api.post('/analysis/demo', { pgn, coachStyle: style });
      return response.data;
    }
  });

  return (
    <NeonCard className="h-full">
      <h3 className="font-[Orbitron] text-lg text-[#ff3359]">AI Coach</h3>
      <p className="mt-1 text-xs uppercase text-textSecondary">Style: {style}</p>
      <NeonButton className="mt-3" onClick={() => analysisMutation.mutate()} disabled={!pgn || analysisMutation.isPending}>
        {analysisMutation.isPending ? 'Analyzing...' : 'Analyze Game'}
      </NeonButton>
      <div className="mt-3 rounded-lg border border-red-900/40 bg-black/40 p-3 text-sm text-textSecondary">
        {analysisMutation.data?.summary ?? 'Play a game, then request coaching analysis.'}
      </div>
    </NeonCard>
  );
}
