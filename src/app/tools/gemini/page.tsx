import { ToolPage } from '@/components/tools/ToolPage';

export default function GeminiPage() {
  return (
    <ToolPage
      name="Gemini"
      tagline="Google's AI assistant with real-time web access"
      installCommands={`No install needed.
Go to: gemini.google.com
Sign in with Google account.`}
      installTitle="Access"
      howItWorks={[
        'Free tier with Gemini 2.0 Flash',
        'Real-time Google Search grounding (live web data)',
        'Upload images, PDFs, files for analysis',
        'Code execution in sandbox (Python, data viz)',
        'Deep Research mode for multi-step investigation',
      ]}
      prompts={[
        { text: 'Summarize this PDF (upload file)', difficulty: 'Easy' },
        { text: 'Explain this code: [paste code]', difficulty: 'Easy' },
        { text: 'Research [topic] and create a comparison table with sources', difficulty: 'Stretch' },
        { text: 'Analyze this data and create a visualization (upload CSV)', difficulty: 'Stretch' },
      ]}
    />
  );
}
