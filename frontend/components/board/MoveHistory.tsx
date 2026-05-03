interface MoveHistoryProps {
  moves: string[];
}

export function MoveHistory({ moves }: MoveHistoryProps) {
  return (
    <div className="neon-card h-72 overflow-y-auto p-3">
      <h3 className="mb-2 font-[Orbitron] text-sm text-[#ff3359]">Move History</h3>
      <ol className="space-y-1 font-['JetBrains_Mono'] text-xs text-textSecondary">
        {moves.map((move, idx) => (
          <li key={`${move}-${idx}`}>
            {idx + 1}. {move}
          </li>
        ))}
      </ol>
    </div>
  );
}
