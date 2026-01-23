import { flow } from '@genkit-ai/flow';
import { z } from 'zod';
import GitHubService from './services/githubService';

// Define input/output schemas
const GitHubUserInputSchema = z.object({
  githubToken: z.string(),
});

const GitHubRepoInputSchema = z.object({
  githubToken: z.string(),
  owner: z.string(),
  repo: z.string(),
});

const GitHubCreateRepoInputSchema = z.object({
  githubToken: z.string(),
  name: z.string(),
  description: z.string().optional(),
  isPrivate: z.boolean().optional().default(false),
});

const GitHubCreateIssueInputSchema = z.object({
  githubToken: z.string(),
  owner: z.string(),
  repo: z.string(),
  title: z.string(),
  body: z.string().optional(),
});

// Define the flows
export const githubUserFlow = flow(
  'githubUserFlow',
  {
    inputSchema: GitHubUserInputSchema,
    outputSchema: z.any(), // GitHub user object schema
  },
  async (input) => {
    const githubService = new GitHubService(input.githubToken);
    return await githubService.getUser();
  }
);

export const githubReposFlow = flow(
  'githubReposFlow',
  {
    inputSchema: GitHubUserInputSchema,
    outputSchema: z.array(z.any()), // Array of GitHub repo objects
  },
  async (input) => {
    const githubService = new GitHubService(input.githubToken);
    return await githubService.listRepositories();
  }
);

export const githubRepoDetailsFlow = flow(
  'githubRepoDetailsFlow',
  {
    inputSchema: GitHubRepoInputSchema,
    outputSchema: z.any(), // GitHub repo object
  },
  async (input) => {
    const githubService = new GitHubService(input.githubToken);
    return await githubService.getRepository(input.owner, input.repo);
  }
);

export const githubCreateRepoFlow = flow(
  'githubCreateRepoFlow',
  {
    inputSchema: GitHubCreateRepoInputSchema,
    outputSchema: z.any(), // Created GitHub repo object
  },
  async (input) => {
    const githubService = new GitHubService(input.githubToken);
    return await githubService.createRepository(
      input.name,
      input.description,
      input.isPrivate
    );
  }
);

export const githubCreateIssueFlow = flow(
  'githubCreateIssueFlow',
  {
    inputSchema: GitHubCreateIssueInputSchema,
    outputSchema: z.any(), // Created GitHub issue object
  },
  async (input) => {
    const githubService = new GitHubService(input.githubToken);
    return await githubService.createIssue(
      input.owner,
      input.repo,
      input.title,
      input.body
    );
  }
);

export const githubListIssuesFlow = flow(
  'githubListIssuesFlow',
  {
    inputSchema: GitHubRepoInputSchema,
    outputSchema: z.array(z.any()), // Array of GitHub issue objects
  },
  async (input) => {
    const githubService = new GitHubService(input.githubToken);
    return await githubService.listIssues(input.owner, input.repo);
  }
);

export const githubListCommitsFlow = flow(
  'githubListCommitsFlow',
  {
    inputSchema: GitHubRepoInputSchema,
    outputSchema: z.array(z.any()), // Array of GitHub commit objects
  },
  async (input) => {
    const githubService = new GitHubService(input.githubToken);
    return await githubService.listCommits(input.owner, input.repo);
  }
);