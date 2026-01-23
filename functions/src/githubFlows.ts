import { defineFlow } from '@genkit-ai/flow';
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
export const githubUserFlow = defineFlow(
  {
    name: 'githubUserFlow',
    inputSchema: GitHubUserInputSchema,
    outputSchema: z.any(), // GitHub user object schema
  },
  async (input: z.infer<typeof GitHubUserInputSchema>) => {
    const githubService = new GitHubService(input.githubToken);
    return await githubService.getUser();
  }
);

export const githubReposFlow = defineFlow(
  {
    name: 'githubReposFlow',
    inputSchema: GitHubUserInputSchema,
    outputSchema: z.array(z.any()), // Array of GitHub repo objects
  },
  async (input: z.infer<typeof GitHubUserInputSchema>) => {
    const githubService = new GitHubService(input.githubToken);
    return await githubService.listRepositories();
  }
);

export const githubRepoDetailsFlow = defineFlow(
  {
    name: 'githubRepoDetailsFlow',
    inputSchema: GitHubRepoInputSchema,
    outputSchema: z.any(), // GitHub repo object
  },
  async (input: z.infer<typeof GitHubRepoInputSchema>) => {
    const githubService = new GitHubService(input.githubToken);
    return await githubService.getRepository(input.owner, input.repo);
  }
);

export const githubCreateRepoFlow = defineFlow(
  {
    name: 'githubCreateRepoFlow',
    inputSchema: GitHubCreateRepoInputSchema,
    outputSchema: z.any(), // Created GitHub repo object
  },
  async (input: z.infer<typeof GitHubCreateRepoInputSchema>) => {
    const githubService = new GitHubService(input.githubToken);
    return await githubService.createRepository(
      input.name,
      input.description,
      input.isPrivate
    );
  }
);

export const githubCreateIssueFlow = defineFlow(
  {
    name: 'githubCreateIssueFlow',
    inputSchema: GitHubCreateIssueInputSchema,
    outputSchema: z.any(), // Created GitHub issue object
  },
  async (input: z.infer<typeof GitHubCreateIssueInputSchema>) => {
    const githubService = new GitHubService(input.githubToken);
    return await githubService.createIssue(
      input.owner,
      input.repo,
      input.title,
      input.body
    );
  }
);

export const githubListIssuesFlow = defineFlow(
  {
    name: 'githubListIssuesFlow',
    inputSchema: GitHubRepoInputSchema,
    outputSchema: z.array(z.any()), // Array of GitHub issue objects
  },
  async (input: z.infer<typeof GitHubRepoInputSchema>) => {
    const githubService = new GitHubService(input.githubToken);
    return await githubService.listIssues(input.owner, input.repo);
  }
);

export const githubListCommitsFlow = defineFlow(
  {
    name: 'githubListCommitsFlow',
    inputSchema: GitHubRepoInputSchema,
    outputSchema: z.array(z.any()), // Array of GitHub commit objects
  },
  async (input: z.infer<typeof GitHubRepoInputSchema>) => {
    const githubService = new GitHubService(input.githubToken);
    return await githubService.listCommits(input.owner, input.repo);
  }
);