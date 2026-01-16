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
      className="space-y-4"
    >
      <div className="text-xs font-mono text-[var(--accent-success)] flex items-center gap-2">
        <span>Your personalized prompt:</span>
        <span className="text-[var(--text-dim)]">ready to copy</span>
      </div>

      <div className="relative group">
        {/* Code block header */}
        <div className="flex items-center justify-between bg-[var(--bg-card)] border border-[var(--border)] border-b-0 px-3 py-2 rounded-t">
          <span className="text-[10px] text-[var(--text-dim)] uppercase tracking-wider">prompt</span>
          <button
            onClick={handleCopy}
            className="text-xs text-[var(--text-dim)] hover:text-[var(--accent-finn)] transition-colors font-mono"
          >
            {copied ? '✓ copied' : 'copy'}
          </button>
        </div>

        {/* Code block content */}
        <div className="bg-[#0a0a0a] border border-[var(--border)] border-t-0 p-4 rounded-b overflow-x-auto">
          <pre className="whitespace-pre-wrap text-[var(--text-primary)] leading-relaxed text-xs font-mono">
            {prompt}
          </pre>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleCopy}
          className={`flex-1 py-2.5 px-4 font-mono text-sm transition-all duration-200 rounded
                     ${copied
                       ? 'bg-[var(--accent-success)]/20 border border-[var(--accent-success)] text-[var(--accent-success)]'
                       : 'bg-[var(--accent-finn)] text-black hover:bg-[var(--accent-finn)]/90'}`}
        >
          {copied ? '✓ Copied to clipboard' : 'Copy prompt'}
        </button>

        <a
          href="https://claude.ai/new"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 px-4 bg-transparent border border-[var(--border)] text-[var(--text-muted)]
                     font-mono text-sm hover:border-[var(--accent-finn)] hover:text-[var(--accent-finn)]
                     transition-colors text-center rounded"
        >
          Open Claude.ai →
        </a>
      </div>
    </motion.div>
  );
}
