'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const tools = [
  {
    slug: 'antigravity',
    name: 'Antigravity',
    tagline: "Google's free agentic IDE with Claude & Gemini models",
    icon: '◇',
    color: 'var(--accent-success)',
  },
  {
    slug: 'cursor',
    name: 'Cursor',
    tagline: 'AI-native IDE that understands your entire codebase',
    icon: '▣',
    color: 'var(--accent-finn)',
  },
  {
    slug: 'claude-code',
    name: 'Claude Code',
    tagline: "Anthropic's CLI agent that lives in your terminal",
    icon: '⌘',
    color: 'var(--accent-warn)',
  },
  {
    slug: 'gemini',
    name: 'Gemini',
    tagline: "Google's AI assistant with real-time web access",
    icon: '✦',
    color: '#a855f7',
  },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[var(--bg-primary)]/80 backdrop-blur-sm border-b border-[var(--border)]">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm font-mono text-[var(--text-muted)] hover:text-[var(--accent-finn)] transition-colors flex items-center gap-2"
          >
            <span>←</span>
            <span>Back to memo</span>
          </Link>
          <span className="text-xs font-mono text-[var(--text-dim)]">FINN AI Tools</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
            Quick Start Guides
          </h1>
          <p className="text-xl text-[var(--text-muted)] max-w-2xl mx-auto">
            Zero-friction getting started guides. Pick a tool, follow the steps, ship faster.
          </p>
        </motion.div>

        {/* Tool Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/tools/${tool.slug}`}>
                <div
                  className="group p-6 rounded-xl border transition-all cursor-pointer
                             bg-[var(--bg-card)] border-[var(--border)]
                             hover:border-[var(--accent-finn)]/50 hover:bg-[var(--bg-panel)]"
                >
                  <div className="flex items-start gap-4">
                    <span
                      className="text-3xl shrink-0"
                      style={{ color: tool.color }}
                    >
                      {tool.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-finn)] transition-colors">
                        {tool.name}
                      </h2>
                      <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                        {tool.tagline}
                      </p>
                    </div>
                    <span className="text-[var(--text-dim)] group-hover:text-[var(--accent-finn)] transition-colors shrink-0">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-[var(--text-muted)] mb-4">
            Not sure where to start?
          </p>
          <p className="text-[var(--text-primary)] font-semibold">
            Pick any tool. The best one is the one you actually use.
          </p>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] mt-12">
        <div className="max-w-4xl mx-auto px-6 py-6 text-center">
          <span className="text-xs font-mono text-[var(--text-dim)]">
            No excuse not to try it.
          </span>
        </div>
      </footer>
    </div>
  );
}
