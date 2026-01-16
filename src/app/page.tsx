'use client';

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

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Main Content - Scrollytelling */}
      <main className="lg:mr-[30%]">
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
