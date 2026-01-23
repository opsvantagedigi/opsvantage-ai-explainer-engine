import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp();
}

// Import all flows
import {
  generateContentStrategyFlow,
  generateScriptFlow,
  generateVoiceoverFlow,
  generateVideoAssetsFlow,
  assembleFinalVideoFlow,
  uploadToYouTubeFlow,
  connectYouTubeAccountFlow,
  handleYouTubeAuthCallbackFlow,
  generateMonetisationPlanFlow,
  createMonetisationProfileFlow,
  getMonetisationProfileFlow,
  runGrowthAnalyticsFlow,
  executePromotionTaskFlow,
  schedulePromotionCampaignFlow,
  createSubscriptionPaymentFlow,
  handlePaymentWebhookFlow
} from './mainFlows';

import {
  githubUserFlow,
  githubReposFlow,
  githubRepoDetailsFlow,
  githubCreateRepoFlow,
  githubCreateIssueFlow,
  githubListIssuesFlow,
  githubListCommitsFlow
} from './githubFlows';

// Register all flows with Firebase Genkit
export {
  generateContentStrategyFlow,
  generateScriptFlow,
  generateVoiceoverFlow,
  generateVideoAssetsFlow,
  assembleFinalVideoFlow,
  uploadToYouTubeFlow,
  connectYouTubeAccountFlow,
  handleYouTubeAuthCallbackFlow,
  generateMonetisationPlanFlow,
  createMonetisationProfileFlow,
  getMonetisationProfileFlow,
  runGrowthAnalyticsFlow,
  executePromotionTaskFlow,
  schedulePromotionCampaignFlow,
  createSubscriptionPaymentFlow,
  handlePaymentWebhookFlow,
  githubUserFlow,
  githubReposFlow,
  githubRepoDetailsFlow,
  githubCreateRepoFlow,
  githubCreateIssueFlow,
  githubListIssuesFlow,
  githubListCommitsFlow
};