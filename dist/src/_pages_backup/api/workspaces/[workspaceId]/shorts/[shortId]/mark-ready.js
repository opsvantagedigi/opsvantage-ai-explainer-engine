import { prisma } from '@/lib/prisma';
export default async function handler(req, res) {
    if (req.method !== 'POST')
        return res.status(405).end();
    const { workspaceId, shortId } = req.query;
    const { scheduledAt } = req.body;
    if (!workspaceId || !shortId)
        return res.status(400).json({ error: 'Missing params' });
    const data = { status: 'ready_to_upload' };
    if (scheduledAt)
        data.scheduledAt = new Date(scheduledAt);
    const updated = await prisma.shortVideo.update({ where: { id: String(shortId) }, data });
    res.json({ success: true, updated });
}
