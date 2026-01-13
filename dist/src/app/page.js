"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { motion, easeOut } from "framer-motion";
import { Copy, Menu, Sparkles, RotateCcw, Zap, Settings, Play, Youtube, MessageSquare, ChevronRight, } from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.15,
        },
    },
};
const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: easeOut },
    },
};
// relaxed typing to satisfy framer-motion Variants type constraints for the transition.ease
const gradientVariants = {
    animate: {
        backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        transition: {
            duration: 16,
            repeat: Number.POSITIVE_INFINITY,
            ease: easeOut,
        },
    },
};
const sidebarItems = [
    {
        icon: MessageSquare,
        label: "Content Plans",
        description: "Design structured explainer series.",
    },
    {
        icon: Play,
        label: "Short Video Generator",
        description: "Turn explainers into Shorts.",
    },
    {
        icon: Youtube,
        label: "YouTube Integration",
        description: "Publish directly to your channels.",
    },
    {
        icon: Settings,
        label: "Workspace Settings",
        description: "Govern roles, niches, and engines.",
    },
];
export default function AIExplainerPage() {
    const [input, setInput] = useState("");
    const [niche, setNiche] = useState("general");
    const [loading, setLoading] = useState(false);
    const [output, setOutput] = useState(null);
    const [copied, setCopied] = useState(null);
    const [error, setError] = useState(null);
    const handleGenerateExplainer = async () => {
        if (!input.trim())
            return;
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/ai-explainer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: input, niche }),
            });
            if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                throw new Error(body.message || "Failed to generate explainer");
            }
            const data = (await res.json());
            setOutput(data);
        }
        catch (e) {
            console.error(e);
            setError(e?.message ?? "Something went wrong while generating the explainer.");
        }
        finally {
            setLoading(false);
        }
    };
    const handleRegenerate = async () => {
        if (!output)
            return;
        await handleGenerateExplainer();
    };
    const copyToClipboard = (text, type) => {
        if (!text)
            return;
        navigator.clipboard
            .writeText(text)
            .then(() => {
            setCopied(type);
            setTimeout(() => setCopied(null), 2000);
        })
            .catch(() => {
            setError("Unable to copy to clipboard.");
        });
    };
    return (_jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [_jsx(motion.div, { className: "fixed inset-0 -z-10 opacity-70", style: {
                    backgroundImage: `
            radial-gradient(circle at 0% 0%, rgba(0, 166, 118, 0.18) 0, transparent 55%),
            radial-gradient(circle at 100% 100%, rgba(242, 193, 78, 0.22) 0, transparent 55%),
            radial-gradient(circle at 80% 10%, rgba(0, 59, 115, 0.28) 0, transparent 55%),
            linear-gradient(135deg, rgba(0, 59, 115, 0.85), rgba(0, 166, 118, 0.7), rgba(242, 193, 78, 0.6))
          `,
                    backgroundSize: "200% 200%",
                }, variants: gradientVariants, animate: "animate" }), _jsx("div", { className: "pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(15,23,42,0.85),transparent_60%),linear-gradient(to_bottom,rgba(15,23,42,0.9),rgba(15,23,42,0.98))]" }), _jsx("div", { className: "pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(to_right,rgba(148,163,184,0.25)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.25)_1px,transparent_1px)] bg-size-[80px_80px] opacity-25" }), _jsx(motion.header, { className: "sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl", initial: { opacity: 0, y: -24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, children: _jsxs("div", { className: "mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(motion.div, { className: "relative rounded-xl bg-linear-to-br from-[#003B73] via-[#00A676] to-[#F2C14E] p-0.5", animate: { rotate: 360 }, transition: { duration: 26, repeat: Number.POSITIVE_INFINITY, ease: "linear" }, children: _jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950", children: _jsx(Sparkles, { className: "h-5 w-5 text-[#F2C14E]" }) }) }), _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "font-orbitron text-sm uppercase tracking-[0.25em] text-slate-400", children: "OpsVantage Digital" }), _jsx("span", { className: "font-orbitron text-lg tracking-tight text-slate-50 md:text-xl", children: "AI Explainer Engine" })] })] }), _jsxs("div", { className: "hidden items-center gap-3 md:flex", children: [_jsx(Button, { variant: "outline", size: "sm", className: "border-slate-600 bg-transparent text-slate-100", children: "Sign in" }), _jsx(Button, { size: "sm", className: "border-0 bg-linear-to-r from-[#003B73] via-[#00A676] to-[#F2C14E] text-slate-950 shadow-lg shadow-emerald-500/20", children: "Launch Workspace" })] }), _jsx("div", { className: "md:hidden", children: _jsxs(Sheet, { children: [_jsx(SheetTrigger, { children: _jsx(Button, { variant: "ghost", size: "icon", children: _jsx(Menu, { className: "h-5 w-5 text-slate-100" }) }) }), _jsx(SheetContent, { className: "bg-slate-950/95 backdrop-blur-xl", children: _jsxs("div", { className: "mt-8 flex flex-col gap-4", children: [_jsx(Button, { variant: "outline", className: "w-full border-slate-600 bg-transparent text-slate-100", children: "Sign in" }), _jsx(Button, { className: "w-full border-0 bg-linear-to-r from-[#003B73] via-[#00A676] to-[#F2C14E] text-slate-950", children: "Launch Workspace" })] }) })] }) })] }) }), _jsxs("div", { className: "flex", children: [_jsxs(motion.aside, { className: "hidden h-[calc(100vh-56px)] w-64 border-r border-white/10 bg-slate-950/80 px-5 py-7 backdrop-blur-xl md:flex md:flex-col", initial: { opacity: 0, x: -24 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.6, delay: 0.1 }, children: [_jsx("div", { className: "mb-6", children: _jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.2em] text-slate-500", children: "Systems & Tools" }) }), _jsx(TooltipProvider, { children: _jsx("nav", { className: "flex flex-col gap-2", children: sidebarItems.map((item, idx) => {
                                        const Icon = item.icon;
                                        return (_jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { children: _jsxs(motion.button, { className: "group flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-200/80 transition-colors hover:bg-slate-900/70 hover:text-slate-50", whileHover: { x: 4 }, whileTap: { scale: 0.97 }, children: [_jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-[#003B73]/70 via-[#00A676]/70 to-[#F2C14E]/70 text-slate-950 shadow-md shadow-emerald-500/30", children: _jsx(Icon, { className: "h-4 w-4" }) }), _jsxs("div", { className: "flex flex-col items-start", children: [_jsx("span", { children: item.label }), _jsx("span", { className: "text-[11px] font-normal text-slate-400", children: item.description })] }), _jsx(ChevronRight, { className: "ml-auto h-4 w-4 text-slate-500 opacity-0 transition-opacity group-hover:opacity-100" })] }) }), _jsx(TooltipContent, { className: "bg-slate-900 text-slate-100", children: item.label })] }, item.label));
                                    }) }) }), _jsx("div", { className: "mt-auto pt-6", children: _jsx(Button, { variant: "outline", size: "sm", className: "w-full border-[#00A676]/60 bg-transparent text-xs font-medium uppercase tracking-[0.2em] text-[#00A676]", children: "Upgrade Plan" }) })] }), _jsx("main", { className: "flex-1 overflow-auto", children: _jsxs(motion.div, { className: "mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 md:px-8 md:py-12", variants: containerVariants, initial: "hidden", animate: "visible", children: [_jsxs(motion.section, { className: "text-center md:text-left", variants: itemVariants, children: [_jsx(motion.h2, { className: "bg-linear-to-r from-[#F2C14E] via-[#00A676] to-[#00B4D8] bg-clip-text font-orbitron text-3xl tracking-tight text-transparent sm:text-4xl md:text-5xl", animate: { y: [0, -4, 0] }, transition: { duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }, children: "Turn complex systems into clear explainers." }), _jsx("p", { className: "mt-4 max-w-2xl text-sm text-slate-300 md:text-base", children: "The OpsVantage AI Explainer Engine transforms your operational knowledge into ready\u2011to\u2011publish scripts, summaries, and Shorts\u2011ready content. Crafted for founders, educators, and system builders who think in workflows." })] }), _jsxs("div", { className: "grid gap-8 lg:grid-cols-2", children: [_jsxs(motion.section, { variants: itemVariants, className: "space-y-6", children: [_jsx(Card, { className: "border-white/10 bg-slate-950/60 p-6 shadow-lg shadow-slate-900/60", children: _jsxs("div", { className: "space-y-5", children: [_jsxs("div", { children: [_jsx("label", { className: "mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400", children: "Topic or system to explain" }), _jsx(Textarea, { placeholder: `E.g. "Explain our CI/CD pipeline for new engineers" or "Break down multi-tenant RLS for a client."`, value: input, onChange: (e) => setInput(e.target.value), className: "min-h-35 resize-none border-slate-700 bg-slate-950/80 text-sm text-slate-100 placeholder:text-slate-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400", children: "Audience / niche" }), _jsxs("select", { value: niche, onChange: e => setNiche(e.target.value), className: "border-slate-700 bg-slate-950/80 text-sm text-slate-100 rounded-md w-full px-3 py-2", children: [_jsx("option", { value: "general", children: "General audience" }), _jsx("option", { value: "founders", children: "Founders & operators" }), _jsx("option", { value: "engineers", children: "Engineers & dev teams" }), _jsx("option", { value: "clients", children: "Non\u2011technical clients" }), _jsx("option", { value: "students", children: "Students & learners" })] })] }), error && (_jsx("p", { className: "rounded-md border border-red-500/50 bg-red-500/10 px-3 py-2 text-xs text-red-200", children: error })), _jsx(motion.div, { whileHover: { scale: loading ? 1 : 1.01 }, whileTap: { scale: 0.98 }, children: _jsxs(Button, { onClick: handleGenerateExplainer, disabled: loading || !input.trim(), size: "lg", className: "relative w-full overflow-hidden border-0 bg-linear-to-r from-[#003B73] via-[#00A676] to-[#F2C14E] text-slate-950 shadow-xl shadow-emerald-500/30", children: [_jsx("span", { className: "absolute inset-0 -z-10 bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.4),transparent_60%),radial-gradient(circle_at_100%_100%,rgba(255,255,255,0.25),transparent_55%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" }), loading ? (_jsx(motion.span, { className: "mr-2 inline-block", animate: { rotate: 360 }, transition: { duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }, children: _jsx(Zap, { className: "h-5 w-5" }) })) : (_jsx(Sparkles, { className: "mr-2 h-5 w-5" })), loading ? "Generating explainer…" : "Generate Explainer"] }) })] }) }), _jsx("div", { className: "grid grid-cols-2 gap-4", children: [
                                                        { title: "Ops‑aware", desc: "Thinks in workflows, systems, and rituals." },
                                                        { title: "Explainer‑first", desc: "Optimized for clarity and teaching." },
                                                        { title: "Shorts‑ready", desc: "Outputs can feed directly into Shorts." },
                                                        { title: "Future‑proof", desc: "Built for multi‑tenant SaaS scale." },
                                                    ].map((item) => (_jsx(motion.div, { variants: itemVariants, whileHover: { y: -3 }, children: _jsxs(Card, { className: "border-white/5 bg-slate-950/70 p-4", children: [_jsx("h3", { className: "text-xs font-semibold uppercase tracking-[0.2em] text-slate-300", children: item.title }), _jsx("p", { className: "mt-2 text-xs text-slate-400", children: item.desc })] }) }, item.title))) })] }), _jsx(motion.section, { variants: itemVariants, className: "flex flex-col", children: output ? (_jsxs(motion.div, { className: "space-y-4", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 }, children: [_jsx(Card, { className: "border-white/10 bg-slate-950/70 p-6 shadow-lg shadow-slate-900/60", children: _jsxs("div", { className: "space-y-5", children: [_jsxs("div", { children: [_jsxs("div", { className: "mb-2 flex items-center justify-between", children: [_jsx("label", { className: "text-xs font-semibold uppercase tracking-[0.2em] text-slate-400", children: "Title" }), _jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { children: _jsx("button", { onClick: () => copyToClipboard(output.title, "title"), className: "rounded-md p-1 hover:bg-slate-800/80", children: _jsx(Copy, { className: `h-4 w-4 ${copied === "title" ? "text-emerald-400" : "text-slate-400"}` }) }) }), _jsx(TooltipContent, { className: "bg-slate-900 text-slate-100", children: copied === "title" ? "Copied" : "Copy title" })] }) })] }), _jsx("p", { className: "font-medium text-slate-50", children: output.title })] }), _jsxs("div", { children: [_jsxs("div", { className: "mb-2 flex items-center justify-between", children: [_jsx("label", { className: "text-xs font-semibold uppercase tracking-[0.2em] text-slate-400", children: "Script" }), _jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { children: _jsx("button", { onClick: () => copyToClipboard(output.script, "script"), className: "rounded-md p-1 hover:bg-slate-800/80", children: _jsx(Copy, { className: `h-4 w-4 ${copied === "script" ? "text-emerald-400" : "text-slate-400"}` }) }) }), _jsx(TooltipContent, { className: "bg-slate-900 text-slate-100", children: copied === "script" ? "Copied" : "Copy script" })] }) })] }), _jsx("p", { className: "rounded-lg bg-slate-900/80 p-3 text-sm leading-relaxed text-slate-200", children: output.script })] }), _jsxs("div", { children: [_jsxs("div", { className: "mb-2 flex items-center justify-between", children: [_jsx("label", { className: "text-xs font-semibold uppercase tracking-[0.2em] text-slate-400", children: "Key points" }), _jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { children: _jsx("button", { onClick: () => copyToClipboard(output.keyPoints.join("\n"), "keypoints"), className: "rounded-md p-1 hover:bg-slate-800/80", children: _jsx(Copy, { className: `h-4 w-4 ${copied === "keypoints"
                                                                                                            ? "text-emerald-400"
                                                                                                            : "text-slate-400"}` }) }) }), _jsx(TooltipContent, { className: "bg-slate-900 text-slate-100", children: copied === "keypoints" ? "Copied" : "Copy key points" })] }) })] }), _jsx("ul", { className: "space-y-2", children: output.keyPoints.map((point, idx) => (_jsxs(motion.li, { initial: { opacity: 0, x: -10 }, animate: { opacity: 1, x: 0 }, transition: { delay: idx * 0.07 }, className: "flex gap-2 text-sm text-slate-200", children: [_jsx("span", { className: "mt-0.75 h-1.5 w-1.5 shrink-0 rounded-full bg-linear-to-r from-[#00A676] to-[#F2C14E]" }), _jsx("span", { children: point })] }, idx))) })] }), _jsxs("div", { children: [_jsxs("div", { className: "mb-2 flex items-center justify-between", children: [_jsx("label", { className: "text-xs font-semibold uppercase tracking-[0.2em] text-slate-400", children: "Hashtags" }), _jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { children: _jsx("button", { onClick: () => copyToClipboard(output.hashtags.join(" "), "hashtags"), className: "rounded-md p-1 hover:bg-slate-800/80", children: _jsx(Copy, { className: `h-4 w-4 ${copied === "hashtags"
                                                                                                            ? "text-emerald-400"
                                                                                                            : "text-slate-400"}` }) }) }), _jsx(TooltipContent, { className: "bg-slate-900 text-slate-100", children: copied === "hashtags" ? "Copied" : "Copy hashtags" })] }) })] }), _jsx("div", { className: "flex flex-wrap gap-2", children: output.hashtags.map((tag, idx) => (_jsx(motion.span, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { delay: idx * 0.05 }, className: "rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200", children: tag }, idx))) })] })] }) }), _jsx("div", { className: "flex flex-col gap-3 sm:flex-row", children: _jsxs(Button, { variant: "outline", size: "lg", disabled: loading, onClick: handleRegenerate, className: "w-full border-slate-700 bg-transparent text-slate-100", children: [_jsx(RotateCcw, { className: "mr-2 h-5 w-5" }), "Regenerate with same intent"] }) })] })) : (_jsx(motion.div, { className: "flex h-full items-center justify-center", variants: itemVariants, children: _jsxs(Card, { className: "max-w-md border-white/5 bg-slate-950/70 p-8 text-center", children: [_jsx(motion.div, { className: "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-[#003B73] via-[#00A676] to-[#F2C14E]", animate: { scale: [1, 1.1, 1] }, transition: {
                                                                duration: 3,
                                                                repeat: Number.POSITIVE_INFINITY,
                                                                ease: "easeInOut",
                                                            }, children: _jsx(Sparkles, { className: "h-6 w-6 text-slate-950" }) }), _jsx("h3", { className: "text-base font-semibold text-slate-50", children: "Ready to explain your next system?" }), _jsx("p", { className: "mt-2 text-sm text-slate-400", children: "Describe a workflow, doctrine, or product behavior in the left panel. The AI Explainer Engine will return a clean script, key points, and hashtags you can ship directly to your channels." })] }) })) })] }), _jsx(motion.footer, { className: "mt-6 border-t border-white/10 pt-6 text-center text-xs text-slate-500", variants: itemVariants, children: "AI Explainer Engine \u00B7 Crafted for founders, educators, and operators who build systems that outlive them." })] }) })] })] }));
}
