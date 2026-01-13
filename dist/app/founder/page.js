import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getServerSession } from "next-auth";
import { authOptions } from "../../src/lib/auth";
import { prisma } from "../../src/lib/prisma";
import { redirect } from "next/navigation";
export default async function FounderPage() {
    const session = await getServerSession(authOptions);
    if (!session)
        return redirect(`/login?callbackUrl=/founder`);
    const role = session.user?.role;
    if (!role || (role !== 'admin' && role !== 'founder')) {
        return (_jsxs("div", { className: "p-8", children: [_jsx("h1", { className: "text-2xl font-semibold", children: "403 \u2014 Founder Dashboard" }), _jsx("p", { className: "mt-4", children: "Founder Dashboard is restricted to stewards." })] }));
    }
    // Health check
    let health = { status: 'Unknown', updatedAt: new Date().toISOString() };
    try {
        const res = await fetch(`${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/health`);
        if (res.ok) {
            const json = await res.json();
            health = { status: json.status || 'Healthy', updatedAt: new Date().toISOString() };
        }
        else {
            health = { status: 'Degraded', updatedAt: new Date().toISOString() };
        }
    }
    catch (e) {
        health = { status: 'Unknown', updatedAt: new Date().toISOString() };
    }
    // Subscriptions summary
    const subs = await prisma.subscription.groupBy({
        by: ['status'],
        _count: { _all: true },
    });
    const counts = (subs || []).reduce((acc, cur) => { acc[cur.status] = (cur?._count?._all) || 0; return acc; }, {});
    let recent = [];
    try {
        recent = await prisma.ipnEvent.findMany({ orderBy: { createdAt: 'desc' }, take: 5 });
    }
    catch (e) {
        recent = [];
    }
    return (_jsxs("div", { className: "p-8 space-y-6", children: [_jsx("h1", { className: "text-3xl font-bold", children: "Founder Dashboard" }), _jsxs("div", { className: "grid grid-cols-3 gap-4", children: [_jsxs("div", { className: "col-span-1 p-4 bg-slate-800 rounded-md", children: [_jsx("h2", { className: "text-lg font-semibold", children: "System Status" }), _jsx("p", { className: "mt-2", children: health.status }), _jsxs("p", { className: "text-sm text-slate-400 mt-1", children: ["Updated ", health.updatedAt] }), _jsxs("p", { className: "text-sm text-slate-400 mt-2", children: ["Commit: ", process.env.VERCEL_GIT_COMMIT_SHA || 'n/a'] }), _jsxs("p", { className: "text-sm text-slate-400", children: ["URL: ", process.env.VERCEL_URL || process.env.VERCEL_DEPLOY_URL || 'n/a'] })] }), _jsxs("div", { className: "col-span-1 p-4 bg-slate-800 rounded-md", children: [_jsx("h2", { className: "text-lg font-semibold", children: "Subscriptions" }), _jsxs("ul", { className: "mt-2 space-y-1", children: [_jsxs("li", { children: ["Active: ", counts.active || 0] }), _jsxs("li", { children: ["Pending: ", counts.pending || 0] }), _jsxs("li", { children: ["Failed: ", counts.failed || 0] })] })] }), _jsxs("div", { className: "col-span-1 p-4 bg-slate-800 rounded-md", children: [_jsx("h2", { className: "text-lg font-semibold", children: "Recent Billing Events" }), _jsx("ul", { className: "mt-2 space-y-1", children: (recent || []).map((e) => (_jsxs("li", { className: "text-sm", children: [e.providerOrderId, " \u2014 ", e.status, " \u2014 ", new Date(e.createdAt).toLocaleString()] }, e.id))) })] })] }), _jsxs("div", { className: "p-4 bg-slate-900 rounded-md", children: [_jsx("h3", { className: "font-semibold", children: "Docs & Runbooks" }), _jsxs("ul", { className: "mt-2", children: [_jsx("li", { children: _jsx("a", { href: "/docs/index.md", className: "text-sky-400", children: "Documentation Index" }) }), _jsx("li", { children: _jsx("a", { href: "/docs/opsvantage-deployment-playbook.md", className: "text-sky-400", children: "Deployment Playbook" }) }), _jsx("li", { children: _jsx("a", { href: "/docs/founder-acceptance-test.md", className: "text-sky-400", children: "Founder Acceptance Test" }) })] })] })] }));
}
