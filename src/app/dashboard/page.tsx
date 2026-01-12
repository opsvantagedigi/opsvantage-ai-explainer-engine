"use client";

import { useEffect, useState } from 'react';

type Workspace = any;

export default function Dashboard() {
  const [data, setData] = useState<Workspace[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/workspaces').then(r => r.json()).then(d => { setData(d); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8">Loading…</div>;
  if (!data) return <div className="p-8">No workspaces found.</div>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold">Workspaces</h2>
      {data.map((w: any) => (
        <div key={w.id} className="mt-4 p-4 border rounded">
          <h3 className="text-xl">{w.name} ({w.slug})</h3>
          <div className="mt-2">
            <strong>Niches:</strong>
            <ul className="list-disc ml-6">
              {w.niches.map((n: any) => <li key={n.id}>{n.name}</li>)}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
