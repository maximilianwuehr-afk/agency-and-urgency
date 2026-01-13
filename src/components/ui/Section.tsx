'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useSession } from '@/context/SessionContext';

interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  fullHeight?: boolean;
}

export function Section({ id, children, className = '', fullHeight = false }: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const { setCurrentSection } = useSession();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Use IntersectionObserver with rootMargin to detect when section crosses center
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(id);
          }
        });
      },
      {
        // Trigger when element is in the middle 40% of viewport
        rootMargin: '-30% 0px -30% 0px',
        threshold: 0,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [id, setCurrentSection]);

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`${fullHeight ? 'min-h-screen' : ''} ${className}`}
    >
      {children}
    </motion.section>
  );
}
