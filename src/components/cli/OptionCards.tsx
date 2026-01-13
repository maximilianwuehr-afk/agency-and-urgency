'use client';

import { motion } from 'framer-motion';

export interface Option {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'stretch';
}

interface OptionCardsProps {
  options: Option[];
  onSelect: (option: Option) => void;
  disabled?: boolean;
}

const difficultyColors = {
  easy: 'var(--accent-success)',
  medium: 'var(--accent-finn)',
  stretch: 'var(--accent-warn)',
};

const difficultyLabels = {
  easy: 'easy',
  medium: 'medium',
  stretch: 'stretch',
};

export function OptionCards({ options, onSelect, disabled }: OptionCardsProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-2"
    >
      {options.map((option, index) => (
        <motion.button
          key={option.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => onSelect(option)}
          disabled={disabled}
          className="w-full text-left p-3 bg-transparent border border-[var(--border)]
                     hover:border-[var(--text-dim)] hover:bg-[var(--bg-card)]/50
                     transition-all group disabled:opacity-50 disabled:cursor-not-allowed font-mono"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="text-sm text-[var(--text-primary)] group-hover:text-[var(--text-primary)]">
                {index + 1}. {option.title}
              </div>
              <div className="text-xs text-[var(--text-dim)] mt-1 line-clamp-2">
                {option.description}
              </div>
            </div>
            <div
              className="text-xs font-mono shrink-0"
              style={{ color: difficultyColors[option.difficulty] }}
            >
              [{difficultyLabels[option.difficulty]}]
            </div>
          </div>
        </motion.button>
      ))}
    </motion.div>
  );
}
