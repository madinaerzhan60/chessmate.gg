import { Router } from 'express';

export const clansRouter = Router();

clansRouter.get('/', (_req, res) => res.json([]));
clansRouter.post('/', (_req, res) => res.status(201).json({ ok: true }));
clansRouter.get('/:id', (_req, res) => res.json({}));
clansRouter.post('/:id/join', (_req, res) => res.json({ ok: true }));
