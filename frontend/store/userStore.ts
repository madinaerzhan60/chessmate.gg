import { create } from 'zustand';

interface User {
  id: string;
  username: string;
  email: string;
  isPro: boolean;
}

interface UserState {
  accessToken: string | null;
  user: User | null;
  setSession: (accessToken: string, user: User) => void;
  clearSession: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  accessToken: null,
  user: null,
  setSession: (accessToken, user) => set({ accessToken, user }),
  clearSession: () => set({ accessToken: null, user: null })
}));
