import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
export default async function AdminDashboard() {
    const session = await getServerSession();
    if (!session?.user?.email)
        redirect('/login');
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (user?.role !== 'admin')
        return _jsx("div", { className: "p-8", children: "Access denied." });
    const users = await prisma.user.findMany();
    const workspaces = await prisma.workspace.findMany();
    return (_jsxs("div", { className: "max-w-4xl mx-auto py-8", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "Admin Dashboard" }), _jsxs("div", { className: "mb-8", children: [_jsx("h2", { className: "text-xl font-semibold mb-2", children: "Users" }), _jsx("ul", { children: users.map(u => (_jsxs("li", { children: [u.email, " (", u.role, ")"] }, u.id))) })] }), _jsxs("div", { children: [_jsx("h2", { className: "text-xl font-semibold mb-2", children: "Workspaces" }), _jsx("ul", { children: workspaces.map(w => (_jsxs("li", { children: [w.name, " (Owner: ", w.ownerId, ")"] }, w.id))) })] })] }));
}
