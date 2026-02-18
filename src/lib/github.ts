/**
 * GitHub API Service
 * Provides functions for fetching repository data with caching
 */

const GITHUB_API_BASE = 'https://api.github.com';
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

// Simple in-memory cache
const cache = new Map<string, { data: unknown; timestamp: number }>();

function getFromCache<T>(key: string): T | null {
  const cached = cache.get(key);
  if (!cached) return null;
  
  if (Date.now() - cached.timestamp > CACHE_TTL_MS) {
    cache.delete(key);
    return null;
  }
  
  return cached.data as T;
}

function setCache(key: string, data: unknown): void {
  cache.set(key, { data, timestamp: Date.now() });
}

async function githubFetch<T>(endpoint: string): Promise<T> {
  const token = process.env.GITHUB_TOKEN;
  
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'Diesel-Labs-Portal',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(`${GITHUB_API_BASE}${endpoint}`, {
    headers,
    next: { revalidate: 300 }, // Next.js cache for 5 minutes
  });
  
  if (!response.ok) {
    const remaining = response.headers.get('X-RateLimit-Remaining');
    const resetTime = response.headers.get('X-RateLimit-Reset');
    
    if (response.status === 403 && remaining === '0') {
      const resetDate = resetTime ? new Date(parseInt(resetTime) * 1000) : new Date();
      throw new Error(`GitHub rate limit exceeded. Resets at ${resetDate.toISOString()}`);
    }
    
    if (response.status === 404) {
      throw new Error(`Repository not found`);
    }
    
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
}

// Types
export interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      email: string;
      date: string;
    };
  };
  author: {
    login: string;
    avatar_url: string;
  } | null;
  html_url: string;
}

export interface GitHubIssue {
  id: number;
  number: number;
  title: string;
  state: 'open' | 'closed';
  body: string | null;
  labels: Array<{
    id: number;
    name: string;
    color: string;
  }>;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  html_url: string;
  user: {
    login: string;
    avatar_url: string;
  };
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  default_branch: string;
  topics: string[];
}

export interface GitHubContent {
  name: string;
  path: string;
  type: 'file' | 'dir';
  content?: string;
  encoding?: string;
  download_url: string | null;
}

// Simplified response types for API routes
export interface CommitSummary {
  sha: string;
  message: string;
  author: string;
  authorAvatar: string | null;
  date: string;
  url: string;
}

export interface IssueSummary {
  id: number;
  number: number;
  title: string;
  state: 'open' | 'closed';
  labels: Array<{ name: string; color: string }>;
  createdAt: string;
  closedAt: string | null;
  url: string;
}

export interface RepoSummary {
  name: string;
  fullName: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  openIssues: number;
  lastPush: string;
  topics: string[];
  url: string;
}

/**
 * Fetch recent commits from a repository
 */
export async function getRepoCommits(
  owner: string,
  repo: string,
  limit: number = 10
): Promise<CommitSummary[]> {
  const cacheKey = `commits:${owner}/${repo}:${limit}`;
  const cached = getFromCache<CommitSummary[]>(cacheKey);
  if (cached) return cached;
  
  const commits = await githubFetch<GitHubCommit[]>(
    `/repos/${owner}/${repo}/commits?per_page=${limit}`
  );
  
  const summaries: CommitSummary[] = commits.map((commit) => ({
    sha: commit.sha,
    message: commit.commit.message.split('\n')[0], // First line only
    author: commit.author?.login || commit.commit.author.name,
    authorAvatar: commit.author?.avatar_url || null,
    date: commit.commit.author.date,
    url: commit.html_url,
  }));
  
  setCache(cacheKey, summaries);
  return summaries;
}

/**
 * Fetch issues from a repository
 */
export async function getRepoIssues(
  owner: string,
  repo: string,
  state: 'open' | 'closed' | 'all' = 'all',
  limit: number = 50
): Promise<IssueSummary[]> {
  const cacheKey = `issues:${owner}/${repo}:${state}:${limit}`;
  const cached = getFromCache<IssueSummary[]>(cacheKey);
  if (cached) return cached;
  
  const issues = await githubFetch<GitHubIssue[]>(
    `/repos/${owner}/${repo}/issues?state=${state}&per_page=${limit}&sort=updated&direction=desc`
  );
  
  // Filter out pull requests (they show up in issues API)
  const filteredIssues = issues.filter((issue) => !('pull_request' in issue));
  
  const summaries: IssueSummary[] = filteredIssues.map((issue) => ({
    id: issue.id,
    number: issue.number,
    title: issue.title,
    state: issue.state,
    labels: issue.labels.map((l) => ({ name: l.name, color: l.color })),
    createdAt: issue.created_at,
    closedAt: issue.closed_at,
    url: issue.html_url,
  }));
  
  setCache(cacheKey, summaries);
  return summaries;
}

/**
 * Fetch basic repository information
 */
export async function getRepoInfo(owner: string, repo: string): Promise<RepoSummary> {
  const cacheKey = `repo:${owner}/${repo}`;
  const cached = getFromCache<RepoSummary>(cacheKey);
  if (cached) return cached;
  
  const repoData = await githubFetch<GitHubRepo>(`/repos/${owner}/${repo}`);
  
  const summary: RepoSummary = {
    name: repoData.name,
    fullName: repoData.full_name,
    description: repoData.description,
    language: repoData.language,
    stars: repoData.stargazers_count,
    forks: repoData.forks_count,
    openIssues: repoData.open_issues_count,
    lastPush: repoData.pushed_at,
    topics: repoData.topics,
    url: repoData.html_url,
  };
  
  setCache(cacheKey, summary);
  return summary;
}

/**
 * Fetch file content from repository
 */
export async function getFileContent(
  owner: string,
  repo: string,
  path: string
): Promise<string | null> {
  const cacheKey = `file:${owner}/${repo}:${path}`;
  const cached = getFromCache<string | null>(cacheKey);
  if (cached !== null) return cached;
  
  try {
    const content = await githubFetch<GitHubContent>(`/repos/${owner}/${repo}/contents/${path}`);
    
    if (content.content && content.encoding === 'base64') {
      const decoded = Buffer.from(content.content, 'base64').toString('utf-8');
      setCache(cacheKey, decoded);
      return decoded;
    }
    
    return null;
  } catch {
    return null;
  }
}

/**
 * Get rate limit status
 */
export async function getRateLimitStatus(): Promise<{
  limit: number;
  remaining: number;
  reset: Date;
}> {
  const data = await githubFetch<{
    rate: { limit: number; remaining: number; reset: number };
  }>('/rate_limit');
  
  return {
    limit: data.rate.limit,
    remaining: data.rate.remaining,
    reset: new Date(data.rate.reset * 1000),
  };
}
