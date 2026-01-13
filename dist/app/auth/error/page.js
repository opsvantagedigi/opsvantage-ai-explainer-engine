import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Link from "next/link";
export default function AuthErrorPage({ searchParams }) {
    const error = Array.isArray(searchParams?.error) ? searchParams?.error[0] : searchParams?.error;
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-slate-950 text-slate-100", children: _jsxs("div", { className: "max-w-md p-8 rounded-xl bg-slate-900/80 border border-white/10", children: [_jsx("h1", { className: "text-lg font-semibold", children: "Authentication Error" }), _jsx("p", { className: "text-sm text-slate-300 mt-2", children: error ?? "Unknown" }), _jsx("div", { className: "mt-6 flex gap-3", children: _jsx(Link, { href: "/login", className: "text-sm px-3 py-2 rounded bg-slate-800", children: "Back to Sign In" }) })] }) }));
}
