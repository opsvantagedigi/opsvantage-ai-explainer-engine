 'use client'

import { signIn, useSession } from 'next-auth/react'

export default function ConnectYouTubeButton() {
  const { data: session } = useSession()
  const isConnected = !!(session as any)?.accessToken

  const handleClick = () => {
    if (!isConnected) {
      signIn('google')
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={isConnected}
      className={`px-4 py-2 rounded-full text-xs heading-orbitron ${
        isConnected
          ? 'glass-card text-green-400 border-green-500/40 cursor-default'
          : 'glass-card hover:border-white/40'
      }`}
    >
      {isConnected ? 'YouTube Connected' : 'Connect YouTube'}
    </button>
  )
}
