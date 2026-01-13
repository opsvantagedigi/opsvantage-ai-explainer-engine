"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
export default function PlansPage() {
    const [niches, setNiches] = useState([]);
    const [selected, setSelected] = useState(null);
    const [timeframe, setTimeframe] = useState('weekly');
    const [days, setDays] = useState(7);
    useEffect(() => {
        fetch('/api/workspaces').then(r => r.json()).then(ws => {
            if (ws && ws.length) {
                const workspaceId = ws[0].id;
                fetch(`/api/workspaces/${workspaceId}/niches`).then(r => r.json()).then(setNiches);
            }
        });
    }, []);
    async function createPlan() {
        const ws = await fetch('/api/workspaces').then(r => r.json()).then(a => a[0]);
        if (!selected)
            return alert('Choose niche');
        const body = { timeframe };
        if (timeframe === 'custom')
            body.days = days;
        const res = await fetch(`/api/workspaces/${ws.id}/niches/${selected}/plans`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
        const plan = await res.json();
        alert('Plan created with ' + plan.shortVideos.length + ' items');
    }
    return (_jsxs("div", { className: "p-8", children: [_jsx("h2", { className: "text-2xl font-bold", children: "Content Plans" }), _jsxs("div", { className: "mt-4", children: [_jsxs("select", { className: "border p-2", value: selected || '', onChange: e => setSelected(e.target.value), children: [_jsx("option", { value: "", children: "Select niche" }), niches.map(n => _jsx("option", { value: n.id, children: n.name }, n.id))] }), _jsxs("select", { className: "border p-2 ml-2", value: timeframe, onChange: e => setTimeframe(e.target.value), children: [_jsx("option", { value: "weekly", children: "Weekly (7)" }), _jsx("option", { value: "monthly", children: "Monthly (30)" }), _jsx("option", { value: "custom", children: "Custom" })] }), timeframe === 'custom' && _jsx("input", { type: "number", className: "border p-2 ml-2", value: days, onChange: e => setDays(Number(e.target.value)) }), _jsx("button", { className: "ml-2 bg-green-600 text-white px-3 py-2 rounded", onClick: createPlan, children: "Generate Plan" })] })] }));
}
