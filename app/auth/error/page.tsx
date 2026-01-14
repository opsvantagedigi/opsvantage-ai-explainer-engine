export default function AuthErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
      <div className="text-center space-y-3">
        <h1 className="text-xl font-semibold">Authentication Error</h1>
        <p className="text-slate-400 text-sm">Something went wrong. Please try again.</p>
      </div>
    </div>
  )
}
