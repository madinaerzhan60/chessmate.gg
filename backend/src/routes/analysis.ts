import { Router } from 'express';
import { analyzeGame } from '../services/groqService.js';

export const analysisRouter = Router();

analysisRouter.post('/:gameId', async (req, res) => {
  const summary = await analyzeGame(req.body.pgn ?? '', req.body.coachStyle ?? 'carlsen');
  res.json({ gameId: req.params.gameId, summary });
});

analysisRouter.get('/:gameId', async (_req, res) => {
  res.json({ summary: 'Analysis will be generated after a completed game.' });
});
