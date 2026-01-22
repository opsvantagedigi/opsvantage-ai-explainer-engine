// app/api/genkit/generate-script/route.ts
import { NextRequest } from 'next/server';
import { generateScriptFlow } from '../../../../src';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { idea, projectId, planItemId } = body;

    if (!idea || !projectId) {
      return Response.json(
        { error: 'Missing idea or projectId' },
        { status: 400 }
      );
    }

    // Call the GenKit flow
    const result = await generateScriptFlow({ idea, projectId, planItemId });

    return Response.json(result);
  } catch (error) {
    console.error('Error in generate-script API route:', error);
    return Response.json(
      { error: 'Failed to generate script' },
      { status: 500 }
    );
  }
}