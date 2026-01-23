import { defineFlow } from '@genkit-ai/flow';
import { z } from 'zod';

export const generateThumbnailFlow = defineFlow(
  {
    name: 'generateThumbnail',
    inputSchema: z.object({
      projectId: z.string(),
      script: z.string(),
      brandProfile: z.string().optional(),
    }),
    outputSchema: z.object({
      prompt: z.string(),
      suggestedTitle: z.string().optional(),
      thumbnailUrl: z.string().optional(),
    }),
  },
  async (input) => {
    const { projectId, script, brandProfile } = input;

    // Call your LLM / image service here
    const prompt = `Create a high-CTR YouTube thumbnail for this script: ${script}
Brand profile: ${brandProfile ?? 'default'}`;

    // Optionally store metadata in Firestore here

    return {
      prompt,
      suggestedTitle: 'Eye-catching title based on script',
      thumbnailUrl: undefined, // or URL if you integrate an image generator
    };
  }
);