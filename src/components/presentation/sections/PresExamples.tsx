'use client';

import { motion } from 'framer-motion';
import { PresentationSection } from '../PresentationSection';
import { PresentationContent } from '@/lib/presentation-content';

interface PresExamplesProps {
  content: PresentationContent;
}

export function PresExamples({ content }: PresExamplesProps) {
  const { examples } = content;

  return (
    <PresentationSection id="examples" className="py-24 px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-4 text-[var(--text-primary)]"
        >
          {examples.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl text-[var(--text-muted)] mb-16"
        >
          {examples.subtitle}
        </motion.p>

        {/* External Examples */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-[var(--text-primary)] mb-8">{examples.externalTitle}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {examples.external.map((example, index) => (
              <motion.div
                key={example.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-[var(--bg-panel)] border border-[var(--border)] rounded-xl"
              >
                <div className="text-3xl font-bold text-[var(--accent-glow)] mb-3">{example.stat}</div>
                <div className="text-lg font-semibold text-[var(--text-primary)] mb-2">{example.name}</div>
                <p className="text-[var(--text-muted)] mb-3">{example.description}</p>
                <div className="text-sm text-[var(--text-dim)] font-mono">— {example.source}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Personal Examples */}
        <div>
          <h3 className="text-2xl font-semibold text-[var(--text-primary)] mb-8">{examples.personalTitle}</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {examples.personal.map((example, index) => (
              <motion.div
                key={example.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-[var(--bg-panel)] border border-[var(--border)] rounded-xl flex gap-4"
              >
                <div className="flex-1">
                  <div className="text-lg font-semibold text-[var(--text-primary)] mb-2">{example.name}</div>
                  <p className="text-[var(--text-muted)] mb-2">{example.description}</p>
                  <div className="text-sm text-[var(--accent-finn)] font-mono">by {example.by}</div>
                </div>
                {example.stat && (
                  <div className="text-3xl font-bold text-[var(--accent-glow)] shrink-0">
                    {example.stat}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PresentationSection>
  );
}
