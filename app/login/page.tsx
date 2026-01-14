"use client"

import { Sparkles } from "lucide-react"
import { signIn } from "next-auth/react"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
      <div className="max-w-sm w-full space-y-6 bg-slate-900/60 border border-white/10 p-8 rounded-xl shadow-xl backdrop-blur-xl">

        <div className="flex flex-col items-center gap-2">
          <Sparkles className="h-8 w-8 text-[#F2C14E]" />
          <h1 className="font-(--font-orbitron) text-lg tracking-[0.25em] uppercase text-slate-300">
            OpsVantage Digital
          </h1>
          <p className="text-sm text-slate-400">Sign in to AI‑Shorts Studio</p>
        </div>

        <button
          onClick={() => signIn("email")}
          className="w-full px-4 py-2 rounded-full bg-linear-to-r from-[#003B73] via-[#00A676] to-[#F2C14E] text-slate-950 font-semibold shadow-lg hover:opacity-90 text-sm"
        >
          Continue with Email
        </button>
      </div>
    </div>
  )
}
