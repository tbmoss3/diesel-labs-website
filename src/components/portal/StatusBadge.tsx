'use client';

interface StatusBadgeProps {
  status: 'healthy' | 'warning' | 'error' | 'planning' | 'active' | 'completed' | 'paused';
  size?: 'sm' | 'md';
}

const statusConfig = {
  healthy: { color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30', label: 'Healthy', dot: 'bg-emerald-400' },
  warning: { color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', label: 'Warning', dot: 'bg-yellow-400' },
  error: { color: 'bg-red-500/20 text-red-400 border-red-500/30', label: 'Error', dot: 'bg-red-400' },
  planning: { color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', label: 'Planning', dot: 'bg-blue-400' },
  active: { color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30', label: 'Active', dot: 'bg-emerald-400' },
  completed: { color: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30', label: 'Completed', dot: 'bg-zinc-400' },
  paused: { color: 'bg-orange-500/20 text-orange-400 border-orange-500/30', label: 'Paused', dot: 'bg-orange-400' },
};

export default function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const config = statusConfig[status];
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';
  const dotSize = size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2';

  return (
    <span className={`inline-flex items-center gap-1.5 ${sizeClasses} ${config.color} border rounded-full font-medium`}>
      <span className={`${dotSize} ${config.dot} rounded-full animate-pulse`} />
      {config.label}
    </span>
  );
}
