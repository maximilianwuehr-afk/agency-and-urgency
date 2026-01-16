'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

type Difficulty = 'Easy' | 'Stretch';

interface PromptCardProps {
  prompt: string;
  difficulty: Difficulty;
  index: number;
}

const difficultyStyles: Record<Difficulty, { bg: string; text: string; border: string }> = {
  Easy: {
    bg: 'bg-[var(--accent-success)]/10',
    text: 'text-[var(--accent-success)]',
    border: 'border-[var(--accent-success)]/30',
  },
  Stretch: {
    bg: 'bg-[var(--accent-warn)]/10',
    text: 'text-[var(--accent-warn)]',
    border: 'border-[var(--accent-warn)]/30',
  },
};

export function PromptCard({ prompt, difficulty, index }: PromptCardProps) {
  const [copied, setCopied] = useState(false);
  const styles = difficultyStyles[difficulty];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={handleCopy}
      className={`group cursor-pointer p-4 rounded-lg border transition-all
                  bg-[var(--bg-card)] border-[var(--border)]
                  hover:border-[var(--accent-finn)]/50 hover:bg-[var(--bg-panel)]`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-mono text-[var(--text-dim)]">#{index + 1}</span>
            <span className={`px-2 py-0.5 text-xs font-mono rounded ${styles.bg} ${styles.text} ${styles.border} border`}>
              {difficulty}
            </span>
          </div>
          <p className="text-[var(--text-primary)] font-mono text-sm leading-relaxed">
            &ldquo;{prompt}&rdquo;
          </p>
        </div>
        <button
          className={`shrink-0 text-xs font-mono transition-colors
                      ${copied ? 'text-[var(--accent-success)]' : 'text-[var(--text-dim)] group-hover:text-[var(--accent-finn)]'}`}
        >
          {copied ? '✓' : '⎘'}
        </button>
      </div>
    </motion.div>
  );
}
