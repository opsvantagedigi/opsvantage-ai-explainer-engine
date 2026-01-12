import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '2rem',
        background: '#020617',
        color: '#e5e7eb',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>
        OpsVantage AI Explainer Engine
      </h1>
      <p style={{ maxWidth: 480, marginBottom: '1.5rem', fontSize: '0.95rem', opacity: 0.85 }}>
        This is the public entry for the OpsVantage AI Explainer Engine. Click below to open the app
        experience.
      </p>
      <Link
        href="/app"
        style={{
          padding: '0.6rem 1.4rem',
          borderRadius: '999px',
          background: 'linear-gradient(90deg, #003B73, #00A676, #F2C14E)',
          color: '#020617',
          fontWeight: 600,
          textDecoration: 'none',
        }}
      >
        Open App
      </Link>
    </main>
  )
}

export default Home
