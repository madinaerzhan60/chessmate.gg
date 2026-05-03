# CHECKMATE.GG — Setup & Run Guide

## Prerequisites
- Node.js 18+ (LTS recommended)
- npm 9+
- PostgreSQL 14+ (for production; SQLite for local dev)

## Quick Start

### 1. Frontend Setup

```bash
cd frontend
npm install --legacy-peer-deps  # Use legacy flag if you hit peer dependency warnings
cp .env.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:4000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_... (optional for demo)
```

Start the frontend dev server:
```bash
npm run dev
# Open http://localhost:3000
```

### 2. Backend Setup

```bash
cd backend
npm install --legacy-peer-deps
cp .env.example .env
```

Edit `.env`:
```
DATABASE_URL=postgresql://user:password@localhost:5432/checkmate
# Or for SQLite dev: file:./dev.db
REDIS_URL=redis://localhost:6379  (optional)
JWT_SECRET=your-dev-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
GROQ_API_KEY=gsk_...  (get from https://console.groq.com)
PORT=4000
FRONTEND_URL=http://localhost:3000
```

### 3. Database Setup (if using PostgreSQL)

```bash
# Create database
createdb checkmate

# Run Prisma migrations
cd backend
npx prisma generate
npx prisma migrate dev --name init
```

For SQLite (easier for local dev):
```bash
# Just set DATABASE_URL=file:./dev.db in .env
# Run: npx prisma migrate dev --name init
# This creates dev.db automatically
```

Start the backend server:
```bash
npm run dev
# Server listens on http://localhost:4000
```

### 4. Running Both (Recommended: 2 Terminal Windows)

**Terminal 1: Backend**
```bash
cd backend
npm run dev
```

**Terminal 2: Frontend**
```bash
cd frontend
npm run dev
```

Then open **http://localhost:3000** in your browser.

## Environment Configuration

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:4000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xyz (optional)
```

### Backend (.env)
```
# Database
DATABASE_URL=postgresql://user:pass@localhost/checkmate
# Or: file:./dev.db (SQLite)

# Auth
JWT_SECRET=your-secret
JWT_REFRESH_SECRET=your-refresh-secret

# APIs
GROQ_API_KEY=gsk_... (from console.groq.com)
STRIPE_SECRET_KEY=sk_test_... (optional)
STRIPE_WEBHOOK_SECRET=whsec_... (optional)
CLOUDINARY_URL=cloudinary://... (optional)

# Server
PORT=4000
FRONTEND_URL=http://localhost:3000
REDIS_URL=redis://localhost:6379 (optional, for caching)
```

## Troubleshooting

### Network Issues During npm install
If you hit timeout errors:
```bash
npm install --legacy-peer-deps --fetch-timeout=600000
```

### Database Already Exists
```bash
dropdb checkmate && createdb checkmate
npx prisma migrate dev --name init
```

### Port 3000/4000 Already in Use
Frontend: `PORT=3001 npm run dev`
Backend: `PORT=5000 npm run dev` (then update FRONTEND_URL in backend/.env)

### Stockfish Not Loading in Browser
- Check that `frontend/workers/stockfish.worker.ts` exists
- Verify Next.js is configured for web workers (included in our config)
- Check browser console for worker load errors

## Project Structure

```
checkmate-gg/
├── frontend/          (Next.js 14 + React 18)
│   ├── app/          (App Router pages)
│   ├── components/   (React components)
│   ├── hooks/        (Custom hooks: useChessGame, useSocket, etc.)
│   ├── store/        (Zustand state: gameStore, userStore)
│   ├── lib/          (Utilities: api client, constants)
│   ├── workers/      (Web Workers: stockfish.worker.ts)
│   └── package.json
│
├── backend/          (Express + Socket.io + Prisma)
│   ├── src/
│   │   ├── index.ts           (Entry point)
│   │   ├── routes/            (API endpoints)
│   │   ├── socket/            (WebSocket handlers)
│   │   ├── services/          (Business logic: Groq, Stockfish, Elo)
│   │   ├── middleware/        (Auth, rate limiting)
│   │   └── prisma/            (DB client)
│   ├── prisma/
│   │   └── schema.prisma      (Data models)
│   └── package.json
│
└── README.md, SETUP.md, .gitignore
```

## Features Implemented

### Frontend (MVP Complete)
✅ Landing page with neon design  
✅ Authentication (login/register)  
✅ Game modes (vs AI, local 2P, online rooms)  
✅ Chess board (react-chessboard + chess.js rules)  
✅ Stockfish AI engine (web worker)  
✅ AI Coach panel (Groq integration ready)  
✅ All UI pages (profile, leaderboard, puzzles, clans, etc.)  
✅ Zustand state management  
✅ React Query for server state  
✅ Socket.io for real-time multiplayer  
✅ Framer Motion animations  
✅ Strict TypeScript  

### Backend (MVP Complete)
✅ Express + Socket.io server  
✅ Authentication (JWT, bcrypt)  
✅ Prisma ORM + migrations  
✅ All API routes (auth, games, analysis, puzzles, etc.)  
✅ Groq AI Coach service  
✅ Socket.io game rooms  
✅ Rate limiting & auth middleware  

## Next Steps

1. **Database:** Set up PostgreSQL or use SQLite for local dev
2. **API Keys:** Get Groq API key from https://console.groq.com (free tier available)
3. **Run Setup:** Follow quick start above
4. **Explore:** Navigate through the app in the browser
5. **Extend:** Add more features (tournaments, clans, Stripe payment, etc.)

## Production Deployment

- **Frontend:** Deploy to Vercel (recommended for Next.js)
- **Backend:** Deploy to Railway, Render, or Heroku
- **Database:** Use Supabase (PostgreSQL) or Railway
- **Cache:** Use Upstash Redis
- **Storage:** Use Cloudinary for avatars
- **Domain:** checkmate.gg or your custom domain

See comments in respective `.env.example` files for production configuration.

## Support & Resources

- Chess.js docs: https://github.com/jhlywa/chess.js
- React Chessboard: https://github.com/vincentbavitz/react-chessboard
- Stockfish.js: https://github.com/niklasf/stockfish.js
- Groq API: https://console.groq.com/docs
- Prisma: https://www.prisma.io/docs/
- Socket.io: https://socket.io/docs/

---

**Happy coding! ♟️⚡**
