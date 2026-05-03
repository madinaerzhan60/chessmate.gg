import { ChessBoard } from '@/components/board/ChessBoard';

export default function PlayLocalPage() {
  return (
    <div className="space-y-4">
      <h1 className="neon-heading text-3xl">Local 2P</h1>
      <ChessBoard aiLevel={0} />
    </div>
  );
}
