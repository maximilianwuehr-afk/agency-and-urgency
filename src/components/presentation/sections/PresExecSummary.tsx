'use client';

import { motion } from 'framer-motion';
import { PresentationSection } from '../PresentationSection';
import { StatCounter } from '@/components/ui/StatCounter';
import { PresentationContent } from '@/lib/presentation-content';

interface PresExecSummaryProps {
  content: PresentationContent;
}

export function PresExecSummary({ content }: PresExecSummaryProps) {
  const { execSummary } = content;

  return (
    <PresentationSection id="exec-summary" className="py-24 px-8">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-16 text-[var(--text-primary)]"
        >
          {execSummary.title}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {execSummary.points.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="p-6 bg-[var(--bg-panel)] border border-[var(--border)] rounded-xl"
            >
              <div className="text-[var(--accent-finn)] font-mono text-sm mb-3">
                {String(index + 1).padStart(2, '0')}
              </div>
              <div className="text-xl font-semibold text-[var(--accent-glow)] mb-2">
                {point.highlight}
              </div>
              <div className="text-[var(--text-muted)]">
                {point.text}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="p-8 bg-[var(--bg-panel)] border border-[var(--border)] rounded-xl"
        >
          <div className="text-center">
            <div className="text-7xl md:text-9xl font-bold mb-4">
              <span className="text-[var(--accent-glow)] glow-cyan">
                <StatCounter end={80} suffix="%" glow />
              </span>
            </div>
            <div className="text-[var(--text-muted)] font-mono text-lg">
              {execSummary.statLabel}
            </div>
          </div>
        </motion.div>
      </div>
    </PresentationSection>
  );
}
