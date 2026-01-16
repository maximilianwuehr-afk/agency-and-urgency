'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { tools } from '@/lib/prompts';

const ACKNOWLEDGMENTS = [
  "Toolkit noted.",
  "Got your stack.",
  "Tools logged.",
  "Arsenal recorded.",
  "Inventory saved.",
];

function getAcknowledgment(): string {
  return ACKNOWLEDGMENTS[Math.floor(Math.random() * ACKNOWLEDGMENTS.length)];
}

interface MultiSelectProps {
  onSubmit: (selected: string[]) => void;
  disabled?: boolean;
}

export function MultiSelect({ onSubmit, disabled }: MultiSelectProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [acknowledgment, setAcknowledgment] = useState('');

  const toggleTool = (toolId: string) => {
    if (submitted) return;
    setSelected(prev =>
      prev.includes(toolId) ? prev.filter(t => t !== toolId) : [...prev, toolId]
    );
  };

  const handleSubmit = useCallback(() => {
    if (disabled || submitted) return;
    setAcknowledgment(getAcknowledgment());
    setSubmitted(true);
    onSubmit(selected);
  }, [disabled, submitted, selected, onSubmit]);

  // Global Enter key listener for this component
  useEffect(() => {
    if (submitted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [submitted, handleSubmit]);

  const categories = {
    general: 'General AI',
    coding: 'Coding',
    building: 'App Building',
  };

  const groupedTools = tools.reduce(
    (acc, tool) => {
      if (!acc[tool.category]) acc[tool.category] = [];
      acc[tool.category].push(tool);
      return acc;
    },
    {} as Record<string, typeof tools>
  );

  // After submission, show acknowledgment
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-2"
      >
        <div className="text-[var(--accent-finn)] bg-[var(--bg-card)] px-3 py-2 rounded text-sm">
          {selected.length === 0 ? 'None selected' : selected.map(id => tools.find(t => t.id === id)?.name).join(', ')}
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
      className="space-y-3"
    >
      {Object.entries(groupedTools).map(([category, categoryTools]) => (
        <div key={category} className="space-y-1">
          <div className="text-xs font-mono text-[var(--text-dim)]">
            # {categories[category as keyof typeof categories]}
          </div>
          <div className="flex flex-wrap gap-1">
            {categoryTools.map(tool => {
              const isSelected = selected.includes(tool.id);
              return (
                <button
                  key={tool.id}
                  type="button"
                  onClick={() => toggleTool(tool.id)}
                  disabled={disabled}
                  className={`px-2 py-1 text-xs font-mono transition-all
                    ${
                      isSelected
                        ? 'bg-[var(--text-dim)] text-[var(--text-primary)]'
                        : 'bg-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                    }
                    disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  [{isSelected ? 'x' : ' '}] {tool.name}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={disabled}
        className="w-full py-2 px-3 bg-transparent border border-[var(--border)] text-[var(--text-muted)] font-mono text-sm
                   hover:border-[var(--text-dim)] hover:text-[var(--text-primary)] transition-colors
                   disabled:opacity-50 disabled:cursor-not-allowed mt-3"
      >
        {selected.length === 0 ? "[enter] none selected" : `[enter] ${selected.length} selected`}
      </button>
    </motion.div>
  );
}
