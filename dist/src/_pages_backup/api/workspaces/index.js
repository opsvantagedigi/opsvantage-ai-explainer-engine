import { prisma } from '@/lib/prisma';
export default async function handler(req, res) {
    if (req.method !== 'GET')
        return res.status(405).end();
    const workspaces = await prisma.workspace.findMany({
        include: { niches: true, contentPlans: { include: { shortVideos: true } } },
    });
    res.json(workspaces);
}
