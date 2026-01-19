'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function PresentationModeToggle() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2 }}
      className="fixed bottom-6 left-6 z-50"
    >
      <Link
        href="/en/pres"
        className="flex items-center gap-2 px-4 py-2
                   bg-[var(--bg-panel)]/80 backdrop-blur-sm border border-[var(--border)]
                   rounded-lg hover:border-[var(--accent-finn)] hover:bg-[var(--bg-card)]
                   transition-all group"
        title="Open presentation mode"
      >
        <svg
          className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent-finn)] transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5"
          />
        </svg>
        <span className="text-xs font-mono text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors">
          Presentation
        </span>
      </Link>
    </motion.div>
  );
}
