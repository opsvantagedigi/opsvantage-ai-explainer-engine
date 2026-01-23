// app/api/genkit/generate-script/route.ts
import { NextRequest } from 'next/server';

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

    // Call the deployed Genkit flow via HTTP request
    // Using the correct URL pattern for the deployed flow
    const response = await fetch(`https://us-central1-${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.cloudfunctions.net/generateScript`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idea, projectId, planItemId }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return Response.json(result);
  } catch (error) {
    console.error('Error in generate-script API route:', error);
    return Response.json(
      { error: 'Failed to generate script' },
      { status: 500 }
    );
  }
}