import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
export default async function ShortDetailPage({ params }) {
    const session = await getServerSession();
    if (!session?.user?.email)
        redirect('/login');
    const short = await prisma.shortVideo.findUnique({ where: { id: params.shortId } });
    if (!short)
        return _jsx("div", { className: "p-8", children: "Short not found." });
    return (_jsxs("div", { className: "max-w-xl mx-auto py-8", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: short.title }), _jsxs("div", { className: "mb-4", children: [_jsx("b", { children: "Status:" }), " ", short.status] }), _jsxs("div", { className: "mb-4", children: [_jsx("b", { children: "Script:" }), _jsx("pre", { className: "bg-gray-100 p-4 rounded whitespace-pre-wrap", children: short.script })] })] }));
}
