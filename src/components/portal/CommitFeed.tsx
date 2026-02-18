'use client';

import { useState, useEffect } from 'react';

interface Commit {
  sha: string;
  message: string;
  author: string;
  authorAvatar?: string | null;
  date: string;
  url?: string;
  branch?: string;
}

interface CommitFeedProps {
  commits?: Commit[];
  owner?: string;
  repo?: string;
  limit?: number;
  autoFetch?: boolean;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffHours < 1) return 'just now';
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

export default function CommitFeed({ 
  commits: initialCommits, 
  owner, 
  repo, 
  limit = 10,
  autoFetch = false 
}: CommitFeedProps) {
  const [commits, setCommits] = useState<Commit[]>(initialCommits || []);
  const [loading, setLoading] = useState<boolean>(!!(autoFetch && owner && repo));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!autoFetch || !owner || !repo) return;

    const fetchCommits = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/github/commits?owner=${encodeURIComponent(owner)}&repo=${encodeURIComponent(repo)}&limit=${limit}`
        );

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Failed to fetch commits');
        }

        const data = await response.json();
        setCommits(data.commits || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch commits');
        console.error('Error fetching commits:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCommits();
  }, [autoFetch, owner, repo, limit]);

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-start gap-3 p-3 bg-zinc-800/50 rounded-lg border border-zinc-800 animate-pulse">
            <div className="w-8 h-8 bg-zinc-700 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-zinc-700 rounded w-3/4" />
              <div className="h-3 bg-zinc-700 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-400">
        <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <p>{error}</p>
      </div>
    );
  }

  if (commits.length === 0) {
    return (
      <div className="text-center py-8 text-zinc-500">
        <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p>No recent commits</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {commits.map((commit) => (
        <a
          key={commit.sha}
          href={commit.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-3 p-3 bg-zinc-800/50 rounded-lg border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800 transition-colors cursor-pointer block"
        >
          <div className="w-8 h-8 bg-zinc-700 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
            {commit.authorAvatar ? (
              <img 
                src={commit.authorAvatar} 
                alt={commit.author} 
                className="w-full h-full object-cover"
              />
            ) : (
              <svg className="w-4 h-4 text-zinc-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white font-mono truncate">{commit.message}</p>
            <div className="flex items-center gap-2 mt-1 text-xs text-zinc-500">
              <span>{commit.author}</span>
              <span>•</span>
              <span>{formatDate(commit.date)}</span>
              {commit.branch && (
                <>
                  <span>•</span>
                  <span className="text-emerald-400">{commit.branch}</span>
                </>
              )}
            </div>
          </div>
          <code className="text-xs text-zinc-500 font-mono bg-zinc-800 px-2 py-1 rounded">
            {commit.sha.slice(0, 7)}
          </code>
        </a>
      ))}
    </div>
  );
}
