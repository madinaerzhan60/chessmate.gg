'use client';

import { useEffect, useMemo, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL ?? 'http://localhost:4000';
const PLAYER_ID_KEY = 'checkmate.playerTabId';

const getOrCreatePlayerId = () => {
  if (typeof window === 'undefined') return 'server-player';
  const stored = window.sessionStorage.getItem(PLAYER_ID_KEY);
  if (stored) return stored;
  const fresh = globalThis.crypto?.randomUUID?.() ?? `player-${Date.now()}`;
  window.sessionStorage.setItem(PLAYER_ID_KEY, fresh);
  return fresh;
};

export function useSocket(roomId?: string) {
  const [connected, setConnected] = useState(false);
  const socket = useMemo<Socket>(() => io(SOCKET_URL, { autoConnect: false, transports: ['websocket', 'polling'], reconnectionAttempts: 6 }), []);

  const playerId = useMemo(() => getOrCreatePlayerId(), []);

  // joinRoom should be called by the page after it has attached listeners to avoid missed events
  const joinRoom = (rid?: string) => {
    if (!rid) return;
    if (socket.connected) {
      socket.emit('join_room', { roomId: rid, playerId });
      return;
    }

    const onceConnect = () => {
      socket.emit('join_room', { roomId: rid, playerId });
      socket.off('connect', onceConnect);
    };

    socket.on('connect', onceConnect);
  };

  useEffect(() => {
    socket.connect();
    const onConnect = () => setConnected(true);
    const onDisconnect = () => setConnected(false);
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.disconnect();
    };
  }, [socket]);

  return { socket, connected, playerId, joinRoom };
}
