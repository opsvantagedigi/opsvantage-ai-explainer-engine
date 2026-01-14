// apps/web/app/studio/page.tsx
import React from 'react';

export default function StudioPage() {
  return (
    <div className="p-6 flex flex-col gap-6 h-full overflow-y-auto">
      {/* Header Section */}
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="heading-orbitron text-3xl font-black brand-text-gradient">
            AI-YouTube Studio
          </h1>
          <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest text-green-400">
            Enterprise Live
          </span>
        </div>
        <button className="px-6 py-2 bg-white text-black font-bold rounded-full text-sm hover:bg-yellow-400 transition-colors">
          EXPORT VIDEO
        </button>
      </header>

      <div className="grid grid-cols-12 gap-6 flex-1">
        {/* LEFT: Director's Stage (Video Preview & Timeline) */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
          <div className="glass-panel aspect-video relative overflow-hidden group">
            {/* Center Brand Icon Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-linear-to-br from-blue-700 via-green-500 to-yellow-300 opacity-20 blur-2xl group-hover:opacity-40 transition-all" />
              <div className="w-16 h-16 rounded-full bg-linear-to-br from-blue-600 via-green-400 to-yellow-400 shadow-2xl flex items-center justify-center">
                <div className="w-4 h-4 bg-white rotate-45" />
              </div>
            </div>

            <div className="absolute bottom-0 w-full p-4 bg-black/60 backdrop-blur-md flex justify-between items-center">
              <div className="flex gap-4 items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-ping" />
                <span className="text-xs font-mono">00:42 / 03:15</span>
              </div>
              <div className="flex gap-4 opacity-50">
                <span className="text-xs italic underline cursor-pointer">Edit Layers</span>
              </div>
            </div>
          </div>
"use client";

import { useState } from "react";
import { FloatingToolbar } from "./components/floating-toolbar";
import { PreviewPanel } from "./components/preview-panel";

export default function StudioPage() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="h-screen grid grid-rows-[auto_1fr] overflow-hidden">
      {/* Header */}
      <header className="px-6 py-4 flex justify-between items-center border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <h1 className="heading-orbitron text-2xl md:text-3xl font-black brand-text-gradient">AI-YouTube Studio</h1>
          <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest text-green-400">Enterprise Live</span>
        </div>
        <button className="px-6 py-2 bg-white text-black font-bold rounded-full text-sm hover:bg-yellow-400 transition-colors spring-pop">EXPORT VIDEO</button>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-4 md:gap-6 px-4 md:px-6 py-4 overflow-hidden">
        {/* LEFT: Director’s Stage */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-4 overflow-hidden">
          {/* Video Preview */}
          <div className="glass-panel aspect-video relative overflow-hidden group shrink-0">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-700 via-green-500 to-yellow-300 opacity-20 blur-2xl group-hover:opacity-40 transition-all" />
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 via-green-400 to-yellow-400 shadow-2xl flex items-center justify-center ai-pulse">
                <div className="w-4 h-4 bg-white rotate-45" />
              </div>
            </div>
            <div className="absolute bottom-0 w-full p-4 bg-black/60 backdrop-blur-md flex justify-between items-center">
              <div className="flex gap-4 items-center">
                <div className={`w-3 h-3 rounded-full ${playing ? "bg-red-500 animate-ping" : "bg-white/40"}`} />
                <span className="text-xs font-mono">00:42 / 03:15</span>
              </div>
              <div className="flex gap-4 opacity-70 text-xs">
                <span className="italic underline cursor-pointer">Edit Layers</span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="glass-panel p-4 flex-1 min-h-0 overflow-auto">
            <h3 className="heading-orbitron text-[10px] mb-4 text-gray-500">Multitrack Sequencer</h3>
            <div className="space-y-3">
              {["Video", "AI Voiceover", "Subtitles"].map((track) => (
                <div key={track} className="flex items-center gap-4">
                  <span className="text-[10px] w-20 text-gray-400 uppercase tracking-tighter">{track}</span>
                  <div className="h-8 flex-1 bg-white/5 rounded relative border border-white/5 overflow-hidden">
                    <div className="absolute left-10 right-40 top-1 bottom-1 bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded border-l-2 border-blue-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Neural Sidebar + Preview */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-4 overflow-hidden">
          <section className="glass-panel p-6 space-y-6 overflow-auto flex-1 min-h-0">
            <h2 className="heading-orbitron text-xs text-yellow-400 tracking-widest uppercase">Neural Workflow</h2>
            <div className="space-y-4">
              <button className="w-full text-left p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition group magnetic">
                <p className="text-xs text-gray-400 mb-1">AI Smart Task</p>
                <p className="text-sm font-semibold group-hover:text-yellow-400">Generate Script from Topic</p>
              </button>
              <button className="w-full text-left p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition group magnetic">
                <p className="text-xs text-gray-400 mb-1">Visual Enhancement</p>
                <p className="text-sm font-semibold group-hover:text-green-400">Auto-Apply Color Grade</p>
              </button>
            </div>
            <div className="pt-6 border-t border-white/10">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs text-gray-400 uppercase tracking-widest">Brand Compliance</span>
                <span className="text-xs text-green-400">98% Match</span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[98%] bg-gradient-to-r from-blue-500 via-green-400 to-yellow-400" />
              </div>
            </div>
          </section>

          <PreviewPanel />
        </div>
      </div>

      <FloatingToolbar playing={playing} onTogglePlay={() => setPlaying((p) => !p)} />
    </div>
  );
}
