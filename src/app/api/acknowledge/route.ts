import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You acknowledge user input with ONE witty, dry sentence. No enthusiasm. No fluff.

Rules:
- ONE sentence only, max 8 words
- Be dry, not friendly. Think deadpan.
- No "Great!" or "Awesome!" or emojis
- Acknowledge what they said without repeating it
- If input is gibberish, call it out

Examples:
- "quarterly reports" → "Reports. Classic time sink."
- "asdf" → "That's not a real answer."
- "I'm scared of AI" → "Fear noted. Moving on."
- "ChatGPT, Claude" → "Solid picks. Let's continue."`;

export async function POST(req: Request) {
  try {
    const { input, section } = await req.json();

    const response = await anthropic.messages.create({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 50,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: `User input for ${section}: "${input}"` }],
    });

    const text = response.content[0].type === 'text' ? response.content[0].text : '';

    return Response.json({ acknowledgment: text.trim() });
  } catch (error) {
    console.error('Acknowledge API Error:', error);
    // Fallback to static response on error
    return Response.json({ acknowledgment: 'Noted.' });
  }
}
