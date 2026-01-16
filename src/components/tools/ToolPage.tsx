'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { InstallBlock } from './InstallBlock';
import { PromptCard } from './PromptCard';

interface Prompt {
  text: string;
  difficulty: 'Easy' | 'Stretch';
}

interface ToolPageProps {
  name: string;
  tagline: string;
  howItWorks: string[];
  installCommands: string;
  installTitle?: string;
  prompts: Prompt[];
}

export function ToolPage({
  name,
  tagline,
  howItWorks,
  installCommands,
  installTitle = 'Install',
  prompts,
}: ToolPageProps) {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[var(--bg-primary)]/80 backdrop-blur-sm border-b border-[var(--border)]">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/tools"
            className="text-sm font-mono text-[var(--text-muted)] hover:text-[var(--accent-finn)] transition-colors flex items-center gap-2"
          >
            <span>←</span>
            <span>Tools</span>
          </Link>
          <span className="text-xs font-mono text-[var(--text-dim)]">Quick Start Guide</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
            {name}
          </h1>
          <p className="text-xl text-[var(--text-muted)]">
            {tagline}
          </p>
        </motion.div>

        {/* Install Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <InstallBlock commands={installCommands} title={installTitle} />
        </motion.section>

        {/* How it works */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-sm font-mono text-[var(--text-dim)] uppercase tracking-wider mb-4">
            How it works
          </h2>
          <ul className="space-y-3">
            {howItWorks.map((point, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-[var(--accent-finn)] mt-0.5">•</span>
                <span className="text-[var(--text-primary)]">{point}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* First Prompts */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-sm font-mono text-[var(--text-dim)] uppercase tracking-wider mb-4">
            First Prompts
          </h2>
          <p className="text-sm text-[var(--text-muted)] mb-6">
            Click any prompt to copy it. Start with Easy, graduate to Stretch.
          </p>
          <div className="grid gap-3">
            {prompts.map((prompt, i) => (
              <PromptCard
                key={i}
                prompt={prompt.text}
                difficulty={prompt.difficulty}
                index={i}
              />
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 bg-[var(--accent-finn)]/10 border border-[var(--accent-finn)]/30 rounded-xl text-center"
        >
          <p className="text-[var(--text-primary)] font-semibold mb-2">
            No excuse not to try it.
          </p>
          <p className="text-sm text-[var(--text-muted)]">
            Open it up, paste your first prompt, see what happens.
          </p>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] mt-12">
        <div className="max-w-3xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm font-mono text-[var(--text-muted)] hover:text-[var(--accent-finn)] transition-colors"
          >
            ← Back to memo
          </Link>
          <span className="text-xs font-mono text-[var(--text-dim)]">
            FINN AI Tools
          </span>
        </div>
      </footer>
    </div>
  );
}
