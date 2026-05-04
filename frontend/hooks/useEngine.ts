'use client';

import { useState } from 'react';
import { api } from '@/lib/api';

interface BestMoveResult {
  from: string;
  to: string;
  promotion?: string;
}

export function useEngine() {
  const [thinking, setThinking] = useState(false);

  const getBestMove = async (fen: string): Promise<BestMoveResult | null> => {
    try {
      setThinking(true);
      const response = await api.post('/engine/move', { fen });
      const move = response.data?.move;

      if (!move) {
        setThinking(false);
        return null;
      }

      const result: BestMoveResult = {
        from: move.slice(0, 2),
        to: move.slice(2, 4),
        promotion: move.length > 4 ? move.slice(4, 5) : undefined
      };

      setThinking(false);
      return result;
    } catch (error) {
      console.error('Engine error:', error);
      setThinking(false);
      return null;
    }
  };

  return { getBestMove, thinking };
}
