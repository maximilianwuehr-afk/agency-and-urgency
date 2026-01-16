import { ToolPage } from '@/components/tools/ToolPage';

export default function AntigravityPage() {
  return (
    <ToolPage
      name="Antigravity"
      tagline="Google's free agentic IDE with Claude & Gemini models"
      installCommands={`# macOS
brew install --cask antigravity

# Or download from antigravity.google/download`}
      howItWorks={[
        'VS Code fork with AI sidebar (Editor View) + multi-agent orchestration (Manager View)',
        'Free tier with generous rate limits (refresh every 5 hours)',
        'Supports Gemini 3, Claude Sonnet 4.5, OpenAI models',
      ]}
      prompts={[
        { text: 'Explain what this file does', difficulty: 'Easy' },
        { text: 'Add error handling to this function', difficulty: 'Easy' },
        { text: 'Refactor this module to use dependency injection', difficulty: 'Stretch' },
        { text: 'Create a test suite for the selected code', difficulty: 'Stretch' },
      ]}
    />
  );
}
