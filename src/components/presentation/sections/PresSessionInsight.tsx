'use client';

import { motion } from 'framer-motion';
import { PresentationSection } from '../PresentationSection';
import { SessionInsightContent } from '@/lib/presentation-content';

interface PresSessionInsightProps {
  insight: SessionInsightContent;
}

export function PresSessionInsight({ insight }: PresSessionInsightProps) {
  return (
    <PresentationSection id={insight.id} className="py-20 px-8 justify-center">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-sm font-mono text-[var(--accent-finn)] mb-4">
            {insight.label}
          </p>
          <h2
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            style={{ color: insight.accent }}
          >
            {insight.title}
          </h2>
          <p className="text-xl md:text-2xl text-[var(--text-muted)] max-w-4xl leading-relaxed">
            {insight.subtitle}
          </p>
        </motion.div>

        <div className={`grid md:grid-cols-3 gap-6 ${insight.takeaway ? 'mb-10' : ''}`}>
          {insight.points.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.45 }}
              className="bg-[var(--bg-panel)] border border-[var(--border)] rounded-xl p-7"
            >
              <div className="text-[var(--accent-finn)] font-mono text-sm mb-4">
                {String(index + 1).padStart(2, '0')}
              </div>
              <h3 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">
                {point.title}
              </h3>
              <p className="text-lg text-[var(--text-muted)] leading-relaxed">
                {point.text}
              </p>
            </motion.div>
          ))}
        </div>

        {insight.takeaway && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="border-l-4 bg-[var(--bg-card)] px-7 py-6 rounded-r-xl"
            style={{ borderColor: insight.accent }}
          >
            <p className="text-xl md:text-2xl text-[var(--text-primary)] leading-relaxed">
              {insight.takeaway}
            </p>
          </motion.div>
        )}
      </div>
    </PresentationSection>
  );
}
