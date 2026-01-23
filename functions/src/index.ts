import { defineFlow } from '@genkit-ai/flow';
import { 
  githubUserFlow, 
  githubReposFlow, 
  githubRepoDetailsFlow, 
  githubCreateRepoFlow, 
  githubCreateIssueFlow, 
  githubListIssuesFlow, 
  githubListCommitsFlow 
} from './githubFlows';

// Export all flows to ensure they're registered
export {
  githubUserFlow,
  githubReposFlow,
  githubRepoDetailsFlow,
  githubCreateRepoFlow,
  githubCreateIssueFlow,
  githubListIssuesFlow,
  githubListCommitsFlow
};

// Also define them explicitly for Firebase deployment
defineFlow(githubUserFlow);
defineFlow(githubReposFlow);
defineFlow(githubRepoDetailsFlow);
defineFlow(githubCreateRepoFlow);
defineFlow(githubCreateIssueFlow);
defineFlow(githubListIssuesFlow);
defineFlow(githubListCommitsFlow);