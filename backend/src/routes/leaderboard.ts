import { Router } from 'express';
import { prisma } from '../prisma/client.js';

export const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_req, res) => {
  const users = await prisma.user.findMany({ orderBy: { rating: 'desc' }, take: 50 });
  res.json(users);
});
