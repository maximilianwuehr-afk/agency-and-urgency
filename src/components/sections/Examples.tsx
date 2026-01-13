'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { StatCounter } from '@/components/ui/StatCounter';

const externalExamples = [
  {
    name: 'Peter Steinberger',
    stat: '2 afternoons',
    description: 'Rebuilt a fitness tracking app (originally maintained by 100 engineers)',
    source: 'steipete.me',
  },
  {
    name: 'Claude Code',
    stat: '99%',
    description: 'Built 99% using Claude Code itself — recursive AI development',
    source: 'Anthropic',
  },
  {
    name: 'Duolingo',
    stat: '25% + 70%',
    description: '25% faster onboarding, 70% more PRs merged',
    source: 'faros.ai',
  },
];

const finnExamples = [
  {
    name: 'spaces.finn.com',
    by: 'Maxi G.',
    description: 'Built using AI-assisted development',
  },
  {
    name: 'Slack CLI',
    by: 'Max W.',
    description: 'Full command-line tool in <10 hours with Claude Code',
    stat: '<10h',
  },
  {
    name: 'Data Team',
    by: 'Analytics',
    description: 'Using Cursor with dbt repo to query warehouse without raw SQL',
  },
  {
    name: 'Obsidian Plugin',
    by: 'Max W.',
    description: 'Auto-tagging summarization in <3 hours using free models',
    stat: '<3h',
  },
];

export function Examples() {
  return (
    <Section id="examples" className="py-24 px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-4 text-[var(--text-primary)]"
        >
          Real Examples
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg text-[var(--text-muted)] mb-12"
        >
          What people are actually building with AI tools.
        </motion.p>

        {/* External Examples */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-6">External</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {externalExamples.map((example, index) => (
              <motion.div
                key={example.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-5 bg-[var(--bg-panel)] border border-[var(--border)] rounded-xl"
              >
                <div className="text-2xl font-bold text-[var(--accent-glow)] mb-2">{example.stat}</div>
                <div className="font-semibold text-[var(--text-primary)] mb-1">{example.name}</div>
                <p className="text-sm text-[var(--text-muted)] mb-2">{example.description}</p>
                <div className="text-xs text-[var(--text-muted)] font-mono">— {example.source}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FINN Examples */}
        <div>
          <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-6 flex items-center gap-3">
            <span>FINN-Specific</span>
            <span className="text-xs font-mono text-[var(--accent-finn)] px-2 py-1 bg-[var(--accent-finn)]/10 rounded">
              internal
            </span>
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {finnExamples.map((example, index) => (
              <motion.div
                key={example.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-5 bg-[var(--bg-panel)] border border-[var(--border)] rounded-xl flex gap-4"
              >
                <div className="flex-1">
                  <div className="font-semibold text-[var(--text-primary)] mb-1">{example.name}</div>
                  <p className="text-sm text-[var(--text-muted)] mb-2">{example.description}</p>
                  <div className="text-xs text-[var(--accent-finn)] font-mono">by {example.by}</div>
                </div>
                {example.stat && (
                  <div className="text-2xl font-bold text-[var(--accent-glow)] shrink-0">
                    {example.stat}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
