'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useSession } from '@/context/SessionContext';

interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({ id, children, className = '' }: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const { setCurrentSection, addVisitedSection } = useSession();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(id);
            addVisitedSection(id);
          }
        });
      },
      {
        // Trigger when section is mostly visible
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [id, setCurrentSection, addVisitedSection]);

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.4 }}
      className={`min-h-screen w-full py-16 md:py-24 px-6 md:px-12 ${className}`}
    >
      {children}
    </motion.section>
  );
}
