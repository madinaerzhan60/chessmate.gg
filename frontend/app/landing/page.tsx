import Link from 'next/link';

export default function LandingPreviewPage() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="neon-heading text-3xl">Landing Preview</h1>
          <p className="text-sm text-textSecondary">The single-file CHECKMATE.GG landing page is served inside the frontend app.</p>
        </div>
        <Link href="/" className="rounded-full border border-red-900/40 bg-[#1a0608] px-4 py-2 text-sm text-white transition hover:border-red-500 hover:text-[#ff3359]">
          Back to Home
        </Link>
      </div>

      <div className="overflow-hidden rounded-3xl border border-red-900/30 bg-[#050505] shadow-[0_0_30px_rgba(255,26,0,0.14)]">
        <iframe
          title="CHECKMATE.GG landing page"
          src="/landing.html"
          className="h-[calc(100vh-14rem)] w-full"
        />
      </div>
    </div>
  );
}
