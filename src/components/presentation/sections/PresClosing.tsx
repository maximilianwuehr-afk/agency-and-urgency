'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { AICli } from '@/components/cli/AICli';
import { useSession } from '@/context/SessionContext';
import { PresentationSection } from '../PresentationSection';
import { PresentationContent } from '@/lib/presentation-content';

interface PresClosingProps {
  content: PresentationContent;
}

export function PresClosing({ content }: PresClosingProps) {
  const { closing } = content;
  const { reset } = useSession();
  const [isCliOpen, setIsCliOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isCliOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isCliOpen]);

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

        {closing.cta && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <button
              type="button"
              onClick={() => {
                reset();
                setIsCliOpen(true);
              }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--accent-finn)] text-white
                         font-semibold text-lg rounded-xl hover:brightness-110 transition-all
                         hover:scale-105 active:scale-100"
            >
              {closing.cta}
            </button>
          </motion.div>
        )}

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
        </motion.div>
      </div>

      {isCliOpen && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="AI Companion Terminal"
          data-presentation-cli-open="true"
          tabIndex={-1}
          onKeyDown={(event) => {
            event.stopPropagation();
            if (event.key === 'Escape') {
              setIsCliOpen(false);
            }
          }}
          className="fixed inset-0 z-[100] bg-[#0d0d0d] outline-none"
        >
          <button
            type="button"
            onClick={() => setIsCliOpen(false)}
            className="absolute right-5 top-5 z-[110] rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] px-3 py-2
                       font-mono text-xs text-[var(--text-muted)] hover:border-[var(--accent-finn)] hover:text-[var(--text-primary)]"
            aria-label="Close terminal"
          >
            ESC close
          </button>
          <AICli autoFocus enableKeyboardNavigation />
        </div>
      )}
    </PresentationSection>
  );
}
