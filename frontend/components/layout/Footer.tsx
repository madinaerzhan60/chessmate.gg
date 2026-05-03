import { BrandLogo } from '@/components/layout/BrandLogo';

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[linear-gradient(180deg,rgba(6,6,6,0.92),rgba(10,10,10,0.98))] px-4 py-8 text-sm text-textSecondary md:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
        <BrandLogo compact />
        <div className="text-center md:text-right">
          <p>© {new Date().getFullYear()} CHECKMATE.GG</p>
          <p className="mt-1 text-[#ff6b6b]">Chess. Evolved. Powered by AI.</p>
        </div>
      </div>
    </footer>
  );
}
