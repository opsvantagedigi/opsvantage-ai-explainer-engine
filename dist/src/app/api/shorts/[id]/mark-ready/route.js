import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export async function POST(req, ctx) {
    try {
        const id = ctx?.params?.id;
        const body = await req.json().catch(() => ({}));
        const scheduledAt = body?.scheduledAt ? new Date(body.scheduledAt) : null;
        await prisma.shortVideo.update({ where: { id }, data: { status: 'ready_to_upload', scheduledAt } });
        return NextResponse.json({ ok: true });
    }
    catch (err) {
        return NextResponse.json({ error: String(err) }, { status: 500 });
    }
}
