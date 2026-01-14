// apps/web/app/studio/page.tsx
export default function StudioDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <section className="md:col-span-2">
        <div className="card mb-4">
          <h3 className="text-2xl font-orbitron gradient-heading mb-2">Create a new video</h3>
          <p className="text-white/80 mb-4">
            Start a prompt-based workflow to generate video ideas, scripts, and assets.
          </p>
          <a href="/studio/new" className="btn-primary">
            Create Video
          </a>
        </div>

        <div className="panel">
          <h4 className="font-orbitron mb-3">Recent jobs</h4>
          <ul className="space-y-3 text-white/80">
            <li className="flex items-center justify-between">
              <div>
                <div className="font-inter">Render: "How to Automate X"</div>
                <div className="text-xs text-white/60">Encoding — 3m ago</div>
              </div>
              <div className="text-sm text-white/80">Processing</div>
            </li>
            <li className="flex items-center justify-between">
              <div>
                <div className="font-inter">Render: "OpsVantage Intro"</div>
                <div className="text-xs text-white/60">Completed — 1h ago</div>
              </div>
              <div className="text-sm text-white/80">Done</div>
            </li>
          </ul>
        </div>
      </section>

      <aside className="md:col-span-1">
        <div className="card">
          <h4 className="font-orbitron mb-2">Quick Actions</h4>
          <div className="flex flex-col gap-3">
            <a href="/studio/new" className="btn-outline">
              New Prompt
            </a>
            <a href="/studio/jobs" className="btn-outline">
              View Jobs
            </a>
            <a href="/studio/settings" className="btn-outline">
              Settings
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
}
