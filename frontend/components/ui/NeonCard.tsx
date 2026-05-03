import { ReactNode } from 'react';

export function NeonCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`neon-card p-4 ${className}`}>{children}</div>;
}
