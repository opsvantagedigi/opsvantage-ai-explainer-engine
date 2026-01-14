 'use client'

import { SessionProvider, useSession } from 'next-auth/react'

export default function AnalyticsClientWrapper({ session }: { session: any }) {
  return (
    <SessionProvider session={session}>
      <AnalyticsInner />
    </SessionProvider>
  )
}

function AnalyticsInner() {
  const { data: session } = useSession()
  const [metrics, setMetrics] = (globalThis as any).__ai_youtube_metrics || [[], () => {}]

  // Local stub: show placeholder metrics once session is available
  if (session && (!metrics || metrics.length === 0)) {
    setMetrics([
      { label: 'Total Views (Last 30 Days)', value: '—' },
      { label: 'Avg. Watch Time', value: '—' },
      { label: 'Subscribers Gained', value: '—' },
    ])
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="heading-orbitron text-2xl mb-4">YouTube Analytics</h1>
      <p className="text-sm text-gray-400 mb-8">
        Once connected, AI-YouTube Studio will surface key performance metrics from your YouTube
        channel and generated content.
      </p>
      <div className="grid md:grid-cols-3 gap-4">
        {(metrics || []).map((m: any, i: number) => (
          <div key={i} className="glass-card rounded-2xl p-6">
            <p className="text-[11px] text-gray-500 mb-2">{m.label}</p>
            <p className="heading-orbitron text-xl">{m.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
