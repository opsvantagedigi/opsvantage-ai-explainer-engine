import axios from 'axios';

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description?: string;
  html_url: string;
  clone_url: string;
  default_branch: string;
}

interface GitHubCommit {
  sha: string;
  message: string;
  author: {
    name: string;
    email: string;
    date: string;
  };
  url: string;
}

interface GitHubIssue {
  id: number;
  title: string;
  body?: string;
  state: 'open' | 'closed';
  created_at: string;
  updated_at: string;
  html_url: string;
}

class GitHubService {
  private baseUrl = 'https://api.github.com';
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  /**
   * Get authenticated user details
   */
  async getUser(): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUrl}/user`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to get user: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * List repositories for the authenticated user
   */
  async listRepositories(): Promise<GitHubRepo[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/user/repos`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          Accept: 'application/vnd.github.v3+json',
        },
        params: {
          sort: 'updated',
          direction: 'desc',
        },
      });
      return response.data as GitHubRepo[];
    } catch (error: any) {
      throw new Error(`Failed to list repositories: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Get repository details
   */
  async getRepository(owner: string, repo: string): Promise<GitHubRepo> {
    try {
      const response = await axios.get(`${this.baseUrl}/repos/${owner}/${repo}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });
      return response.data as GitHubRepo;
    } catch (error: any) {
      throw new Error(`Failed to get repository: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * List commits for a repository
   */
  async listCommits(owner: string, repo: string): Promise<GitHubCommit[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/repos/${owner}/${repo}/commits`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });
      return (response.data as any[]).map((commit: any) => ({
        sha: commit.sha,
        message: commit.commit.message,
        author: {
          name: commit.commit.author.name,
          email: commit.commit.author.email,
          date: commit.commit.author.date,
        },
        url: commit.html_url,
      }));
    } catch (error: any) {
      throw new Error(`Failed to list commits: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Create a new repository
   */
  async createRepository(
    name: string,
    description?: string,
    isPrivate = false
  ): Promise<GitHubRepo> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/user/repos`,
        {
          name,
          description,
          private: isPrivate,
        },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            Accept: 'application/vnd.github.v3+json',
          },
        }
      );
      return response.data as GitHubRepo;
    } catch (error: any) {
      throw new Error(`Failed to create repository: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Create an issue in a repository
   */
  async createIssue(
    owner: string,
    repo: string,
    title: string,
    body?: string
  ): Promise<GitHubIssue> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/repos/${owner}/${repo}/issues`,
        {
          title,
          body,
        },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            Accept: 'application/vnd.github.v3+json',
          },
        }
      );
      return response.data as GitHubIssue;
    } catch (error: any) {
      throw new Error(`Failed to create issue: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * List issues in a repository
   */
  async listIssues(owner: string, repo: string): Promise<GitHubIssue[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/repos/${owner}/${repo}/issues`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          Accept: 'application/vnd.github.v3+json',
        },
        params: {
          state: 'open',
        },
      });
      return response.data as GitHubIssue[];
    } catch (error: any) {
      throw new Error(`Failed to list issues: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Get content from a file in a repository
   */
  async getFileContent(owner: string, repo: string, path: string): Promise<string> {
    try {
      const response = await axios.get(`${this.baseUrl}/repos/${owner}/${repo}/contents/${path}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });

      // Decode base64 content
      const content = Buffer.from((response.data as any).content, 'base64').toString('utf8');
      return content;
    } catch (error: any) {
      throw new Error(`Failed to get file content: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Create or update a file in a repository
   */
  async writeFileContent(
    owner: string,
    repo: string,
    path: string,
    content: string,
    message: string,
    branch?: string
  ): Promise<void> {
    try {
      const encodedContent = Buffer.from(content, 'utf8').toString('base64');

      const payload: any = {
        message,
        content: encodedContent,
      };

      if (branch) {
        payload.branch = branch;
      }

      await axios.put(`${this.baseUrl}/repos/${owner}/${repo}/contents/${path}`, payload, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });
    } catch (error: any) {
      throw new Error(`Failed to write file content: ${error.response?.data?.message || error.message}`);
    }
  }
}

export default GitHubService;