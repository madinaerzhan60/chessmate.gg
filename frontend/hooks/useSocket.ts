'use client';

import { useEffect, useMemo, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL ?? 'http://localhost:4000';

export function useSocket(roomId?: string) {
  const [connected, setConnected] = useState(false);
  const socket = useMemo<Socket>(() => io(SOCKET_URL, { autoConnect: false }), []);

  useEffect(() => {
    socket.connect();
    const onConnect = () => {
      setConnected(true);
      if (roomId) socket.emit('join_room', { roomId });
    };
    const onDisconnect = () => setConnected(false);
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.disconnect();
    };
  }, [socket, roomId]);

  return { socket, connected };
}
