# GitHub Command Line Interface (CLI) for OpsVantage AI YouTube Studio

This project includes a GitHub CLI tool that allows you to interact with GitHub repositories from the command line. It also includes Genkit flows that can be used to integrate GitHub functionality into your AI-powered YouTube studio workflows.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory and add your GitHub token:
```env
GITHUB_TOKEN=your_github_personal_access_token_here
```

## CLI Usage

Build the CLI first:
```bash
npm run build:cli
```

Then you can use the CLI with various commands:

### Get authenticated user details
```bash
npm run cli -- user
```

### List repositories
```bash
npm run cli -- repos
```

### Get repository details
```bash
npm run cli -- repo <owner> <repository-name>
```

### List commits in a repository
```bash
npm run cli -- commits <owner> <repository-name>
```

### Create a new repository
```bash
npm run cli -- create-repo <name> -d "Description here" -p
```

### Create an issue
```bash
npm run cli -- create-issue <owner> <repository-name> <issue-title> -b "Issue body here"
```

### List issues in a repository
```bash
npm run cli -- issues <owner> <repository-name>
```

### Get content from a file
```bash
npm run cli -- get-file <owner> <repository-name> <file-path>
```

### Write content to a file
```bash
npm run cli -- write-file <owner> <repository-name> <file-path> "Content to write" -m "Commit message"
```

## Genkit Flows

The following Genkit flows are available for integrating GitHub functionality into your AI workflows:

- `githubUserFlow`: Get authenticated user details
- `githubReposFlow`: List repositories for the authenticated user
- `githubRepoDetailsFlow`: Get repository details
- `githubCreateRepoFlow`: Create a new repository
- `githubCreateIssueFlow`: Create an issue in a repository
- `githubListIssuesFlow`: List issues in a repository
- `githubListCommitsFlow`: List commits in a repository

Each flow expects a GitHub token as part of its input to authenticate with the GitHub API.

## Integration with YouTube Studio

You can use these GitHub flows to:
- Store generated scripts in GitHub repositories
- Track video production progress through GitHub issues
- Manage project assets in version-controlled repositories
- Collaborate with team members through GitHub workflows

## Environment Variables

- `GITHUB_TOKEN`: A personal access token with appropriate scopes for the operations you want to perform