'use client';

import { motion } from 'framer-motion';

interface StreamingTextProps {
  text: string;
  isComplete?: boolean;
  className?: string;
}

export function StreamingText({ text, isComplete = false, className = '' }: StreamingTextProps) {
  return (
    <div className={`font-mono text-xs leading-relaxed ${className}`}>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-[var(--text-muted)]"
      >
        {text}
      </motion.span>
      {!isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="text-[var(--text-dim)] ml-0.5"
        >
          █
        </motion.span>
      )}
    </div>
  );
}
