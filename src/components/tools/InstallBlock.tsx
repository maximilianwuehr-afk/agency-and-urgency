'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface InstallBlockProps {
  commands: string;
  title?: string;
}

export function InstallBlock({ commands, title = 'Install' }: InstallBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    // Extract just the command lines (filter out comments)
    const commandLines = commands
      .split('\n')
      .filter(line => line.trim() && !line.trim().startsWith('#'))
      .join('\n');

    await navigator.clipboard.writeText(commandLines);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative group"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-mono text-[var(--text-dim)] uppercase tracking-wider">
          {title}
        </span>
        <button
          onClick={handleCopy}
          className="text-xs font-mono text-[var(--text-muted)] hover:text-[var(--accent-finn)]
                     transition-colors flex items-center gap-1.5"
        >
          {copied ? (
            <>
              <span className="text-[var(--accent-success)]">✓</span>
              <span className="text-[var(--accent-success)]">Copied</span>
            </>
          ) : (
            <>
              <span>⎘</span>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg overflow-hidden">
        <div className="flex items-center gap-1.5 px-3 py-2 bg-[var(--bg-panel)] border-b border-[var(--border)]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          <span className="ml-2 text-xs text-[var(--text-dim)] font-mono">terminal</span>
        </div>
        <pre className="p-4 overflow-x-auto">
          <code className="text-sm font-mono">
            {commands.split('\n').map((line, i) => (
              <div key={i} className="leading-relaxed">
                {line.trim().startsWith('#') ? (
                  <span className="text-[var(--text-dim)]">{line}</span>
                ) : line.trim() ? (
                  <>
                    <span className="text-[var(--accent-success)] select-none">$ </span>
                    <span className="text-[var(--text-primary)]">{line}</span>
                  </>
                ) : (
                  <span>&nbsp;</span>
                )}
              </div>
            ))}
          </code>
        </pre>
      </div>
    </motion.div>
  );
}
