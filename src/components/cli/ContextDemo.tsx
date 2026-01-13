'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const demoText = `Context is everything for AI.

When you start a conversation, the context is empty.
As you add messages, files, and code...
...the context window fills up.

At around 30% capacity, quality starts to degrade.
The AI begins to "forget" earlier parts of the conversation.

That's why starting fresh often helps.`;

export function ContextDemo() {
  const [progress, setProgress] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const startDemo = () => {
    setProgress(0);
    setDisplayedText('');
    setIsRunning(true);
  };

  useEffect(() => {
    if (!isRunning) return;

    let charIndex = 0;
    const interval = setInterval(() => {
      if (charIndex <= demoText.length) {
        setDisplayedText(demoText.slice(0, charIndex));
        setProgress((charIndex / demoText.length) * 50);
        charIndex++;
      } else {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [isRunning]);

  const contextPercent = Math.round(progress);
  const isWarning = contextPercent >= 30;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      <div className="text-xs font-mono text-[var(--text-dim)]">
        # demo: watch context fill
      </div>

      <div className="bg-[var(--bg-primary)] border border-[var(--border)] p-3 h-36 overflow-hidden">
        <pre className="font-mono text-xs text-[var(--text-dim)] whitespace-pre-wrap">
          {displayedText}
          {isRunning && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="text-[var(--text-muted)]"
            >
              █
            </motion.span>
          )}
        </pre>
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-[var(--text-dim)]">context:</span>
          <span className="flex items-center gap-2">
            <span className="inline-flex items-center gap-0.5">
              {Array.from({ length: 20 }).map((_, i) => (
                <span
                  key={i}
                  className={`w-1 h-2 ${
                    i < Math.ceil(progress / 5)
                      ? isWarning
                        ? 'bg-[var(--accent-warn)]'
                        : 'bg-[var(--text-muted)]'
                      : 'bg-[var(--border)]'
                  }`}
                />
              ))}
            </span>
            <span className={isWarning ? 'text-[var(--accent-warn)]' : 'text-[var(--text-muted)]'}>
              {contextPercent}%
            </span>
          </span>
        </div>

        {isWarning && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="text-xs text-[var(--accent-warn)] font-mono"
          >
            ! quality degrades around 30%
          </motion.div>
        )}
      </div>

      <button
        onClick={startDemo}
        disabled={isRunning}
        className="w-full py-2 px-3 bg-transparent border border-[var(--border)] text-[var(--text-muted)] font-mono text-sm
                   hover:border-[var(--text-dim)] hover:text-[var(--text-primary)] transition-colors
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isRunning ? '[running...]' : progress > 0 ? '[run again]' : '[start demo]'}
      </button>
    </motion.div>
  );
}
