// apps/web/app/studio/layout.tsx
import type { ReactNode } from 'react';

function StudioSidebar() {
  return (
    <aside className="w-64 border-r border-white/20 px-6 py-8 flex flex-col gap-8">
      <div>
        <div className="w-12 h-12 rounded-full bg-white/10 mb-3" />
        <h1 className="text-xl font-orbitron gradient-heading">AI-YouTube Studio</h1>
      </div>
      <nav className="flex flex-col gap-3 text-white/80 text-sm">
        <a href="/studio" className="hover:bg-white/10 px-3 py-2 rounded">
          Dashboard
        </a>
        <a href="/studio/new" className="hover:bg-white/10 px-3 py-2 rounded">
          New Video
        </a>
        <a href="/studio/jobs" className="hover:bg-white/10 px-3 py-2 rounded">
          Jobs
        </a>
        <a href="/studio/settings" className="hover:bg-white/10 px-3 py-2 rounded">
          Settings
        </a>
      </nav>
    </aside>
  );
}

function StudioHeader() {
  return (
    <header className="flex items-center justify-between px-8 py-4 border-b border-white/20">
      <div>
        <h2 className="text-lg font-orbitron gradient-heading">Dashboard</h2>
        <p className="text-white/80 text-sm">Welcome to your AI-powered YouTube Studio.</p>
      </div>
      <div className="text-xs text-white/60">
        Powered by <span className="font-orbitron">OpsVantage Digital</span>
      </div>
    </header>
  );
}

export default function StudioLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white font-inter flex">
      <StudioSidebar />
      <div className="flex-1 flex flex-col">
        <StudioHeader />
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
