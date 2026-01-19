'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PresentationSection } from '../PresentationSection';
import { PresentationContent } from '@/lib/presentation-content';

interface PresToolsPrimerProps {
  content: PresentationContent;
}

export function PresToolsPrimer({ content }: PresToolsPrimerProps) {
  const { toolsPrimer } = content;
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  return (
    <PresentationSection id="tools-primer" className="py-24 px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-4 text-[var(--text-primary)]"
        >
          {toolsPrimer.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl text-[var(--text-muted)] mb-16"
        >
          {toolsPrimer.subtitle}
        </motion.p>

        {/* Core Concepts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-semibold text-[var(--text-primary)] mb-8">
            {toolsPrimer.conceptsTitle}
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {toolsPrimer.concepts.map((item, index) => (
              <motion.div
                key={item.concept}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-[var(--bg-panel)] border border-[var(--border)] rounded-xl"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[var(--accent-finn)] text-2xl font-mono">{item.icon}</span>
                  <span className="text-xl font-semibold text-[var(--text-primary)]">{item.concept}</span>
                </div>
                <p className="text-[var(--text-muted)] mb-3">{item.meaning}</p>
                <p className="text-sm text-[var(--accent-finn)] italic">{item.simple}</p>
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
          <h3 className="text-2xl font-semibold text-[var(--text-primary)] mb-8">
            {toolsPrimer.toolsTitle}
          </h3>
          <div className="space-y-6">
            {toolsPrimer.categories.map((cat, catIndex) => (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIndex * 0.1 }}
                className="bg-[var(--bg-panel)] border border-[var(--border)] rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setActiveCategory(activeCategory === catIndex ? null : catIndex)}
                  className="w-full p-6 flex items-start gap-5 text-left hover:bg-[var(--bg-card)] transition-colors"
                >
                  <span className="text-[var(--accent-finn)] text-2xl font-mono shrink-0">{cat.icon}</span>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-[var(--text-primary)] mb-2">{cat.category}</h4>
                    <p className="text-[var(--text-muted)]">{cat.description}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {cat.tools.map((tool) => (
                        <span
                          key={tool.name}
                          className="px-3 py-1 text-sm bg-[var(--bg-primary)] border border-[var(--border)] rounded-full text-[var(--text-muted)]"
                        >
                          {tool.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className={`text-[var(--text-dim)] transition-transform ${activeCategory === catIndex ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>

                <AnimatePresence>
                  {activeCategory === catIndex && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-[var(--border)]">
                        <div className="grid md:grid-cols-2 gap-6">
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
          className="p-8 bg-[var(--accent-finn)]/10 border border-[var(--accent-finn)]/30 rounded-xl"
        >
          <div className="flex items-start gap-4">
            <span className="text-[var(--accent-finn)] text-2xl font-mono shrink-0">[!]</span>
            <div>
              <div className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                {toolsPrimer.recommendation.title}
              </div>
              <div className="text-lg text-[var(--text-muted)]">
                {toolsPrimer.recommendation.text}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </PresentationSection>
  );
}
