"use client";
import React, { useState } from "react";

export function LandingExplainerDemo() {
  const [input, setInput] = useState("Paste your process, SOP, or idea here...");
  const [audience, setAudience] = useState("New hire");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");

  async function generate() {
    setLoading(true);
    setOutput("");
    try {
      const res = await fetch('/api/ai-explainer', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt: input, audience }) });
      if (!res.ok) {
        setOutput('Unable to generate explanation (demo mode)');
      } else {
        const json = await res.json();
        setOutput(json.explanation ?? 'Example explanation: ' + (input.slice(0, 120)));
      }
    } catch (err) {
      setOutput('Demo generation failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={6} className="w-full rounded-md p-3 bg-slate-800 text-slate-100" />
      <div className="flex gap-2 items-center">
        <select value={audience} onChange={(e) => setAudience(e.target.value)} className="rounded-md p-2 bg-slate-800 text-slate-100">
          <option>New hire</option>
          <option>Executive</option>
          <option>Client</option>
          <option>Non-technical stakeholder</option>
        </select>
        <button onClick={generate} className="px-4 py-2 rounded-full bg-gradient-to-r from-sky-500 via-emerald-400 to-amber-300 text-slate-900 font-semibold">
          {loading ? 'Generating …' : 'Generate Explanation'}
        </button>
      </div>
      <div className="p-4 rounded-md bg-slate-900 border border-slate-700 text-slate-100">{output || <span className="text-slate-400">No explanation yet — try the demo.</span>}</div>
    </div>
  );
}

export default LandingExplainerDemo;
