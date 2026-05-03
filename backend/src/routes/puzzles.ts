import { Router } from 'express';

export const puzzlesRouter = Router();

puzzlesRouter.get('/daily', (_req, res) => res.json({ theme: 'fork', fen: 'startpos', solution: ['e2e4'] }));
puzzlesRouter.get('/', (_req, res) => res.json([]));
puzzlesRouter.post('/:id/result', (_req, res) => res.json({ ok: true }));
