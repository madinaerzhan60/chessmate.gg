import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Providers } from '@/components/providers/Providers';
import { AppShell } from '@/components/layout/AppShell';

export const metadata: Metadata = {
  title: 'CHECKMATE.GG',
  description: 'Chess. Evolved. Powered by AI.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-bgPrimary text-textPrimary">
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
