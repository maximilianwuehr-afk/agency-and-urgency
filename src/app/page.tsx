'use client';

import { useRef, useEffect, useCallback } from 'react';
import { Hero } from '@/components/sections/Hero';
import { ExecSummary } from '@/components/sections/ExecSummary';
import { RealityCheck } from '@/components/sections/RealityCheck';
import { SuccessFactors } from '@/components/sections/SuccessFactors';
import { ToolsPrimer } from '@/components/sections/ToolsPrimer';
import { ContextGame } from '@/components/sections/ContextGame';
import { Examples } from '@/components/sections/Examples';
import { WhatThisMeans } from '@/components/sections/WhatThisMeans';
import { HowToStart } from '@/components/sections/HowToStart';
import { Appendices } from '@/components/sections/Appendices';
import { AICli } from '@/components/cli/AICli';

const SECTIONS = [
  'hero',
  'exec-summary',
  'reality-check',
  'success-factors',
  'tools-primer',
  'context-game',
  'examples',
  'what-this-means',
  'practical-guide',
  'appendices',
];

export default function Home() {
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
      // Don't intercept if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
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
      {/* Main Content - Snap scroll panes */}
      <main
        ref={mainRef}
        className="lg:mr-[30%] h-screen overflow-y-scroll snap-y snap-mandatory"
      >
        <Hero />
        <ExecSummary />
        <RealityCheck />
        <SuccessFactors />
        <ToolsPrimer />
        <ContextGame />
        <Examples />
        <WhatThisMeans />
        <HowToStart />
        <Appendices />
      </main>

      {/* AI CLI Panel - Fixed on right */}
      <aside className="hidden lg:block lg:w-[30%] lg:fixed lg:right-0 lg:top-0 lg:h-screen">
        <AICli />
      </aside>

      {/* Mobile CLI - Bottom drawer */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[var(--bg-panel)] border-t border-[var(--border)] z-50">
        <div className="p-4 text-center text-sm text-[var(--text-muted)]">
          <span className="font-mono">AI Companion</span>
          <span className="ml-2 text-xs">(Best on desktop)</span>
        </div>
      </div>
    </div>
  );
}
