import { Server, Socket } from 'socket.io';

type RoomPlayer = {
  playerId: string;
  socketId: string;
  color: 'w' | 'b';
};

const roomMembers = new Map<string, RoomPlayer[]>();

export function registerGameRoom(io: Server, socket: Socket) {
  socket.on('join_room', ({ roomId, playerId }) => {
    if (!roomId || typeof roomId !== 'string') return;
    if (!playerId || typeof playerId !== 'string') return;

    const members = roomMembers.get(roomId) ?? [];
    const existing = members.find((member) => member.playerId === playerId);

    if (existing) {
      existing.socketId = socket.id;
    } else if (members.length < 2) {
      const usedColors = new Set(members.map((member) => member.color));
      const color: 'w' | 'b' = usedColors.has('w') ? 'b' : 'w';
      members.push({ playerId, socketId: socket.id, color });
    } else {
      socket.emit('room_full', { roomId, players: members.length });
      return;
    }

    roomMembers.set(roomId, members);
    socket.join(roomId);

    const current = members.find((member) => member.playerId === playerId);
    const yourColor = current?.color ?? 'w';

    socket.emit('room_joined', { roomId, yourColor, players: members.length });
    io.to(roomId).emit('room_players', { roomId, players: members.length });
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

      const filtered = members.filter((member) => member.socketId !== socket.id);
      if (filtered.length === 0) {
        roomMembers.delete(roomId);
      } else {
        roomMembers.set(roomId, filtered);
      }

      io.to(roomId).emit('room_players', { roomId, players: filtered.length });
    });
  });
}
