'use client';

import { useEffect, useRef, useState } from 'react';

interface BestMoveResult {
  from: string;
  to: string;
  promotion?: string;
}

const skillToDepth = (skill: number) => Math.max(4, Math.min(18, Math.floor(skill / 2) + 4));

export function useStockfish(skillLevel: number) {
  const workerRef = useRef<Worker | null>(null);
  const [thinking, setThinking] = useState(false);

  useEffect(() => {
    const worker = new Worker('/stockfish/stockfish-18-lite-single.js');
    workerRef.current = worker;
    worker.postMessage('uci');
    worker.postMessage(`setoption name Skill Level value ${skillLevel}`);
    worker.postMessage('isready');

    return () => {
      worker.terminate();
      workerRef.current = null;
    };
  }, [skillLevel]);

  const getBestMove = (fen: string): Promise<BestMoveResult | null> =>
    new Promise((resolve) => {
      const worker = workerRef.current;
      if (!worker) return resolve(null);
      setThinking(true);
      const depth = skillToDepth(skillLevel);

      const listener = (event: MessageEvent<string>) => {
        if (typeof event.data === 'string' && event.data.startsWith('bestmove')) {
          setThinking(false);
          const move = event.data.split(' ')[1] ?? '';
          resolve({ from: move.slice(0, 2), to: move.slice(2, 4), promotion: move.slice(4, 5) || undefined });
          worker.removeEventListener('message', listener as EventListener);
        }
      };

      worker.addEventListener('message', listener as EventListener);
      worker.postMessage(`position fen ${fen}`);
      worker.postMessage(`go depth ${depth}`);
    });

  return { getBestMove, thinking };
}
