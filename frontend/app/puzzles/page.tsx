'use client';

import { useEffect, useMemo, useState } from 'react';
import { Chess, Move, Square } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { api } from '@/lib/api';
import { NeonCard } from '@/components/ui/NeonCard';
import { NeonButton } from '@/components/ui/NeonButton';
import { PageFrame } from '@/components/layout/PageFrame';

type PuzzleResponse = {
  theme: string;
  fen: string;
  solution: string[];
};

const START_FEN = new Chess().fen();

const normalizeFen = (value?: string) => {
  if (!value || value === 'start' || value === 'startpos') return START_FEN;
  return value;
};

const parseUci = (move: string) => ({
  from: move.slice(0, 2),
  to: move.slice(2, 4),
  promotion: move.slice(4, 5) || undefined
});

export default function PuzzlesPage() {
  const [puzzle, setPuzzle] = useState<PuzzleResponse | null>(null);
  const [fen, setFen] = useState('start');
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [message, setMessage] = useState('Loading daily puzzle...');
  const [solved, setSolved] = useState(false);
  const [boardWidth, setBoardWidth] = useState(460);

  const normalizedFen = useMemo(() => normalizeFen(fen), [fen]);
  const game = useMemo(() => new Chess(normalizedFen), [normalizedFen]);
  const solution = puzzle?.solution ?? [];
  const firstMove = solution[0] ? parseUci(solution[0]) : null;

  useEffect(() => {
    const updateBoardWidth = () => {
      const viewport = window.innerWidth;
      const width = viewport >= 1280 ? 460 : viewport >= 1024 ? 420 : viewport >= 768 ? 400 : viewport - 32;
      setBoardWidth(Math.max(280, width));
    };

    updateBoardWidth();
    window.addEventListener('resize', updateBoardWidth);
    return () => window.removeEventListener('resize', updateBoardWidth);
  }, []);

  useEffect(() => {
    let active = true;

    api
      .get('/puzzles/daily')
      .then((response) => {
        if (!active) return;
        const data = response.data as PuzzleResponse;
        setPuzzle(data);
        setFen(normalizeFen(data.fen));
        setSolved(false);
        setSelectedSquare(null);
        setMessage(`Daily puzzle loaded: ${data.theme}`);
      })
      .catch(() => {
        if (!active) return;
        setMessage('Puzzle service is unavailable right now.');
      });

    return () => {
      active = false;
    };
  }, []);

  const customSquareStyles = useMemo(() => {
    const styles: Record<string, React.CSSProperties> = {};
    if (!selectedSquare) return styles;

    styles[selectedSquare] = {
      boxShadow: 'inset 0 0 0 2px rgba(255, 0, 51, 0.95), 0 0 20px rgba(255, 0, 51, 0.45)'
    };

    game.moves({ square: selectedSquare as Square, verbose: true }).forEach((move) => {
      styles[move.to] = {
        background: 'radial-gradient(circle, rgba(255,0,51,0.65) 18%, rgba(255,0,51,0.14) 28%, transparent 31%)'
      };
    });

    return styles;
  }, [game, selectedSquare]);

  const applyMove = (from: string, to: string) => {
    if (!firstMove || solved) return false;

    const clone = new Chess(fen === 'start' ? undefined : fen);
    let moveResult: Move | null = null;

    try {
      moveResult = clone.move({ from, to, promotion: firstMove.promotion }) as Move | null;
    } catch {
      moveResult = null;
    }

    if (!moveResult) {
      setMessage('Invalid move. Try the highlighted square.');
      return false;
    }

    const attempt = `${from}${to}${firstMove.promotion ?? ''}`;
    const expected = solution[0];

    if (attempt === expected) {
      setFen(clone.fen());
      setSolved(true);
      setSelectedSquare(null);
      setMessage('Correct! Puzzle solved.');
      return true;
    }

    setMessage('Not the solution line. Try again.');
    return false;
  };

  const handleSquareClick = (square: string) => {
    if (solved || !firstMove) return;

    const piece = game.get(square as Square);

    if (selectedSquare) {
      if (selectedSquare === square) {
        setSelectedSquare(null);
        return;
      }

      const moved = applyMove(selectedSquare, square);
      if (!moved) return;
      return;
    }

    if (!piece) {
      setMessage('Select the side to move piece.');
      return;
    }

    if (piece.color !== game.turn()) {
      setMessage(`It is ${game.turn() === 'w' ? 'white' : 'black'} to move.`);
      return;
    }

    setSelectedSquare(square);
  };

  const resetPuzzle = () => {
    if (!puzzle) return;
    setFen(normalizeFen(puzzle.fen));
    setSolved(false);
    setSelectedSquare(null);
    setMessage(`Daily puzzle loaded: ${puzzle.theme}`);
  };

  return (
    <PageFrame
      eyebrow="TACTICAL TRAINING"
      title="Daily Puzzles"
      description="Solve the forced line directly on the board. The puzzle is fetched from the backend and stays responsive on mobile."
      actions={
        <>
          <NeonButton variant="secondary" onClick={resetPuzzle} disabled={!puzzle}>
            Reset Puzzle
          </NeonButton>
          <NeonButton onClick={() => window.location.reload()}>Refresh</NeonButton>
        </>
      }
    >
      <div className="grid gap-4 lg:grid-cols-[minmax(280px,460px)_1fr]">
        <div className="space-y-3">
          <div className="neon-card border-white/5 bg-black/35 p-3">
            <Chessboard
              id="daily-puzzle-board"
              position={normalizedFen}
              boardWidth={boardWidth}
              boardOrientation="white"
              onSquareClick={handleSquareClick}
              customDarkSquareStyle={{ backgroundColor: '#2b1216' }}
              customLightSquareStyle={{ backgroundColor: '#6a262c' }}
              customSquareStyles={customSquareStyles}
              animationDuration={150}
              arePiecesDraggable={false}
            />
            <p className="mt-3 text-sm text-[#ff3359]">{message}</p>
          </div>
          <NeonCard className="border-white/5 bg-black/35">
            <p className="text-xs uppercase tracking-[0.22em] text-textSecondary">Theme</p>
            <p className="mt-2 text-base text-white">{puzzle?.theme ?? 'Loading...'}</p>
            <p className="mt-3 text-sm text-textSecondary">Goal: play {solution[0] ?? 'the first move'}.</p>
          </NeonCard>
        </div>
        <NeonCard className="border-white/5 bg-black/35">
          <h2 className="font-[Orbitron] text-xl text-[#ff3359]">How it works</h2>
          <div className="mt-4 space-y-3 text-sm text-textSecondary">
            <p>1. Wait for the daily puzzle to load from the backend.</p>
            <p>2. Click the piece and then the target square.</p>
            <p>3. If the move matches the solution line, the puzzle is marked solved.</p>
          </div>
          <div className="mt-5 rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-sm text-textSecondary">
            Status: <span className="text-white">{solved ? 'Solved' : 'In progress'}</span>
          </div>
        </NeonCard>
      </div>
    </PageFrame>
  );
}
