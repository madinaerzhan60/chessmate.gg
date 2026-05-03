import { Server, Socket } from 'socket.io';

export function registerGameRoom(io: Server, socket: Socket) {
  socket.on('join_room', ({ roomId }) => {
    socket.join(roomId);
    socket.emit('room_joined', { roomId });
  });

  socket.on('move', (payload) => {
    io.to(payload.roomId).emit('move', payload);
  });

  socket.on('resign', (payload) => {
    io.to(payload.roomId).emit('game_over', { result: payload.result ?? '1-0' });
  });
}
