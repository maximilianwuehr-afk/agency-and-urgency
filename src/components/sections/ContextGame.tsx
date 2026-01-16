'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';

const examples = [
  {
    role: 'Lawyer',
    task: 'Analyze contracts, draft legal documents, summarize case law',
    source: 'Anthropic legal team',
  },
  {
    role: 'Doctor / Health Coach',
    task: 'Interpret lab results, create health dashboards, explain test benefits',
    source: 'Real user stories',
  },
  {
    role: 'Hiring Manager',
    task: 'Write job descriptions, create interview rubrics, design hiring plans',
    source: 'Clay team',
  },
  {
    role: 'Consultant',
    task: 'Analyze data, generate reports, provide strategic recommendations',
    source: 'Common enterprise use',
  },
];

const resources = [
  {
    title: 'Everyone should be using Claude Code more',
    author: 'Lenny Rachitsky',
    url: 'https://www.lennysnewsletter.com/p/everyone-should-be-using-claude-code',
    note: 'Great overview of non-coding use cases',
  },
  {
    title: 'How AI Is Transforming Work at Anthropic',
    author: 'Anthropic',
    url: 'https://www.anthropic.com/research/how-ai-is-transforming-work-at-anthropic',
    note: 'Engineers becoming "full-stack" across disciplines',
  },
];

export function ContextGame() {
  return (
    <Section id="context-game" className="py-24 px-8">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-4 text-[var(--text-primary)]"
        >
          AI Can Learn Any Job
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg text-[var(--text-muted)] mb-12 max-w-3xl"
        >
          Give AI the right context — documents, examples, instructions — and it adapts to your domain.
          People are already using it for work far outside its original purpose.
        </motion.p>

        {/* Examples Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-6">Real examples from the wild</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {examples.map((ex, index) => (
              <motion.div
                key={ex.role}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-5 bg-[var(--bg-panel)] border border-[var(--border)] rounded-xl"
              >
                <div className="flex items-start gap-3">
                  <span className="text-[var(--accent-finn)] font-mono shrink-0">[{index + 1}]</span>
                  <div>
                    <div className="font-semibold text-[var(--text-primary)] mb-1">{ex.role}</div>
                    <p className="text-sm text-[var(--text-muted)] mb-2">{ex.task}</p>
                    <p className="text-xs text-[var(--text-dim)] italic">Source: {ex.source}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Key Insight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-6 bg-[var(--accent-finn)]/10 border border-[var(--accent-finn)]/30 rounded-xl mb-12"
        >
          <div className="text-lg font-medium text-[var(--text-primary)] mb-2">
            The pattern is simple:
          </div>
          <div className="text-[var(--text-muted)]">
            <span className="text-[var(--accent-finn)] font-semibold">Context</span> (what you give it) +{' '}
            <span className="text-[var(--accent-finn)] font-semibold">Instructions</span> (what you want) ={' '}
            <span className="text-[var(--accent-finn)] font-semibold">Domain expertise</span>
          </div>
          <p className="text-sm text-[var(--text-muted)] mt-3">
            This is why &quot;prompt engineering&quot; matters. It&apos;s really just: be specific about what you need,
            and give the AI enough context to do a good job.
          </p>
        </motion.div>

        {/* Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-6">Go deeper</h3>
          <div className="space-y-3">
            {resources.map((resource, index) => (
              <motion.a
                key={resource.url}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="block p-4 bg-[var(--bg-panel)] border border-[var(--border)] rounded-lg
                           hover:border-[var(--accent-finn)] hover:bg-[var(--bg-card)] transition-colors group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-finn)] transition-colors">
                      {resource.title}
                    </div>
                    <div className="text-sm text-[var(--text-muted)]">{resource.author}</div>
                    <p className="text-xs text-[var(--text-dim)] mt-1">{resource.note}</p>
                  </div>
                  <span className="text-[var(--text-dim)] group-hover:text-[var(--accent-finn)] transition-colors shrink-0">
                    ↗
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
