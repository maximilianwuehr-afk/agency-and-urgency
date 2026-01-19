'use client';

import { motion } from 'framer-motion';
import { PresentationSection } from '../PresentationSection';
import { PresentationContent } from '@/lib/presentation-content';

interface PresHeroProps {
  content: PresentationContent;
}

export function PresHero({ content }: PresHeroProps) {
  return (
    <PresentationSection id="hero" className="items-center justify-center px-8">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-5xl md:text-7xl lg:text-8xl font-bold text-center mb-8"
      >
        <span className="text-[var(--text-primary)]">
          {content.lang === 'de' ? 'KI mit ' : 'AI with '}
        </span>
        <span className="text-[var(--accent-glow)] glow-cyan">
          {content.lang === 'de' ? 'Selbstbestimmtheit' : 'agency'}
        </span>
        <br />
        <span className="text-[var(--text-primary)]">& </span>
        <span className="text-[var(--accent-finn)] glow-finn">
          {content.lang === 'de' ? 'Dringlichkeit' : 'urgency'}
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="text-lg md:text-xl text-[var(--text-muted)] text-center font-mono"
      >
        {content.hero.subtitle}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="mt-16"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-[var(--text-muted)] text-2xl"
        >
          ↓
        </motion.div>
      </motion.div>
    </PresentationSection>
  );
}
