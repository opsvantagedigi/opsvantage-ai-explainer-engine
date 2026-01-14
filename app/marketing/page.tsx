"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Sparkles, Rocket, Scissors, Video, Workflow, ShieldCheck } from "lucide-react"

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 -z-10 opacity-60"
        style={{
          backgroundImage: `
            radial-gradient(circle at 0% 0%, rgba(0, 166, 118, 0.18) 0, transparent 55%),
            radial-gradient(circle at 100% 100%, rgba(242, 193, 78, 0.22) 0, transparent 55%),
            linear-gradient(135deg, rgba(0, 10, 30, 0.95), rgba(0, 59, 115, 0.85), rgba(0, 166, 118, 0.75))
          `,
          backgroundSize: "220% 220%",
        }}
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
      />

      <main className="mx-auto max-w-6xl px-4 md:px-8 py-16 space-y-20">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-[#F2C14E]" />
            <span className="font-(--font-orbitron) text-sm tracking-[0.25em] uppercase text-slate-300">
              OpsVantage Digital
            </span>
          </div>
          <Link
            href="/login"
            className="px-4 py-2 rounded-full bg-linear-to-r from-[#003B73] via-[#00A676] to-[#F2C14E] text-slate-950 font-semibold shadow-lg hover:opacity-90 text-sm"
          >
            Launch AI‑Shorts Studio
          </Link>
        </div>

        {/* Hero */}
        <section className="space-y-6">
          <h1 className="text-3xl md:text-5xl font-semibold bg-linear-to-r from-[#F2C14E] via-[#00A676] to-[#00B4D8] bg-clip-text text-transparent">
            The fastest way to turn ideas into short‑form content.
          </h1>
          <p className="text-slate-300 max-w-2xl text-sm md:text-base">
            AI‑Shorts Studio helps creators, founders, and teams transform long‑form content into
            viral‑ready shorts with hooks, captions, pacing, and brand voice — all inside secure,
            multi‑tenant workspaces.
          </p>
        </section>

        {/* Feature grid */}
        <section className="grid gap-6 md:grid-cols-3">
          {[
            { icon: Scissors, title: "Script → Shorts", desc: "Drop your content and get ready‑to‑publish shorts instantly." },
            { icon: Video, title: "Creator‑grade output", desc: "Hooks, captions, pacing, and brand voice baked in." },
            { icon: Workflow, title: "Workspace collaboration", desc: "Multi‑tenant workspaces with roles and audit logs." },
            { icon: ShieldCheck, title: "Enterprise‑ready", desc: "RLS, secure Postgres, and governance from day one." },
            { icon: Rocket, title: "Monetisation‑ready", desc: "Plans, trials, and billing built into the platform." },
          ].map((f) => (
            <div key={f.title} className="rounded-xl border border-white/10 bg-slate-950/70 p-5 shadow">
              <f.icon className="h-6 w-6 text-[#00A676] mb-3" />
              <h3 className="font-semibold text-slate-50 mb-1">{f.title}</h3>
              <p className="text-slate-300 text-xs">{f.desc}</p>
            </div>
          ))}
        </section>

        {/* CTA */}
        <section className="text-center space-y-4">
          <h2 className="text-xl font-semibold text-slate-50">Ready to create your first shorts?</h2>
          <Link
            href="/login"
            className="inline-block px-6 py-3 rounded-full bg-linear-to-r from-[#003B73] via-[#00A676] to-[#F2C14E] text-slate-950 font-semibold shadow-lg hover:opacity-90 text-sm"
          >
            Launch AI‑Shorts Studio
          </Link>
        </section>
      </main>
    </div>
  )
}
