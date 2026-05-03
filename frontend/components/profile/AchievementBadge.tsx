interface AchievementBadgeProps {
  title: string;
  unlocked: boolean;
}

export function AchievementBadge({ title, unlocked }: AchievementBadgeProps) {
  return (
    <div
      className={`rounded-xl border p-3 text-center text-sm ${
        unlocked ? 'border-[#ff0033]/60 bg-[#1b0a0f] text-white' : 'border-[#333] bg-[#101010] text-[#555]'
      }`}
    >
      {title}
    </div>
  );
}
