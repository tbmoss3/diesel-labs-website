import { getServerSession } from 'next-auth';
import Link from 'next/link';
import ProjectCard from '@/components/portal/ProjectCard';
import StatusBadge from '@/components/portal/StatusBadge';

// Mock data - will be replaced with real API calls
const mockProjects = [
  {
    id: '1',
    name: 'AI Voice Agent',
    description: 'Automated phone intake system for service calls with intelligent routing and Jobber integration.',
    status: 'active' as const,
    repoUrl: 'https://github.com/tbmoss3/voice-agent',
    deployments: [
      { name: 'Production', status: 'healthy' as const, platform: 'railway' },
    ],
    lastUpdated: '2 hours ago',
  },
  {
    id: '2',
    name: 'Customer Dashboard',
    description: 'Real-time analytics dashboard for monitoring service metrics and KPIs.',
    status: 'active' as const,
    repoUrl: 'https://github.com/tbmoss3/customer-dashboard',
    deployments: [
      { name: 'Production', status: 'healthy' as const, platform: 'vercel' },
      { name: 'Staging', status: 'healthy' as const, platform: 'vercel' },
    ],
    lastUpdated: '1 day ago',
  },
  {
    id: '3',
    name: 'Inventory Sync',
    description: 'Automated inventory synchronization between warehouse and e-commerce platforms.',
    status: 'planning' as const,
    deployments: [],
    lastUpdated: '1 week ago',
  },
];

const recentActivity = [
  { type: 'deploy', project: 'AI Voice Agent', message: 'Production deployment successful', time: '2h ago' },
  { type: 'commit', project: 'Customer Dashboard', message: 'feat: add export functionality', time: '5h ago' },
  { type: 'alert', project: 'AI Voice Agent', message: 'High call volume detected', time: '1d ago' },
];

export default async function DashboardPage() {
  const session = await getServerSession();
  const userName = session?.user?.name?.split(' ')[0] || 'there';

  const activeProjects = mockProjects.filter(p => p.status === 'active').length;
  const healthyDeployments = mockProjects.flatMap(p => p.deployments).filter(d => d.status === 'healthy').length;
  const totalDeployments = mockProjects.flatMap(p => p.deployments).length;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, {userName}
        </h1>
        <p className="text-zinc-400">
          Here&apos;s an overview of your projects and deployments.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Active Projects */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
            </div>
            <StatusBadge status="active" size="sm" />
          </div>
          <p className="text-3xl font-bold text-white mb-1">{activeProjects}</p>
          <p className="text-sm text-zinc-500">Active Projects</p>
        </div>

        {/* Deployments */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
            <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-1 rounded">
              {healthyDeployments}/{totalDeployments} healthy
            </span>
          </div>
          <p className="text-3xl font-bold text-white mb-1">{totalDeployments}</p>
          <p className="text-sm text-zinc-500">Total Deployments</p>
        </div>

        {/* Uptime */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-white mb-1">99.9%</p>
          <p className="text-sm text-zinc-500">Uptime (30 days)</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Projects List */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Your Projects</h2>
            <Link 
              href="/portal/projects" 
              className="text-sm text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              View all
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid gap-4">
            {mockProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    activity.type === 'deploy' ? 'bg-emerald-500/20 text-emerald-400' :
                    activity.type === 'commit' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {activity.type === 'deploy' && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {activity.type === 'commit' && (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    )}
                    {activity.type === 'alert' && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">{activity.message}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      {activity.project} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
