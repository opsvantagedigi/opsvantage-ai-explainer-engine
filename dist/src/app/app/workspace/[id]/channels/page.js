import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
export default async function ChannelsPage({ params }) {
    const session = await getServerSession();
    if (!session?.user?.email)
        redirect('/login');
    const workspace = await prisma.workspace.findUnique({
        where: { id: params.id },
        include: { youtubeConfigs: true },
    });
    if (!workspace)
        return _jsx("div", { className: "p-8", children: "Workspace not found." });
    return (_jsxs("div", { className: "max-w-2xl mx-auto py-8", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "YouTube Channels" }), _jsx("ul", { className: "mb-8", children: workspace.youtubeConfigs.map(channel => (_jsx("li", { className: "mb-2", children: _jsx("span", { className: "font-mono", children: channel.channelName }) }, channel.id))) }), _jsx(Link, { href: `/app/workspace/${workspace.id}/channels/connect`, className: "bg-blue-600 text-white px-4 py-2 rounded", children: "+ Connect Channel" })] }));
}
