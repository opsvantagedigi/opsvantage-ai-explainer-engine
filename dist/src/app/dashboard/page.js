import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { getLatestSubscriptionForUser, mapStatus } from "@/lib/subscription-server";
import DashboardClient from "./DashboardClient";
export default async function Page() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        return (_jsx("main", { className: "min-h-screen flex items-center justify-center bg-slate-950 text-slate-100", children: _jsxs("div", { className: "text-center space-y-3", children: [_jsx("p", { className: "text-sm text-slate-300", children: "You must be signed in to view your dashboard." }), _jsx(Link, { href: "/login", className: "inline-flex px-4 py-2 rounded-full bg-linear-to-r from-[#003B73] via-[#00A676] to-[#F2C14E] text-slate-950 text-sm font-semibold", children: "Go to login" })] }) }));
    }
    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: {
            memberships: {
                include: { workspace: true },
            },
        },
    });
    const workspaces = user?.memberships.map((m) => m.workspace) ?? [];
    // Use new subscription status logic
    const sub = user?.id ? await getLatestSubscriptionForUser(user.id) : null;
    const status = mapStatus(sub?.status);
    return (_jsxs("main", { className: "min-h-screen bg-slate-950 text-slate-100", children: [_jsx("header", { className: "border-b border-white/10 bg-slate-950/80 backdrop-blur-xl", children: _jsxs("div", { className: "mx-auto max-w-6xl px-4 py-4 flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "font-(--font-orbitron) text-xs uppercase tracking-[0.25em] text-slate-400", children: "OpsVantage Digital" }), _jsx("p", { className: "text-sm text-slate-200", children: "Dashboard" })] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("a", { href: "/billing", className: "text-blue-600 hover:underline text-sm", children: "Manage Subscription" }), _jsx("span", { className: "text-xs text-slate-300", children: session.user.email })] })] }) }), _jsxs("section", { className: "mx-auto max-w-6xl px-4 md:px-8 py-10 space-y-6", children: [_jsx(DashboardClient, { status: status }), _jsxs("div", { children: [_jsx("h1", { className: "font-(--font-orbitron) text-xl text-slate-50", children: "Workspaces" }), _jsx("p", { className: "text-sm text-slate-300", children: "Choose a workspace to open the AI Explainer Engine." })] }), _jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [workspaces.map((ws) => (_jsxs(Link, { href: `/app?workspaceId=${ws.id}`, className: "rounded-xl border border-white/10 bg-slate-950/70 p-4 hover:border-emerald-400/60 transition", children: [_jsx("p", { className: "text-sm font-semibold text-slate-50", children: ws.name }), _jsxs("p", { className: "text-xs text-slate-400 mt-1", children: ["Slug: ", ws.slug] })] }, ws.id))), workspaces.length === 0 && (_jsx("div", { className: "text-sm text-slate-300", children: "No workspaces yet. Seed created one in the DB; ensure your user is linked via membership." }))] })] })] }));
}
