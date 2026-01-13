'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypewriterTextProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  onComplete?: () => void;
  showCursor?: boolean;
}

export function TypewriterText({
  text,
  delay = 0,
  speed = 30,
  className = '',
  onComplete,
  showCursor = true,
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setHasStarted(true);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!hasStarted) return;

    let charIndex = 0;
    const interval = setInterval(() => {
      if (charIndex <= text.length) {
        setDisplayedText(text.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(interval);
        setIsComplete(true);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [hasStarted, text, speed, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && !isComplete && hasStarted && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="text-[var(--accent-glow)]"
        >
          ▊
        </motion.span>
      )}
    </span>
  );
}
