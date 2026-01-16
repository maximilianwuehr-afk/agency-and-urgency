import { ToolPage } from '@/components/tools/ToolPage';

export default function CursorPage() {
  return (
    <ToolPage
      name="Cursor"
      tagline="AI-native IDE that understands your entire codebase"
      installCommands={`# Download from cursor.com
# Then add to PATH:
# Cmd+Shift+P → "Install 'cursor' command in PATH"

# Linux:
chmod +x cursor-*.AppImage
./cursor-*.AppImage`}
      howItWorks={[
        'Fork of VS Code with deep AI integration',
        'Understands entire codebase context',
        'Agent mode for multi-file tasks',
        'Tab completion that predicts next edit',
      ]}
      prompts={[
        { text: 'What does this function do?', difficulty: 'Easy' },
        { text: 'Fix the TypeScript errors in this file', difficulty: 'Easy' },
        { text: 'Create a React component that [describes feature]', difficulty: 'Stretch' },
        { text: 'Cmd+K in terminal → "run tests and show failures"', difficulty: 'Stretch' },
      ]}
    />
  );
}
