'use client';

import ScrollAnimation from './ScrollAnimation';

const caseStudies = [
  {
    title: 'AI Voice Agent',
    category: 'Voice AI',
    description: 'Automated phone intake system for a maintenance company that handles calls 24/7, collects work order details, and creates jobs automatically.',
    results: ['70% reduction in missed calls', 'Automated job creation', '24/7 availability'],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    title: 'Property Management Automation',
    category: 'Workflow Automation',
    description: 'End-to-end workflow automation connecting property management software with maintenance dispatch, reducing manual data entry by 80%.',
    results: ['80% less manual entry', 'Real-time sync', 'Automated routing'],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    title: 'Real-time Command Center',
    category: 'Dashboard & Monitoring',
    description: 'Unified command center displaying live deployments, system health, and metrics across multiple services and AI agents.',
    results: ['Instant visibility', 'Proactive alerts', 'Single pane of glass'],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];

export default function CaseStudies() {
  return (
    <section className="py-24 px-6 bg-zinc-900/50">
      <div className="max-w-6xl mx-auto">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Case Studies
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Real solutions we've built that deliver measurable results.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <ScrollAnimation key={study.title} delay={index * 100}>
              <div className="group h-full p-6 bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-emerald-500/50 transition-all duration-300">
                {/* Icon */}
                <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 mb-4 group-hover:bg-emerald-500/20 transition-colors">
                  {study.icon}
                </div>

                {/* Category */}
                <span className="text-xs text-emerald-400 font-medium uppercase tracking-wider">
                  {study.category}
                </span>

                {/* Title */}
                <h3 className="text-xl font-semibold text-white mt-2 mb-3">
                  {study.title}
                </h3>

                {/* Description */}
                <p className="text-zinc-400 text-sm mb-4">
                  {study.description}
                </p>

                {/* Results */}
                <div className="pt-4 border-t border-zinc-800">
                  <p className="text-xs text-zinc-500 mb-2">Key Results:</p>
                  <ul className="space-y-1">
                    {study.results.map((result, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-zinc-400">
                        <svg className="w-3 h-3 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
