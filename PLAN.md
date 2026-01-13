# FINN AI Memo Microsite: Final Implementation Plan

## Vision
A **scrollytelling microsite with an AI CLI companion panel** — styled like Claude Code. As you scroll through the memo, the right panel shows interactive Q&A that tests comprehension, with thinking animations, token counters, and streaming responses.

**The meta-narrative:** You're learning about AI tools while experiencing an AI-like interface.

---

## Design Philosophy

### What Makes This AI CLI Exceptional
| Generic Quiz | AI CLI Companion |
|--------------|------------------|
| Static checkboxes | Thinking spinner + verb rotation |
| Instant feedback | Response streams in character-by-character |
| No personality | ASCII art, token counters, context bar |
| Disconnected | Synced to scroll position |
| Boring | Feels like chatting with Claude Code |

### Core UX Concept
**Two-panel layout:**
1. **Left (70%)** — Scrollytelling content, beautifully animated
2. **Right (30%)** — AI CLI companion with per-section Q&A

**The engagement loop:**
1. Scroll to new section
2. AI CLI "thinks" with spinner animation
3. Question appears about that section's content
4. User answers
5. AI responds with insight + encourages scroll

---

## Visual Identity

### Colors
```css
--bg-primary: #0a0a0a;        /* Near-black */
--bg-panel: #0d1117;          /* Panel background */
--accent-finn: #0066FF;       /* FINN blue */
--accent-glow: #00D4FF;       /* Cyan glow for highlights */
--accent-success: #3FB950;    /* Correct answer */
--accent-warn: #FF9500;       /* Amber warnings */
--text-primary: #e6edf3;      /* Light gray */
--text-muted: #7d8590;        /* Dimmed */
--border: #30363d;            /* Subtle borders */
```

### Typography
- **Headlines:** Space Grotesk (geometric, distinctive)
- **Body:** System UI stack (readable, fast)
- **AI CLI:** JetBrains Mono (monospace, Claude Code feel)

### AI CLI Panel Design
```
╭─────────────────────────────────────╮
│  ┌─┐ FINN AI                        │  ← ASCII logo + title
│  └─┘ companion                      │
├─────────────────────────────────────┤
│                                     │
│  ◐ reasoning...                     │  ← Thinking spinner
│                                     │
│  ┌─ Reality Check ────────────────┐ │  ← Section indicator
│  │                                │ │
│  │  Quick comprehension check:    │ │
│  │                                │ │
│  │  What can AI NOT do well?      │ │  ← Question
│  │                                │ │
│  │  ○ Generate drafts fast        │ │  ← Options
│  │  ● Make difficult decisions    │ │
│  │  ○ Search information          │ │
│  │                                │ │
│  └────────────────────────────────┘ │
│                                     │
├─────────────────────────────────────┤
│  tokens: 1,247  ·  context: ██░░ 32%│  ← Status bar
╰─────────────────────────────────────╯
```

---

## Technical Stack

| Layer | Tool | Why |
|-------|------|-----|
| Framework | Next.js 15 (App Router) | API routes + static pages |
| AI | Anthropic Claude API | Real conversational responses |
| Animation | Framer Motion | Scroll-triggered reveals + streaming text |
| Styling | Tailwind CSS v4 | Rapid iteration |
| Fonts | Google Fonts | Space Grotesk, JetBrains Mono |
| State | React Context | Session state across sections |
| Deploy | Vercel | Auto-deploy, env vars for API key |

### Key Dependencies
```json
{
  "@anthropic-ai/sdk": "^0.30.x",
  "framer-motion": "^11.x",
  "react-intersection-observer": "^9.x",
  "ai": "^4.x"  // Vercel AI SDK for streaming
}
```

### Environment Variables
```
ANTHROPIC_API_KEY=sk-ant-...
```

---

## AI CLI Features

### Thinking Animation
Spinner rotates `◐ ◑ ◒ ◓` with verb that changes every 800ms:
```
pondering...
reasoning...
synthesizing...
connecting dots...
considering...
processing...
weighing options...
analyzing...
```

### Token Counter
- Starts at 0, increments based on actual API token usage
- Shows real consumption (educational about context)
- Creates sense of progression

### Context Bar
- Visual progress through memo
- Fills as sections are completed
- At 30% shows subtle pulse (callback to "context degradation" content)

### Response Streaming
- Uses Vercel AI SDK for real-time streaming from Anthropic
- ~30ms feel, actually API-speed
- Responses personalized to user input

---

## Interactive Flow (Anthropic-Powered)

### Session State
Accumulates through the experience:
```typescript
interface SessionState {
  taskToAutomate?: string;      // From Reality Check
  blocker?: string;             // From Success Factors
  toolsTried: string[];         // From Tools Primer
  selectedPath?: string;        // From Examples (3 options)
  generatedPrompt?: string;     // Final output
}
```

### Section Interactions

| # | Section | Interaction Type | User Input | AI Response |
|---|---------|-----------------|------------|-------------|
| 1 | Reality Check | **Free text** | "What task takes you 3+ hours that AI could help with?" | Validates idea, suggests approach |
| 2 | Success Factors | **Free text** | "What is stopping you from trying?" | Addresses specific blocker with empathy + action |
| 3 | Tools Primer | **Multiselect** | Tools tried: ChatGPT, Claude.ai, Cursor, Claude Code, Copilot, Gemini, Codex, Windsurf, v0, Lovable, Bolt, Replit, Other | Recommends next tool based on gaps |
| 4 | Context Game | **Live demo** | (No input — visual only) | Watch context bar fill as example text appears |
| 5 | Examples | **3 options** | Tailored to previous answers (task + tools) | "Based on what you said, try one of these..." |
| 6 | Practical Guide | **Generated plan** | (Auto from state) | Short specific plan + **production-ready prompt** |

### Final Output: The Generated Prompt

The payoff. A copy-paste-ready prompt following best practices:

```
┌─────────────────────────────────────────────────────────────┐
│  Your personalized starting prompt:                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  I want to [TASK FROM SECTION 1].                          │
│                                                             │
│  Context:                                                   │
│  - I've used [TOOLS FROM SECTION 3] before                 │
│  - My main blocker has been [BLOCKER FROM SECTION 2]       │
│  - I chose the [SELECTED PATH] approach                    │
│                                                             │
│  Start by interviewing me about:                           │
│  - [Specific question 1]                                   │
│  - [Specific question 2]                                   │
│  - [Specific question 3]                                   │
│                                                             │
│  Keep it simple. No abstractions I didn't ask for.         │
│  Explain your reasoning before making changes.             │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  [Copy to Clipboard]          [Open in Claude Code]        │
╰─────────────────────────────────────────────────────────────╯
```

### Prompt Best Practices (Built into generation)
- Starts with clear goal
- Provides relevant context
- Asks AI to interview/clarify first
- Sets constraints ("keep it simple")
- Requests reasoning
- Scoped to one thing

---

## Component Architecture

```
src/
├── app/
│   ├── page.tsx                 # Two-panel layout
│   ├── layout.tsx               # Dark theme, fonts, providers
│   ├── globals.css              # CSS vars, custom styles
│   └── api/
│       └── chat/
│           └── route.ts         # Anthropic streaming endpoint
├── components/
│   ├── cli/
│   │   ├── AICli.tsx            # Main CLI panel component
│   │   ├── ThinkingSpinner.tsx  # Animated spinner + verb
│   │   ├── FreeTextInput.tsx    # Text input for open questions
│   │   ├── MultiSelect.tsx      # Tool selection checkboxes
│   │   ├── OptionCards.tsx      # 3-option selection (Examples)
│   │   ├── GeneratedPrompt.tsx  # Final prompt display + copy
│   │   ├── StreamingText.tsx    # Real-time API response
│   │   ├── StatusBar.tsx        # Tokens + context progress
│   │   └── ContextDemo.tsx      # Live context bar demo
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── ExecSummary.tsx
│   │   ├── RealityCheck.tsx
│   │   ├── SuccessFactors.tsx
│   │   ├── ToolsPrimer.tsx
│   │   ├── ContextGame.tsx
│   │   ├── Examples.tsx
│   │   ├── WhatThisMeans.tsx
│   │   ├── HowToStart.tsx
│   │   └── Appendices.tsx
│   ├── ui/
│   │   ├── Section.tsx          # Scroll-triggered reveal wrapper
│   │   ├── StatCounter.tsx      # Animated numbers
│   │   ├── CodeBlock.tsx        # Styled code with copy
│   │   ├── TypewriterText.tsx   # Typing animation for content
│   │   └── ComparisonTable.tsx
│   └── layout/
│       └── Footer.tsx
├── lib/
│   ├── anthropic.ts             # Anthropic SDK setup
│   ├── prompts.ts               # System prompts per section
│   ├── content.ts               # Structured memo content
│   └── scroll.ts                # Intersection observer utils
├── context/
│   └── SessionContext.tsx       # Session state provider
└── hooks/
    ├── useSession.ts            # Access session state
    ├── useChat.ts               # API interaction hook
    └── useScrollProgress.ts
```

---

## Scroll-CLI Sync

### How It Works
1. User scrolls to new section
2. CLI enters "thinking" state with spinner
3. Question for that section appears
4. User selects answer
5. CLI streams response with insight
6. Token counter increments, context bar fills

### State Machine
```
IDLE → THINKING → QUESTION → ANSWERED → IDLE
         ↓            ↓          ↓
      spinner    show Q&A    stream response
```

### Implementation
```typescript
// Intersection Observer triggers CLI update
const { ref, inView } = useInView({ threshold: 0.5 })

useEffect(() => {
  if (inView && !sectionCompleted[sectionId]) {
    setCli({
      state: 'thinking',
      section: sectionId,
    })

    // After thinking animation
    setTimeout(() => {
      setCli({
        state: 'question',
        question: questions[sectionId],
      })
    }, 1500)
  }
}, [inView])
```

---

## Content Sections

All text content has **typewriter animations** as you scroll into view.

### 1. Hero
- Full viewport dark screen
- FINN ASCII art fades in
- Headline types in: "AI with agency & urgency"
- Subtitle types in: "A memo for all FINN employees — January 2026"
- **CLI:** Welcome message, introduces the companion

### 2. Executive Summary
- Four bullet points, staggered type-in
- Key stats pulse with cyan glow (80%, etc.)
- "The shift is here" as bold statement
- **CLI:** (Reading mode — no interaction yet)

### 3. Reality Check
- Split layout: AI Can / AI Can't (type in as lists)
- Peter Steinberger quote with animated "20x" counter
- Caveat in amber warning box
- **CLI:** Free text → "What task takes you 3+ hours that AI could help with?"
- **API:** Validates idea, suggests approach

### 4. Success Factors
- Four cards: Curiosity, Agency, Knowing When to Stop, Accepting Imperfection
- Cards reveal on scroll with stagger
- Minimal icons per card
- **CLI:** Free text → "What is stopping you from trying?"
- **API:** Addresses specific blocker with empathy + action

### 5. Tools Primer
- Core Concepts table (rows type in)
- Harness Comparison table (hover reveals details)
- Tools Overview with icons
- **CLI:** Multiselect → "Which tools have you tried?"
  - ChatGPT, Claude.ai, Cursor, Claude Code, Copilot, Gemini, Codex, Windsurf, v0, Lovable, Bolt, Replit, Other
- **API:** Recommends next tool based on gaps + their stated task

### 6. Context Game
- AGENTS.md explanation with code block
- Skills section with examples
- Context Bloat warning with stat: "30%"
- **CLI:** Live demo — watch context bar fill as example text appears
- **No API** — visual demonstration only

### 7. Examples
- External examples as testimonial cards (Peter, Duolingo, Claude Code)
- FINN-specific examples with names bolded
- Stats animate on entry
- **CLI:** 3 option cards → "Based on what you said, try one of these..."
- **API:** Options generated from session state (task + tools + blocker)

### 8. What This Means
- Four bold statements, full-bleed alternating backgrounds
- Each statement is a scroll-stop moment
- High contrast, impactful typography
- **CLI:** (Reading mode — reinforces message)

### 9. Practical Guide
- Numbered steps (1-6) with icons, type in
- Do/Don't comparisons
- **CLI:** Generated plan + prompt based on all previous answers
- **API:** Creates personalized, production-ready prompt
- **CTA:** [Copy to Clipboard] [Open in Claude Code]

### 10. Appendices (Collapsed)
- Accordion sections, collapsed by default
- A: Peter Steinberger's Workflow
- B: Agent-Native Architecture
- C: Sources
- **CLI:** Shows session summary when expanded

### 11. Footer
- Contact: Max Wühr
- "Last updated: January 2026"
- **CLI:** Completion celebration + token usage summary

---

## Key Animations

| Element | Animation | Trigger |
|---------|-----------|---------|
| FINN ASCII art | Fade in | Page load |
| CLI thinking spinner | Rotate `◐ ◑ ◒ ◓` | Section entry |
| CLI verbs | Cycle every 800ms | During thinking |
| Section headers | Fade up + blur | Scroll into view |
| Stats (20x, etc.) | Counter animation | In viewport |
| Code blocks | Syntax highlight sweep | In viewport |
| Tables | Row-by-row stagger | In viewport |
| Cards | Scale + fade in | In viewport |
| CLI response | Stream char-by-char | After answer |
| Token counter | Increment on scroll | Continuous |
| Context bar | Fill progressively | Section complete |

---

## Build Steps

### Phase 1: Foundation
1. Scaffold Next.js project (`finn-ai-memo`)
2. Set up design system (colors, typography)
3. Configure Tailwind + CSS variables
4. Add fonts (Space Grotesk, JetBrains Mono)
5. Install dependencies (framer-motion, @anthropic-ai/sdk, ai)

### Phase 2: API Layer
6. Create `/api/chat/route.ts` with Anthropic streaming
7. Write system prompts for each interaction type
8. Set up Vercel AI SDK for streaming responses
9. Add `.env.local` with `ANTHROPIC_API_KEY`

### Phase 3: AI CLI Core
10. Build SessionContext for accumulated state
11. Build AICli.tsx panel component
12. Implement ThinkingSpinner with verb rotation
13. Create FreeTextInput for open questions
14. Create MultiSelect for tools
15. Create OptionCards for Examples section
16. Build StreamingText for API responses
17. Build GeneratedPrompt with copy button
18. Add StatusBar (tokens + context bar)
19. Build ContextDemo for visual demo

### Phase 4: Content Sections
20. Build Hero with ASCII art + typewriter
21. Implement all sections with typewriter animations
22. Add scroll-triggered reveals (Framer Motion)
23. Wire up scroll→CLI sync (Intersection Observer)

### Phase 5: Polish
24. Refine animations (timing, easing)
25. Mobile responsiveness (CLI as collapsible drawer)
26. Accessibility (keyboard nav, aria labels)
27. Error handling for API failures

### Phase 6: Deploy & Test
28. Push to GitHub
29. Connect Vercel + add env vars
30. Test on preview URL
31. **Use Playwriter to verify all interactions**

---

## Verification Plan

### Manual Testing (via Playwriter)
- [ ] CLI panel renders correctly
- [ ] Thinking spinner animates with rotating verbs
- [ ] Free text input works (Reality Check, Success Factors)
- [ ] Multiselect works (Tools Primer)
- [ ] API responses stream correctly
- [ ] Context demo fills bar visually
- [ ] 3 options appear based on previous answers (Examples)
- [ ] Final prompt generates with all session data
- [ ] Copy to clipboard works
- [ ] Token counter shows actual usage
- [ ] Context bar fills as sections complete
- [ ] Typewriter animations on scroll
- [ ] Mobile: CLI collapses to drawer

### API Testing
- [ ] Streaming works without buffering
- [ ] Error handling shows graceful fallback
- [ ] Rate limiting handled (if needed)
- [ ] Session state persists across interactions

### Technical Checks
- [ ] No hydration mismatches
- [ ] Lighthouse performance >85 (API adds some weight)
- [ ] No console errors
- [ ] Fonts load correctly
- [ ] Works in Safari, Chrome, Firefox

---

## Files to Create

```
finn-ai-memo/
├── src/app/
│   ├── page.tsx
│   ├── layout.tsx
│   ├── globals.css
│   └── api/chat/route.ts          # Anthropic streaming endpoint
├── src/components/cli/
│   ├── AICli.tsx
│   ├── ThinkingSpinner.tsx
│   ├── FreeTextInput.tsx
│   ├── MultiSelect.tsx
│   ├── OptionCards.tsx
│   ├── GeneratedPrompt.tsx
│   ├── StreamingText.tsx
│   ├── StatusBar.tsx
│   └── ContextDemo.tsx
├── src/components/sections/*.tsx   # 10 section files
├── src/components/ui/
│   ├── Section.tsx
│   ├── StatCounter.tsx
│   ├── CodeBlock.tsx
│   ├── TypewriterText.tsx
│   └── ComparisonTable.tsx
├── src/context/
│   └── SessionContext.tsx
├── src/lib/
│   ├── anthropic.ts
│   ├── prompts.ts                  # System prompts per section
│   ├── content.ts
│   └── scroll.ts
├── src/hooks/
│   ├── useSession.ts
│   ├── useChat.ts
│   └── useScrollProgress.ts
├── .env.local                      # ANTHROPIC_API_KEY
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

---

## Design Decisions Made

| Decision | Choice | Rationale |
|----------|--------|-----------|
| AI Backend | Anthropic Claude API | On-brand (memo is about AI), high quality |
| Streaming | Vercel AI SDK | Best-in-class streaming UX |
| CLI style | Claude Code inspired | Matches memo subject matter |
| Interactions | Reflective, not quiz | Engagement > testing |
| Final output | Generated prompt | Actionable takeaway |
| Thinking animation | Spinner + verb rotation | Feels like real AI processing |
| Response style | Streaming text | Creates anticipation, feels "live" |
| Layout | Two-panel (70/30) | Content dominant, CLI supporting |
| Scroll sync | Intersection Observer | Native, performant |
| Animation library | Framer Motion | Covers all needs |
| Mobile CLI | Collapsible drawer | Works in limited space |
| Content animation | Typewriter on scroll | Cohesion with CLI aesthetic |

---

## Mobile Behavior

On screens <768px:
- CLI panel becomes bottom drawer
- Collapsed by default, shows status bar only
- Tap to expand for Q&A
- Auto-collapses after answering
- Token/context visible in collapsed state

---

## Out of Scope (v1)

- Analytics
- Auth/access control
- Multi-language
- Dark/light mode toggle (dark only)
- Sound effects
- Backend/API
- Saving quiz progress
