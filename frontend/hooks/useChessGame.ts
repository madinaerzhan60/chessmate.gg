'use client';

import { useMemo, useState } from 'react';
import { Chess, Move } from 'chess.js';

export interface MoveOutcome {
  move: Move;
  fen: string;
  turn: 'w' | 'b';
  isGameOver: boolean;
  pgn: string;
}

export function useChessGame() {
  const [game, setGame] = useState(() => new Chess());
  const [fen, setFen] = useState(game.fen());
  const [history, setHistory] = useState<string[]>([]);

  const makeMove = (from: string, to: string, promotion?: string, baseFen?: string): MoveOutcome | null => {
    // Use provided FEN to avoid closure issues with stale game state
    const fenToUse = baseFen || game.fen();
    const clone = new Chess(fenToUse);
    const moveObj: any = { from, to };
    if (promotion) moveObj.promotion = promotion;
    const move = clone.move(moveObj) as Move | null;
    if (!move) return null;
    setGame(clone);
    setFen(clone.fen());
    setHistory(clone.history());
    return {
      move,
      fen: clone.fen(),
      turn: clone.turn(),
      isGameOver: clone.isGameOver(),
      pgn: clone.pgn()
    };
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
