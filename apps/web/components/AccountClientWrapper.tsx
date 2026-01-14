 'use client'

import { SessionProvider, useSession } from 'next-auth/react'
import ConnectYouTubeButton from '@/components/ConnectYouTubeButton'

export default function AccountClientWrapper({ session }: { session: any }) {
  return (
    <SessionProvider session={session}>
      <AccountInner />
    </SessionProvider>
  )
}

function AccountInner() {
  const { data: session, status } = useSession()

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="heading-orbitron text-2xl mb-4">Account & Integrations</h1>
      <p className="text-sm text-gray-400 mb-8">
        Manage your AI-YouTube Studio account, YouTube connection, and publishing preferences.
      </p>

      <div className="glass-card rounded-2xl p-6 mb-6">
        <h2 className="heading-orbitron text-lg mb-2">YouTube Integration</h2>
        <p className="text-xs text-gray-400 mb-4">
          Connect your YouTube channel to enable automated publishing from the Studio.
        </p>
        <ConnectYouTubeButton />
        <div className="mt-4 text-xs text-gray-500">
          <p>Status: {status === 'authenticated' ? 'Signed in' : 'Not signed in'}</p>
          {session?.user?.email && <p>Signed in as: {session.user.email}</p>}
        </div>
      </div>
    </div>
  )
}
