export function calculateEloChange(winnerRating: number, loserRating: number) {
  const k = 32;
  const expected = 1 / (1 + 10 ** ((loserRating - winnerRating) / 400));
  return Math.round(k * (1 - expected));
}
