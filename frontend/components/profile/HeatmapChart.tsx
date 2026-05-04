const squares = Array.from({ length: 64 }, (_, index) => ({
  id: index,
  value: Math.floor(Math.random() * 100)
}));

export function HeatmapChart() {
  return (
    <div className="neon-card mx-auto w-full max-w-[420px] p-3 sm:max-w-[460px]">
      <h2 className="font-[Orbitron] text-base text-[#ff3359] sm:text-lg">Move Heatmap</h2>
      <div className="mt-2 grid grid-cols-8 gap-[2px] sm:gap-1">
        {squares.map((square) => (
          <div
            key={square.id}
            className="aspect-square rounded-[2px]"
            style={{ backgroundColor: `rgba(255, 0, 51, ${Math.max(0.08, square.value / 100)})` }}
          />
        ))}
      </div>
    </div>
  );
}
