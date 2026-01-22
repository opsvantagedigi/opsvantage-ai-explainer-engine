// app/api/genkit/generate-content-strategy/route.ts
import { NextRequest } from 'next/server';
import { generateContentStrategyFlow } from '../../../../src';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, projectId } = body;

    if (!userId || !projectId) {
      return Response.json(
        { error: 'Missing userId or projectId' },
        { status: 400 }
      );
    }

    // Call the GenKit flow
    const result = await generateContentStrategyFlow({ userId, projectId });

    return Response.json(result);
  } catch (error) {
    console.error('Error in generate-content-strategy API route:', error);
    return Response.json(
      { error: 'Failed to generate content strategy' },
      { status: 500 }
    );
  }
}