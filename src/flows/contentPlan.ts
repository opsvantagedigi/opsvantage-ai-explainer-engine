import { defineFlow } from '@genkit-ai/flow';
import * as z from 'zod';
import { geminiPro } from '@genkit-ai/googleai';
import { ContentPlanSchema } from '../models/contentPlan';
import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

export const generateContentPlanFlow = defineFlow(
  {
    name: 'generateContentPlan',
    inputSchema: z.object({ projectId: z.string() }),
    outputSchema: ContentPlanSchema,
  },
  async (input) => {
    const projectDoc = await db.collection('projects').doc(input.projectId).get();
    const projectData = projectDoc.data();

    if (!projectData) {
      throw new Error('Project not found');
    }

    const niche = projectData.niche;

    const prompt = `Generate a content plan with 10 video ideas for a YouTube channel in the niche of ${niche}.`;

    const llmResponse = await geminiPro.generate({ 
        prompt: prompt,
        config: { temperature: 0.7 },
    });
    const planText = llmResponse.text();

    // TODO: Implement the logic to parse the planText and generate the other fields of the ContentPlan schema.
    const plan = {
      projectId: input.projectId,
      videoIdeas: planText.split('\n').map(idea => ({ title: idea, description: '' })).slice(0, 10),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return plan;
  }
);
