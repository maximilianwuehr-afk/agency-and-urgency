'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '@/components/ui/Section';

// Simple bracketed symbols - clean and instantly recognizable
const asciiIcons = {
  curiosity: `[?]`,
  agency: `[►]`,
  stop: `[■]`,
  imperfect: `[~]`,
};

const factors = [
  {
    title: 'Curiosity',
    icon: asciiIcons.curiosity,
    description: 'Dive into areas outside your expertise. AI will help you. A PM can prototype code. A designer can query databases.',
    highlight: 'The barrier to entry has collapsed.',
    meme: {
      url: 'https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif',
      alt: 'Mind blown meme',
      caption: 'Wait, I can actually do this?',
    },
  },
  {
    title: 'Agency',
    icon: asciiIcons.agency,
    description: "You are in the driver's seat. AI proposes; you decide. Don't accept outputs blindly.",
    highlight: 'You can literally just do things.',
    meme: {
      url: 'https://media.giphy.com/media/3o7TKF1fSIs1R19B8k/giphy.gif',
      alt: 'Just Do It meme',
      caption: "Just do it!",
    },
  },
  {
    title: 'Knowing When to Stop',
    icon: asciiIcons.stop,
    description: 'AI is a slot machine for productivity. The hardest skill: recognizing when to start fresh with a clearer prompt.',
    highlight: 'Sometimes delete everything.',
    meme: {
      url: 'https://media.giphy.com/media/l0HlvtIPzPdt2usKs/giphy.gif',
      alt: 'Walking away meme',
      caption: 'Delete. Start fresh.',
    },
  },
  {
    title: 'Accepting Imperfection',
    icon: asciiIcons.imperfect,
    description: "You won't get 100%. That's fine. The goal isn't perfection; it's progress.",
    highlight: 'Be specific. Start small. Improve over time.',
    meme: {
      url: 'https://media.giphy.com/media/QMHoU66sBXqqLqYvGO/giphy.gif',
      alt: 'This is fine meme',
      caption: "80% is fine. Ship it.",
    },
  },
];

export function SuccessFactors() {
  const [activeMeme, setActiveMeme] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close meme on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (activeMeme !== null && containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActiveMeme(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeMeme]);

  return (
    <Section id="success-factors" className="py-24 px-8">
      <div ref={containerRef} className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-4 text-[var(--text-primary)]"
        >
          Success Factors in the AI Age
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg text-[var(--text-muted)] mb-12"
        >
          What separates those who thrive from those who struggle.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-6">
          {factors.map((factor, index) => (
            <motion.div
              key={factor.title}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, borderColor: 'var(--accent-finn)' }}
              onHoverStart={() => setActiveMeme(index)}
              onHoverEnd={() => setActiveMeme(null)}
              onClick={() => setActiveMeme(activeMeme === index ? null : index)}
              className="relative p-6 bg-[var(--bg-panel)] border border-[var(--border)] rounded-xl
                         transition-colors cursor-pointer select-none"
            >
              <div className="flex items-start gap-4">
                <span className="text-[var(--accent-finn)] text-2xl font-mono shrink-0 select-none">{factor.icon}</span>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                    {factor.title}
                  </h3>
                  <p className="text-[var(--text-muted)] mb-3">
                    {factor.description}
                  </p>
                  <p className="text-[var(--accent-finn)] font-medium text-sm">
                    {factor.highlight}
                  </p>
                </div>
              </div>

              {/* Meme popup */}
              <AnimatePresence>
                {activeMeme === index && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 10 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                    className="absolute z-50 left-1/2 -translate-x-1/2 bottom-full mb-3
                               bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg
                               shadow-2xl overflow-hidden"
                    style={{ width: 'min(280px, 80vw)' }}
                  >
                    <img
                      src={factor.meme.url}
                      alt={factor.meme.alt}
                      className="w-full h-auto"
                      loading="lazy"
                    />
                    <div className="p-2 text-center text-sm font-mono text-[var(--text-muted)]">
                      {factor.meme.caption}
                    </div>
                    {/* Arrow pointing down */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4
                                    bg-[var(--bg-primary)] border-r border-b border-[var(--border)]
                                    transform rotate-45" />
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
