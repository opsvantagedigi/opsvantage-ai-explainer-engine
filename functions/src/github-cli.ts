#!/usr/bin/env node

import GitHubService from './services/githubService.js';
import { program } from 'commander';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Get GitHub token from environment variable
const githubToken = process.env.GITHUB_TOKEN;

if (!githubToken) {
  console.error('Error: GITHUB_TOKEN environment variable is required');
  process.exit(1);
}

const githubService = new GitHubService(githubToken);

program
  .name('github-cl')
  .description('CLI to interact with GitHub API')
  .version('1.0.0');

program
  .command('user')
  .description('Get authenticated user details')
  .action(async () => {
    try {
      const user = await githubService.getUser();
      console.log(JSON.stringify(user, null, 2));
    } catch (error: any) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

program
  .command('repos')
  .description('List repositories for the authenticated user')
  .action(async () => {
    try {
      const repos = await githubService.listRepositories();
      console.log(JSON.stringify(repos, null, 2));
    } catch (error: any) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

program
  .command('repo <owner> <repo>')
  .description('Get repository details')
  .action(async (owner, repo) => {
    try {
      const repository = await githubService.getRepository(owner, repo);
      console.log(JSON.stringify(repository, null, 2));
    } catch (error: any) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

program
  .command('commits <owner> <repo>')
  .description('List commits for a repository')
  .action(async (owner, repo) => {
    try {
      const commits = await githubService.listCommits(owner, repo);
      console.log(JSON.stringify(commits, null, 2));
    } catch (error: any) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

program
  .command('create-repo <name>')
  .description('Create a new repository')
  .option('-d, --description <description>', 'Description for the repository')
  .option('-p, --private', 'Make the repository private')
  .action(async (name, options) => {
    try {
      const repo = await githubService.createRepository(
        name,
        options.description,
        options.private
      );
      console.log(JSON.stringify(repo, null, 2));
    } catch (error: any) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

program
  .command('create-issue <owner> <repo> <title>')
  .description('Create an issue in a repository')
  .option('-b, --body <body>', 'Body for the issue')
  .action(async (owner, repo, title, options) => {
    try {
      const issue = await githubService.createIssue(
        owner,
        repo,
        title,
        options.body
      );
      console.log(JSON.stringify(issue, null, 2));
    } catch (error: any) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

program
  .command('issues <owner> <repo>')
  .description('List issues in a repository')
  .action(async (owner, repo) => {
    try {
      const issues = await githubService.listIssues(owner, repo);
      console.log(JSON.stringify(issues, null, 2));
    } catch (error: any) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

program
  .command('get-file <owner> <repo> <path>')
  .description('Get content from a file in a repository')
  .action(async (owner, repo, path) => {
    try {
      const content = await githubService.getFileContent(owner, repo, path);
      console.log(content);
    } catch (error: any) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

program
  .command('write-file <owner> <repo> <path> <content>')
  .description('Write content to a file in a repository')
  .option('-m, --message <message>', 'Commit message', 'Update file via CLI')
  .option('-b, --branch <branch>', 'Branch to commit to')
  .action(async (owner, repo, path, content, options) => {
    try {
      await githubService.writeFileContent(
        owner,
        repo,
        path,
        content,
        options.message,
        options.branch
      );
      console.log('File updated successfully');
    } catch (error: any) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

program.parse();