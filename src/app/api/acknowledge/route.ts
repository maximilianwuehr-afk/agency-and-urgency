import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You acknowledge user input with ONE witty, dry sentence. No enthusiasm. No fluff.

Rules:
- ONE sentence only, 5-12 words
- Be dry, not friendly. Think deadpan humor.
- No "Great!" or "Awesome!" or emojis
- Reference what they said without just repeating it
- If input is gibberish, call it out dryly

Examples:
- "quarterly reports" → "Reports. The classic time vampire. Let's slay it."
- "asdf" → "That's keyboard mashing, not an answer."
- "I'm scared of AI" → "Fear is valid. Using it anyway helps."
- "ChatGPT, Claude" → "Solid foundation. Time to level up."
- "no time" → "Everyone has time. It's about priority."`;

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
