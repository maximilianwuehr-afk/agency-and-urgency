'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';

const statements = [
  {
    title: 'AI usage is expected at FINN.',
    description: 'This is not a "nice to have." Not using AI is like not using email in 2005 — technically possible, but you\'re handicapping yourself.',
    accent: 'var(--accent-finn)',
  },
  {
    title: 'You can enter areas outside your competence.',
    description: 'A PM can prototype. A designer can analyze data. An ops manager can automate workflows. The barriers have fallen.',
    accent: 'var(--accent-success)',
  },
  {
    title: 'We want to ship faster for customers.',
    description: 'AI lets us do in hours what used to take weeks. Every improvement shipped faster is value delivered sooner.',
    accent: 'var(--text-primary)',
  },
  {
    title: 'Quality still matters.',
    description: 'Don\'t fully trust AI output. Verify before shipping. AI generates fast; you validate outcomes & test.',
    accent: 'var(--accent-warn)',
  },
];

// Typewriter headline component
function TypewriterHeadline({ text, accent, isVisible }: { text: string; accent: string; isVisible: boolean }) {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (!isVisible) {
      setDisplayText('');
      return;
    }

    let index = 0;
    const interval = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
        // Hide cursor after typing complete
        setTimeout(() => setShowCursor(false), 500);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [text, isVisible]);

  return (
    <h3
      className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6 font-mono"
      style={{ color: accent }}
    >
      {displayText}
      {showCursor && isVisible && (
        <span className="animate-pulse">_</span>
      )}
    </h3>
  );
}

export function WhatThisMeans() {
  const [visibleStatements, setVisibleStatements] = useState<Set<number>>(new Set());

  return (
    <Section id="what-this-means" className="py-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold mb-16 text-[var(--text-primary)] text-center px-8"
      >
        What This Means for You
      </motion.h2>

      <div className="space-y-0">
        {statements.map((statement, index) => (
          <motion.div
            key={statement.title}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            onViewportEnter={() => {
              setVisibleStatements(prev => new Set([...prev, index]));
            }}
            className="min-h-[50vh] flex items-center justify-center px-8"
            style={{
              background: index % 2 === 0 ? 'var(--bg-panel)' : 'var(--bg-primary)',
            }}
          >
            <div className="max-w-3xl text-center">
              <TypewriterHeadline
                text={statement.title}
                accent={statement.accent}
                isVisible={visibleStatements.has(index)}
              />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={visibleStatements.has(index) ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: statement.title.length * 0.04 + 0.3 }}
                className="text-lg md:text-xl text-[var(--text-muted)] max-w-2xl mx-auto"
              >
                {statement.description}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
