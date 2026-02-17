'use client';

import { useState } from 'react';
import ScrollAnimation from './ScrollAnimation';

const faqs = [
  {
    question: 'What types of businesses do you work with?',
    answer: 'We work primarily with small to mid-sized businesses across property management, construction, professional services, and local media. Our sweet spot is companies with 10-500 employees who have real operational challenges that AI can solve but don\'t have in-house AI expertise.',
  },
  {
    question: 'How long does a typical project take?',
    answer: 'It depends on scope. A focused AI integration or automation project typically takes 2-6 weeks. More comprehensive custom AI development projects run 4-12 weeks. We always start with clear milestones and keep you updated on progress.',
  },
  {
    question: 'Do you offer ongoing support?',
    answer: 'Yes. AI systems need ongoing care to perform their best—models drift, requirements change, and new capabilities emerge. We offer monthly maintenance retainers that include monitoring, optimization, prompt refinement, and priority support.',
  },
  {
    question: 'What AI technologies do you use?',
    answer: 'We\'re model-agnostic and use whatever works best for your use case. This includes Claude (Anthropic), GPT-4 (OpenAI), and various open-source models. For voice AI, we often work with Vapi.ai. We also build custom solutions using LangChain, vector databases, and modern deployment infrastructure.',
  },
  {
    question: 'How do you price your services?',
    answer: 'We price based on project scope and value delivered, not hourly rates. After an initial discovery conversation, we provide a fixed-price proposal with clear deliverables. For ongoing work, we offer monthly retainers. No surprises, no scope creep billing.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 bg-zinc-900/50">
      <div className="max-w-3xl mx-auto">
        <ScrollAnimation>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-zinc-400">
              Quick answers to common questions about working with us.
            </p>
          </div>
        </ScrollAnimation>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <ScrollAnimation key={index} delay={index * 50}>
              <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/50">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-zinc-800/50 transition-colors"
                >
                  <span className="font-medium text-white">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-emerald-400 flex-shrink-0 transition-transform duration-200 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <p className="px-6 pb-4 text-zinc-400 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
