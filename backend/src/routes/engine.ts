import { Router } from 'express';
import { getBestMove } from '../services/lichessService.js';

export const engineRouter = Router();

engineRouter.post('/move', async (req, res) => {
  const { fen } = req.body;
  if (!fen || typeof fen !== 'string') {
    console.warn('[Engine] Invalid FEN:', fen);
    return res.status(400).json({ error: 'FEN required' });
  }

  try {
    console.log('[Engine] Getting best move for FEN:', fen.substring(0, 50));
    const bestMove = await getBestMove(fen);
    console.log('[Engine] Best move result:', bestMove);
    
    if (!bestMove) {
      console.warn('[Engine] No best move found');
      return res.status(200).json({ move: null });
    }

    res.json({ move: bestMove });
  } catch (error) {
    console.error('[Engine] Error:', error);
    res.status(500).json({ error: 'Engine error' });
  }
});
