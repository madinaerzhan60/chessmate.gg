import Image from 'next/image';

interface PlayerCardProps {
  name: string;
  rating: number;
  avatar: string;
  timer: string;
}

export function PlayerCard({ name, rating, avatar, timer }: PlayerCardProps) {
  return (
    <div className="neon-card flex items-center justify-between p-4">
      <div className="flex items-center gap-3">
        <Image src={avatar} alt={name} width={56} height={56} className="rounded-full border border-[#ff0033]/60" />
        <div>
          <p className="font-[Orbitron] text-lg text-white">{name}</p>
          <p className="text-xs text-textSecondary">Rating: {rating}</p>
        </div>
      </div>
      <p className="font-['JetBrains_Mono'] text-sm text-[#ff3359]">{timer}</p>
    </div>
  );
}
