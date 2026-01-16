import { ToolPage } from '@/components/tools/ToolPage';

export default function ClaudeCodePage() {
  return (
    <ToolPage
      name="Claude Code"
      tagline="Anthropic's CLI agent that lives in your terminal"
      installCommands={`# Recommended (native binary)
curl -fsSL https://claude.ai/install.sh | bash

# Or via npm (Node 18+ required)
npm install -g @anthropic-ai/claude-code

# Verify
claude doctor`}
      howItWorks={[
        'Runs in terminal, understands your codebase via AGENTS.md',
        'Executes bash commands, reads/writes files, runs git',
        'Context window = your project files + conversation',
        'Agentic: plans → executes → verifies',
      ]}
      prompts={[
        { text: 'Explain the project structure', difficulty: 'Easy' },
        { text: 'Find where [X] is defined', difficulty: 'Easy' },
        { text: 'Add a new API endpoint for [feature]', difficulty: 'Stretch' },
        { text: 'Run the tests and fix any failures', difficulty: 'Stretch' },
      ]}
    />
  );
}
