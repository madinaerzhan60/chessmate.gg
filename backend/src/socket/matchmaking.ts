import { Server, Socket } from 'socket.io';

export function registerMatchmaking(io: Server, socket: Socket) {
  socket.on('quick_match', () => {
    socket.emit('match_found', { roomId: 'demo-room' });
  });
}
