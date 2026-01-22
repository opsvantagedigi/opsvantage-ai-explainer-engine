import { configureGenkit } from '@genkit-ai/core';
import { firebase } from '@genkit-ai/firebase';
import { googleAI } from '@genkit-ai/googleai';

// Import models
export * from './models/user';
export * from './models/subscription';
export * from './models/project';
export * from './models/contentPlan';
export * from './models/video';
export * from './models/script';
export * from './models/monetisationProfile';
export * from './models/usage';
export * from './models/analytics';

// Import flows
export * from './flows/billing';
export * from './flows/webhook';
export * from './flows/project';
export * from './flows/content';
export * from './flows/contentPlan';
export * from './flows/video';
export * from './flows/analytics';

configureGenkit({
  plugins: [
    firebase(),
    googleAI({ apiKey: process.env.GEMINI_API_KEY }),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});
