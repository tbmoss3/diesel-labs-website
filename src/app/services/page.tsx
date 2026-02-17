import Link from 'next/link';
import ServiceCard from '@/components/ServiceCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services | Diesel Labs',
  description: 'AI Strategy, Custom Development, Integration, and Maintenance services for businesses that want results.',
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 bg-gradient-to-b from-zinc-950 to-zinc-900">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Our Services
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            From strategy to ongoing optimization, we help you implement AI that delivers real business value.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-6 bg-zinc-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* AI Strategy & Assessment */}
            <ServiceCard
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              }
              title="AI Strategy & Assessment"
              description="We analyze your business processes, identify AI opportunities, and create a roadmap for implementation. No jargon, just actionable insights."
              features={[
                'Business process analysis',
                'AI opportunity identification',
                'Build vs. buy recommendations',
                'Technology stack evaluation',
                'ROI projections',
              ]}
              engagement="2-4 weeks"
            />

            {/* Custom AI Development */}
            <ServiceCard
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              }
              title="Custom AI Development"
              description="Purpose-built AI solutions designed for your specific workflows. We build systems that integrate seamlessly with your existing operations."
              features={[
                'Workflow automation with AI agents',
                'Document processing & extraction',
                'Custom chatbots & conversational AI',
                'Decision support systems',
                'Data pipeline development',
              ]}
              engagement="4-12 weeks"
            />

            {/* AI Integration */}
            <ServiceCard
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              }
              title="AI Integration"
              description="Connect powerful AI capabilities to your existing tools and systems. We make AI work with what you already have."
              features={[
                'LLM API integration (OpenAI, Anthropic, etc.)',
                'CRM/ERP AI enhancements',
                'Legacy system modernization',
                'Third-party AI tool implementation',
              ]}
              engagement="2-6 weeks"
            />

            {/* Maintenance & Optimization */}
            <ServiceCard
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              }
              title="Maintenance & Optimization"
              description="AI systems need ongoing care to perform their best. We keep your systems optimized, updated, and running smoothly."
              features={[
                'Model monitoring & retraining',
                'Performance optimization',
                'Prompt engineering refinement',
                'Ongoing support & enhancement',
              ]}
              engagement="Monthly retainer"
            />
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 px-6 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How We Work
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              A straightforward process designed to deliver value quickly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 mx-auto mb-4 font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Discover</h3>
              <p className="text-zinc-500 text-sm">
                We learn your business, processes, and goals through deep discovery sessions.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 mx-auto mb-4 font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Design</h3>
              <p className="text-zinc-500 text-sm">
                We architect a solution that fits your needs, timeline, and budget.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 mx-auto mb-4 font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Build</h3>
              <p className="text-zinc-500 text-sm">
                We develop and test your solution with regular check-ins and iterations.
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 mx-auto mb-4 font-bold">
                4
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Support</h3>
              <p className="text-zinc-500 text-sm">
                We deploy, monitor, and continuously optimize your AI systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-24 px-6 bg-zinc-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Industries We Serve
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Deep expertise in industries where AI can make the biggest impact.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { name: 'Property Management', icon: '🏢' },
              { name: 'Construction', icon: '🏗️' },
              { name: 'Professional Services', icon: '⚖️' },
              { name: 'Healthcare Admin', icon: '🏥' },
              { name: 'Local Media', icon: '📰' },
            ].map((industry) => (
              <div
                key={industry.name}
                className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl text-center hover:border-emerald-500/50 transition-colors"
              >
                <span className="text-3xl mb-3 block">{industry.icon}</span>
                <span className="text-sm text-zinc-400">{industry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-zinc-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Let's discuss your project
          </h2>
          <p className="text-zinc-400 mb-8 text-lg">
            Every engagement starts with a conversation. Tell us about your challenges.
          </p>
          <Link
            href="/contact"
            className="inline-flex px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
