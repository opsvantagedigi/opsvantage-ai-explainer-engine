import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
export default async function MembersPage({ params }) {
    const session = await getServerSession();
    if (!session?.user?.email)
        redirect('/login');
    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: {
            memberships: { where: { workspaceId: params.id } },
        },
    });
    const membership = user?.memberships[0];
    if (!membership)
        return _jsx("div", { className: "p-8", children: "Access denied." });
    const workspace = await prisma.workspace.findUnique({
        where: { id: params.id },
        include: {
            memberships: { include: { user: true } },
        },
    });
    if (!workspace)
        return _jsx("div", { className: "p-8", children: "Workspace not found." });
    const canManage = membership.role === 'owner' || membership.role === 'editor';
    return (_jsxs("div", { className: "max-w-2xl mx-auto py-8", children: [_jsxs("h1", { className: "text-2xl font-bold mb-4", children: ["Members of ", workspace.name] }), _jsx("ul", { className: "mb-8", children: workspace.memberships.map(m => (_jsxs("li", { className: "mb-2 flex items-center justify-between", children: [_jsxs("span", { children: [m.user.email, " ", _jsxs("span", { className: "ml-2 text-xs text-gray-500", children: ["(", m.role, ")"] })] }), canManage && m.role !== 'owner' && (_jsxs("form", { action: `/app/api/workspace/${workspace.id}/role`, method: "POST", className: "inline", children: [_jsx("input", { type: "hidden", name: "membershipId", value: m.id }), _jsxs("select", { name: "role", defaultValue: m.role, className: "border rounded p-1 mr-2", children: [_jsx("option", { value: "editor", children: "editor" }), _jsx("option", { value: "viewer", children: "viewer" })] }), _jsx("button", { type: "submit", className: "bg-blue-600 text-white px-2 py-1 rounded", children: "Update" })] }))] }, m.id))) }), canManage && (_jsxs("form", { action: `/app/api/workspace/${workspace.id}/invite`, method: "POST", className: "flex gap-2", children: [_jsx("input", { name: "email", placeholder: "Invite by email", className: "border p-2 rounded flex-1", required: true }), _jsx("button", { type: "submit", className: "bg-green-600 text-white px-4 py-2 rounded", children: "Invite" })] })), _jsx("div", { className: "mt-8", children: _jsx(Link, { href: `/app/workspace/${workspace.id}`, children: "Back to workspace" }) })] }));
}
