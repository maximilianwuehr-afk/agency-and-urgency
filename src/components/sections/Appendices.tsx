'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '@/components/ui/Section';

const appendices = [
  {
    id: 'peter',
    label: 'A',
    title: "Peter Steinberger's Workflow",
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
    label: 'B',
    title: 'Agent-Native Architecture',
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
    label: 'C',
    title: 'Spec-Driven Development',
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
      { name: 'Spec-Driven Development — Ashpreet Bedi', url: 'https://x.com/ashpreetbedi/status/2011220028453241218' },
    ],
  },
  {
    id: 'beginner-guides',
    label: 'D',
    title: 'Beginner Guides',
    content: [
      {
        subtitle: 'ChatGPT fundamentals — OpenAI Academy',
        text: 'Short, structured intro to ChatGPT basics with a copy-paste starter prompt. Good first 30 minutes.',
      },
      {
        subtitle: 'What is ChatGPT: FAQ — OpenAI Help Center',
        text: 'Plain-language overview: what it is, where to use it, and how to start your first chat.',
      },
      {
        subtitle: 'Getting started with Claude — Anthropic Help Center',
        text: 'Simple onramp with first-prompt tips; emphasizes conversational, plain-English requests.',
      },
      {
        subtitle: 'Google AI Essentials — Coursera',
        text: 'Beginner course focused on practical AI tool use and prompting; self-paced and non-technical.',
      },
      {
        subtitle: 'Putting AI to Work — Every',
        text: 'Curated collection of practical AI-use articles; good browsing for non-technical use cases.',
      },
    ],
    sources: [
      { name: 'ChatGPT fundamentals — OpenAI Academy', url: 'https://academy.openai.com/public/resources/chatgpt-basics' },
      { name: 'What is ChatGPT: FAQ — OpenAI Help Center', url: 'https://help.openai.com/en/articles/12677804-what-is-chatgpt-faq' },
      { name: 'Getting started with Claude — Anthropic Help Center', url: 'https://support.claude.com/en/articles/8114491-getting-started-with-claude' },
      { name: 'Google AI Essentials — Coursera', url: 'https://www.coursera.org/specializations/ai-essentials-google' },
      { name: 'Putting AI to Work — Every', url: 'https://every.to/c/ai-guides' },
    ],
  },
  {
    id: 'sources',
    label: 'E',
    title: 'All Sources',
    content: [],
    sources: [
      { name: 'ChatGPT fundamentals — OpenAI Academy', url: 'https://academy.openai.com/public/resources/chatgpt-basics' },
      { name: 'Claude Code Guide — Eyad Khrais', url: 'https://x.com/eyad_khrais/status/2010076957938188661' },
      { name: 'Getting started with Claude — Anthropic Help Center', url: 'https://support.claude.com/en/articles/8114491-getting-started-with-claude' },
      { name: 'Google AI Essentials — Coursera', url: 'https://www.coursera.org/specializations/ai-essentials-google' },
      { name: 'What is ChatGPT: FAQ — OpenAI Help Center', url: 'https://help.openai.com/en/articles/12677804-what-is-chatgpt-faq' },
      { name: 'Agent-Native Architecture — Dan Shipper / Every', url: 'https://every.to/guides/agent-native' },
      { name: 'My Current AI Dev Workflow — Peter Steinberger', url: 'https://steipete.me/posts/2025/optimal-ai-development-workflow' },
      { name: 'Just Talk To It — Peter Steinberger', url: 'https://steipete.me/posts/just-talk-to-it' },
      { name: 'Putting AI to Work — Every', url: 'https://every.to/c/ai-guides' },
      { name: 'Shipping at Inference-Speed — Peter Steinberger', url: 'https://steipete.me/posts/2025/shipping-at-inference-speed' },
      { name: 'Spec-Driven Development — Ashpreet Bedi', url: 'https://x.com/ashpreetbedi/status/2011220028453241218' },
    ],
  },
];

export function Appendices() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <Section id="appendices" className="min-h-screen flex flex-col justify-center py-16 md:py-24">
      <div className="w-full max-w-6xl mx-auto px-6 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-xs font-mono text-[var(--accent-finn)] tracking-widest">
              ./appendices
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] font-mono">
            Deep Dives
          </h2>
          <p className="text-sm text-[var(--text-dim)] mt-2 font-mono">
            For those who want more.
          </p>
        </motion.div>

        {/* Accordion List */}
        <div className="space-y-2">
          {appendices.map((appendix, index) => {
            const isOpen = openId === appendix.id;

            return (
              <motion.div
                key={appendix.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                {/* Accordion Header */}
                <button
                  onClick={() => setOpenId(isOpen ? null : appendix.id)}
                  className={`w-full group text-left transition-all duration-200
                             border border-[var(--border)] hover:border-[var(--text-dim)]
                             ${isOpen ? 'bg-[var(--bg-card)] border-[var(--text-dim)]' : 'bg-transparent'}`}
                >
                  <div className="flex items-center gap-4 px-4 py-3">
                    {/* Label */}
                    <span className={`font-mono text-xs w-5 transition-colors
                                    ${isOpen ? 'text-[var(--accent-finn)]' : 'text-[var(--text-dim)] group-hover:text-[var(--text-muted)]'}`}>
                      {appendix.label}:
                    </span>

                    {/* Title */}
                    <span className={`flex-1 font-mono text-sm transition-colors
                                    ${isOpen ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)] group-hover:text-[var(--text-primary)]'}`}>
                      {appendix.title}
                    </span>

                    {/* Indicator */}
                    <motion.span
                      animate={{ rotate: isOpen ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                      className={`font-mono text-xs transition-colors
                                ${isOpen ? 'text-[var(--accent-finn)]' : 'text-[var(--text-dim)]'}`}
                    >
                      →
                    </motion.span>
                  </div>
                </button>

                {/* Accordion Content */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <div className="border-x border-b border-[var(--text-dim)] bg-[var(--bg-panel)]">
                        <div className="px-4 py-5 space-y-5">
                          {/* Content Items */}
                          {appendix.content.map((item, i) => (
                            <div key={i} className="space-y-2">
                              {item.subtitle && (
                                <h4 className="text-sm font-semibold text-[var(--text-primary)]">
                                  {item.subtitle}
                                </h4>
                              )}
                              {item.text && (
                                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                                  {item.text}
                                </p>
                              )}
                              {item.list && (
                                <ul className="space-y-1.5 ml-1">
                                  {item.list.map((li, j) => (
                                    <li key={j} className="text-sm text-[var(--text-muted)] flex gap-2 leading-relaxed">
                                      <span className="text-[var(--accent-finn)] font-mono text-xs mt-0.5">{j + 1}.</span>
                                      <span>{li}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ))}

                          {/* Sources */}
                          {appendix.sources.length > 0 && (
                            <div className="pt-4 mt-4 border-t border-[var(--border)]">
                              <div className="text-xs font-mono text-[var(--text-dim)] mb-3 tracking-wide">
                                sources:
                              </div>
                              <div className="space-y-1.5">
                                {appendix.sources.map((source, i) => (
                                  <a
                                    key={i}
                                    href={source.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group/link flex items-center gap-2 text-sm text-[var(--text-muted)]
                                             hover:text-[var(--accent-finn)] transition-colors"
                                  >
                                    <span className="font-mono text-[var(--text-dim)] text-xs">→</span>
                                    <span className="group-hover/link:underline underline-offset-2">
                                      {source.name}
                                    </span>
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Footer hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center"
        >
          <span className="text-xs font-mono text-[var(--text-dim)]">
            click to expand
          </span>
        </motion.div>
      </div>
    </Section>
  );
}
