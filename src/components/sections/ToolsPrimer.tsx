'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '@/components/ui/Section';

const asciiIcons = {
  brain: `[◉]`,
  context: `[▣]`,
  tools: `[⚙]`,
  bulb: `[!]`,
  chat: `[◯]`,
  work: `[▶]`,
  code: `[<>]`,
};

const concepts = [
  {
    concept: 'LLM',
    meaning: 'Large Language Model — the AI "brain" that reads and generates text',
    simple: 'Think: a very fast reader and writer',
    icon: asciiIcons.brain,
  },
  {
    concept: 'Context',
    meaning: 'What the AI can "see" — your documents, code, instructions',
    simple: 'More context = smarter responses',
    icon: asciiIcons.context,
  },
  {
    concept: 'Tools',
    meaning: 'Actions AI can take: search files, run code, browse the web, send emails',
    simple: 'Skills, plugins, integrations — all just "tools"',
    icon: asciiIcons.tools,
  },
];

const toolCategories = [
  {
    category: 'Chat Interfaces for LLMs',
    icon: asciiIcons.chat,
    description: 'Chat UIs for questions, writing, brainstorming, and quick analysis.',
    tools: [
      { name: 'ChatGPT', note: 'Most popular, good all-rounder' },
      { name: 'Claude', note: 'Best for long documents and nuanced writing' },
      { name: 'Gemini', note: 'Google integration, real-time web access', hasPage: true, slug: 'gemini' },
      { name: 'Perplexity', note: 'Search-first, cites sources' },
    ],
    canDo: ['Answer questions', 'Write and edit text', 'Analyze documents', 'Brainstorm ideas'],
    cantDo: ['Take actions on your behalf', 'Access your local files', 'Remember past conversations long-term'],
  },
  {
    category: 'Apps integrating AI with work',
    icon: asciiIcons.work,
    description: 'AI connected to workflows: can take action across multiple tools and apps.',
    tools: [
      { name: 'Manus', note: 'Research agent, can browse and synthesize' },
      { name: 'Claude Cowork', note: 'Task-focused agent for work coordination' },
      { name: 'Relevance.ai', note: 'Workflow automation and AI pipelines for teams' },
      { name: 'Claude Work', note: 'Coming soon — Claude with computer use' },
    ],
    canDo: [
      'Connect multiple tools in one workflow',
      'Trigger actions across apps (docs, email, CRM)',
      'Handle multi-step tasks with handoffs/approvals',
      'Keep work moving in the background',
    ],
    cantDo: [
      'Act without permission or access',
      'Know your business rules unless you define them',
      'Work across tools that are not connected',
    ],
  },
  {
    category: 'Coding Agents',
    icon: asciiIcons.code,
    description: 'AI agents for software development. Also useful for non-coding work.',
    tools: [
      { name: 'Cursor', note: 'AI-native IDE, great for existing projects', hasPage: true, slug: 'cursor' },
      { name: 'Claude Code', note: 'Terminal agent, maximum autonomy', hasPage: true, slug: 'claude-code' },
      { name: 'Codex', note: 'OpenAI\'s agent, slow and thorough' },
      { name: 'Antigravity', note: 'Free, team-friendly, multiple models', hasPage: true, slug: 'antigravity' },
    ],
    canDo: ['Write and edit code', 'Read your entire codebase', 'Run commands', 'Create files and projects'],
    cantDo: ['Replace human judgment', 'Know your context without you providing it'],
    bonus: 'Pro tip: These tools work great for non-code tasks too — writing docs, analyzing data, automating workflows.',
  },
];

export function ToolsPrimer() {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  return (
    <Section id="tools-primer" className="py-24 px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-4 text-[var(--text-primary)]"
        >
          A map for AI tools
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg text-[var(--text-muted)] mb-12"
        >
          Quick vocabulary, then what to try.
        </motion.p>

        {/* Core Concepts - Simplified */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-6">Three Things to Know</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {concepts.map((item, index) => (
              <motion.div
                key={item.concept}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-5 bg-[var(--bg-panel)] border border-[var(--border)] rounded-xl"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[var(--accent-finn)] text-lg font-mono">{item.icon}</span>
                  <span className="font-semibold text-[var(--text-primary)]">{item.concept}</span>
                </div>
                <p className="text-sm text-[var(--text-muted)] mb-2">{item.meaning}</p>
                <p className="text-xs text-[var(--accent-finn)] italic">{item.simple}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tool Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-6">What Should I Try? (January 2026)</h3>
          <div className="space-y-6">
            {toolCategories.map((cat, catIndex) => (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIndex * 0.1 }}
                className="bg-[var(--bg-panel)] border border-[var(--border)] rounded-xl overflow-hidden"
              >
                {/* Category Header */}
                <button
                  onClick={() => setActiveCategory(activeCategory === catIndex ? null : catIndex)}
                  className="w-full p-5 flex items-start gap-4 text-left hover:bg-[var(--bg-card)] transition-colors"
                >
                  <span className="text-[var(--accent-finn)] text-xl font-mono shrink-0">{cat.icon}</span>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-1">{cat.category}</h4>
                    <p className="text-sm text-[var(--text-muted)]">{cat.description}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {cat.tools.map((tool) => (
                        tool.hasPage ? (
                          <Link
                            key={tool.name}
                            href={`/tools/${tool.slug}`}
                            onClick={(e) => e.stopPropagation()}
                            className="px-3 py-1 text-sm bg-[var(--bg-primary)] border border-[var(--border)] rounded-full
                                       text-[var(--text-primary)] hover:border-[var(--accent-finn)] hover:text-[var(--accent-finn)]
                                       transition-colors"
                          >
                            {tool.name} →
                          </Link>
                        ) : (
                          <span
                            key={tool.name}
                            className="px-3 py-1 text-sm bg-[var(--bg-primary)] border border-[var(--border)] rounded-full text-[var(--text-muted)]"
                          >
                            {tool.name}
                          </span>
                        )
                      ))}
                    </div>
                  </div>
                  <span className={`text-[var(--text-dim)] transition-transform ${activeCategory === catIndex ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>

                {/* Expanded Details */}
                <AnimatePresence>
                  {activeCategory === catIndex && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-2 border-t border-[var(--border)]">
                        <div className="grid md:grid-cols-2 gap-6">
                          {/* Tools List */}
                          <div>
                            <h5 className="text-sm font-semibold text-[var(--text-muted)] mb-3 uppercase tracking-wide">Tools</h5>
                            <div className="space-y-2">
                              {cat.tools.map((tool) => (
                                <div key={tool.name} className="flex items-start gap-2">
                                  <span className="text-[var(--accent-success)] shrink-0">•</span>
                                  <div>
                                    <span className="font-medium text-[var(--text-primary)]">{tool.name}</span>
                                    <span className="text-[var(--text-muted)] text-sm ml-2">— {tool.note}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Can/Can't */}
                          <div className="space-y-4">
                            <div>
                              <h5 className="text-sm font-semibold text-[var(--accent-success)] mb-2">Can do</h5>
                              <ul className="space-y-1 text-sm text-[var(--text-muted)]">
                                {cat.canDo.map((item) => (
                                  <li key={item}>✓ {item}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h5 className="text-sm font-semibold text-[var(--accent-warn)] mb-2">Can&apos;t do</h5>
                              <ul className="space-y-1 text-sm text-[var(--text-muted)]">
                                {cat.cantDo.map((item) => (
                                  <li key={item}>✗ {item}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>

                        {cat.bonus && (
                          <div className="mt-4 p-3 bg-[var(--accent-finn)]/10 border border-[var(--accent-finn)]/30 rounded-lg">
                            <p className="text-sm text-[var(--text-primary)]">{cat.bonus}</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recommendation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="p-6 bg-[var(--accent-finn)]/10 border border-[var(--accent-finn)]/30 rounded-xl"
        >
          <div className="flex items-start gap-3">
            <span className="text-[var(--accent-finn)] text-lg font-mono shrink-0">{asciiIcons.bulb}</span>
            <div>
              <div className="font-semibold text-[var(--text-primary)] mb-1">Where to start?</div>
              <div className="text-[var(--text-muted)]">
                You probably already use ChatGPT or Claude. Good. Next step: try a coding agent like Cursor
                (we have licenses) — even if you don&apos;t code. They&apos;re powerful for any complex task.
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Start Link */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--bg-card)] border border-[var(--border)]
                       rounded-lg text-[var(--text-primary)] font-semibold
                       hover:border-[var(--accent-finn)] hover:text-[var(--accent-finn)] transition-all"
          >
            <span>Quick Start Guides</span>
            <span>→</span>
          </Link>
          <p className="mt-3 text-sm text-[var(--text-muted)]">
            Step-by-step setup for each tool
          </p>
        </motion.div>
      </div>
    </Section>
  );
}
