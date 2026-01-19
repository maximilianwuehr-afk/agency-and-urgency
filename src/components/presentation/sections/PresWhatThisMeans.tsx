'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PresentationSection } from '../PresentationSection';
import { PresentationContent } from '@/lib/presentation-content';

interface PresWhatThisMeansProps {
  content: PresentationContent;
}

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
        setTimeout(() => setShowCursor(false), 500);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [text, isVisible]);

  return (
    <h3
      className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 font-mono"
      style={{ color: accent }}
    >
      {displayText}
      {showCursor && isVisible && (
        <span className="animate-pulse">_</span>
      )}
    </h3>
  );
}

export function PresWhatThisMeans({ content }: PresWhatThisMeansProps) {
  const { whatThisMeans } = content;
  const [visibleStatements, setVisibleStatements] = useState<Set<number>>(new Set());

  return (
    <PresentationSection id="what-this-means" className="py-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-bold mb-16 text-[var(--text-primary)] text-center px-8"
      >
        {whatThisMeans.title}
      </motion.h2>

      <div className="space-y-0">
        {whatThisMeans.statements.map((statement, index) => (
          <motion.div
            key={statement.title}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            onViewportEnter={() => {
              setVisibleStatements(prev => new Set([...prev, index]));
            }}
            className="min-h-[60vh] flex items-center justify-center px-8"
            style={{
              background: index % 2 === 0 ? 'var(--bg-panel)' : 'var(--bg-primary)',
            }}
          >
            <div className="max-w-4xl text-center">
              <TypewriterHeadline
                text={statement.title}
                accent={statement.accent}
                isVisible={visibleStatements.has(index)}
              />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={visibleStatements.has(index) ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: statement.title.length * 0.04 + 0.3 }}
                className="text-xl md:text-2xl text-[var(--text-muted)] max-w-3xl mx-auto"
              >
                {statement.description}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>
    </PresentationSection>
  );
}
