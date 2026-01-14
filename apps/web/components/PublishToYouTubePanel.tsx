 'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'

export default function PublishToYouTubePanel() {
  const { data: session } = useSession()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState<string | null>(null)
  const [isPublishing, setIsPublishing] = useState(false)

  const handlePublish = async () => {
    if (!(session as any)?.accessToken) {
      setStatus('YouTube is not connected.')
      return
    }

    setIsPublishing(true)
    setStatus('Publishing to YouTube...')

    try {
      const res = await fetch('/api/youtube/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, filePath: '/tmp/output.mp4' }),
      })

      if (!res.ok) throw new Error('Failed to publish')

      const data = await res.json()
      const jobId = data.jobId
      if (!jobId) throw new Error('No job id returned')

      setStatus('Queued. Tracking job...')

      const interval = setInterval(async () => {
        try {
          const s = await fetch(`/api/youtube/status?jobId=${encodeURIComponent(jobId)}`)
          if (!s.ok) throw new Error('Status fetch failed')
          const d = await s.json()
          if (d.progress !== undefined) {
            setStatus(`Job ${d.state} - ${d.progress}%`)
          } else {
            setStatus(`Job ${d.state}`)
          }

          if (d.state === 'completed') {
            setStatus('Published! ' + (d.result?.id || JSON.stringify(d.result)))
            clearInterval(interval)
            setIsPublishing(false)
          }

          if (d.state === 'failed') {
            setStatus('Publish failed')
            clearInterval(interval)
            setIsPublishing(false)
          }
        } catch (err) {
          setStatus('Error polling job status')
          clearInterval(interval)
          setIsPublishing(false)
        }
      }, 2000)
    } catch (err) {
      setStatus('Failed to publish video.')
      setIsPublishing(false)
    }
  }

  return (
    <div className="glass-card rounded-2xl p-6">
      <h2 className="heading-orbitron text-lg mb-4">Publish to YouTube</h2>
      <div className="space-y-3 text-xs">
        <input
          type="text"
          placeholder="Video title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 rounded-md bg-black/40 border border-white/10 text-xs"
        />
        <textarea
          placeholder="Video description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 rounded-md bg-black/40 border border-white/10 text-xs h-24"
        />
        <button
          onClick={handlePublish}
          disabled={isPublishing}
          className="px-4 py-2 rounded-full bg-white text-black text-xs heading-orbitron font-bold hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
        >
          {isPublishing ? 'Publishing…' : 'Publish to YouTube'}
        </button>
        {status && <p className="text-[11px] text-gray-400 mt-2">{status}</p>}
      </div>
    </div>
  )
}
