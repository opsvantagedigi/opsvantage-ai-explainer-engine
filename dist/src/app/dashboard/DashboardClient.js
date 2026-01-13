"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function DashboardClient({ status }) {
    return (_jsxs("div", { className: "rounded-xl border border-white/10 bg-slate-900/60 p-4", children: [_jsx("h2", { className: "text-lg font-semibold text-slate-100", children: "Subscription" }), _jsxs("p", { className: "text-sm text-slate-300 mt-2", children: ["Status: ", status ?? "none"] })] }));
}
