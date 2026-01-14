'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import CommandPalette from './components';
import { Menu, X, LayoutDashboard, FolderKanban, Sparkles, BarChart3 } from 'lucide-react';

export default function StudioLayout({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showCommand, setShowCommand] = useState(false);

  // Cursor-follow glow
  useEffect(() => {
    const glow = document.getElementById('cursor-glow');
    if (!glow) return;

    const handleMove = (e: MouseEvent) => {
      const x = e.clientX - 110;
      const y = e.clientY - 110;
      (glow as HTMLElement).style.transform = `translate3d(${x}px, ${y}px, 0)`;
      (glow as HTMLElement).style.opacity = '1';
    };
    const handleLeave = () => {
      (glow as HTMLElement).style.opacity = '0';
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  // Command palette shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setShowCommand((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const navItems = [
    { href: '/studio', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/studio/new', label: 'Projects', icon: FolderKanban },
    { href: '/studio/jobs', label: 'AI Assets', icon: Sparkles },
    { href: '/studio/settings', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <div className="flex h-screen bg-[#050505] text-white overflow-hidden">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col border-r border-white/10 bg-black/40 transition-all duration-200 ${
          collapsed ? 'w-16' : 'w-64'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 via-green-400 to-yellow-400 animate-pulse" />
            {!collapsed && (
              <span className="heading-orbitron font-bold text-sm tracking-tighter">AI-STUDIO</span>
            )}
          </div>
          <button
            className="text-xs text-white/60 hover:text-white spring-pop"
            onClick={() => setCollapsed((c) => !c)}
          >
            {collapsed ? '›' : '‹'}
          </button>
        </div>

        <nav className="flex-1 flex flex-col gap-1 px-2 py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 magnetic"
            >
              <item.icon className="w-4 h-4" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="px-4 pb-4 text-xs text-white/60 flex flex-col gap-2">
          {!collapsed && (
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">Quick</p>
          )}
          <button
            onClick={() => setShowCommand(true)}
            className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs magnetic"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-yellow-300" />
              {!collapsed && <span>Command Palette</span>}
            </span>
            {!collapsed && <span className="text-[10px] text-white/50">⌘K</span>}
          </button>
          <Link href="/" className="hover:text-white transition">
            ← Back to site
          </Link>
        </div>
      </aside>

      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-3 bg-black/70 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 via-green-400 to-yellow-400 animate-pulse" />
          <span className="heading-orbitron text-xs tracking-tight">AI-STUDIO</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCommand(true)}
            className="text-xs px-2 py-1 rounded-full bg-white/10 hover:bg-white/20"
          >
            ⌘K
          </button>
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="p-1 rounded-md bg-white/5 hover:bg-white/10"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-20 bg-black/70 backdrop-blur-xl">
          <div className="w-64 h-full bg-black/90 border-r border-white/10 p-4 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="heading-orbitron text-sm">AI-STUDIO</span>
              <button onClick={() => setMobileOpen(false)}>
                <X className="w-4 h-4" />
              </button>
            </div>
            <nav className="flex-1 flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
            <div className="text-xs text-white/60 mt-4">
              <Link href="/" onClick={() => setMobileOpen(false)}>
                ← Back to site
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col md:ml-0">
        <CommandPalette open={showCommand} onOpenChange={setShowCommand} />
        {children}
      </main>
    </div>
  );
}
