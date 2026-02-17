'use client';

import ScrollAnimation from './ScrollAnimation';

const technologies = [
  { name: 'Anthropic', subtitle: 'Claude' },
  { name: 'OpenAI', subtitle: 'GPT' },
  { name: 'React', subtitle: '' },
  { name: 'Next.js', subtitle: '' },
  { name: 'Node.js', subtitle: '' },
  { name: 'PostgreSQL', subtitle: '' },
  { name: 'Railway', subtitle: '' },
  { name: 'Tailwind CSS', subtitle: '' },
  { name: 'TypeScript', subtitle: '' },
  { name: 'Python', subtitle: '' },
  { name: 'Vapi.ai', subtitle: 'Voice AI' },
  { name: 'AWS', subtitle: '' },
];

export default function TechStack() {
  return (
    <section className="py-24 px-6 bg-zinc-950/50">
      <div className="max-w-6xl mx-auto">
        <ScrollAnimation>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Technologies We Work With
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              We leverage the best tools in the industry to build robust, scalable AI solutions.
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation delay={100}>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {technologies.map((tech, index) => (
              <div
                key={tech.name}
                className="group p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-emerald-500/30 transition-all duration-300 text-center"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">
                  {tech.name}
                </div>
                {tech.subtitle && (
                  <div className="text-xs text-zinc-500 mt-1">{tech.subtitle}</div>
                )}
              </div>
            ))}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
