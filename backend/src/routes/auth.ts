import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { prisma } from '../prisma/client.js';

export const authRouter = Router();

const registerSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  country: z.string().optional(),
  city: z.string().optional()
});

authRouter.post('/register', async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid payload' });

  const { username, email, password, country, city } = parsed.data;
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { username, email, passwordHash, country, city } });
  res.status(201).json({ id: user.id, username: user.username, email: user.email });
});

authRouter.post('/login', async (req, res) => {
  const schema = z.object({ email: z.string().email(), password: z.string() });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid payload' });

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const valid = await bcrypt.compare(parsed.data.password, user.passwordHash);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET ?? 'dev-secret', { expiresIn: '15m' });
  res.json({ accessToken: token, user: { id: user.id, username: user.username, email: user.email, isPro: user.isPro } });
});

authRouter.post('/logout', (_req, res) => res.json({ ok: true }));
authRouter.post('/refresh', (_req, res) => res.json({ ok: true }));
