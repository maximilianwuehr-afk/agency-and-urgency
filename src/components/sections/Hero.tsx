'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { TypewriterText } from '@/components/ui/TypewriterText';

const finnAscii = `
███████╗██╗███╗   ██╗███╗   ██╗
██╔════╝██║████╗  ██║████╗  ██║
█████╗  ██║██╔██╗ ██║██╔██╗ ██║
██╔══╝  ██║██║╚██╗██║██║╚██╗██║
██║     ██║██║ ╚████║██║ ╚████║
╚═╝     ╚═╝╚═╝  ╚═══╝╚═╝  ╚═══╝
`;

export function Hero() {
  return (
    <Section id="hero" className="items-center justify-center px-8">
      <motion.pre
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-[var(--accent-finn)] text-xs md:text-sm font-mono leading-none mb-8 text-center"
      >
        {finnAscii}
      </motion.pre>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-6"
      >
        <span className="text-[var(--text-primary)]">AI with </span>
        <span className="text-[var(--accent-glow)] glow-cyan">agency</span>
        <span className="text-[var(--text-primary)]"> & </span>
        <span className="text-[var(--accent-finn)] glow-finn">urgency</span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="text-lg md:text-xl text-[var(--text-muted)] text-center font-mono"
      >
        <TypewriterText
          text="A memo for all FINN employees — January 2026"
          delay={1200}
          speed={40}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.5 }}
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
    </Section>
  );
}
