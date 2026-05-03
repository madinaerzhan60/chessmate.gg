'use client';

import { useMemo, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Square } from 'chess.js';
import { useChessGame } from '@/hooks/useChessGame';
import { useStockfish } from '@/hooks/useStockfish';
import { MoveHistory } from '@/components/board/MoveHistory';
import { GameControls } from '@/components/board/GameControls';

interface ChessBoardProps {
  aiLevel?: number;
}

export function ChessBoard({ aiLevel = 4 }: ChessBoardProps) {
  const { fen, makeMove, legalMoves, history, status, reset, game } = useChessGame();
  const { getBestMove, thinking } = useStockfish(Math.min(20, aiLevel * 3));
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [boardOrientation, setBoardOrientation] = useState<'white' | 'black'>('white');

  const onPieceDrop = (sourceSquare: string, targetSquare: string) => {
    const move = makeMove(sourceSquare, targetSquare);
    if (!move) return false;
    void (async () => {
      if (!status.isCheckmate && !status.isDraw && game.turn() === 'b') {
        const bestMove = await getBestMove(game.fen());
        if (bestMove) makeMove(bestMove.from, bestMove.to, bestMove.promotion);
      }
    })();
    return true;
  };

  const customSquareStyles = useMemo(() => {
    const styles: Record<string, React.CSSProperties> = {};
    if (selectedSquare) {
      styles[selectedSquare] = {
        boxShadow: 'inset 0 0 0 2px rgba(255, 0, 51, 0.95), 0 0 20px rgba(255, 0, 51, 0.45)',
        animation: 'pulse-red 0.8s infinite alternate'
      };

      legalMoves(selectedSquare as Square).forEach((move) => {
        styles[move.to] = {
          background:
            'radial-gradient(circle, rgba(255,0,51,0.65) 18%, rgba(255,0,51,0.14) 28%, transparent 31%)'
        };
      });
    }
    return styles;
  }, [selectedSquare, legalMoves]);

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(280px,640px)_1fr]">
      <div className="space-y-3">
        <div className="neon-card p-3">
          <Chessboard
            id="checkmate-board"
            position={fen}
            boardOrientation={boardOrientation}
            onPieceDrop={onPieceDrop}
            onSquareClick={(sq) => setSelectedSquare(sq)}
            customDarkSquareStyle={{ backgroundColor: '#0a0a0a' }}
            customLightSquareStyle={{ backgroundColor: '#1c0a0a' }}
            customSquareStyles={customSquareStyles}
            animationDuration={150}
          />
          {thinking ? <p className="mt-2 text-sm text-[#ff3359]">🔴 Engine thinking...</p> : null}
          {status.isCheck ? <p className="mt-2 text-sm text-[#ff3359]">King is in check.</p> : null}
          {status.isCheckmate ? <p className="mt-2 text-sm text-[#ff3359]">Checkmate.</p> : null}
          {status.isDraw ? <p className="mt-2 text-sm text-[#ff3359]">Game drawn.</p> : null}
        </div>
        <GameControls onReset={reset} onFlip={() => setBoardOrientation((s) => (s === 'white' ? 'black' : 'white'))} />
      </div>
      <MoveHistory moves={history} />
    </div>
  );
}
