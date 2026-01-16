import Anthropic from '@anthropic-ai/sdk';
import { systemPrompts } from '@/lib/prompts';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message, section, sessionState } = await req.json();

    let systemPrompt = '';
    let userMessage = message;

    switch (section) {
      case 'reality-check':
        systemPrompt = systemPrompts.realityCheck;
        userMessage = `The user said their time-consuming task is: "${message}"`;
        break;
      case 'success-factors':
        systemPrompt = systemPrompts.successFactors;
        userMessage = `The user said what's stopping them is: "${message}"

Their task they want to automate: "${sessionState?.taskToAutomate || 'not specified yet'}"`;
        break;
      case 'tools-primer':
        systemPrompt = systemPrompts.toolsPrimer;
        userMessage = `The user has tried these tools: ${message.length > 0 ? message.join(', ') : 'none yet'}

Their task: "${sessionState?.taskToAutomate || 'not specified'}"
Their blocker: "${sessionState?.blocker || 'not specified'}"`;
        break;
      case 'context-game':
        systemPrompt = systemPrompts.contextGame;
        userMessage = `The user wants AI to learn or build: "${message}"

Their task: "${sessionState?.taskToAutomate || 'not specified'}"
Their blocker: "${sessionState?.blocker || 'not specified'}"
Tools tried: ${sessionState?.toolsTried?.join(', ') || 'not specified'}`;
        break;
      case 'examples':
        systemPrompt = systemPrompts.examples;
        userMessage = `Generate 3 project options based on:
- Task they want to automate: "${sessionState?.taskToAutomate || 'general productivity'}"
- What's been stopping them: "${sessionState?.blocker || 'getting started'}"
- Tools they've tried: ${sessionState?.toolsTried?.join(', ') || 'basic tools'}
- What they want AI to learn/build: "${sessionState?.learningGoal || 'not specified'}"

Return ONLY a JSON array, no other text.`;
        break;
      case 'practical-guide':
        systemPrompt = systemPrompts.practicalGuide;
        userMessage = `Create a personalized starting prompt based on:
- Task: "${sessionState?.taskToAutomate || 'improve productivity'}"
- Blocker: "${sessionState?.blocker || 'knowing where to start'}"
- Tools tried: ${sessionState?.toolsTried?.join(', ') || 'ChatGPT'}
- Learning goal: "${sessionState?.learningGoal || 'not specified'}"
- Selected approach: "${sessionState?.selectedPath || 'general automation'}"`;
        break;
      default:
        systemPrompt = 'You are a helpful assistant.';
    }

    const response = await anthropic.messages.create({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 500,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
      stream: true,
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        let inputTokens = 0;
        let outputTokens = 0;

        for await (const event of response) {
          if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`));
          }
          if (event.type === 'message_start' && event.message.usage) {
            inputTokens = event.message.usage.input_tokens;
          }
          if (event.type === 'message_delta' && event.usage) {
            outputTokens = event.usage.output_tokens;
          }
        }

        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ done: true, tokens: inputTokens + outputTokens })}\n\n`)
        );
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : '';
    console.error('API Error:', errorMessage, errorStack);
    return Response.json({
      error: 'Failed to process request',
      details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
    }, { status: 500 });
  }
}
