export type SavedGameRecord = {
  id: string;
  accountName: string;
  pgn: string;
  result: '1-0' | '0-1' | '1/2-1/2' | '*';
  aiLevel: number;
  playedAt: string;
  moves: number;
};

const ACCOUNT_KEY = 'checkmate.accountName';
const SAVED_GAMES_KEY = 'checkmate.savedGames';

const readJson = <T>(value: string | null, fallback: T): T => {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

export const getAccountName = () => {
  if (typeof window === 'undefined') return 'Guest';
  return window.localStorage.getItem(ACCOUNT_KEY) ?? 'Guest';
};

export const setAccountName = (name: string) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(ACCOUNT_KEY, name.trim() || 'Guest');
};

export const getSavedGames = () => {
  if (typeof window === 'undefined') return [] as SavedGameRecord[];
  return readJson<SavedGameRecord[]>(window.localStorage.getItem(SAVED_GAMES_KEY), []);
};

export const saveGameRecord = (record: SavedGameRecord) => {
  if (typeof window === 'undefined') return [] as SavedGameRecord[];

  const existing = getSavedGames();
  const deduped = [record, ...existing.filter((game) => !(game.pgn === record.pgn && game.result === record.result))].slice(0, 20);
  window.localStorage.setItem(SAVED_GAMES_KEY, JSON.stringify(deduped));
  return deduped;
};