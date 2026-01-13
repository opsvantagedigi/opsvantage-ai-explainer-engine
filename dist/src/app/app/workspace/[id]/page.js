import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
export default async function WorkspacePage({ params }) {
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
    const workspace = await prisma.workspace.findUnique({ where: { id: params.id } });
    if (!workspace)
        return _jsx("div", { className: "p-8", children: "Workspace not found." });
    return (_jsxs("div", { className: "max-w-2xl mx-auto py-8", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: workspace.name }), _jsxs("div", { className: "mb-2", children: ["Role: ", _jsx("span", { className: "font-mono", children: membership.role })] })] }));
}
