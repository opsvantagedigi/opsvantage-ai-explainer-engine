import { configureGenkit } from '@genkit-ai/core';
import { firebase } from '@genkit-ai/firebase';
import { googleAI } from '@genkit-ai/googleai';
import { defineFlow } from '@genkit-ai/flow';
import * as z from 'zod';
import { llm } from '@genkit-ai/ai';

configureGenkit({
  plugins: [
    firebase(),
    googleAI({ apiKey: process.env.GEMINI_API_KEY }),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});

export const menuSuggestionFlow = defineFlow(
  {
    name: 'menuSuggestionFlow',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (subject) => {
    const llmResponse = await llm('gemini-1.5-flash').generate({
      prompt: `Suggest a menu for a ${subject} themed restaurant.`,
    });

    return llmResponse.text();
  }
);
