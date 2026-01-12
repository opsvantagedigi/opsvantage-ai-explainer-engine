"use client";
import { useEffect, useState } from 'react';

export default function ShortsPage() {
  const [shorts, setShorts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/workspaces').then(r => r.json()).then((ws: any[]) => {
      if (!ws || !ws.length) { setLoading(false); return; }
      const items: any[] = [];
      ws[0].contentPlans?.forEach((p: any) => items.push(...(p.shortVideos || [])));
      setShorts(items);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  async function callApi(path: string, method = 'POST', body?: any) {
    const res = await fetch(path, { method, headers: { 'Content-Type': 'application/json' }, body: body ? JSON.stringify(body) : undefined });
    return res.json();
  }

  async function generate(shortId: string) {
    const ws = await fetch('/api/workspaces').then(r => r.json()).then(a => a[0]);
    await callApi(`/api/workspaces/${ws.id}/shorts/${shortId}/generate`);
    // refresh
    window.location.reload();
  }

  async function markReady(shortId: string) {
    const ws = await fetch('/api/workspaces').then(r => r.json()).then(a => a[0]);
    await callApi(`/api/workspaces/${ws.id}/shorts/${shortId}/mark-ready`, 'POST', { scheduledAt: null });
    window.location.reload();
  }

  async function triggerUpload(shortId: string) {
    const ws = await fetch('/api/workspaces').then(r => r.json()).then(a => a[0]);
    await callApi(`/api/workspaces/${ws.id}/shorts/${shortId}/upload`, 'POST');
    window.location.reload();
  }

  if (loading) return <div className="p-8">Loading…</div>;
  if (!shorts.length) return <div className="p-8">No shorts found.</div>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold">Shorts</h2>
      <div className="mt-4 space-y-4">
        {shorts.map(s => (
          <div key={s.id} className="border p-4 rounded">
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold">{s.hook || s.title || `Day ${s.dayIndex}`}</h3>
                <p className="text-sm text-gray-600">Status: {s.status}</p>
                <p className="text-sm">Title: {s.title}</p>
                <p className="text-sm">Scheduled: {s.scheduledAt ? new Date(s.scheduledAt).toLocaleString() : '—'}</p>
              </div>
              <div className="space-y-2">
                <button className="px-3 py-1 bg-indigo-600 text-white rounded" onClick={() => generate(s.id)}>Generate Script</button>
                <button className="px-3 py-1 bg-yellow-500 text-black rounded" onClick={() => markReady(s.id)}>Mark Ready</button>
                <button className="px-3 py-1 bg-green-600 text-white rounded" onClick={() => triggerUpload(s.id)}>Upload Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
