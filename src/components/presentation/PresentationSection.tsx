'use client';

import { motion } from 'framer-motion';

interface PresentationSectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export function PresentationSection({ id, children, className = '' }: PresentationSectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4 }}
      className={`min-h-screen w-full snap-start snap-always overflow-y-auto flex flex-col ${className}`}
    >
      {children}
    </motion.section>
  );
}
