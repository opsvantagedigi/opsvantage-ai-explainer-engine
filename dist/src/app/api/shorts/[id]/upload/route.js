import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { uploadShort } from '@/lib/youtube';
export async function POST(req, ctx) {
    try {
        const id = ctx?.params?.id;
        const short = await prisma.shortVideo.findUnique({ where: { id } });
        if (!short)
            return NextResponse.json({ error: 'Short not found' }, { status: 404 });
        const workspaceId = short.workspaceId;
        const url = await uploadShort(workspaceId, id);
        return NextResponse.json({ ok: true, url });
    }
    catch (err) {
        return NextResponse.json({ error: String(err) }, { status: 500 });
    }
}
