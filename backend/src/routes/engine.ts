import { Router } from 'express';
import { getBestMove } from '../services/lichessService.js';

export const engineRouter = Router();

engineRouter.post('/move', async (req, res) => {
  const { fen } = req.body;
  if (!fen || typeof fen !== 'string') {
    return res.status(400).json({ error: 'FEN required' });
  }

  try {
    const bestMove = await getBestMove(fen);
    if (!bestMove) {
      return res.status(200).json({ move: null });
    }

    res.json({ move: bestMove });
  } catch (error) {
    console.error('Engine error:', error);
    res.status(500).json({ error: 'Engine error' });
  }
});
