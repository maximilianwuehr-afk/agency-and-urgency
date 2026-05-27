'use client';

import { useRef, useEffect, useCallback } from 'react';
import { PresentationContent } from '@/lib/presentation-content';
import { LanguageToggle } from './LanguageToggle';
import {
  PresHero,
  PresSpeakerBackground,
  PresSessionInsight,
  PresWhyIBuiltThis,
  PresExecSummary,
  PresRealityCheck,
  PresSuccessFactors,
  PresToolsPrimer,
  PresExamples,
  PresWhatThisMeans,
  PresHowToStart,
  PresClosing,
} from './sections';

const SECTIONS = [
  'hero',
  'speaker-background',
  'why-i-built-this',
  'exec-summary',
  'reality-check',
  'quality-governance',
  'success-factors',
  'tools-primer',
  'examples',
  'what-this-means',
  'career-shift',
  'customer-contact',
  'practical-guide',
  'closing',
];

interface PresentationPageProps {
  content: PresentationContent;
}

export function PresentationPage({ content }: PresentationPageProps) {
  const mainRef = useRef<HTMLElement>(null);

  const scrollToSection = useCallback((direction: 'next' | 'prev') => {
    const main = mainRef.current;
    if (!main) return;

    const currentScroll = main.scrollTop;
    const sectionHeight = main.clientHeight;
    const currentIndex = Math.round(currentScroll / sectionHeight);

    const targetIndex = direction === 'next'
      ? Math.min(currentIndex + 1, SECTIONS.length - 1)
      : Math.max(currentIndex - 1, 0);

    const targetSection = document.getElementById(SECTIONS[targetIndex]);
    targetSection?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Global keyboard listener for snap navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLElement &&
        e.target.closest('input, textarea, button, a, select, [role="dialog"]')
      ) {
        return;
      }

      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        scrollToSection('next');
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        scrollToSection('prev');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [scrollToSection]);

  return (
    <div className="h-screen overflow-hidden">
      <LanguageToggle currentLang={content.lang} />

      <main
        ref={mainRef}
        className="h-screen overflow-y-scroll snap-y snap-mandatory"
      >
        <PresHero content={content} />
        <PresSpeakerBackground content={content} />
        <PresWhyIBuiltThis content={content} />
        <PresExecSummary content={content} />
        <PresRealityCheck content={content} />
        <PresSessionInsight insight={content.sessionInsights.governance} />
        <PresSuccessFactors content={content} />
        <PresToolsPrimer content={content} />
        <PresExamples content={content} />
        <PresWhatThisMeans content={content} />
        <PresSessionInsight insight={content.sessionInsights.careers} />
        <PresSessionInsight insight={content.sessionInsights.customerContact} />
        <PresHowToStart content={content} />
        <PresClosing content={content} />
      </main>
    </div>
  );
}
