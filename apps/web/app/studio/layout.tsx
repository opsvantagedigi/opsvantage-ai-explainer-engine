import React from 'react';
import { Header } from './components/header';
import { Sidebar } from './components/sidebar';

export const metadata = {
  title: 'Studio - AI YouTube Studio',
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen text-white font-inter" style={{ background: 'var(--background)' }}>
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 min-h-[calc(100vh-64px)] p-8">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
