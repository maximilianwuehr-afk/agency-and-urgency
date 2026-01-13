'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface GeneratedPromptProps {
  prompt: string;
}

export function GeneratedPrompt({ prompt }: GeneratedPromptProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      <div className="text-xs font-mono text-[var(--accent-success)]">
        $ generated prompt:
      </div>

      <div className="relative">
        <div className="bg-[var(--bg-primary)] border border-[var(--border)] p-3 font-mono text-xs">
          <pre className="whitespace-pre-wrap text-[var(--text-muted)] leading-relaxed">
            {prompt}
          </pre>
        </div>

        <div className="absolute top-2 right-2">
          <button
            onClick={handleCopy}
            className="p-1.5 text-[var(--text-dim)] hover:text-[var(--text-muted)]
                       bg-[var(--bg-card)] border border-[var(--border)]
                       hover:border-[var(--text-dim)] transition-colors font-mono text-xs"
          >
            {copied ? '[ok]' : '[cp]'}
          </button>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleCopy}
          className="flex-1 py-2 px-3 bg-transparent border border-[var(--border)] text-[var(--text-muted)] font-mono text-sm
                     hover:border-[var(--text-dim)] hover:text-[var(--text-primary)] transition-colors"
        >
          {copied ? '[copied]' : '[copy]'}
        </button>

        <a
          href="https://claude.ai/new"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2 px-3 bg-transparent border border-[var(--border)] text-[var(--text-muted)]
                     font-mono text-sm hover:border-[var(--text-dim)] hover:text-[var(--text-primary)]
                     transition-colors text-center"
        >
          [open claude.ai]
        </a>
      </div>
    </motion.div>
  );
}
