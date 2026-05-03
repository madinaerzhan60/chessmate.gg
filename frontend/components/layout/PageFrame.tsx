import { ReactNode } from 'react';

type PageFrameProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
};

export function PageFrame({ eyebrow, title, description, actions, children }: PageFrameProps) {
  return (
    <div className="relative isolate overflow-hidden rounded-[28px] border border-white/5 bg-[radial-gradient(circle_at_top_left,rgba(255,26,0,0.12),transparent_32%),linear-gradient(180deg,rgba(10,10,10,0.96),rgba(6,6,6,0.98))] px-4 py-6 shadow-[0_0_60px_rgba(255,26,0,0.08)] md:px-8 md:py-8">
      <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(255,26,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,26,0,0.03)_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="pointer-events-none absolute -left-24 top-12 h-56 w-56 rounded-full bg-[#ff1a00]/15 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-[#ff1a00]/10 blur-3xl" />

      <div className="relative z-10 space-y-6">
        <div className="space-y-3">
          {eyebrow ? <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#ff6b6b]">{eyebrow}</p> : null}
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="font-[Orbitron] text-3xl font-black tracking-tight text-white md:text-5xl">{title}</h1>
              {description ? <p className="mt-3 max-w-3xl text-sm leading-6 text-textSecondary md:text-base">{description}</p> : null}
            </div>
            {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
          </div>
        </div>

        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
}
