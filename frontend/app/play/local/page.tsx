import { ChessBoard } from '@/components/board/ChessBoard';
import { PageFrame } from '@/components/layout/PageFrame';

export default function PlayLocalPage() {
  return (
    <PageFrame
      eyebrow="PASS AND PLAY"
      title="Local 2P"
      description="Same-device games with the same red-glow atmosphere as the landing page."
    >
      <ChessBoard aiLevel={0} />
    </PageFrame>
  );
}
