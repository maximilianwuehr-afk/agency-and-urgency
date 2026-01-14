'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '@/components/ui/Section';

// Simple, bold ASCII icons
const asciiIcons = {
  brain: `[◉]`,
  scope: `[▣]`,
  harness: `[⊞]`,
  tools: `[⚙]`,
  bulb: `[!]`,
};

const concepts = [
  {
    concept: 'LLM',
    meaning: 'Large Language Model — the AI "brain" that reads and generates text',
    analogy: 'A very fast reader and writer',
    image: {
      url: 'https://cdn-icons-png.flaticon.com/512/3413/3413536.png',
      ascii: asciiIcons.brain,
      caption: 'The ammunition',
    },
  },
  {
    concept: 'Context window',
    meaning: 'How much the AI can "see" at once (~250K tokens or ~1M characters)',
    analogy: 'The size of your screen — bigger = more documents open',
    image: {
      url: 'https://cdn-icons-png.flaticon.com/512/565/565547.png',
      ascii: asciiIcons.scope,
      caption: 'The scope',
    },
  },
  {
    concept: 'Harness',
    meaning: 'Software that wraps the LLM and lets it take actions',
    analogy: 'The car around the engine',
    image: {
      url: 'https://cdn-icons-png.flaticon.com/512/2830/2830305.png',
      ascii: asciiIcons.harness,
      caption: 'The holster',
    },
  },
  {
    concept: 'Tools',
    meaning: 'Actions the AI can perform (read files, search, run code, browse)',
    analogy: "The intern's toolkit",
    image: {
      url: 'https://cdn-icons-png.flaticon.com/512/1320/1320931.png',
      ascii: asciiIcons.tools,
      caption: 'The weapons',
    },
  },
];

const harnesses = [
  {
    name: 'Cursor',
    bestFor: 'Large "legacy" projects',
    strengths: 'Integrated editor, large repositories',
    forWhom: 'If you want to read code or switch between models',
    screenshot: 'https://cursor.com/og-image.png',
  },
  {
    name: 'Claude Code',
    bestFor: 'Complex reasoning',
    strengths: 'Cutting-edge, smartest reasoning, most "agency"',
    forWhom: 'End-to-end problems, lots of tool use',
    screenshot: 'https://www.anthropic.com/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2F3ca5e9c29fcf27f72aa6f8f3e594c52f7e0d5b9a-2880x1620.png&w=3840&q=75',
  },
  {
    name: 'OpenAI Codex',
    bestFor: 'End-to-end automation',
    strengths: 'Repository navigation, coordinated changes',
    forWhom: 'Slow and accurate, "a surgeon\'s knife"',
    screenshot: 'https://images.openai.com/blob/a10684c4-825a-429c-91dd-e06ebca91b7b/codex-research-preview.jpg?trim=0%2C0%2C0%2C0&width=2000',
  },
  {
    name: 'Gemini CLI',
    bestFor: 'Google ecosystem integration',
    strengths: 'Fast execution, 1M token context window',
    forWhom: 'GCP projects, multimodal tasks',
    screenshot: 'https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Gemini_SS.width-1300.format-webp.webp',
  },
  {
    name: 'Antigravity',
    bestFor: 'Team collaboration',
    strengths: 'Background agents, prompt sharing, team workflows',
    forWhom: 'Teams wanting shared AI workflows',
    screenshot: 'https://images.antigravity.dev/og-image.png',
  },
];

export function ToolsPrimer() {
  const [activeConceptIndex, setActiveConceptIndex] = useState<number | null>(null);
  const [activeHarnessIndex, setActiveHarnessIndex] = useState<number | null>(null);

  return (
    <Section id="tools-primer" className="py-24 px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-4 text-[var(--text-primary)]"
        >
          Tools Primer
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg text-[var(--text-muted)] mb-12"
        >
          The vocabulary you need to navigate AI tools.
        </motion.p>

        {/* Core Concepts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 relative"
        >
          <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-6">Core Concepts</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left py-3 px-4 text-[var(--text-muted)] font-mono text-sm">Concept</th>
                  <th className="text-left py-3 px-4 text-[var(--text-muted)] font-mono text-sm">What it means</th>
                  <th className="text-left py-3 px-4 text-[var(--text-muted)] font-mono text-sm">Analogy</th>
                </tr>
              </thead>
              <tbody>
                {concepts.map((item, index) => (
                  <motion.tr
                    key={item.concept}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    onHoverStart={() => setActiveConceptIndex(index)}
                    onHoverEnd={() => setActiveConceptIndex(null)}
                    onClick={() => setActiveConceptIndex(activeConceptIndex === index ? null : index)}
                    className="border-b border-[var(--border)]/50 hover:bg-[var(--bg-panel)] cursor-pointer relative"
                  >
                    <td className="py-4 px-4 font-semibold text-[var(--accent-finn)]">
                      <span className="inline-block mr-3 text-base font-mono">{item.image.ascii}</span>
                      {item.concept}
                    </td>
                    <td className="py-4 px-4 text-[var(--text-primary)]">{item.meaning}</td>
                    <td className="py-4 px-4 text-[var(--text-muted)] italic">{item.analogy}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Concept image popup */}
          <AnimatePresence>
            {activeConceptIndex !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: -20 }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                className="absolute z-50 right-0 top-1/2 -translate-y-1/2 translate-x-[calc(100%+1rem)]
                           bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg
                           shadow-2xl overflow-hidden p-4 flex flex-col items-center"
                style={{ width: '160px' }}
              >
                <span className="text-[var(--accent-finn)] text-3xl font-mono mb-2">{concepts[activeConceptIndex].image.ascii}</span>
                <div className="text-sm font-mono text-[var(--text-muted)] text-center">
                  {concepts[activeConceptIndex].image.caption}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Harness Comparison - Table Format */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 relative"
        >
          <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-6">Harness Comparison (January 2026)</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left py-3 px-4 text-[var(--text-muted)] font-mono text-sm">Harness</th>
                  <th className="text-left py-3 px-4 text-[var(--text-muted)] font-mono text-sm">Best for</th>
                  <th className="text-left py-3 px-4 text-[var(--text-muted)] font-mono text-sm">Strengths</th>
                  <th className="text-left py-3 px-4 text-[var(--text-muted)] font-mono text-sm">For whom</th>
                </tr>
              </thead>
              <tbody>
                {harnesses.map((harness, index) => (
                  <motion.tr
                    key={harness.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    onHoverStart={() => setActiveHarnessIndex(index)}
                    onHoverEnd={() => setActiveHarnessIndex(null)}
                    onClick={() => setActiveHarnessIndex(activeHarnessIndex === index ? null : index)}
                    className="border-b border-[var(--border)]/50 hover:bg-[var(--bg-panel)] cursor-pointer"
                  >
                    <td className="py-4 px-4 font-semibold text-[var(--accent-finn)]">{harness.name}</td>
                    <td className="py-4 px-4 text-[var(--text-primary)]">{harness.bestFor}</td>
                    <td className="py-4 px-4 text-[var(--text-primary)]">{harness.strengths}</td>
                    <td className="py-4 px-4 text-[var(--text-muted)]">{harness.forWhom}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Harness screenshot popup */}
          <AnimatePresence>
            {activeHarnessIndex !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: -20 }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                className="absolute z-50 right-0 top-1/2 -translate-y-1/2 translate-x-[calc(100%+1rem)]
                           bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg
                           shadow-2xl overflow-hidden"
                style={{ width: '320px' }}
              >
                <img
                  src={harnesses[activeHarnessIndex].screenshot}
                  alt={`${harnesses[activeHarnessIndex].name} screenshot`}
                  className="w-full h-auto"
                  loading="lazy"
                />
                <div className="p-2 text-center text-sm font-mono text-[var(--text-muted)] bg-[var(--bg-panel)]">
                  {harnesses[activeHarnessIndex].name}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
              <div className="font-semibold text-[var(--text-primary)] mb-1">Recommendation</div>
              <div className="text-[var(--text-muted)]">
                Start with what&apos;s available (we have Cursor licenses). All harnesses are viable;
                pick based on your workflow and vibes. Most power users combine multiple tools.
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
