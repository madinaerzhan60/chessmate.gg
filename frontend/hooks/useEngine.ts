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
      console.log('Engine requesting move for FEN:', fen);
      
      const response = await api.post('/engine/move', { fen }, { timeout: 3000 });
      console.log('[API Response] Status:', response.status, 'Data:', response.data);
      
      const move = response.data?.move;
      console.log('Engine returned move:', move);

      if (!move || typeof move !== 'string' || move.length < 4) {
        console.warn('Invalid move format from engine:', move, '(response was:', response.data, ')');
        setThinking(false);
        return null;
      }

      const result: BestMoveResult = {
        from: move.slice(0, 2),
        to: move.slice(2, 4),
        promotion: move.length > 4 ? move.slice(4, 5) : undefined
      };

      console.log('Parsed move:', result);
      setThinking(false);
      return result;
    } catch (error) {
      console.error('Engine error:', error instanceof Error ? error.message : error);
      if (error instanceof Error && 'response' in error) {
        const axiosError = error as any;
        console.error('API Response:', axiosError.response?.status, axiosError.response?.data);
      }
      setThinking(false);
      return null;
    }
  };

  return { getBestMove, thinking };
}
