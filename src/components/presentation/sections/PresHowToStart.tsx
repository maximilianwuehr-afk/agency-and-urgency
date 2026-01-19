'use client';

import { motion } from 'framer-motion';
import { PresentationSection } from '../PresentationSection';
import { PresentationContent } from '@/lib/presentation-content';

interface PresHowToStartProps {
  content: PresentationContent;
}

export function PresHowToStart({ content }: PresHowToStartProps) {
  const { howToStart } = content;

  return (
    <PresentationSection id="practical-guide" className="py-32 px-8">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-6 text-[var(--text-primary)]"
        >
          {howToStart.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl text-[var(--text-muted)] mb-16"
        >
          {howToStart.subtitle}
        </motion.p>

        <div className="space-y-12">
          {howToStart.steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-8"
            >
              <div className="shrink-0">
                <div className="w-14 h-14 rounded-full bg-[var(--accent-finn)] flex items-center justify-center text-white font-bold text-xl">
                  {step.number}
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-[var(--text-primary)] mb-3">
                  {step.title}
                </h3>
                <p className="text-lg text-[var(--text-muted)] mb-5">{step.description}</p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-[var(--accent-warn)]/10 border border-[var(--accent-warn)]/30 rounded-lg">
                    <div className="text-xs font-mono text-[var(--accent-warn)] mb-2">❌ Don&apos;t</div>
                    <div className="text-[var(--text-muted)] font-mono">{step.bad}</div>
                  </div>
                  <div className="p-4 bg-[var(--accent-success)]/10 border border-[var(--accent-success)]/30 rounded-lg">
                    <div className="text-xs font-mono text-[var(--accent-success)] mb-2">✓ Do</div>
                    <div className="text-[var(--text-muted)] font-mono">{step.good}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PresentationSection>
  );
}
