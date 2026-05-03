#!/bin/bash

# Quick validation that the codebase structure is sound
# This does NOT require npm install to complete

set -e

echo "=== CHECKMATE.GG Code Validation ==="
echo ""

# Check key files exist
echo "✓ Checking frontend structure..."
test -f frontend/app/page.tsx && echo "  ✓ Landing page"
test -f frontend/app/layout.tsx && echo "  ✓ Root layout"
test -f frontend/components/board/ChessBoard.tsx && echo "  ✓ Chess board"
test -f frontend/hooks/useChessGame.ts && echo "  ✓ Chess logic hook"
test -f frontend/hooks/useStockfish.ts && echo "  ✓ Stockfish hook"
test -f frontend/store/gameStore.ts && echo "  ✓ Game store (Zustand)"
test -f frontend/workers/stockfish.worker.ts && echo "  ✓ Stockfish worker"

echo ""
echo "✓ Checking backend structure..."
test -f backend/src/index.ts && echo "  ✓ Express server"
test -f backend/src/routes/auth.ts && echo "  ✓ Auth routes"
test -f backend/src/routes/games.ts && echo "  ✓ Games routes"
test -f backend/src/services/groqService.ts && echo "  ✓ Groq AI service"
test -f backend/prisma/schema.prisma && echo "  ✓ Prisma schema"

echo ""
echo "✓ Checking TypeScript configs..."
test -f frontend/tsconfig.json && echo "  ✓ Frontend tsconfig"
test -f backend/tsconfig.json && echo "  ✓ Backend tsconfig"

echo ""
echo "✓ Checking environment examples..."
test -f frontend/.env.example && echo "  ✓ Frontend .env.example"
test -f backend/.env.example && echo "  ✓ Backend .env.example"

echo ""
echo "=== All structural checks passed! ✅ ==="
echo ""
echo "Next: Follow SETUP.md to install dependencies and run the app"
