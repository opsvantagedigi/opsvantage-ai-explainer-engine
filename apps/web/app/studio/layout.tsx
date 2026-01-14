// apps/web/app/studio/layout.tsx
import type { ReactNode } from 'react';
import { Header } from './components/header';
import { Sidebar } from './components/sidebar';

export default function StudioLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white font-inter flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
