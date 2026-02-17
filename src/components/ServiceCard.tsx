interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features?: string[];
  engagement?: string;
  price?: string;
  className?: string;
}

export default function ServiceCard({
  icon,
  title,
  description,
  features,
  engagement,
  price,
  className = '',
}: ServiceCardProps) {
  return (
    <div
      className={`group p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:border-emerald-500/50 transition-all duration-300 hover:bg-zinc-900/80 ${className}`}
    >
      {/* Icon */}
      <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 mb-4 group-hover:bg-emerald-500/20 transition-colors">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>

      {/* Description */}
      <p className="text-zinc-400 text-sm mb-4">{description}</p>

      {/* Features */}
      {features && features.length > 0 && (
        <ul className="space-y-2 mb-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-zinc-500">
              <svg
                className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      )}

      {/* Engagement Details */}
      {(engagement || price) && (
        <div className="pt-4 border-t border-zinc-800">
          {engagement && (
            <p className="text-xs text-zinc-500">
              <span className="text-zinc-400">Timeline:</span> {engagement}
            </p>
          )}
          {price && (
            <p className="text-xs text-emerald-400 font-medium mt-1">{price}</p>
          )}
        </div>
      )}
    </div>
  );
}
