'use client';

import { useState, useEffect } from 'react';
import { useSession } from '@/context/SessionContext';

export function StatusBar() {
  const { state } = useSession();
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
      setScrollPercent(percent);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="px-4 py-2 text-xs font-mono text-[var(--text-dim)]">
      <div className="flex items-center justify-between">
        <span>
          tokens: <span className="text-[var(--text-muted)] tabular-nums">{state.tokensUsed.toLocaleString()}</span>
        </span>
        <span className="flex items-center gap-2">
          context:
          <span className="inline-flex items-center gap-0.5">
            {Array.from({ length: 10 }).map((_, i) => (
              <span
                key={i}
                className={`w-1 h-3 transition-colors ${
                  i < Math.ceil(scrollPercent / 10)
                    ? scrollPercent >= 70
                      ? 'bg-[var(--accent-warn)]'
                      : 'bg-[var(--text-muted)]'
                    : 'bg-[var(--border)]'
                }`}
              />
            ))}
          </span>
          <span className={`tabular-nums ${scrollPercent >= 70 ? 'text-[var(--accent-warn)]' : 'text-[var(--text-muted)]'}`}>
            {scrollPercent}%
          </span>
        </span>
      </div>
      {scrollPercent >= 70 && (
        <div className="mt-1 text-[var(--accent-warn)]">
          ! context filling — quality may degrade
        </div>
      )}
    </div>
  );
}
