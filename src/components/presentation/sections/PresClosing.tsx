'use client';

import { motion } from 'framer-motion';
import { PresentationSection } from '../PresentationSection';
import { PresentationContent } from '@/lib/presentation-content';

interface PresClosingProps {
  content: PresentationContent;
}

export function PresClosing({ content }: PresClosingProps) {
  const { closing } = content;

  return (
    <PresentationSection id="closing" className="items-center justify-center px-8">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-8 text-[var(--text-primary)]"
        >
          {closing.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-xl md:text-2xl text-[var(--text-muted)] mb-12 leading-relaxed"
        >
          {closing.message}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <a
            href="https://chatgpt.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--accent-finn)] text-white
                       font-semibold text-lg rounded-xl hover:brightness-110 transition-all
                       hover:scale-105 active:scale-100"
          >
            {closing.cta}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="mt-16 pt-8 border-t border-[var(--border)]"
        >
          <p className="text-sm text-[var(--text-dim)] font-mono">
            Built with AI assistance by Maximilian Wühr
          </p>
          <p className="text-xs text-[var(--text-dim)] mt-2">
            Questions? <a href="mailto:maxiwuehr@gmail.com" className="text-[var(--accent-finn)] hover:underline">maxiwuehr@gmail.com</a>
          </p>
        </motion.div>
      </div>
    </PresentationSection>
  );
}
