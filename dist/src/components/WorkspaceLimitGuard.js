import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
export default async function WorkspaceLimitGuard({ children, workspaceId }) {
    const session = await getServerSession();
    if (!session?.user?.email)
        redirect('/login');
    const workspace = await prisma.workspace.findUnique({
        where: { id: workspaceId },
        include: { subscriptionPlan: true },
    });
    // Example: enforce max channels
    const maxChannels = workspace?.subscriptionPlan?.maxChannels ?? 1;
    const channelCount = await prisma.youTubeChannelConfig.count({ where: { workspaceId } });
    if (channelCount >= maxChannels) {
        return _jsxs("div", { className: "p-8 text-red-600", children: ["Plan limit reached. ", _jsx("a", { href: `/app/workspace/${workspaceId}/billing`, className: "underline", children: "Upgrade your plan" }), " to add more channels."] });
    }
    return _jsx(_Fragment, { children: children });
}
