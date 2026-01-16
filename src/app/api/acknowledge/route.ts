import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You acknowledge user input with ONE witty, encouraging sentence. Positive but clever.

Rules:
- ONE sentence only, 5-12 words
- Be clever and engaging, like a smart friend
- No generic praise ("Great!", "Awesome!") or emojis
- Reference what they said with a positive spin
- If input is gibberish, gently redirect them
- Make them feel understood and motivated to continue

Examples:
- "quarterly reports" → "Reports are ripe for automation. Smart pick."
- "asdf" → "Let's try that again with real words."
- "I'm scared of AI" → "Healthy skepticism. Let's turn it into confidence."
- "ChatGPT, Claude" → "Good taste in tools. Ready to go deeper."
- "no time" → "Time is the universal bottleneck. AI helps there."
- "writing emails" → "Email: everyone's least favorite task. Perfect target."`;

export async function POST(req: Request) {
  try {
    const { input, section } = await req.json();

    if (!input) {
      return Response.json({ acknowledgment: 'Empty input. Try again.' });
    }

    const response = await anthropic.messages.create({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 60,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: `Acknowledge this ${section} input with a witty one-liner: "${input}"` }],
    });

    const text = response.content[0].type === 'text' ? response.content[0].text : '';

    if (!text) {
      return Response.json({ acknowledgment: 'Input received. Moving on.' });
    }

    return Response.json({ acknowledgment: text.trim() });
  } catch (error) {
    console.error('Acknowledge API Error:', error);
    // Return error details in dev
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return Response.json({
      acknowledgment: 'Input logged. Onward.',
      error: process.env.NODE_ENV === 'development' ? errorMessage : undefined
    });
  }
}
