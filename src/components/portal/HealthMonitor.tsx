'use client';

import { useState, useEffect, useCallback } from 'react';
import StatusBadge from './StatusBadge';

type HealthStatus = 'healthy' | 'degraded' | 'down' | 'unknown';

interface DeploymentHealth {
  id: string;
  name: string;
  platform: string;
  status: HealthStatus;
  responseTime?: number;
  error?: string;
  lastChecked: string;
}

interface ProjectHealth {
  projectId: string;
  projectName: string;
  deployments: DeploymentHealth[];
}

interface HealthMonitorProps {
  projectId?: string; // Optional: filter to specific project
}

// Map health status to StatusBadge status
function mapStatus(status: HealthStatus): 'healthy' | 'warning' | 'error' {
  switch (status) {
    case 'healthy':
      return 'healthy';
    case 'degraded':
      return 'warning';
    case 'down':
      return 'error';
    case 'unknown':
    default:
      return 'warning';
  }
}

// Format relative time
function formatLastChecked(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);

  if (diffSec < 60) return 'just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  return date.toLocaleDateString();
}

export default function HealthMonitor({ projectId }: HealthMonitorProps) {
  const [projects, setProjects] = useState<ProjectHealth[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHealth = useCallback(async () => {
    try {
      const url = projectId 
        ? `/api/monitoring/health?projectId=${projectId}`
        : '/api/monitoring/health';
      
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch health status');
      }

      // Normalize response format
      if (projectId && data.data?.projectId) {
        // Single project response
        setProjects([data.data]);
      } else if (Array.isArray(data.data)) {
        // Multiple projects response
        setProjects(data.data);
      } else {
        setProjects([]);
      }
      
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load health status');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchHealth();
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchHealth, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchHealth]);

  const handleRefresh = async () => {
    setRefreshing(true);
    
    // Force immediate check via POST endpoint
    try {
      if (projectId) {
        await fetch('/api/monitoring/check', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ projectId }),
        });
      }
    } catch {
      // Fallback to regular fetch if force check fails
    }
    
    await fetchHealth();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-400 mb-4">{error}</div>
        <button
          onClick={handleRefresh}
          className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  const allDeployments = projects.flatMap((p) => p.deployments);

  if (allDeployments.length === 0) {
    return (
      <div className="text-center py-8 text-zinc-500">
        <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <p>No deployments configured</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header with Refresh Button */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-zinc-500">
          {allDeployments.length} deployment{allDeployments.length !== 1 ? 's' : ''} monitored
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-3 py-1.5 text-sm bg-zinc-800 hover:bg-zinc-700 disabled:bg-zinc-800 disabled:opacity-50 text-white rounded-lg transition-colors"
        >
          <svg 
            className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {refreshing ? 'Checking...' : 'Refresh'}
        </button>
      </div>

      {/* Deployments List */}
      {projects.map((project) => (
        <div key={project.projectId} className="space-y-3">
          {projects.length > 1 && (
            <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wide">
              {project.projectName}
            </h3>
          )}
          
          {project.deployments.map((deployment) => (
            <div
              key={deployment.id}
              className="bg-zinc-800/50 border border-zinc-800 rounded-lg p-4 hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    deployment.status === 'healthy' ? 'bg-emerald-400 animate-pulse' :
                    deployment.status === 'degraded' ? 'bg-yellow-400 animate-pulse' :
                    deployment.status === 'down' ? 'bg-red-400 animate-pulse' :
                    'bg-zinc-400'
                  }`} />
                  <h4 className="font-semibold text-white">{deployment.name}</h4>
                  <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded">
                    {deployment.platform}
                  </span>
                </div>
                <StatusBadge status={mapStatus(deployment.status)} size="sm" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-zinc-500 text-xs mb-1">Status</p>
                  <p className={`font-medium capitalize ${
                    deployment.status === 'healthy' ? 'text-emerald-400' :
                    deployment.status === 'degraded' ? 'text-yellow-400' :
                    deployment.status === 'down' ? 'text-red-400' :
                    'text-zinc-400'
                  }`}>
                    {deployment.status}
                  </p>
                </div>
                
                {deployment.responseTime !== undefined && (
                  <div>
                    <p className="text-zinc-500 text-xs mb-1">Response Time</p>
                    <p className={`font-medium ${
                      deployment.responseTime > 3000 ? 'text-yellow-400' : 'text-white'
                    }`}>
                      {deployment.responseTime}ms
                    </p>
                  </div>
                )}
                
                <div>
                  <p className="text-zinc-500 text-xs mb-1">Last Check</p>
                  <p className="text-white font-medium">
                    {formatLastChecked(deployment.lastChecked)}
                  </p>
                </div>
              </div>

              {deployment.error && (
                <div className="mt-3 pt-3 border-t border-zinc-700/50">
                  <p className="text-xs text-red-400 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    {deployment.error}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
