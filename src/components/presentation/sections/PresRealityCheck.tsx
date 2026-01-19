'use client';

import { motion } from 'framer-motion';
import { PresentationSection } from '../PresentationSection';
import { StatCounter } from '@/components/ui/StatCounter';
import { PresentationContent } from '@/lib/presentation-content';

interface PresRealityCheckProps {
  content: PresentationContent;
}

export function PresRealityCheck({ content }: PresRealityCheckProps) {
  const { realityCheck } = content;

  return (
    <PresentationSection id="reality-check" className="py-24 px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-4 text-[var(--text-primary)]"
        >
          {realityCheck.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl text-[var(--text-muted)] mb-16 max-w-3xl"
        >
          {realityCheck.intro}
        </motion.p>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* AI Can */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[var(--bg-panel)] border border-[var(--accent-success)]/30 rounded-xl p-8"
          >
            <h3 className="text-2xl font-semibold text-[var(--accent-success)] mb-8 flex items-center gap-3">
              <span>✓</span> {realityCheck.canTitle}
            </h3>
            <ul className="space-y-5">
              {realityCheck.aiCan.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 text-lg text-[var(--text-primary)]"
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
            className="bg-[var(--bg-panel)] border border-[var(--accent-warn)]/30 rounded-xl p-8"
          >
            <h3 className="text-2xl font-semibold text-[var(--accent-warn)] mb-8 flex items-center gap-3">
              <span>✗</span> {realityCheck.cantTitle}
            </h3>
            <ul className="space-y-5">
              {realityCheck.aiCant.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 text-lg text-[var(--text-primary)]"
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
            &quot;{realityCheck.quote.split('20x')[0]}
            <span className="text-[var(--accent-glow)] glow-cyan">
              <StatCounter end={20} suffix="x" glow />
            </span>
            {realityCheck.quote.split('20x')[1]}&quot;
          </div>
          <footer className="text-[var(--text-muted)] font-mono text-sm">
            — {realityCheck.quoteAuthor},{' '}
            <a href={`https://${realityCheck.quoteSource}`} target="_blank" rel="noopener noreferrer" className="text-[var(--accent-finn)] hover:underline">
              {realityCheck.quoteSource}
            </a>
          </footer>
        </motion.blockquote>
      </div>
    </PresentationSection>
  );
}
