const squares = Array.from({ length: 64 }, (_, index) => ({
  id: index,
  value: Math.floor(Math.random() * 100)
}));

export function HeatmapChart() {
  return (
    <div className="neon-card p-4">
      <h2 className="font-[Orbitron] text-lg text-[#ff3359]">Move Heatmap</h2>
      <div className="mt-3 grid grid-cols-8 gap-1">
        {squares.map((square) => (
          <div
            key={square.id}
            className="aspect-square rounded-sm"
            style={{ backgroundColor: `rgba(255, 0, 51, ${Math.max(0.08, square.value / 100)})` }}
          />
        ))}
      </div>
    </div>
  );
}
