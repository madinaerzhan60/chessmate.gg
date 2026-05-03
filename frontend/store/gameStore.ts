import { create } from 'zustand';

interface GameState {
  roomId: string | null;
  orientation: 'white' | 'black';
  setRoomId: (id: string | null) => void;
  flipOrientation: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  roomId: null,
  orientation: 'white',
  setRoomId: (id) => set({ roomId: id }),
  flipOrientation: () => set((state) => ({ orientation: state.orientation === 'white' ? 'black' : 'white' }))
}));
