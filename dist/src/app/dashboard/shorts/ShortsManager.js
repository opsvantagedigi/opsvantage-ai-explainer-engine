"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
async function callApi(path, method = 'GET', body) {
    const res = await fetch(path, { method, headers: { 'Content-Type': 'application/json' }, body: body ? JSON.stringify(body) : undefined });
    if (!res.ok)
        throw new Error(await res.text());
    return res.json();
}
export default function ShortsManager({ workspaceId }) {
    const [shorts, setShorts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        let mounted = true;
        setLoading(true);
        callApi(`/api/shorts?workspaceId=${workspaceId}`)
            .then((data) => { if (mounted)
            setShorts(data); })
            .catch(console.error)
            .finally(() => mounted && setLoading(false));
        return () => { mounted = false; };
    }, [workspaceId]);
    async function handleGenerate(id) {
        await callApi(`/api/shorts/${id}/generate-script`, 'POST');
        const updated = await callApi(`/api/shorts?workspaceId=${workspaceId}`);
        setShorts(updated);
    }
    async function handleMarkReady(id) {
        await callApi(`/api/shorts/${id}/mark-ready`, 'POST', {});
        const updated = await callApi(`/api/shorts?workspaceId=${workspaceId}`);
        setShorts(updated);
    }
    async function handleUpload(id) {
        await callApi(`/api/shorts/${id}/upload`, 'POST', {});
        const updated = await callApi(`/api/shorts?workspaceId=${workspaceId}`);
        setShorts(updated);
    }
    if (loading)
        return _jsx("div", { className: "p-8", children: "Loading\u2026" });
    if (!shorts.length)
        return _jsx("div", { className: "p-8", children: "No shorts found." });
    return (_jsxs("div", { className: "p-8", children: [_jsx("h2", { className: "text-2xl font-bold", children: "Shorts" }), _jsx("div", { className: "mt-4 space-y-4", children: shorts.map((s) => (_jsxs("div", { className: "p-4 border rounded", children: [_jsx("h3", { className: "text-lg font-semibold", children: s.hook }), _jsxs("div", { className: "mt-2", children: ["Status: ", s.status] }), _jsx("pre", { className: "mt-2 whitespace-pre-wrap", children: s.script || 'No script' }), _jsxs("div", { className: "mt-2 flex gap-2", children: [_jsx("button", { className: "btn", onClick: () => handleGenerate(s.id), children: "Generate Script" }), _jsx("button", { className: "btn", onClick: () => handleMarkReady(s.id), children: "Mark Ready" }), _jsx("button", { className: "btn", onClick: () => handleUpload(s.id), children: "Upload" }), s.youtubeUrl && _jsx("a", { className: "text-blue-600", href: s.youtubeUrl, target: "_blank", rel: "noreferrer", children: "View on YouTube" })] })] }, s.id))) })] }));
}
