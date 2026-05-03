export function Footer() {
  return (
    <footer className="border-t border-red-900/30 bg-bgSecondary px-4 py-8 text-sm text-textSecondary md:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 md:flex-row">
        <p>© {new Date().getFullYear()} CHECKMATE.GG</p>
        <p>Chess. Evolved. Powered by AI.</p>
      </div>
    </footer>
  );
}
