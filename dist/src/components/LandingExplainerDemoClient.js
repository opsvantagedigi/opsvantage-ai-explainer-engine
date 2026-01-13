"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
export default function LandingExplainerDemoClient() {
    const [input, setInput] = useState("Paste your process, SOP, or idea here...");
    const [audience, setAudience] = useState("New hire");
    const [loading, setLoading] = useState(false);
    const [output, setOutput] = useState("");
    async function generate() {
        setLoading(true);
        setOutput("");
        try {
            const res = await fetch('/api/landing-explain', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: input, audience }),
            });
            if (!res.ok)
                setOutput('Unable to generate explanation (demo mode)');
            else {
                const json = await res.json();
                setOutput((json.title ? json.title + "\n\n" : "") +
                    (json.summary ? json.summary.join("\n") : json.whyItMatters ?? 'Example explanation: ' + input.slice(0, 120)));
            }
        }
        catch {
            setOutput('Demo generation failed');
        }
        finally {
            setLoading(false);
        }
    }
    return (_jsxs("div", { className: "space-y-3", children: [_jsx("label", { className: "block text-sm text-slate-300", children: "Paste your workflow, SOP, or idea" }), _jsx("textarea", { value: input, onChange: (e) => setInput(e.target.value), rows: 6, className: "w-full rounded-md p-3 bg-slate-800 text-slate-100" }), _jsxs("div", { className: "flex gap-2 items-center", children: [_jsxs("select", { value: audience, onChange: (e) => setAudience(e.target.value), className: "rounded-md p-2 bg-slate-800 text-slate-100", children: [_jsx("option", { children: "New hire" }), _jsx("option", { children: "Executive" }), _jsx("option", { children: "Client" }), _jsx("option", { children: "Non-technical stakeholder" })] }), _jsx("button", { onClick: generate, disabled: loading, className: "px-4 py-2 rounded-full bg-linear-to-r from-sky-500 via-emerald-400 to-amber-300 text-slate-900 font-semibold", children: loading ? 'Generating …' : 'Generate Explanation' })] }), _jsx("div", { className: "p-4 rounded-md bg-slate-900 border border-slate-700 text-slate-100 whitespace-pre-wrap", children: output || _jsx("span", { className: "text-slate-400", children: "No explanation yet \u2014 try the demo." }) })] }));
}
