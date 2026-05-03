import { Router } from 'express';
import { prisma } from '../prisma/client.js';

export const gamesRouter = Router();

gamesRouter.get('/', async (req, res) => {
  const limit = Number(req.query.limit ?? 20);
  const offset = Number(req.query.offset ?? 0);
  const games = await prisma.game.findMany({ take: limit, skip: offset, orderBy: { createdAt: 'desc' } });
  res.json(games);
});

gamesRouter.post('/', async (req, res) => {
  const game = await prisma.game.create({ data: req.body });
  res.status(201).json(game);
});

gamesRouter.get('/:id', async (req, res) => {
  const game = await prisma.game.findUnique({ where: { id: req.params.id } });
  if (!game) return res.status(404).json({ error: 'Not found' });
  res.json(game);
});
