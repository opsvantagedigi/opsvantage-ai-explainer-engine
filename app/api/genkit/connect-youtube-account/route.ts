// app/api/genkit/connect-youtube-account/route.ts
import { NextRequest } from 'next/server';
import { connectYouTubeAccountFlow } from '../../../../src';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return Response.json(
        { error: 'Missing userId' },
        { status: 400 }
      );
    }

    // Call the GenKit flow
    const result = await connectYouTubeAccountFlow({ userId });

    return Response.json(result);
  } catch (error) {
    console.error('Error in connect-youtube-account API route:', error);
    return Response.json(
      { error: 'Failed to connect YouTube account' },
      { status: 500 }
    );
  }
}