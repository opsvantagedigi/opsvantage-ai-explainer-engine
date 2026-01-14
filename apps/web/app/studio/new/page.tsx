"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles, Video, Mic, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

const steps = [
  { id: 1, label: "Topic", icon: Sparkles },
  { id: 2, label: "Script", icon: Video },
  { id: 3, label: "Voiceover", icon: Mic },
  { id: 4, label: "Assets", icon: ImageIcon },
  { id: 5, label: "Render", icon: CheckCircle2 },
];

export default function NewProjectPage() {
  const [step, setStep] = useState(1);
  const [topic, setTopic] = useState("");
  const [script, setScript] = useState("");
  const [voiceStyle, setVoiceStyle] = useState("Warm, conversational");
  const [assetHint, setAssetHint] = useState("Clean, minimal, tech-forward visuals");
  const [renderQueued, setRenderQueued] = useState(false);

  const currentIndex = steps.findIndex((s) => s.id === step);

  const next = () => {
    if (currentIndex < steps.length - 1) setStep(steps[currentIndex + 1].id);
  };
  const prev = () => {
    if (currentIndex > 0) setStep(steps[currentIndex - 1].id);
  };

  return (
    <div className="h-screen grid grid-rows-[auto_1fr] overflow-hidden">
      <header className="px-6 py-4 flex items-center justify-between border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Link href="/studio" className="text-xs text-white/60 hover:text-white flex items-center gap-1">
            <ArrowLeft className="w-3 h-3" />
            Back to Studio
          </Link>
          <h1 className="heading-orbitron text-xl md:text-2xl brand-text-gradient">New Prompt-to-Video Project</h1>
        </div>
        <span className="text-[11px] text-white/50">Step {currentIndex + 1} of {steps.length}</span>
      </header>

      <div className="grid grid-cols-12 gap-4 md:gap-6 px-4 md:px-6 py-4 overflow-hidden">
        {/* Left: Steps + Form */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-4 overflow-hidden">
          <div className="glass-panel p-4 flex items-center gap-3 overflow-x-auto">
            {steps.map((s, idx) => {
              const active = s.id === step;
              const completed = idx < currentIndex;
              return (
                <div key={s.id} className="flex items-center gap-2">
                  <button
                    onClick={() => setStep(s.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border ${
                      active
                        ? "border-white/80 bg-white text-black"
                        : completed
                        ? "border-green-400/60 text-green-300 bg-green-500/10"
                        : "border-white/20 text-white/60 bg-white/5"
                    } magnetic`}
                  >
                    <s.icon className="w-3 h-3" />
                    <span>{s.label}</span>
                  </button>
                  {idx < steps.length - 1 && <div className="w-6 h-px bg-white/10" />}
                </div>
              );
            })}
          </div>

          <div className="glass-panel p-4 flex-1 min-h-0 overflow-auto">
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="heading-orbitron text-xs text-gray-400 tracking-widest uppercase">Step 1 — Topic</h2>
                <p className="text-sm text-white/70">Describe the video you want to create. The AI will generate a script, scenes, and asset plan.</p>
                <textarea
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  rows={5}
                  className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2 text-sm outline-none focus:border-white/40"
                  placeholder="Example: A 3-minute explainer on how OpsVantage automates YouTube content for enterprise teams…"
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h2 className="heading-orbitron text-xs text-gray-400 tracking-widest uppercase">Step 2 — Script</h2>
                <p className="text-sm text-white/70">Refine or paste the script. In a later iteration, this will be AI-generated from your topic.</p>
                <textarea
                  value={script}
                  onChange={(e) => setScript(e.target.value)}
                  rows={10}
                  className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2 text-sm outline-none focus:border-white/40"
                  placeholder="Intro, hook, body, CTA…"
                />
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h2 className="heading-orbitron text-xs text-gray-400 tracking-widest uppercase">Step 3 — Voiceover</h2>
                <p className="text-sm text-white/70">Choose the voice style and tone. Later this will map to actual AI voice models.</p>
                <input
                  value={voiceStyle}
                  onChange={(e) => setVoiceStyle(e.target.value)}
                  className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2 text-sm outline-none focus:border-white/40"
                />
                <p className="text-xs text-white/40">Example: “Warm, confident, enterprise narrator with subtle energy.”</p>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <h2 className="heading-orbitron text-xs text-gray-400 tracking-widest uppercase">Step 4 — Visual Assets</h2>
                <p className="text-sm text-white/70">Describe the visual direction. This will later drive AI image/video generation.</p>
                <textarea
                  value={assetHint}
                  onChange={(e) => setAssetHint(e.target.value)}
                  rows={6}
                  className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2 text-sm outline-none focus:border-white/40"
                  placeholder="Example: Clean, minimal, gradient-heavy UI scenes with subtle motion and brand colors."
                />
              </div>
            )}

            {step === 5 && (
              <div className="space-y-4">
                <h2 className="heading-orbitron text-xs text-gray-400 tracking-widest uppercase">Step 5 — Render</h2>
                <p className="text-sm text-white/70">Review your configuration and queue a render. In a later phase, this will trigger the full AI pipeline.</p>
                <div className="glass-panel bg-white/5 border-white/20 p-3 text-xs space-y-2">
                  <div>
                    <span className="text-white/50">Topic:</span> <span className="text-white/80">{topic || "Not set"}</span>
                  </div>
                  <div>
                    <span className="text-white/50">Script:</span> <span className="text-white/80">{script ? `${script.slice(0, 80)}…` : "Not set"}</span>
                  </div>
                  <div>
                    <span className="text-white/50">Voice:</span> <span className="text-white/80">{voiceStyle}</span>
                  </div>
                  <div>
                    <span className="text-white/50">Visual Direction:</span> <span className="text-white/80">{assetHint ? `${assetHint.slice(0, 80)}…` : "Not set"}</span>
                  </div>
                </div>
                <button onClick={() => setRenderQueued(true)} className="btn-primary mt-2 spring-pop">Queue Render</button>
                {renderQueued && (
                  <p className="text-xs text-green-400 flex items-center gap-1 mt-2"><CheckCircle2 className="w-3 h-3" />Render job created. View it in Jobs.</p>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-white/60">
            <button
              onClick={prev}
              disabled={currentIndex === 0}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full border border-white/15 hover:bg-white/5 ${
                currentIndex === 0 ? "opacity-40 cursor-not-allowed" : ""
              }`}
            >
              <ArrowLeft className="w-3 h-3" />
              Back
            </button>
            <button
              onClick={next}
              disabled={currentIndex === steps.length - 1}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full border border-white/15 hover:bg-white/5 ${
                currentIndex === steps.length - 1 ? "opacity-40 cursor-not-allowed" : ""
              }`}
            >
              Next
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Right: Live Summary / AI Preview */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-4 overflow-hidden">
          <div className="glass-panel p-4 flex-1 min-h-0 overflow-auto">
            <h2 className="heading-orbitron text-xs text-yellow-400 tracking-widest uppercase mb-3">Project Snapshot</h2>
            <p className="text-xs text-white/60 mb-3">This is how the AI currently understands your project. In future iterations, this will drive automatic scene planning.</p>
            <div className="space-y-3 text-xs">
              <div>
                <p className="text-white/40">Topic</p>
                <p className="text-white/80">{topic || "Not set yet."}</p>
              </div>
              <div>
                <p className="text-white/40">Script</p>
                <p className="text-white/80">{script ? `${script.slice(0, 160)}…` : "Script will be generated from your topic."}</p>
              </div>
              <div>
                <p className="text-white/40">Voice Style</p>
                <p className="text-white/80">{voiceStyle}</p>
              </div>
              <div>
                <p className="text-white/40">Visual Direction</p>
                <p className="text-white/80">{assetHint || "Describe the visual mood and style you want."}</p>
              </div>
            </div>
          </div>

          <div className="glass-panel p-4">
            <h2 className="heading-orbitron text-xs text-gray-500 tracking-widest uppercase mb-2">AI Readiness</h2>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mb-2">
              <div className="h-full w-[82%] bg-gradient-to-r from-blue-500 via-green-400 to-yellow-400" />
            </div>
            <p className="text-[11px] text-white/60">Once wired, this flow will trigger script, voice, asset, and render jobs in sequence.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default function NewVideoPage() {
  return (
    <div className="max-w-4xl mx-auto p-8" style={{ minHeight: 'calc(100vh - 64px)' }}>
      <h1 className="text-2xl font-orbitron gradient-heading mb-4">Create a New Video</h1>
      <p className="text-base font-inter text-white/80">Prompt-to-video form goes here.</p>
    </div>
  );
}
