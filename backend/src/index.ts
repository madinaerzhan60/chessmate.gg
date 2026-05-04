import 'dotenv/config';
import express from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import { Server } from 'socket.io';
import { authRouter } from './routes/auth.js';
import { gamesRouter } from './routes/games.js';
import { analysisRouter } from './routes/analysis.js';
import { engineRouter } from './routes/engine.js';
import { puzzlesRouter } from './routes/puzzles.js';
import { usersRouter } from './routes/users.js';
import { leaderboardRouter } from './routes/leaderboard.js';
import { clansRouter } from './routes/clans.js';
import { upgradeRouter } from './routes/upgrade.js';
import { registerGameRoom } from './socket/gameRoom.js';
import { registerMatchmaking } from './socket/matchmaking.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: process.env.FRONTEND_URL ?? 'http://localhost:3000', credentials: true } });
const port = Number(process.env.PORT ?? 4000);

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL ?? 'http://localhost:3000', credentials: true }));
app.use(express.json({ limit: '2mb' }));

app.use('/api/auth', authRouter);
app.use('/api/games', gamesRouter);
app.use('/api/analysis', analysisRouter);
app.use('/api/engine', engineRouter);
app.use('/api/puzzles', puzzlesRouter);
app.use('/api/users', usersRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/clans', clansRouter);
app.use('/api/upgrade', upgradeRouter);

io.on('connection', (socket) => {
  registerGameRoom(io, socket);
  registerMatchmaking(io, socket);
});

app.get('/', (_req, res) => res.json({ message: 'CHECKMATE.GG API v1', status: 'ok' }));
app.get('/health', (_req, res) => res.json({ ok: true }));

server.listen(port, () => {
  console.log(`CHECKMATE.GG backend listening on ${port}`);
});
