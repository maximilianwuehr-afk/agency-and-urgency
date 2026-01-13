'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { StatCounter } from '@/components/ui/StatCounter';

const points = [
  {
    highlight: 'The shift is here.',
    text: 'AI is at >80% human quality in any discipline.',
  },
  {
    highlight: 'This is not optional.',
    text: 'AI usage is expected at FINN. Agency and curiosity now matter more than expertise.',
  },
  {
    highlight: 'The reality check:',
    text: "AI won't do the hard parts — you still prioritize, decide, and own tradeoffs.",
  },
  {
    highlight: 'Start now.',
    text: 'Pick one idea this week. Be specific. Accept imperfection.',
  },
];

export function ExecSummary() {
  return (
    <Section id="exec-summary" className="py-24 px-8">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-12 text-[var(--text-primary)]"
        >
          Executive Summary
        </motion.h2>

        <div className="space-y-8">
          {points.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="flex gap-4"
            >
              <div className="text-[var(--accent-finn)] font-mono text-lg shrink-0">
                {String(index + 1).padStart(2, '0')}
              </div>
              <div>
                <span className="text-[var(--accent-glow)] font-semibold">
                  {point.highlight}
                </span>{' '}
                <span className="text-[var(--text-primary)]">{point.text}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 p-8 bg-[var(--bg-panel)] border border-[var(--border)] rounded-xl"
        >
          <div className="text-center">
            <div className="text-6xl md:text-8xl font-bold mb-4">
              <span className="text-[var(--accent-glow)] glow-cyan">
                <StatCounter end={80} suffix="%" glow />
              </span>
            </div>
            <div className="text-[var(--text-muted)] font-mono">
              human-level quality across disciplines
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
