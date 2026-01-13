'use client';

import { useState, useCallback } from 'react';
import { useSession } from '@/context/SessionContext';

interface UseChatOptions {
  section: string;
  onComplete?: (response: string, tokens: number) => void;
}

export function useChat({ section, onComplete }: UseChatOptions) {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { state, addTokens } = useSession();

  const sendMessage = useCallback(
    async (message: string | string[]) => {
      setIsLoading(true);
      setResponse('');
      setError(null);

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message,
            section,
            sessionState: state,
          }),
        });

        if (!res.ok) throw new Error('Failed to fetch');

        const reader = res.body?.getReader();
        if (!reader) throw new Error('No reader');

        const decoder = new TextDecoder();
        let fullResponse = '';
        let tokens = 0;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6));
                if (data.text) {
                  fullResponse += data.text;
                  setResponse(fullResponse);
                }
                if (data.done && data.tokens) {
                  tokens = data.tokens;
                }
              } catch {
                // Skip invalid JSON
              }
            }
          }
        }

        if (tokens > 0) {
          addTokens(tokens);
        }

        onComplete?.(fullResponse, tokens);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    },
    [section, state, addTokens, onComplete]
  );

  return { sendMessage, response, isLoading, error };
}
