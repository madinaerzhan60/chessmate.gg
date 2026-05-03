'use client';

import { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary';

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export function NeonButton({ variant = 'primary', className = '', ...props }: NeonButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 font-semibold tracking-wide transition duration-200 disabled:cursor-not-allowed disabled:opacity-50 motion-safe:hover:-translate-y-0.5';

  const styles =
    variant === 'primary'
      ? 'font-[Orbitron] border border-[#ff1a00]/40 bg-[linear-gradient(180deg,#ff5a3a,#ff1a00_55%,#a40015)] text-white shadow-[0_0_24px_rgba(255,26,0,0.35)] hover:border-[#ff6b6b]/60 hover:shadow-[0_0_34px_rgba(255,26,0,0.45)] hover:brightness-110'
      : 'border border-white/10 bg-white/5 text-white shadow-[0_0_16px_rgba(255,26,0,0.12)] hover:border-[#ff1a00]/40 hover:bg-[#ff1a00]/10 hover:shadow-[0_0_24px_rgba(255,26,0,0.22)]';

  return <button className={`${base} ${styles} ${className}`} {...props} />;
}
