import { Server, Socket } from 'socket.io';

const roomMembers = new Map<string, string[]>();

const getColorForIndex = (index: number): 'w' | 'b' => (index === 0 ? 'w' : 'b');

export function registerGameRoom(io: Server, socket: Socket) {
  socket.on('join_room', ({ roomId }) => {
    if (!roomId || typeof roomId !== 'string') return;

    const members = roomMembers.get(roomId) ?? [];
    if (!members.includes(socket.id) && members.length < 2) {
      members.push(socket.id);
      roomMembers.set(roomId, members);
    }

    socket.join(roomId);

    const playerIndex = (roomMembers.get(roomId) ?? []).indexOf(socket.id);
    const yourColor = getColorForIndex(playerIndex < 0 ? 0 : playerIndex);
    const players = roomMembers.get(roomId) ?? [];

    socket.emit('room_joined', { roomId, yourColor, players: players.length });
    io.to(roomId).emit('room_players', { roomId, players: players.length });
  });

  socket.on('move', (payload) => {
    if (!payload?.roomId) return;
    socket.to(payload.roomId).emit('move', payload);
  });

  socket.on('resign', (payload) => {
    if (!payload?.roomId) return;
    io.to(payload.roomId).emit('game_over', { result: payload.result ?? '1-0' });
  });

  socket.on('disconnecting', () => {
    socket.rooms.forEach((roomId) => {
      if (roomId === socket.id) return;

      const members = roomMembers.get(roomId);
      if (!members) return;

      const filtered = members.filter((id) => id !== socket.id);
      if (filtered.length === 0) {
        roomMembers.delete(roomId);
      } else {
        roomMembers.set(roomId, filtered);
      }

      io.to(roomId).emit('room_players', { roomId, players: filtered.length });
    });
  });
}
