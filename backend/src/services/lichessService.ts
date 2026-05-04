interface CloudEvalResponse {
  eval?: number;
  best?: string;
  depth?: number;
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
  return eval_data?.best ?? null;
}
