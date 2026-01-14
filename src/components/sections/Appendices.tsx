'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '@/components/ui/Section';

const appendices = [
  {
    id: 'peter',
    title: "A: Peter Steinberger's Workflow",
    content: [
      {
        subtitle: '"I don\'t read code anymore"',
        text: 'He watches AI generate code in real-time, only reviewing key sections. The AI reads more files before deciding than a human would manually review.',
      },
      {
        subtitle: 'Parallel Instances',
        text: 'Runs 3-8 AI instances simultaneously, often on the same repository. Different tasks, same codebase.',
      },
      {
        subtitle: 'CLAUDE.md as Living Instructions',
        text: 'Maintains a file that evolves with the project — preferences, patterns, mistakes to avoid. Updated constantly.',
      },
      {
        subtitle: '"Just Talk To It"',
        text: '"Don\'t waste your time on stuff like RAG, subagents, Agents 2.0 or other things that are mostly just charade. Just talk to it. Play with it. Develop intuition."',
      },
    ],
    sources: [
      { name: 'My Current AI Dev Workflow', url: 'https://steipete.me/posts/2025/optimal-ai-development-workflow' },
      { name: 'Just Talk To It', url: 'https://steipete.me/posts/just-talk-to-it' },
      { name: 'Shipping at Inference-Speed', url: 'https://steipete.me/posts/2025/shipping-at-inference-speed' },
    ],
  },
  {
    id: 'agent-native',
    title: 'B: Agent-Native Architecture',
    content: [
      {
        subtitle: 'Five Principles',
        text: '',
        list: [
          'Parity — Whatever users can do, agents should achieve through tools',
          'Granularity — Tools should be atomic primitives; features are outcomes from loops',
          'Composability — New features through new prompts, not new code',
          'Emergent Capability — Agents accomplish things you didn\'t explicitly design',
          'Improvement Over Time — Applications get better through context accumulation',
        ],
      },
      {
        subtitle: 'The Test',
        text: '"Describe an outcome to the agent that\'s within your application\'s domain but that you didn\'t build a specific feature for. Can it figure out how to accomplish it?" If yes: agent-native. If no: still too constrained.',
      },
    ],
    sources: [
      { name: 'Agent-Native Architecture', url: 'https://every.to/guides/agent-native' },
    ],
  },
  {
    id: 'spec-driven',
    title: 'C: For Engineers — Spec-Driven Development',
    content: [
      {
        subtitle: 'The Core Idea',
        text: 'You define what to build and why. AI handles how. Instead of writing code, you write specs, review output, and give feedback.',
      },
      {
        subtitle: 'The Structure',
        text: '',
        list: [
          'CLAUDE.md files — repo-wide and feature-specific instructions',
          'Design specs — what you\'re building, constraints, decisions',
          'Decision records — why you chose X over Y',
          'Cookbooks — runnable examples that prove the implementation works',
        ],
      },
      {
        subtitle: 'The Workflow',
        text: 'Small, reviewable PRs (under 10 minutes review time). If the cookbook doesn\'t run, the implementation isn\'t done. You orchestrate; AI executes.',
      },
      {
        subtitle: 'The Result',
        text: 'Complex features that used to take months now take days. The key: clear specs, not clever prompts.',
      },
    ],
    sources: [
      { name: 'Spec-Driven Development with Claude Code — Ashpreet Bedi', url: 'https://x.com/ashpreetbedi/status/2011220028453241218' },
    ],
  },
  {
    id: 'sources',
    title: 'D: All Sources',
    content: [],
    sources: [
      { name: 'Claude Code Guide — Eyad Khrais', url: 'https://x.com/eyad_khrais/status/2010076957938188661' },
      { name: 'Agent-Native Architecture — Dan Shipper / Every', url: 'https://every.to/guides/agent-native' },
      { name: 'My Current AI Dev Workflow — Peter Steinberger', url: 'https://steipete.me/posts/2025/optimal-ai-development-workflow' },
      { name: 'Just Talk To It — Peter Steinberger', url: 'https://steipete.me/posts/just-talk-to-it' },
      { name: 'Shipping at Inference-Speed — Peter Steinberger', url: 'https://steipete.me/posts/2025/shipping-at-inference-speed' },
      { name: 'Spec-Driven Development with Claude Code — Ashpreet Bedi', url: 'https://x.com/ashpreetbedi/status/2011220028453241218' },
    ],
  },
];

export function Appendices() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <Section id="appendices" className="py-24 px-8">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-4 text-[var(--text-primary)]"
        >
          Appendices
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg text-[var(--text-muted)] mb-12"
        >
          Deep dives for those who want more.
        </motion.p>

        <div className="space-y-4">
          {appendices.map((appendix, index) => (
            <motion.div
              key={appendix.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border border-[var(--border)] rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenId(openId === appendix.id ? null : appendix.id)}
                className="w-full p-5 flex items-center justify-between text-left
                           bg-[var(--bg-panel)] hover:bg-[var(--bg-card)] transition-colors"
              >
                <span className="font-semibold text-[var(--text-primary)]">{appendix.title}</span>
                <motion.span
                  animate={{ rotate: openId === appendix.id ? 180 : 0 }}
                  className="text-[var(--text-muted)]"
                >
                  ↓
                </motion.span>
              </button>

              <AnimatePresence>
                {openId === appendix.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 bg-[var(--bg-primary)] space-y-6">
                      {appendix.content.map((item, i) => (
                        <div key={i}>
                          {item.subtitle && (
                            <h4 className="font-semibold text-[var(--accent-glow)] mb-2">
                              {item.subtitle}
                            </h4>
                          )}
                          {item.text && (
                            <p className="text-[var(--text-muted)]">{item.text}</p>
                          )}
                          {item.list && (
                            <ul className="space-y-2 mt-2">
                              {item.list.map((li, j) => (
                                <li key={j} className="text-[var(--text-muted)] flex gap-2">
                                  <span className="text-[var(--accent-finn)]">{j + 1}.</span>
                                  {li}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}

                      {appendix.sources.length > 0 && (
                        <div className="pt-4 border-t border-[var(--border)]">
                          <div className="text-xs font-mono text-[var(--text-muted)] mb-2">Sources:</div>
                          <div className="space-y-1">
                            {appendix.sources.map((source, i) => (
                              <a
                                key={i}
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-sm text-[var(--accent-finn)] hover:underline"
                              >
                                {source.name} ↗
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
