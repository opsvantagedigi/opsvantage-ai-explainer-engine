// apps/web/app/studio/layout.tsx
import type { ReactNode } from 'react';
import Link from 'next/link';

export default function StudioLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#050505] text-white">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-white/10 flex flex-col p-6 gap-8 bg-black/40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-linear-to-tr from-blue-600 via-green-400 to-yellow-400 animate-pulse" />
          <span className="heading-orbitron font-bold text-sm tracking-tighter">AI-STUDIO</span>
        </div>

        <nav className="flex flex-col gap-2 text-sm font-medium text-gray-400">
          <Link href="/studio" className="text-white bg-white/5 p-2 rounded-lg">
            Dashboard
          </Link>
          <Link href="/studio/new" className="hover:text-white cursor-pointer p-2 transition">
            Projects
          </Link>
          <Link href="/studio/jobs" className="hover:text-white cursor-pointer p-2 transition">
            AI Assets
          </Link>
          <Link href="/studio/settings" className="hover:text-white cursor-pointer p-2 transition">
            Analytics
          </Link>
        </nav>

        <div className="mt-auto text-xs text-white/60">
          <Link href="/" className="hover:text-white transition">
            ← Back to site
          </Link>
        </div>
      </aside>

      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
}
