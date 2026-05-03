'use client';

import { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary';

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export function NeonButton({ variant = 'primary', className = '', ...props }: NeonButtonProps) {
  const base =
    'rounded-xl px-4 py-2 font-semibold tracking-wide transition disabled:cursor-not-allowed disabled:opacity-50';

  const styles =
    variant === 'primary'
      ? 'font-[Orbitron] bg-gradient-to-br from-[#ff0033] to-[#880011] text-white shadow-[0_0_20px_rgba(255,0,51,0.5)] hover:brightness-110'
      : 'border border-[#ff0033] bg-transparent text-[#ff0033] hover:bg-[#ff0033]/10 hover:shadow-[0_0_14px_rgba(255,0,51,0.45)]';

  return <button className={`${base} ${styles} ${className}`} {...props} />;
}
