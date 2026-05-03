import Link from 'next/link';
import { ChessKing } from 'lucide-react';

type BrandLogoProps = {
  href?: string;
  compact?: boolean;
};

export function BrandLogo({ href = '/', compact = false }: BrandLogoProps) {
  const content = (
    <span className="inline-flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/30 bg-[radial-gradient(circle_at_30%_30%,rgba(255,110,75,0.95),#ff1a00_70%)] text-white shadow-[0_0_24px_rgba(255,26,0,0.35)]">
        <ChessKing className="h-5 w-5" />
      </span>
      {!compact ? (
        <span className="flex flex-col leading-none">
          <span className="font-[Orbitron] text-sm font-black tracking-[0.28em] text-white md:text-base">CHECKMATE.GG</span>
          <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.3em] text-[#ff6b6b]">AI chess arena</span>
        </span>
      ) : null}
    </span>
  );

  return (
    <Link href={href} className="transition-transform duration-200 hover:-translate-y-0.5">
      {content}
    </Link>
  );
}
