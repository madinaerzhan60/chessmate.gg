'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { Chess, Move, Square } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { useSocket } from '@/hooks/useSocket';
import { NeonButton } from '@/components/ui/NeonButton';

export default function RoomPage() {
  const params = useParams<{ roomId: string }>();
  const roomId = params.roomId;
  const { socket, connected } = useSocket(roomId);
  const [fen, setFen] = useState(() => new Chess().fen());
  const fenRef = useRef(fen);
  const [playerColor, setPlayerColor] = useState<'w' | 'b' | null>(null);
  const [playersInRoom, setPlayersInRoom] = useState(1);
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>('idle');
  const [roomFull, setRoomFull] = useState(false);
  const [boardWidth, setBoardWidth] = useState(560);

  const game = useMemo(() => new Chess(fen), [fen]);

  const normalizePlayersCount = (value: unknown) => {
    if (typeof value !== 'number' || Number.isNaN(value)) return 1;
    return Math.min(2, Math.max(1, Math.floor(value)));
  };

  useEffect(() => {
    fenRef.current = fen;
  }, [fen]);

  useEffect(() => {
    const updateBoardWidth = () => {
      const viewport = window.innerWidth;
      const width = viewport >= 1280 ? 560 : viewport >= 1024 ? 520 : viewport >= 768 ? 500 : viewport - 32;
      setBoardWidth(Math.max(280, width));
    };

    updateBoardWidth();
    window.addEventListener('resize', updateBoardWidth);
    return () => window.removeEventListener('resize', updateBoardWidth);
  }, []);

  const inviteLink = useMemo(() => {
    if (typeof window === 'undefined') return `https://chessmate-gg.vercel.app/play/${params.roomId}`;
    return `${window.location.origin}/play/${params.roomId}`;
  }, [params.roomId]);

  useEffect(() => {
    const onRoomJoined = (payload: { roomId: string; yourColor: 'w' | 'b'; players: number }) => {
      if (payload.roomId !== roomId) return;
      setPlayerColor(payload.yourColor);
      setPlayersInRoom(normalizePlayersCount(payload.players));
      setRoomFull(false);
      setMessage(payload.yourColor === 'w' ? 'Вы белые. Делайте первый ход.' : 'Вы черные. Ждите ход белых.');
    };

    const onRoomFull = (payload: { roomId: string }) => {
      if (payload.roomId !== roomId) return;
      setRoomFull(true);
      setPlayersInRoom(2);
      setMessage('Комната занята. В комнате уже 2 игрока.');
    };

    const onRoomPlayers = (payload: { roomId: string; players: number }) => {
      if (payload.roomId !== roomId) return;
      setPlayersInRoom(normalizePlayersCount(payload.players));
    };

    const onRemoteMove = (payload: { roomId: string; from: string; to: string; promotion?: string; fen?: string }) => {
      if (payload.roomId !== roomId) return;

      const clone = new Chess(fenRef.current);
      let moveResult: Move | null = null;
      try {
        moveResult = clone.move({ from: payload.from, to: payload.to, promotion: payload.promotion }) as Move | null;
      } catch {
        moveResult = null;
      }

      if (moveResult) {
        setFen(clone.fen());
      } else if (payload.fen) {
        setFen(payload.fen);
      }

      setMessage('Ход соперника получен. Ваш ход.');
    };

    socket.on('room_joined', onRoomJoined);
    socket.on('room_players', onRoomPlayers);
    socket.on('move', onRemoteMove);
    socket.on('room_full', onRoomFull);

    return () => {
      socket.off('room_joined', onRoomJoined);
      socket.off('room_players', onRoomPlayers);
      socket.off('move', onRemoteMove);
      socket.off('room_full', onRoomFull);
    };
  }, [socket, roomId]);

  const tryMove = (from: string, to: string) => {
    if (!playerColor) {
      setMessage('Подключение к комнате...');
      return false;
    }

    const activeTurn = game.turn();
    if (activeTurn !== playerColor) {
      setMessage(playerColor === 'w' ? 'Сейчас ход черных.' : 'Сейчас ход белых.');
      return false;
    }

    const piece = game.get(from as Square);
    const promotion = piece?.type === 'p' && (to.endsWith('1') || to.endsWith('8')) ? 'q' : undefined;

    const clone = new Chess(fenRef.current);
    let moveResult: Move | null = null;
    try {
      moveResult = clone.move({ from, to, promotion }) as Move | null;
    } catch {
      moveResult = null;
    }

    if (!moveResult) {
      setMessage('Неверный ход. Выберите подсвеченную клетку.');
      return false;
    }

    const nextFen = clone.fen();
    setFen(nextFen);
    setSelectedSquare(null);
    setMessage('Ход отправлен сопернику.');
    socket.emit('move', { roomId, from, to, promotion, fen: nextFen });
    return true;
  };

  const handleSquareClick = (square: string) => {
    if (roomFull) return;

    if (!playerColor) {
      return;
    }

    const piece = game.get(square as Square);
    const activeTurn = game.turn();

    if (selectedSquare) {
      if (selectedSquare === square) {
        setSelectedSquare(null);
        setMessage(null);
        return;
      }

      if (piece && piece.color === playerColor && activeTurn === playerColor) {
        setSelectedSquare(square);
        setMessage(null);
        return;
      }

      const moved = tryMove(selectedSquare, square);
      if (!moved) return;
      return;
    }

    if (!piece) {
      setMessage('Выберите свою фигуру.');
      return;
    }

    if (piece.color !== playerColor) {
      setMessage(playerColor === 'w' ? 'Вы играете белыми.' : 'Вы играете черными.');
      return;
    }

    if (activeTurn !== playerColor) {
      setMessage('Сейчас ход соперника.');
      return;
    }

    setSelectedSquare(square);
    setMessage(null);
  };

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
  }, [selectedSquare, game]);

  const copyInviteLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus('idle'), 1800);
    } catch {
      setCopyStatus('failed');
      setTimeout(() => setCopyStatus('idle'), 1800);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="neon-heading text-3xl">Room: {params.roomId}</h1>
      <div className="rounded-xl border border-[#ff0033]/30 bg-[#1a0a0f] p-3">
        <p className="text-sm text-textSecondary">Invite link:</p>
        <p className="mt-1 break-all text-sm text-white">{inviteLink}</p>
        <div className="mt-3 flex items-center gap-2">
          <NeonButton variant="secondary" onClick={copyInviteLink}>
            Copy Link
          </NeonButton>
          {copyStatus === 'copied' ? <span className="text-xs text-[#ff3359]">Copied</span> : null}
          {copyStatus === 'failed' ? <span className="text-xs text-[#ff3359]">Copy failed</span> : null}
        </div>
      </div>
      <div className="rounded-xl border border-[#ff0033]/40 bg-[#22080f] p-3 text-sm">
        <p>Вы: {playerColor === 'w' ? 'Белые' : playerColor === 'b' ? 'Черные' : 'Определяем роль...'}</p>
        <p>Игроков в комнате: {normalizePlayersCount(playersInRoom)}/2</p>
        <p>Ход: {game.turn() === 'w' ? 'Белых' : 'Черных'}</p>
      </div>
      {!connected ? <div className="rounded-xl border border-[#ff0033]/40 bg-[#22080f] p-3 text-sm">Connecting to room...</div> : null}
      <div className="neon-card mx-auto w-full max-w-[620px] p-3">
        <Chessboard
          id="room-board"
          position={fen}
          boardWidth={boardWidth}
          boardOrientation={playerColor === 'b' ? 'black' : 'white'}
          onSquareClick={handleSquareClick}
          customDarkSquareStyle={{ backgroundColor: '#2b1216' }}
          customLightSquareStyle={{ backgroundColor: '#6a262c' }}
          customSquareStyles={customSquareStyles}
          animationDuration={150}
          arePiecesDraggable={false}
        />
        {message ? <p className="mt-2 text-sm text-[#ff3359]">{message}</p> : null}
      </div>
    </div>
  );
}
