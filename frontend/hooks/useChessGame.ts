'use client';

import { useMemo, useState } from 'react';
import { Chess, Move } from 'chess.js';

export function useChessGame() {
  const [game, setGame] = useState(() => new Chess());
  const [fen, setFen] = useState(game.fen());
  const [history, setHistory] = useState<string[]>([]);

  const makeMove = (from: string, to: string, promotion = 'q') => {
    const clone = new Chess(game.fen());
    const move = clone.move({ from, to, promotion }) as Move | null;
    if (!move) return null;
    setGame(clone);
    setFen(clone.fen());
    setHistory(clone.history());
    return move;
  };

  const legalMoves = (square: string) => game.moves({ square: square as Move['from'], verbose: true }) as Move[];

  const status = useMemo(
    () => ({
      isCheck: game.inCheck(),
      isCheckmate: game.isCheckmate(),
      isStalemate: game.isStalemate(),
      isDraw: game.isDraw(),
      turn: game.turn(),
      pgn: game.pgn()
    }),
    [game, fen]
  );

  const reset = () => {
    const fresh = new Chess();
    setGame(fresh);
    setFen(fresh.fen());
    setHistory([]);
  };

  return { fen, history, makeMove, legalMoves, status, reset, game };
}
