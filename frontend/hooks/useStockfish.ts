'use client';

import { useEffect, useRef, useState } from 'react';

interface BestMoveResult {
  from: string;
  to: string;
  promotion?: string;
}

const skillToDepth = (skill: number) => Math.max(6, Math.min(16, skill + 6));

export function useStockfish(skillLevel: number) {
  const workerRef = useRef<Worker | null>(null);
  const [thinking, setThinking] = useState(false);

  useEffect(() => {
    const worker = new Worker('/stockfish/stockfish-18-lite-single.js');
    workerRef.current = worker;
    
    const initWorker = () => {
      worker.postMessage('uci');
      worker.postMessage(`setoption name Skill Level value ${Math.min(20, skillLevel)}`);
      worker.postMessage('isready');
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initWorker, { once: true });
    } else {
      initWorker();
    }

    return () => {
      worker.terminate();
      workerRef.current = null;
    };
  }, [skillLevel]);

  const getBestMove = (fen: string): Promise<BestMoveResult | null> =>
    new Promise((resolve) => {
      const worker = workerRef.current;
      if (!worker) {
        setThinking(false);
        return resolve(null);
      }

      setThinking(true);
      const depth = skillToDepth(skillLevel);
      let resolved = false;

      const timeoutId = setTimeout(() => {
        if (!resolved) {
          resolved = true;
          setThinking(false);
          worker.removeEventListener('message', listener as EventListener);
          resolve(null);
        }
      }, 2000);

      const listener = (event: MessageEvent<string>) => {
        if (typeof event.data === 'string' && event.data.startsWith('bestmove')) {
          if (resolved) return;
          resolved = true;
          clearTimeout(timeoutId);
          setThinking(false);
          const move = event.data.split(' ')[1] ?? '';
          if (move) {
            resolve({
              from: move.slice(0, 2),
              to: move.slice(2, 4),
              promotion: move.slice(4, 5) || undefined
            });
          } else {
            resolve(null);
          }
          worker.removeEventListener('message', listener as EventListener);
        }
      };

      worker.addEventListener('message', listener as EventListener);
      worker.postMessage(`position fen ${fen}`);
      worker.postMessage(`go depth ${depth} movetime ${Math.min(1500, depth * 150)}`);
    });

  return { getBestMove, thinking };
}
