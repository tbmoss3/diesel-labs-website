'use client';

import StatusBadge from './StatusBadge';

interface Deployment {
  name: string;
  status: 'healthy' | 'warning' | 'error';
  platform: string;
  url?: string;
  uptime?: string;
  lastCheck?: string;
  responseTime?: string;
}

interface HealthMonitorProps {
  deployments: Deployment[];
}

export default function HealthMonitor({ deployments }: HealthMonitorProps) {
  if (deployments.length === 0) {
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
      {deployments.map((deployment, index) => (
        <div
          key={index}
          className="bg-zinc-800/50 border border-zinc-800 rounded-lg p-4 hover:border-zinc-700 transition-colors"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${
                deployment.status === 'healthy' ? 'bg-emerald-400 animate-pulse' :
                deployment.status === 'warning' ? 'bg-yellow-400 animate-pulse' :
                'bg-red-400 animate-pulse'
              }`} />
              <h4 className="font-semibold text-white">{deployment.name}</h4>
              <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded">
                {deployment.platform}
              </span>
            </div>
            <StatusBadge status={deployment.status} size="sm" />
          </div>

          <div className="grid grid-cols-3 gap-4 text-sm">
            {deployment.uptime && (
              <div>
                <p className="text-zinc-500 text-xs mb-1">Uptime</p>
                <p className="text-white font-medium">{deployment.uptime}</p>
              </div>
            )}
            {deployment.responseTime && (
              <div>
                <p className="text-zinc-500 text-xs mb-1">Response Time</p>
                <p className="text-white font-medium">{deployment.responseTime}</p>
              </div>
            )}
            {deployment.lastCheck && (
              <div>
                <p className="text-zinc-500 text-xs mb-1">Last Check</p>
                <p className="text-white font-medium">{deployment.lastCheck}</p>
              </div>
            )}
          </div>

          {deployment.url && (
            <div className="mt-3 pt-3 border-t border-zinc-700/50">
              <a
                href={deployment.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                {deployment.url}
              </a>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
