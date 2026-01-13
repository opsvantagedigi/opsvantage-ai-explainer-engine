"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Link from 'next/link';
export default function AppInnerPage() {
    return (_jsx("div", { className: "min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-2xl font-semibold", children: "App Home" }), _jsxs("p", { className: "mt-2 text-slate-400", children: ["This route is the internal app area. Go to the public site: ", _jsx(Link, { href: "/", children: "Home" })] })] }) }));
}
