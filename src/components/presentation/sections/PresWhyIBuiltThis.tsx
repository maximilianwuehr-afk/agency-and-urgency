'use client';

import { motion } from 'framer-motion';
import { PresentationSection } from '../PresentationSection';
import { PresentationContent } from '@/lib/presentation-content';

interface PresWhyIBuiltThisProps {
  content: PresentationContent;
}

export function PresWhyIBuiltThis({ content }: PresWhyIBuiltThisProps) {
  const { whyIBuiltThis } = content;

  return (
    <PresentationSection id="why-i-built-this" className="py-24 px-8">
      <div className="max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm font-mono text-[var(--accent-finn)] mb-4"
        >
          {whyIBuiltThis.subtitle}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-12 text-[var(--text-primary)]"
        >
          {whyIBuiltThis.title}
        </motion.h2>

        <div className="space-y-8 mb-12">
          {whyIBuiltThis.reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="flex gap-6"
            >
              <div className="text-[var(--accent-finn)] font-mono text-2xl shrink-0 opacity-30">
                {String(index + 1).padStart(2, '0')}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[var(--accent-glow)] mb-2">
                  {reason.title}
                </h3>
                <p className="text-[var(--text-muted)] text-lg leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {whyIBuiltThis.closingLine && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-lg text-[var(--text-muted)] italic"
          >
            {whyIBuiltThis.closingLine}
          </motion.p>
        )}
      </div>
    </PresentationSection>
  );
}
