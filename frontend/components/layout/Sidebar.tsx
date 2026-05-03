import Link from 'next/link';

export function Sidebar() {
  return (
    <aside className="neon-card h-fit p-4">
      <ul className="space-y-2 text-sm text-textSecondary">
        <li>
          <Link href="/play" className="hover:text-[#ff3359]">
            Play
          </Link>
        </li>
        <li>
          <Link href="/puzzles" className="hover:text-[#ff3359]">
            Puzzles
          </Link>
        </li>
        <li>
          <Link href="/tournaments" className="hover:text-[#ff3359]">
            Tournaments
          </Link>
        </li>
      </ul>
    </aside>
  );
}
