import ProjectCard from '@/components/portal/ProjectCard';

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

export default function ProjectsPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
          <p className="text-zinc-400">All your active and planned projects</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
