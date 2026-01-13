'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { thinkingVerbs } from '@/lib/prompts';

interface ThinkingSpinnerProps {
  isActive: boolean;
}

const spinnerChars = ['◐', '◓', '◑', '◒'];

export function ThinkingSpinner({ isActive }: ThinkingSpinnerProps) {
  const [verbIndex, setVerbIndex] = useState(0);
  const [spinnerIndex, setSpinnerIndex] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const verbInterval = setInterval(() => {
      setVerbIndex(prev => (prev + 1) % thinkingVerbs.length);
    }, 2000);

    const spinnerInterval = setInterval(() => {
      setSpinnerIndex(prev => (prev + 1) % spinnerChars.length);
    }, 150);

    return () => {
      clearInterval(verbInterval);
      clearInterval(spinnerInterval);
    };
  }, [isActive]);

  return (
    <AnimatePresence mode="popLayout">
      {isActive && (
        <motion.div
          layout
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-2 text-[var(--text-muted)] font-mono text-sm overflow-hidden"
        >
          <span className="text-lg">{spinnerChars[spinnerIndex]}</span>
          <span>{thinkingVerbs[verbIndex]}...</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
