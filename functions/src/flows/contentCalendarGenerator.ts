import { defineFlow } from '@genkit-ai/flow';
import { z } from 'zod';

export const contentCalendarGeneratorFlow = defineFlow(
  {
    name: 'contentCalendarGenerator',
    inputSchema: z.object({
      projectId: z.string(),
      niche: z.string(),
      startDate: z.string(), // ISO date
      days: z.number().default(30),
    }),
    outputSchema: z.object({
      items: z.array(
        z.object({
          date: z.string(), // ISO date
          title: z.string(),
          videoType: z.string(),
          objective: z.string(),
        })
      ),
    }),
  },
  async (input) => {
    const { projectId, niche, startDate, days } = input;

    const items = Array.from({ length: days }).map((_, i) => {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);

      return {
        date: date.toISOString().slice(0, 10),
        title: `Video idea #${i + 1} for ${niche}`,
        videoType: i % 3 === 0 ? 'Short' : 'Long-form',
        objective: 'Grow audience and test new topics',
      };
    });

    return { items };
  }
);