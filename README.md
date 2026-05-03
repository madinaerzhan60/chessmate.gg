# CHECKMATE.GG

Full-stack chess platform (MVP scaffold).

Core implemented in this commit:
- Frontend (Next.js 14 + Tailwind + TypeScript): landing, auth, AI game page
- Backend (Express + Socket.io): basic API routes, Groq analysis service stub
- Prisma schema for PostgreSQL
- .env.example files

Run locally (quick start):

1. Backend

```bash
cd backend
npm install
cp .env.example .env
# set DATABASE_URL, JWT secrets, GROQ_API_KEY, etc.
npx prisma migrate dev --name init
npm run dev
```

2. Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```
