'use client';

import { useState, useEffect } from 'react';

interface Issue {
  id: number;
  number: number;
  title: string;
  state: 'open' | 'closed';
  labels: Array<{ name: string; color: string }>;
  createdAt: string;
  closedAt: string | null;
  url: string;
}

interface IssuesListProps {
  issues?: Issue[];
  owner?: string;
  repo?: string;
  autoFetch?: boolean;
  showTabs?: boolean;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 1) return 'today';
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return date.toLocaleDateString();
}

export default function IssuesList({
  issues: initialIssues,
  owner,
  repo,
  autoFetch = false,
  showTabs = true,
}: IssuesListProps) {
  const [issues, setIssues] = useState<Issue[]>(initialIssues || []);
  const [loading, setLoading] = useState(autoFetch && owner && repo);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'open' | 'closed'>('open');

  useEffect(() => {
    if (!autoFetch || !owner || !repo) return;

    const fetchIssues = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/github/issues?owner=${encodeURIComponent(owner)}&repo=${encodeURIComponent(repo)}&state=all`
        );

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Failed to fetch issues');
        }

        const data = await response.json();
        setIssues(data.issues || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch issues');
        console.error('Error fetching issues:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, [autoFetch, owner, repo]);

  const openIssues = issues.filter((i) => i.state === 'open');
  const closedIssues = issues.filter((i) => i.state === 'closed');
  const displayedIssues = activeTab === 'open' ? openIssues : closedIssues;

  if (loading) {
    return (
      <div className="space-y-3">
        <div className="flex gap-4 mb-4">
          <div className="h-8 bg-zinc-700 rounded w-20 animate-pulse" />
          <div className="h-8 bg-zinc-700 rounded w-20 animate-pulse" />
        </div>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="p-3 bg-zinc-800/50 rounded-lg border border-zinc-800 animate-pulse">
            <div className="h-4 bg-zinc-700 rounded w-3/4 mb-2" />
            <div className="h-3 bg-zinc-700 rounded w-1/4" />
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

  return (
    <div>
      {showTabs && (
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setActiveTab('open')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'open'
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                : 'text-zinc-400 hover:text-zinc-300'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
            </svg>
            To Build ({openIssues.length})
          </button>
          <button
            onClick={() => setActiveTab('closed')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'closed'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'text-zinc-400 hover:text-zinc-300'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Built ({closedIssues.length})
          </button>
        </div>
      )}

      {displayedIssues.length === 0 ? (
        <div className="text-center py-8 text-zinc-500">
          <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p>No {activeTab} issues</p>
        </div>
      ) : (
        <div className="space-y-2">
          {displayedIssues.map((issue) => (
            <a
              key={issue.id}
              href={issue.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-3 bg-zinc-800/50 rounded-lg border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800 transition-colors block"
            >
              <div className={`mt-0.5 ${issue.state === 'open' ? 'text-blue-400' : 'text-emerald-400'}`}>
                {issue.state === 'open' ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm ${issue.state === 'open' ? 'text-white' : 'text-zinc-400'}`}>
                  {issue.title}
                </p>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className="text-xs text-zinc-500">
                    #{issue.number} • {issue.state === 'closed' && issue.closedAt 
                      ? `closed ${formatDate(issue.closedAt)}`
                      : `opened ${formatDate(issue.createdAt)}`}
                  </span>
                  {issue.labels.map((label) => (
                    <span
                      key={label.name}
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `#${label.color}20`,
                        color: `#${label.color}`,
                        border: `1px solid #${label.color}40`,
                      }}
                    >
                      {label.name}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
