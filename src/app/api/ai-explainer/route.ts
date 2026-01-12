import { NextRequest, NextResponse } from 'next/server';
import { generateExplainer } from '@/lib/explainer-engine';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    if (!body || typeof body.prompt !== 'string' || !body.prompt.trim()) {
      return NextResponse.json({ message: 'Invalid request: prompt is required' }, { status: 400 });
    }

    const niche = typeof body.niche === 'string' && body.niche.trim() ? body.niche.trim() : 'General';

    const result = await generateExplainer({ prompt: body.prompt.trim(), niche });

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.error('ai-explainer error', err);
    return NextResponse.json({ message: 'Failed to generate explainer' }, { status: 500 });
  }
}
