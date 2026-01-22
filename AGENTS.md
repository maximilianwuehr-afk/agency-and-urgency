# Repository Guidelines

## Project Structure & Module Organization
- `src/app` contains App Router routes, layout, styles, and API handlers (see `src/app/api/chat/route.ts`).
- `src/app/en`, `src/app/de`, and `src/app/tools` hold localized or tool-specific routes.
- `src/components` is the main UI library, grouped by `sections`, `cli`, `layout`, `presentation`, and `ui`.
- `src/context` stores shared session state providers.
- `src/hooks` holds custom React hooks.
- `src/lib` contains shared helpers like prompt builders.
- `public` holds static assets (SVGs, images, memes).
- `tmp` is scratch space and is git-ignored.

## Build, Test, and Development Commands
- `npm run dev` starts the Next.js dev server at http://localhost:3000.
- `npm run build` creates a production build.
- `npm run start` serves the production build.
- `npm run lint` runs ESLint with Next.js core-web-vitals and TypeScript rules.

## Coding Style & Naming Conventions
- TypeScript + React (App Router). Use 2-space indentation, single quotes, and semicolons.
- Components use PascalCase filenames (e.g., `RealityCheck.tsx`); hooks use `useX` naming.
- Prefer absolute imports via `@/` (mapped to `src/*`).
- Tailwind v4 is enabled via PostCSS; global tokens live in `src/app/globals.css`.

## Testing Guidelines
- No automated test framework is configured yet (no Jest/Vitest).
- For now, rely on `npm run lint` and manual UI verification in the browser.
- If adding tests, prefer `*.test.ts(x)` or `src/**/__tests__`.

## Commit & Pull Request Guidelines
- Commit history follows Conventional Commits (`feat:`, `fix:`, `chore:`; optional scope).
- Keep messages short and specific (e.g., `feat: add presentation mode`).
- PRs should include a summary, testing notes, and screenshots or GIFs for UI changes.

## Architecture & Configuration Notes
- The app is a two-panel scrollytelling layout with a fixed AI CLI panel.
- CLI state and streaming behavior live in `src/components/cli/AICli.tsx`.
- The streaming API endpoint is `src/app/api/chat/route.ts` (SSE).
- Set `ANTHROPIC_API_KEY` in the environment for chat requests.
- For deeper implementation context, see `CLAUDE.md`.
