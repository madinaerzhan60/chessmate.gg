'use client';

import { NeonButton } from '@/components/ui/NeonButton';

interface StyleSelectorProps {
  style: 'tal' | 'karpov' | 'carlsen';
  onChange: (style: 'tal' | 'karpov' | 'carlsen') => void;
}

export function StyleSelector({ style, onChange }: StyleSelectorProps) {
  const styles: Array<'tal' | 'karpov' | 'carlsen'> = ['tal', 'karpov', 'carlsen'];
  return (
    <div className="neon-card flex flex-wrap gap-2 p-3">
      {styles.map((item) => (
        <NeonButton key={item} variant={style === item ? 'primary' : 'secondary'} onClick={() => onChange(item)}>
          {item.toUpperCase()}
        </NeonButton>
      ))}
    </div>
  );
}
