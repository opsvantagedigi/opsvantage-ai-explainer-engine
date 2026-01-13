import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
export default async function AppPage() {
    const session = await getServerSession();
    if (!session?.user?.email)
        redirect('/login');
    // Fetch workspaces for the user
    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: {
            memberships: {
                include: { workspace: true },
            },
        },
    });
    return (_jsxs("div", { className: "max-w-2xl mx-auto py-8", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "Your Workspaces" }), _jsx("ul", { className: "mb-8", children: user?.memberships.map(m => (_jsxs("li", { className: "mb-2", children: [_jsx(Link, { href: `/app/workspace/${m.workspace.id}`, children: m.workspace.name }), _jsxs("span", { className: "ml-2 text-xs text-gray-500", children: ["(", m.role, ")"] })] }, m.workspace.id))) }), _jsx(Link, { href: "/app/workspace/new", className: "bg-blue-600 text-white px-4 py-2 rounded", children: "+ New Workspace" })] }));
}
