import { Router } from 'express';

export const upgradeRouter = Router();

upgradeRouter.post('/checkout', (_req, res) => res.json({ clientSecret: 'test_client_secret' }));
upgradeRouter.post('/webhook', (_req, res) => res.json({ received: true }));
