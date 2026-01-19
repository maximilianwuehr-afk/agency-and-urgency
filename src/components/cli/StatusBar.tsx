'use client';

import { useSession } from '@/context/SessionContext';

const TOTAL_SECTIONS = 10;

export function StatusBar() {
  const { state } = useSession();

  // Calculate progress based on visited sections
  const progress = Math.round((state.visitedSections.length / TOTAL_SECTIONS) * 100);
  const filledBars = Math.ceil(state.visitedSections.length);

  return (
    <div className="px-4 py-2 text-xs font-mono text-[var(--text-dim)]">
      <div className="flex items-center justify-between">
        <span>
          tokens: <span className="text-[var(--text-muted)] tabular-nums">{state.tokensUsed.toLocaleString()}</span>
        </span>
        <span className="flex items-center gap-2">
          context:
          <span className="inline-flex items-center gap-0.5">
            {Array.from({ length: TOTAL_SECTIONS }).map((_, i) => (
              <span
                key={i}
                className={`w-1 h-3 transition-colors ${
                  i < filledBars
                    ? progress >= 70
                      ? 'bg-[var(--accent-warn)]'
                      : 'bg-[var(--text-muted)]'
                    : 'bg-[var(--border)]'
                }`}
              />
            ))}
          </span>
          <span className={`tabular-nums ${progress >= 70 ? 'text-[var(--accent-warn)]' : 'text-[var(--text-muted)]'}`}>
            {progress}%
          </span>
        </span>
      </div>
      {progress >= 70 && (
        <div className="mt-1 text-[var(--accent-warn)]">
          ! context filling — quality may degrade
        </div>
      )}
    </div>
  );
}
