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

    const response = await fetch(`https://lichess.org/api/cloud-eval?${params}`, {
      headers: {
        Accept: 'application/json'
      }
    });

    if (!response.ok) {
      console.error('Lichess API error:', response.status);
      return null;
    }

    const data = (await response.json()) as CloudEvalResponse;
    return data;
  } catch (error) {
    console.error('Failed to fetch Lichess eval:', error);
    return null;
  }
}

export async function getBestMove(fen: string): Promise<string | null> {
  const eval_data = await getLichessEval(fen);
  
  if (eval_data?.best) {
    return eval_data.best;
  }

  if (eval_data?.pvs?.[0]?.moves) {
    const moves = eval_data.pvs[0].moves.split(' ');
    return moves[0] ?? null;
  }

  return null;
}
