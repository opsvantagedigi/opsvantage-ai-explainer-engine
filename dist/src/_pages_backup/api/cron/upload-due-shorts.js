import { prisma } from '@/lib/prisma';
import { uploadShort } from '@/lib/youtube';
export default async function handler(req, res) {
    if (req.method !== 'POST')
        return res.status(405).end();
    const now = new Date();
    const due = await prisma.shortVideo.findMany({
        where: {
            status: 'ready_to_upload',
            scheduledAt: { lte: now },
        },
    });
    const results = [];
    for (const s of due) {
        try {
            const url = await uploadShort(s.workspaceId, s.id);
            results.push({ id: s.id, success: true, url });
        }
        catch (err) {
            results.push({ id: s.id, success: false, error: err.message });
        }
    }
    res.json({ processed: results.length, results });
}
