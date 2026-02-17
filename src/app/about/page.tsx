import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Diesel Labs',
  description: 'Meet the team behind Diesel Labs. Practical AI solutions from people who understand business.',
};

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 bg-gradient-to-b from-zinc-950 to-zinc-900">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            About Diesel Labs
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Practical AI solutions from people who understand business.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 px-6 bg-zinc-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Our Mission
              </h2>
              <p className="text-zinc-400 text-lg mb-6">
                We exist to bridge the gap between AI hype and real business value. 
                Too many companies are sold expensive AI projects that never make it 
                to production—or worse, solutions that don't actually solve their problems.
              </p>
              <p className="text-zinc-400 text-lg mb-6">
                Diesel Labs is different. We're not here to sell you on the promise 
                of AI. We're here to build AI systems that work—systems that integrate 
                with your existing workflows, solve real problems, and deliver measurable ROI.
              </p>
              <p className="text-zinc-400 text-lg">
                Practical, not theoretical. Production-ready, not proof-of-concept. 
                That's our philosophy.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-3xl blur-2xl" />
              <div className="relative bg-zinc-950 border border-zinc-800 rounded-3xl p-8">
                <blockquote className="text-xl text-zinc-300 italic mb-4">
                  "Most businesses don't need to build AI from scratch—they need 
                  someone who can connect the right AI capabilities to their 
                  specific workflows and data."
                </blockquote>
                <p className="text-emerald-400 font-medium">— Our Core Thesis</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What Sets Us Apart
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Results Over Research</h3>
              <p className="text-zinc-400">
                We ship working systems. While others are still experimenting, 
                we're deploying solutions that deliver value from day one.
              </p>
            </div>

            <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Senior Talent Only</h3>
              <p className="text-zinc-400">
                No junior associates or offshore teams. Every project gets 
                hands-on attention from experienced professionals.
              </p>
            </div>

            <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Long-Term Partnership</h3>
              <p className="text-zinc-400">
                We're not a one-and-done shop. We build relationships and support 
                your AI systems for the long haul.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-zinc-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to work together?
          </h2>
          <p className="text-zinc-400 mb-8 text-lg">
            Let's discuss how Diesel Labs can help your business harness AI.
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
