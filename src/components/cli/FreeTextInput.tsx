'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

// Witty acknowledgments that can't be fooled
const ACKNOWLEDGMENTS = [
  "Got it. Let's work with that.",
  "Noted. Moving on.",
  "Interesting choice. Saved.",
  "Logged. No take-backs.",
  "Understood. Next.",
  "Captured. Onward.",
];

function getAcknowledgment(): string {
  return ACKNOWLEDGMENTS[Math.floor(Math.random() * ACKNOWLEDGMENTS.length)];
}

interface FreeTextInputProps {
  placeholder?: string;
  onSubmit: (value: string) => void;
  disabled?: boolean;
}

export function FreeTextInput({ placeholder = 'Type your answer...', onSubmit, disabled }: FreeTextInputProps) {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedValue, setSubmittedValue] = useState('');
  const [acknowledgment, setAcknowledgment] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus on mount
  useEffect(() => {
    if (!submitted) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled || submitted) return;

    // Validate: must have actual content (not just punctuation/spaces)
    const hasContent = /[a-zA-Z0-9]/.test(trimmed);
    if (!hasContent || trimmed.length < 3) {
      // Don't accept gibberish
      return;
    }

    setSubmittedValue(trimmed);
    setAcknowledgment(getAcknowledgment());
    setSubmitted(true);
    onSubmit(trimmed);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      handleSubmit();
    }
  };

  // After submission, show acknowledgment
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-2"
      >
        <div className="text-[var(--accent-finn)] bg-[var(--bg-card)] px-3 py-2 rounded text-sm">
          {submittedValue}
        </div>
        <div className="text-[var(--text-muted)] text-sm italic">
          {acknowledgment}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div
        className="flex items-center gap-2 cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        <span className="text-[var(--text-dim)]">›</span>
        <div className="flex-1 relative font-mono text-sm">
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={disabled}
            className="w-full bg-transparent border-none p-0 text-[var(--text-primary)]
                     focus:outline-none focus:ring-0 caret-transparent
                     disabled:opacity-50 font-mono"
            autoComplete="off"
            spellCheck={false}
          />
          {/* Placeholder */}
          {!value && !isFocused && (
            <span className="absolute left-0 top-0 text-[var(--text-dim)] pointer-events-none">
              {placeholder}
            </span>
          )}
          {/* Blinking cursor */}
          {isFocused && (
            <span
              className="terminal-cursor absolute"
              style={{ left: `${value.length * 0.6}em` }}
            />
          )}
        </div>
      </div>

      <div className="flex gap-2 text-xs font-mono text-[var(--text-dim)]">
        <span>[enter]</span>
        <span>submit</span>
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={!value.trim() || disabled}
        className="w-full py-2 px-3 bg-transparent border border-[var(--border)] text-[var(--text-muted)] font-mono text-sm
                   hover:border-[var(--text-dim)] hover:text-[var(--text-primary)] transition-colors
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {value.trim() ? '[submit]' : '[type to continue]'}
      </button>
    </motion.div>
  );
}
