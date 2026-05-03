'use client';

import { NeonButton } from '@/components/ui/NeonButton';
import { useSpeech } from '@/hooks/useSpeech';

export function VoiceCoach({ text }: { text: string }) {
  const { speak, stop, speaking } = useSpeech();

  return (
    <div className="flex gap-2">
      <NeonButton variant="secondary" onClick={() => speak(text)}>
        Voice Read
      </NeonButton>
      {speaking ? (
        <NeonButton variant="secondary" onClick={stop}>
          Stop
        </NeonButton>
      ) : null}
    </div>
  );
}
