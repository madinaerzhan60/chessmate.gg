import { InputHTMLAttributes } from 'react';

export function NeonInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-xl border border-[#333] bg-[#1a1a1a] px-3 py-2 text-white outline-none transition focus:border-[#ff0033] focus:shadow-[0_0_12px_rgba(255,0,51,0.4)] ${props.className ?? ''}`}
    />
  );
}
