'use client';

import { useState } from 'react';
import Link from 'next/link';
import StatusBadge from '@/components/portal/StatusBadge';
import CommitFeed from '@/components/portal/CommitFeed';
import HealthMonitor from '@/components/portal/HealthMonitor';

// Mock data - will be replaced with real API calls
const mockProject = {
  id: '1',
  name: 'AI Voice Agent',
  description: 'Automated phone intake system for service calls with intelligent routing, natural language understanding, and Jobber CRM integration. Handles incoming calls 24/7, collects caller information, and creates service requests automatically.',
  status: 'active' as const,
  repoUrl: 'https://github.com/tbmoss3/voice-agent',
  lastUpdated: '2 hours ago',
  progress: 75,
  features: {
    completed: ['Call handling', 'Speech recognition', 'Jobber integration', 'Voicemail detection'],
    inProgress: ['Sentiment analysis', 'Multi-language support'],
    planned: ['Video calls', 'SMS follow-ups'],
  },
  deployments: [
    { 
      name: 'Production', 
      status: 'healthy' as const, 
      platform: 'railway',
      url: 'https://voice-agent.up.railway.app',
      uptime: '99.9%',
      responseTime: '142ms',
      lastCheck: '30s ago',
    },
    { 
      name: 'Staging', 
      status: 'healthy' as const, 
      platform: 'railway',
      url: 'https://voice-agent-staging.up.railway.app',
      uptime: '99.5%',
      responseTime: '156ms',
      lastCheck: '30s ago',
    },
  ],
  commits: [
    { sha: 'abc1234567890', message: 'feat: add sentiment analysis to call processing', author: 'Ben M.', date: '2h ago', branch: 'main' },
    { sha: 'def2345678901', message: 'fix: handle edge case in voicemail detection', author: 'Ben M.', date: '5h ago', branch: 'main' },
    { sha: 'ghi3456789012', message: 'chore: update dependencies', author: 'Ben M.', date: '1d ago', branch: 'main' },
    { sha: 'jkl4567890123', message: 'feat: implement Jobber webhook handler', author: 'Ben M.', date: '2d ago', branch: 'main' },
    { sha: 'mno5678901234', message: 'refactor: improve call routing logic', author: 'Ben M.', date: '3d ago', branch: 'main' },
  ],
};

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'development', label: 'Development' },
  { id: 'monitoring', label: 'Monitoring' },
];

export default function ProjectDetailPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const project = mockProject;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-zinc-500 mb-6">
        <Link href="/portal/dashboard" className="hover:text-zinc-300 transition-colors">
          Dashboard
        </Link>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-zinc-300">{project.name}</span>
      </div>

      {/* Header */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-white">{project.name}</h1>
              <StatusBadge status={project.status} />
            </div>
            <p className="text-zinc-400 max-w-3xl">{project.description}</p>
          </div>
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-colors text-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View Repository
            </a>
          )}
        </div>
        <div className="flex items-center gap-4 text-sm text-zinc-500">
          <span>Last updated: {project.lastUpdated}</span>
          <span>•</span>
          <span>{project.deployments.filter(d => d.status === 'healthy').length}/{project.deployments.length} deployments healthy</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-zinc-800 mb-6">
        <div className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-sm font-medium transition-colors relative ${
                activeTab === tab.id
                  ? 'text-emerald-400'
                  : 'text-zinc-400 hover:text-zinc-300'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Progress */}
          <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Project Progress</h3>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-zinc-400">Overall Completion</span>
                <span className="text-sm font-medium text-white">{project.progress}%</span>
              </div>
              <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-emerald-400 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Completed ({project.features.completed.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.features.completed.map((feature, index) => (
                    <span key={index} className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-sm rounded-full border border-emerald-500/20">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-blue-400 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  In Progress ({project.features.inProgress.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.features.inProgress.map((feature, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-500/10 text-blue-400 text-sm rounded-full border border-blue-500/20">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-zinc-400 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Planned ({project.features.planned.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.features.planned.map((feature, index) => (
                    <span key={index} className="px-3 py-1 bg-zinc-800 text-zinc-400 text-sm rounded-full border border-zinc-700">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h4 className="text-sm text-zinc-500 mb-1">Deployments</h4>
              <p className="text-2xl font-bold text-white">{project.deployments.length}</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h4 className="text-sm text-zinc-500 mb-1">Commits (30d)</h4>
              <p className="text-2xl font-bold text-white">{project.commits.length}</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h4 className="text-sm text-zinc-500 mb-1">Uptime</h4>
              <p className="text-2xl font-bold text-emerald-400">99.9%</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'development' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Commits */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Recent Commits</h3>
              {project.repoUrl && (
                <a
                  href={`${project.repoUrl}/commits`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                >
                  View all
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
            <CommitFeed commits={project.commits} />
          </div>

          {/* Features Roadmap */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Features Roadmap</h3>
            <div className="space-y-6">
              {/* Completed */}
              <div>
                <h4 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">Completed</h4>
                <div className="space-y-2">
                  {project.features.completed.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 text-sm">
                      <div className="w-5 h-5 bg-emerald-500/20 rounded flex items-center justify-center">
                        <svg className="w-3 h-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-zinc-300 line-through">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* In Progress */}
              <div>
                <h4 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">In Progress</h4>
                <div className="space-y-2">
                  {project.features.inProgress.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 text-sm">
                      <div className="w-5 h-5 bg-blue-500/20 rounded flex items-center justify-center">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                      </div>
                      <span className="text-white">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Planned */}
              <div>
                <h4 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">Planned</h4>
                <div className="space-y-2">
                  {project.features.planned.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 text-sm">
                      <div className="w-5 h-5 bg-zinc-800 rounded flex items-center justify-center">
                        <div className="w-2 h-2 bg-zinc-600 rounded-full" />
                      </div>
                      <span className="text-zinc-400">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'monitoring' && (
        <div className="grid grid-cols-1 gap-6">
          {/* Deployment Health */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Deployment Health</h3>
            <HealthMonitor deployments={project.deployments} />
          </div>

          {/* Metrics placeholder */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h4 className="text-sm text-zinc-500 mb-2">Requests (24h)</h4>
              <p className="text-3xl font-bold text-white">12,847</p>
              <span className="text-xs text-emerald-400">↑ 12% from yesterday</span>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h4 className="text-sm text-zinc-500 mb-2">Avg Response Time</h4>
              <p className="text-3xl font-bold text-white">142ms</p>
              <span className="text-xs text-zinc-500">p95: 312ms</span>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h4 className="text-sm text-zinc-500 mb-2">Error Rate</h4>
              <p className="text-3xl font-bold text-emerald-400">0.02%</p>
              <span className="text-xs text-zinc-500">3 errors / 12,847 requests</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
