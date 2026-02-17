import Link from 'next/link';
import EngineBackground from '@/components/EngineBackground';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex flex-col items-center justify-center px-6 relative overflow-hidden">
        {/* 3D Wireframe Engine Background */}
        <EngineBackground />
        
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        
        {/* Glow Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none animate-pulse-glow" />
        
        <div className="relative z-10 text-center max-w-4xl">
          {/* Brand */}
          <div className="mb-6 animate-fade-in-up">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white [text-shadow:_0_0_30px_rgba(255,255,255,0.5),_0_0_60px_rgba(16,185,129,0.3)]">
              Diesel Labs
            </h1>
          </div>
          
          {/* Tagline */}
          <p className="text-2xl md:text-4xl text-emerald-400 font-light mb-8 tracking-wide animate-fade-in-up stagger-1 [text-shadow:_0_0_20px_rgba(16,185,129,0.6),_0_0_40px_rgba(16,185,129,0.3)]">
            Build. Maintain. Monitor.
          </p>
          
          {/* Value Prop */}
          <p className="text-lg md:text-xl text-zinc-200 mb-12 max-w-2xl mx-auto animate-fade-in-up stagger-2 [text-shadow:_0_0_15px_rgba(255,255,255,0.3)]">
            AI solutions for businesses that want results, not research projects. 
            We bridge the gap between AI hype and real business value.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up stagger-3">
            <Link
              href="/services"
              className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25"
            >
              Explore Services
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl border border-zinc-700 transition-all duration-300"
            >
              Get in Touch
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-zinc-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* Three Pillars Section */}
      <section className="py-24 px-6 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Approach
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              We take your AI initiatives from concept to production—and keep them running smoothly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Build */}
            <div className="group p-8 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:border-emerald-500/50 transition-all duration-300 text-center">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 mb-6 mx-auto group-hover:bg-emerald-500/20 transition-colors">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">Build</h3>
              <p className="text-zinc-400">
                Custom AI solutions designed for your specific workflows. From strategy to deployment, we build systems that actually work.
              </p>
            </div>

            {/* Maintain */}
            <div className="group p-8 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:border-emerald-500/50 transition-all duration-300 text-center">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 mb-6 mx-auto group-hover:bg-emerald-500/20 transition-colors">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">Maintain</h3>
              <p className="text-zinc-400">
                AI systems need ongoing care. We optimize prompts, retrain models, and keep your systems performing at their best.
              </p>
            </div>

            {/* Monitor */}
            <div className="group p-8 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:border-emerald-500/50 transition-all duration-300 text-center">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 mb-6 mx-auto group-hover:bg-emerald-500/20 transition-colors">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">Monitor</h3>
              <p className="text-zinc-400">
                Real-time visibility into your AI systems. Track performance, catch issues early, and make data-driven improvements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-24 px-6 bg-zinc-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Results over research.
              </h2>
              <p className="text-zinc-400 mb-8 text-lg">
                Most businesses don't need to build AI from scratch—they need someone who can 
                connect the right AI capabilities to their specific workflows and data. 
                That's what we do.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-zinc-300">Production-focused, not academic</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-zinc-300">Right-sized for SMB budgets</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-zinc-300">Full lifecycle support—strategy through maintenance</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-zinc-300">Senior talent on every project</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-3xl blur-2xl" />
              <div className="relative bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-zinc-400 text-sm font-mono">System operational</span>
                  </div>
                  <div className="space-y-3">
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full w-[92%] bg-emerald-500 rounded-full" />
                    </div>
                    <div className="flex justify-between text-xs text-zinc-500">
                      <span>Model Accuracy</span>
                      <span className="text-emerald-400">92%</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full w-[88%] bg-emerald-500 rounded-full" />
                    </div>
                    <div className="flex justify-between text-xs text-zinc-500">
                      <span>Task Automation</span>
                      <span className="text-emerald-400">88%</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full w-[45%] bg-emerald-500 rounded-full" />
                    </div>
                    <div className="flex justify-between text-xs text-zinc-500">
                      <span>Cost Reduction</span>
                      <span className="text-emerald-400">45%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-zinc-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to put AI to work?
          </h2>
          <p className="text-zinc-400 mb-8 text-lg">
            Let's talk about how AI can solve real problems in your business.
          </p>
          <Link
            href="/contact"
            className="inline-flex px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25"
          >
            Start a Conversation
          </Link>
        </div>
      </section>
    </>
  );
}
