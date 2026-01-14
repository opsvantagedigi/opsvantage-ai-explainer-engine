"use client"

import Link from "next/link"

export function Navbar() {
  return (
    <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/opsvantage-icon.png" className="h-6 w-6" alt="OpsVantage Icon" />
          <span className="font-(--font-orbitron) text-sm tracking-[0.25em] uppercase text-slate-300">
            AI‑Shorts Studio
          </span>
        </div>

        <nav className="flex gap-4 text-sm items-center">
          <Link href="/landing" className="hover:text-white text-slate-300">Home</Link>
          <Link href="/marketing" className="hover:text-white text-slate-300">Features</Link>
          <Link href="/founder" className="hover:text-white text-slate-300">Founder</Link>

          <Link
            href="/login"
            className="px-4 py-2 rounded-full bg-linear-to-r from-[#003B73] via-[#00A676] to-[#F2C14E] 
                       text-slate-950 font-semibold shadow-lg hover:opacity-90"
          >
            Launch Studio
          </Link>
        </nav>
      </div>
    </header>
  )
}
