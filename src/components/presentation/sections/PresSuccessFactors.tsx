'use client';

import { motion } from 'framer-motion';
import { PresentationSection } from '../PresentationSection';
import { PresentationContent } from '@/lib/presentation-content';

interface PresSuccessFactorsProps {
  content: PresentationContent;
}

export function PresSuccessFactors({ content }: PresSuccessFactorsProps) {
  const { successFactors } = content;

  return (
    <PresentationSection id="success-factors" className="py-24 px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-4 text-[var(--text-primary)]"
        >
          {successFactors.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl text-[var(--text-muted)] mb-16"
        >
          {successFactors.subtitle}
        </motion.p>

        <div className="grid md:grid-cols-2 gap-6">
          {successFactors.factors.map((factor, index) => (
            <motion.div
              key={factor.title}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="p-8 bg-[var(--bg-panel)] border border-[var(--border)] rounded-xl
                         hover:border-[var(--accent-finn)] transition-colors"
            >
              <div className="flex items-start gap-5">
                <span className="text-[var(--accent-finn)] text-3xl font-mono shrink-0">
                  {factor.icon}
                </span>
                <div>
                  <h3 className="text-2xl font-semibold text-[var(--text-primary)] mb-3">
                    {factor.title}
                  </h3>
                  <p className="text-[var(--text-muted)] text-lg mb-4">
                    {factor.description}
                  </p>
                  <p className="text-[var(--accent-finn)] font-medium">
                    {factor.highlight}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PresentationSection>
  );
}
