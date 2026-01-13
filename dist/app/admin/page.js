import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
export default async function AdminPage() {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    if (!userId) {
        return (_jsx("main", { className: "min-h-screen flex items-center justify-center bg-slate-950 text-slate-100", children: _jsxs("div", { className: "text-center space-y-3", children: [_jsx("p", { className: "text-sm text-slate-300", children: "You must be signed in." }), _jsx(Link, { href: "/login", className: "inline-flex px-4 py-2 rounded-full bg-linear-to-r from-[#003B73] via-[#00A676] to-[#F2C14E] text-slate-950 text-sm font-semibold", children: "Go to login" })] }) }));
    }
    const currentUser = await prisma.user.findUnique({
        where: { id: userId },
        select: { role: true, email: true },
    });
    if (currentUser?.role !== "superuser") {
        return (_jsx("main", { className: "min-h-screen flex items-center justify-center bg-slate-950 text-slate-100", children: _jsx("div", { className: "text-center space-y-3", children: _jsx("p", { className: "text-sm text-slate-300", children: "Access denied." }) }) }));
    }
    const [users, subscriptions, logs] = await Promise.all([
        prisma.user.findMany({ orderBy: { createdAt: "desc" }, take: 20 }),
        prisma.subscription
            ? prisma.subscription.findMany({ orderBy: { createdAt: "desc" }, take: 20 })
            : Promise.resolve([]),
        // auditLog model may not exist in the Prisma client for all schemas.
        // Use a safe any-cast and fallback to an empty array when not available.
        prisma.auditLog
            ? prisma.auditLog.findMany({ orderBy: { createdAt: "desc" }, take: 20 })
            : Promise.resolve([]),
    ]);
    return (_jsxs("main", { className: "min-h-screen bg-slate-950 text-slate-100", children: [_jsx("header", { className: "border-b border-white/10 bg-slate-950/80 backdrop-blur-xl", children: _jsxs("div", { className: "mx-auto max-w-6xl px-4 py-4 flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "font-(--font-orbitron) text-xs uppercase tracking-[0.25em] text-slate-400", children: "OpsVantage Digital" }), _jsx("p", { className: "text-sm text-slate-200", children: "Admin \u00B7 Superuser" })] }), _jsx("p", { className: "text-xs text-slate-400", children: currentUser?.email })] }) }), _jsxs("section", { className: "mx-auto max-w-6xl px-4 md:px-8 py-10 space-y-10", children: [_jsxs("div", { children: [_jsx("h2", { className: "font-(--font-orbitron) text-sm text-slate-50 mb-2 uppercase tracking-[0.2em]", children: "Users" }), _jsx("div", { className: "rounded-xl border border-white/10 bg-slate-950/70 p-4 text-xs", children: _jsxs("table", { className: "w-full border-collapse", children: [_jsx("thead", { children: _jsxs("tr", { className: "text-slate-400 border-b border-slate-800", children: [_jsx("th", { className: "py-2 text-left", children: "Email" }), _jsx("th", { className: "py-2 text-left", children: "Role" }), _jsx("th", { className: "py-2 text-left", children: "Created" })] }) }), _jsx("tbody", { children: users.map((u) => (_jsxs("tr", { className: "border-b border-slate-900/70", children: [_jsx("td", { className: "py-2", children: u.email }), _jsx("td", { className: "py-2 text-slate-300", children: u.role ?? "member" }), _jsx("td", { className: "py-2 text-slate-400", children: u.createdAt?.toISOString?.().slice(0, 19).replace("T", " ") ?? "" })] }, u.id))) })] }) })] }), _jsxs("div", { children: [_jsx("h2", { className: "font-(--font-orbitron) text-sm text-slate-50 mb-2 uppercase tracking-[0.2em]", children: "Subscriptions" }), _jsx("div", { className: "rounded-xl border border-white/10 bg-slate-950/70 p-4 text-xs", children: _jsxs("table", { className: "w-full border-collapse", children: [_jsx("thead", { children: _jsxs("tr", { className: "text-slate-400 border-b border-slate-800", children: [_jsx("th", { className: "py-2 text-left", children: "User" }), _jsx("th", { className: "py-2 text-left", children: "Plan" }), _jsx("th", { className: "py-2 text-left", children: "Status" }), _jsx("th", { className: "py-2 text-left", children: "Created" })] }) }), _jsx("tbody", { children: subscriptions.map((s) => (_jsxs("tr", { className: "border-b border-slate-900/70", children: [_jsx("td", { className: "py-2", children: s.userId }), _jsx("td", { className: "py-2", children: s.planId }), _jsx("td", { className: "py-2 text-slate-300", children: s.status }), _jsx("td", { className: "py-2 text-slate-400", children: s.createdAt?.toISOString?.().slice(0, 19).replace("T", " ") ?? "" })] }, s.id))) })] }) })] }), _jsxs("div", { children: [_jsx("h2", { className: "font-(--font-orbitron) text-sm text-slate-50 mb-2 uppercase tracking-[0.2em]", children: "Audit Log" }), _jsx("div", { className: "rounded-xl border border-white/10 bg-slate-950/70 p-4 text-xs max-h-72 overflow-auto", children: _jsxs("table", { className: "w-full border-collapse", children: [_jsx("thead", { children: _jsxs("tr", { className: "text-slate-400 border-b border-slate-800", children: [_jsx("th", { className: "py-2 text-left", children: "Time" }), _jsx("th", { className: "py-2 text-left", children: "User" }), _jsx("th", { className: "py-2 text-left", children: "Action" })] }) }), _jsx("tbody", { children: logs.map((log) => (_jsxs("tr", { className: "border-b border-slate-900/70", children: [_jsx("td", { className: "py-2", children: log.createdAt?.toISOString?.().slice(0, 19).replace("T", " ") ?? "" }), _jsx("td", { className: "py-2", children: log.userId }), _jsx("td", { className: "py-2 text-slate-300", children: log.action })] }, log.id))) })] }) })] })] })] }));
}
