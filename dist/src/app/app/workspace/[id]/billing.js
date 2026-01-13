import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
export default async function BillingPage({ params }) {
    const session = await getServerSession();
    if (!session?.user?.email)
        redirect('/login');
    const workspace = await prisma.workspace.findUnique({
        where: { id: params.id },
        include: { subscriptionPlan: true },
    });
    if (!workspace)
        return _jsx("div", { className: "p-8", children: "Workspace not found." });
    const plans = [
        { id: 'basic', name: 'Basic', price: 10 },
        { id: 'pro', name: 'Pro', price: 30 },
    ];
    return (_jsxs("div", { className: "max-w-md mx-auto py-8", children: [_jsxs("h1", { className: "text-2xl font-bold mb-4", children: ["Billing for ", workspace.name] }), _jsxs("div", { className: "mb-4", children: ["Current plan: ", _jsx("b", { children: workspace.subscriptionPlan?.name || 'Free' })] }), _jsxs("form", { action: "/api/billing/create-payment", method: "POST", target: "_blank", className: "space-y-4", children: [_jsx("input", { type: "hidden", name: "workspaceId", value: workspace.id }), _jsx("select", { name: "planId", className: "w-full border p-2 rounded", children: plans.map(plan => (_jsxs("option", { value: plan.id, children: [plan.name, " ($", plan.price, "/mo)"] }, plan.id))) }), _jsx("button", { type: "submit", className: "bg-blue-600 text-white px-4 py-2 rounded", children: "Upgrade" })] })] }));
}
