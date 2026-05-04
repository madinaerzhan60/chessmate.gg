import { Chess } from 'chess.js';

interface CloudEvalResponse {
  fen?: string;
  knodes?: number;
  depth?: number;
  pvs?: Array<{ moves: string; cp?: number }>;
  eval?: number;
  best?: string;
}

export async function getLichessEval(fen: string): Promise<CloudEvalResponse | null> {
  try {
    const params = new URLSearchParams({
      fen,
      variant: 'standard'
    });

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    console.log('[Lichess] Requesting:', `https://lichess.org/api/cloud-eval?${params}`);
    const response = await fetch(`https://lichess.org/api/cloud-eval?${params}`, {
      headers: {
        Accept: 'application/json'
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    console.log('[Lichess] Response status:', response.status);
    if (!response.ok) {
      console.error('[Lichess] API error:', response.status, response.statusText);
      return null;
    }

    const data = (await response.json()) as CloudEvalResponse;
    console.log('[Lichess] Data received:', JSON.stringify(data).substring(0, 200));
    return data;
  } catch (error) {
    console.error('[Lichess] Fetch error:', error instanceof Error ? error.message : error);
    return null;
  }
}

export async function getBestMove(fen: string): Promise<string | null> {
  const eval_data = await getLichessEval(fen);
  
  if (!eval_data) {
    console.log('[getBestMove] No eval data received, using fallback');
    return getRandomMove(fen);
  }

  if (eval_data?.best) {
    console.log('[getBestMove] Using best field:', eval_data.best);
    return eval_data.best;
  }

  if (eval_data?.pvs?.[0]?.moves) {
    const moves = eval_data.pvs[0].moves.split(' ');
    console.log('[getBestMove] Using pvs field, first move:', moves[0]);
    return moves[0] ?? null;
  }

  console.log('[getBestMove] No move found in eval data, using fallback');
  return getRandomMove(fen);
}

function getRandomMove(fen: string): string | null {
  try {
    const game = new Chess(fen);
    const moves = game.moves({ verbose: true });
    if (moves.length === 0) {
      console.log('[Random] No legal moves available');
      return null;
    }
    const randomMove = moves[Math.floor(Math.random() * moves.length)];
    const moveStr = `${randomMove.from}${randomMove.to}${randomMove.promotion || ''}`;
    console.log('[Random] Selected random move:', moveStr, 'from', moves.length, 'options');
    return moveStr;
  } catch (error) {
    console.error('[Random] Error getting random move:', error);
    return null;
  }
}
