'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useSession, SessionState } from '@/context/SessionContext';

interface UseChatOptions {
  section: string;
  onComplete?: (response: string, tokens: number) => void;
}

export function useChat({ section, onComplete }: UseChatOptions) {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { state, addTokens } = useSession();

  // Use ref to always get latest state in sendMessage
  const stateRef = useRef<SessionState>(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const sendMessage = useCallback(
    async (message: string | string[]) => {
      setIsLoading(true);
      setResponse('');
      setError(null);

      // Use ref to get current state value
      const currentState = stateRef.current;

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message,
            section,
            sessionState: currentState,
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
    [section, addTokens, onComplete]
  );

  return { sendMessage, response, isLoading, error };
}
