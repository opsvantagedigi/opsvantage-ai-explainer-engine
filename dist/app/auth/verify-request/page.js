"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Link from "next/link";
export default function VerifyRequestPage() {
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-slate-950 text-slate-100", children: _jsxs("div", { className: "max-w-md p-8 rounded-xl bg-slate-900/80 border border-white/10", children: [_jsx("h1", { className: "text-lg font-semibold", children: "Check your inbox" }), _jsx("p", { className: "text-sm text-slate-300 mt-2", children: "We emailed you a magic sign-in link. It may take a minute to arrive." }), _jsx("div", { className: "mt-6", children: _jsx(Link, { href: "/login", className: "text-sm text-slate-200 underline", children: "Back to sign in" }) })] }) }));
}
