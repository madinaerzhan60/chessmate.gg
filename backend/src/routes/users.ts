import { Router } from 'express';
import { prisma } from '../prisma/client.js';

export const usersRouter = Router();

usersRouter.get('/:username', async (req, res) => {
  const user = await prisma.user.findUnique({ where: { username: req.params.username } });
  if (!user) return res.status(404).json({ error: 'Not found' });
  res.json(user);
});

usersRouter.patch('/me', (_req, res) => res.json({ ok: true }));
usersRouter.post('/me/avatar', (_req, res) => res.json({ ok: true }));
