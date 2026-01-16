# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Dev server on localhost:3000
npm run build    # Production build
npm run lint     # ESLint
```

## Architecture

FINN AI memo microsite — scrollytelling with AI CLI companion panel (Claude Code-inspired aesthetic).

### Two-Panel Layout
- **Left (70%)** — Scrollytelling content sections
- **Right (30%)** — Fixed AI CLI panel synced to scroll position

### State Flow
1. User scrolls to section → CLI enters "thinking" state
2. Question appears for interactive sections
3. User answers → API streams response
4. Session state accumulates (task, blocker, tools, path) → final generated prompt

### Key Files
| Path | Purpose |
|------|---------|
| `src/app/page.tsx` | Two-panel layout orchestration |
| `src/context/SessionContext.tsx` | Accumulated session state across sections |
| `src/app/api/chat/route.ts` | Anthropic streaming endpoint (SSE) |
| `src/components/cli/AICli.tsx` | Main CLI panel state machine |
| `src/lib/prompts.ts` | System prompts per section (terse style) |

### CLI State Machine
```
IDLE → THINKING → QUESTION → STREAMING → COMPLETE
```

### Session State Shape
```typescript
interface SessionState {
  taskToAutomate: string;    // From reality-check
  blocker: string;           // From success-factors
  toolsTried: string[];      // From tools-primer
  selectedPath: string;      // From examples
  generatedPrompt: string;   // Final output
  completedSections: string[];
  tokensUsed: number;
  currentSection: string;
}
```

### Section Types
- `welcome` / `reading` — No API call
- `free-text` — User types, streams response (reality-check, success-factors)
- `multi-select` — Tool checkboxes, streams recommendation (tools-primer)
- `options` — 3 generated cards (examples)
- `context-demo` — Visual-only context bar demo
- `prompt` — Generated copy-paste prompt (practical-guide)

### API Pattern
POST `/api/chat` with `{ message, section, sessionState }` → SSE stream with `{ text }` chunks, ends with `{ done: true, tokens: N }`

## Environment

```
ANTHROPIC_API_KEY=sk-ant-...
```
