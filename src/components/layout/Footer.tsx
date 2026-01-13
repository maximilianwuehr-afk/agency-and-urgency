'use client';

import { motion } from 'framer-motion';

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="py-16 px-8 border-t border-[var(--border)]"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="text-2xl font-bold text-[var(--accent-glow)] mb-2">
            Use it. It will only get better.
          </div>
          <div className="text-[var(--text-muted)]">
            Start with one idea this week.
          </div>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-sm text-[var(--text-muted)]">
          <div>
            Contact:{' '}
            <a
              href="mailto:maximilian.wuehr@finn.com"
              className="text-[var(--accent-finn)] hover:underline"
            >
              Max Wühr
            </a>
          </div>
          <div className="hidden md:block">·</div>
          <div className="font-mono">Last updated: January 2026</div>
          <div className="hidden md:block">·</div>
          <div className="font-mono text-xs">
            Built with AI, of course
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-[var(--text-muted)] hover:text-[var(--accent-glow)] transition-colors"
          >
            ↑ Back to top
          </button>
        </div>
      </div>
    </motion.footer>
  );
}
