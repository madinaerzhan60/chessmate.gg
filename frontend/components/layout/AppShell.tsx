'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLandingRoute = pathname === '/' || pathname === '/landing';

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      {isLandingRoute ? children : <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 md:px-8">{children}</main>}
      {isLandingRoute ? null : <Footer />}
    </div>
  );
}
