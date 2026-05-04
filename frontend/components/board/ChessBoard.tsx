'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Square } from 'chess.js';
import { useChessGame } from '@/hooks/useChessGame';
import { useEngine } from '@/hooks/useEngine';
import { MoveHistory } from '@/components/board/MoveHistory';
import { GameControls } from '@/components/board/GameControls';
import { getAccountName, saveGameRecord } from '@/lib/gameArchive';

interface ChessBoardProps {
  aiLevel?: number;
  onPgnChange?: (pgn: string) => void;
}

export function ChessBoard({ aiLevel = 4, onPgnChange }: ChessBoardProps) {
  const { fen, makeMove, legalMoves, history, status, reset, game } = useChessGame();
  const { getBestMove, thinking } = useEngine();
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [boardOrientation, setBoardOrientation] = useState<'white' | 'black'>('white');
  const [moveMessage, setMoveMessage] = useState<string | null>(null);
  const savedGameKeyRef = useRef<string | null>(null);

  useEffect(() => {
    onPgnChange?.(status.pgn);
  }, [onPgnChange, status.pgn]);

  useEffect(() => {
    if (!status.isCheckmate && !status.isDraw) {
      savedGameKeyRef.current = null;
      return;
    }

    const result = status.isDraw ? '1/2-1/2' : game.turn() === 'w' ? '0-1' : '1-0';
    const gameKey = `${status.pgn}:${result}`;

    if (savedGameKeyRef.current === gameKey) return;

    saveGameRecord({
      id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}`,
      accountName: getAccountName(),
      pgn: status.pgn,
      result,
      aiLevel,
      playedAt: new Date().toISOString(),
      moves: history.length
    });
    savedGameKeyRef.current = gameKey;
  }, [aiLevel, game, history.length, status.isCheckmate, status.isDraw, status.pgn]);

  const onPieceDrop = (sourceSquare: string, targetSquare: string) => {
    const outcome = makeMove(sourceSquare, targetSquare);
    if (!outcome) {
      setMoveMessage('Неверный ход. Выберите другую клетку.');
      return false;
    }

    setMoveMessage(null);
    setSelectedSquare(null);

    void (async () => {
      if (aiLevel <= 0 || outcome.turn !== 'b' || outcome.isGameOver) {
        return;
      }
      setMoveMessage('Ход ИИ...');
      const bestMove = await getBestMove(outcome.fen);
      if (bestMove) {
        // Pass outcome.fen to avoid closure issues with stale game state
        const moveResult = makeMove(bestMove.from, bestMove.to, bestMove.promotion, outcome.fen);
        if (!moveResult) {
          setMoveMessage('ИИ не смог сделать ход. Попробуйте еще раз.');
          return;
        }
        setMoveMessage(null);
        return;
      }

      setMoveMessage('ИИ не нашел ход в этой позиции. Попробуйте другой ход.');
    })();

    return true;
  };

  const handleSquareClick = (square: string) => {
    if (thinking) return;

    const piece = game.get(square as Square);
    const activeColor = status.turn;

    if (selectedSquare) {
      if (selectedSquare === square) {
        setSelectedSquare(null);
        setMoveMessage(null);
        return;
      }

      if (piece && piece.color === activeColor) {
        setSelectedSquare(square);
        setMoveMessage(null);
        return;
      }

      const legalTarget = legalMoves(selectedSquare as Square).some((move) => move.to === square);
      if (legalTarget) {
        const moved = onPieceDrop(selectedSquare, square);
        if (moved) return;
      } else {
        setMoveMessage('Неверный ход. Выберите подсвеченную клетку.');
      }

      return;
    }

    if (!piece) {
      setMoveMessage('Выберите свою фигуру.');
      return;
    }

    if (piece.color !== activeColor) {
      setMoveMessage(activeColor === 'w' ? 'Сейчас ход белых.' : 'Сейчас ход черных.');
      return;
    }

    setMoveMessage(null);
    setSelectedSquare(square);
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
            onSquareClick={handleSquareClick}
            customDarkSquareStyle={{ backgroundColor: '#2b1216' }}
            customLightSquareStyle={{ backgroundColor: '#6a262c' }}
            customSquareStyles={customSquareStyles}
            animationDuration={150}
            arePiecesDraggable={false}
          />
          {thinking ? <p className="mt-2 text-sm text-[#ff3359]">Ход ИИ...</p> : null}
          {moveMessage ? <p className="mt-2 text-sm text-[#ff3359]">{moveMessage}</p> : null}
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
