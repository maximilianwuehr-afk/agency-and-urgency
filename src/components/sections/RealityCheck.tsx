'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { StatCounter } from '@/components/ui/StatCounter';

const aiCan = [
  'Generate drafts fast',
  'Search and synthesize information',
  'Execute repetitive tasks',
  'Explore possibilities you wouldn\'t have time to try',
];

const aiCant = [
  'Make difficult decisions',
  'Know your context without you providing it',
  'Compensate for lack of planning',
  'Own outcomes',
];

export function RealityCheck() {
  return (
    <Section id="reality-check" className="py-24 px-8">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-4 text-[var(--text-primary)]"
        >
          The Reality Check
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg text-[var(--text-muted)] mb-12 max-w-2xl"
        >
          AI will not take your job. It will replace parts of it — the repetitive, the tedious,
          the &quot;I could do this but it takes 3 hours&quot; parts.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* AI Can */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[var(--bg-panel)] border border-[var(--accent-success)]/30 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold text-[var(--accent-success)] mb-6 flex items-center gap-2">
              <span>✓</span> AI can
            </h3>
            <ul className="space-y-4">
              {aiCan.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 text-[var(--text-primary)]"
                >
                  <span className="text-[var(--accent-success)] shrink-0">✓</span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* AI Can't */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[var(--bg-panel)] border border-[var(--accent-warn)]/30 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold text-[var(--accent-warn)] mb-6 flex items-center gap-2">
              <span>✗</span> AI can&apos;t
            </h3>
            <ul className="space-y-4">
              {aiCant.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 text-[var(--text-primary)]"
                >
                  <span className="text-[var(--accent-warn)] shrink-0">✗</span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative p-8 bg-[var(--bg-card)] border-l-4 border-[var(--accent-finn)] rounded-r-xl"
        >
          <div className="text-2xl md:text-3xl font-medium text-[var(--text-primary)] mb-4">
            &quot;If you work them and if you learn them, you&apos;ll be, no exaggeration,{' '}
            <span className="text-[var(--accent-glow)] glow-cyan">
              <StatCounter end={20} suffix="x" glow />
            </span>{' '}
            as productive.&quot;
          </div>
          <footer className="text-[var(--text-muted)] font-mono text-sm">
            — Peter Steinberger, <a href="https://steipete.me" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-finn)] hover:underline">steipete.me</a>
          </footer>
        </motion.blockquote>

        {/* Caveat */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 p-4 bg-[var(--accent-warn)]/10 border border-[var(--accent-warn)]/30 rounded-lg"
        >
          <div className="flex items-start gap-3">
            <span className="text-[var(--accent-warn)]">⚠</span>
            <div className="text-sm text-[var(--text-muted)]">
              <strong className="text-[var(--accent-warn)]">Caveat:</strong> This 20x applies to execution speed.
              Thinking and deciding still take human time. AI accelerates the typing.
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
