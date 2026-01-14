'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from '@/context/SessionContext';
import { useChat } from '@/hooks/useChat';
import { ThinkingSpinner } from './ThinkingSpinner';
import { StatusBar } from './StatusBar';
import { StreamingText } from './StreamingText';
import { FreeTextInput } from './FreeTextInput';
import { MultiSelect } from './MultiSelect';
import { OptionCards, Option } from './OptionCards';
import { GeneratedPrompt } from './GeneratedPrompt';
import { ContextDemo } from './ContextDemo';

type CliState = 'idle' | 'thinking' | 'question' | 'streaming' | 'complete';

// Section order for navigation
const SECTION_ORDER = [
  'hero',
  'exec-summary',
  'reality-check',
  'success-factors',
  'tools-primer',
  'context-game',
  'examples',
  'what-this-means',
  'practical-guide',
  'appendices',
];

interface CliContent {
  section: string;
  command: string;
  question?: string;
  type: 'welcome' | 'reading' | 'free-text' | 'multi-select' | 'options' | 'context-demo' | 'prompt';
}

const sectionContent: Record<string, CliContent> = {
  hero: {
    section: 'welcome',
    command: 'finn-ai --init',
    type: 'welcome',
  },
  'exec-summary': {
    section: 'exec-summary',
    command: 'cat summary.md',
    type: 'reading',
  },
  'reality-check': {
    section: 'reality-check',
    command: 'finn-ai reality-check',
    question: 'What task takes you 3+ hours that AI could help with?',
    type: 'free-text',
  },
  'success-factors': {
    section: 'success-factors',
    command: 'finn-ai diagnose --blockers',
    question: 'What is stopping you from trying AI more?',
    type: 'free-text',
  },
  'tools-primer': {
    section: 'tools-primer',
    command: 'finn-ai tools --inventory',
    question: 'Which AI tools have you tried?',
    type: 'multi-select',
  },
  'context-game': {
    section: 'context-game',
    command: 'finn-ai demo --context-window',
    type: 'context-demo',
  },
  examples: {
    section: 'examples',
    command: 'finn-ai suggest --personalized',
    question: 'Based on your answers, try one of these:',
    type: 'options',
  },
  'what-this-means': {
    section: 'what-this-means',
    command: 'cat implications.md',
    type: 'reading',
  },
  'practical-guide': {
    section: 'practical-guide',
    command: 'finn-ai generate --prompt',
    type: 'prompt',
  },
  appendices: {
    section: 'appendices',
    command: 'ls ./appendices/',
    type: 'reading',
  },
};

// Typewriter component for text
function TypewriterText({ text, speed = 25, onComplete }: { text: string; speed?: number; onComplete?: () => void }) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    setDisplayText('');
    setIsComplete(false);
    hasCompletedRef.current = false;

    let index = 0;
    const interval = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
        setIsComplete(true);
        if (!hasCompletedRef.current) {
          hasCompletedRef.current = true;
          onComplete?.();
        }
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <>
      {displayText}
      {!isComplete && <span className="terminal-cursor" />}
    </>
  );
}

// Typewriter component for commands
function TypewriterCommand({ text, onComplete }: { text: string; onComplete?: () => void }) {
  return (
    <div className="text-[var(--text-dim)]">
      $ <TypewriterText text={text} speed={30} onComplete={onComplete} />
    </div>
  );
}

interface HistoryEntry {
  id: string;
  command: string;
  content?: React.ReactNode;
}

export function AICli() {
  const { state, setTaskToAutomate, setBlocker, setToolsTried, setSelectedPath, completeSection, setGeneratedPrompt } =
    useSession();
  const [cliState, setCliState] = useState<CliState>('idle');
  const [options, setOptions] = useState<Option[]>([]);
  const [commandComplete, setCommandComplete] = useState(false);
  const [currentCommand, setCurrentCommand] = useState('finn-ai init');
  const [persistedResponse, setPersistedResponse] = useState<string | null>(null);
  const [questionReady, setQuestionReady] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const sendMessageRef = useRef<((msg: string | string[]) => void) | undefined>(undefined);
  const lastSectionRef = useRef<string>('');
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const currentContent = sectionContent[state.currentSection] || sectionContent.hero;

  const { sendMessage, response, isLoading } = useChat({
    section: state.currentSection,
    onComplete: (fullResponse) => {
      if (state.currentSection === 'examples') {
        try {
          const parsed = JSON.parse(fullResponse);
          setOptions(parsed);
        } catch {
          setOptions([
            { id: '1', title: 'Build a simple automation', description: 'Start with something small', difficulty: 'easy' },
            { id: '2', title: 'Create a workflow tool', description: 'Combine multiple steps', difficulty: 'medium' },
            { id: '3', title: 'Full project with AI', description: 'End-to-end development', difficulty: 'stretch' },
          ]);
        }
      }
      if (state.currentSection === 'practical-guide') {
        setGeneratedPrompt(fullResponse);
      }
      // Persist the response so it stays visible
      setPersistedResponse(fullResponse);
      setCliState('complete');
      completeSection(state.currentSection);
    },
  });

  // Keep sendMessage ref updated
  useEffect(() => {
    sendMessageRef.current = sendMessage;
  }, [sendMessage]);

  useEffect(() => {
    if (isLoading) {
      setCliState('streaming');
    }
  }, [isLoading]);

  // Auto-scroll to bottom when content changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [cliState, response, history, commandComplete, questionReady]);

  // Update command when section changes
  useEffect(() => {
    // Only update command when section actually changes
    if (lastSectionRef.current !== state.currentSection) {
      // Save previous section to history if it had a response
      if (lastSectionRef.current && persistedResponse) {
        const prevContent = sectionContent[lastSectionRef.current];
        if (prevContent) {
          setHistory(prev => [...prev, {
            id: lastSectionRef.current,
            command: prevContent.command,
            content: (
              <div className="space-y-2 text-[var(--text-muted)]">
                <div className="text-[var(--text-primary)]">{prevContent.question}</div>
                <div className="text-[var(--text-dim)]">$ response</div>
                <div>{persistedResponse}</div>
              </div>
            ),
          }]);
        }
      }
      setCurrentCommand(currentContent.command);
      setCommandComplete(false);
      setPersistedResponse(null);
      setQuestionReady(false);
    }
  }, [state.currentSection, currentContent.command, persistedResponse]);

  useEffect(() => {
    // Only run when section actually changes
    if (lastSectionRef.current === state.currentSection) return;
    lastSectionRef.current = state.currentSection;

    const needsQuestion = ['reality-check', 'success-factors', 'tools-primer', 'examples', 'practical-guide'].includes(
      state.currentSection
    );
    const alreadyCompleted = state.completedSections.includes(state.currentSection);

    if (needsQuestion && !alreadyCompleted) {
      setCliState('thinking');
      const currentSection = state.currentSection;
      const timer = setTimeout(() => {
        setCliState('question');
        if (currentSection === 'examples' && sendMessageRef.current) {
          sendMessageRef.current('generate options');
        }
        if (currentSection === 'practical-guide' && sendMessageRef.current) {
          sendMessageRef.current('generate prompt');
        }
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      setCliState('idle');
    }
  }, [state.currentSection, state.completedSections]);

  // Navigation helpers
  const navigateToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const goToNextSection = useCallback(() => {
    const currentIndex = SECTION_ORDER.indexOf(state.currentSection);
    if (currentIndex < SECTION_ORDER.length - 1) {
      navigateToSection(SECTION_ORDER[currentIndex + 1]);
    }
  }, [state.currentSection, navigateToSection]);

  const goToPrevSection = useCallback(() => {
    const currentIndex = SECTION_ORDER.indexOf(state.currentSection);
    if (currentIndex > 0) {
      navigateToSection(SECTION_ORDER[currentIndex - 1]);
    }
  }, [state.currentSection, navigateToSection]);

  // Keyboard shortcuts
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const target = e.target as HTMLElement;
    const isInputFocused = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;

    // Focus terminal with Cmd/Ctrl + K
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      containerRef.current?.querySelector('input')?.focus();
      return;
    }

    // Arrow navigation (only when input not focused)
    if (!isInputFocused) {
      if (e.key === 'ArrowDown' || e.key === 'j') {
        e.preventDefault();
        goToNextSection();
        return;
      }
      if (e.key === 'ArrowUp' || e.key === 'k') {
        e.preventDefault();
        goToPrevSection();
        return;
      }
      // Enter to go to next section (only when no input focused and section is complete or reading)
      if (e.key === 'Enter') {
        const isReadingSection = currentContent.type === 'reading' || currentContent.type === 'welcome';
        const isComplete = cliState === 'complete' || cliState === 'idle';
        if (isReadingSection || isComplete) {
          e.preventDefault();
          goToNextSection();
        }
      }
    }
  }, [goToNextSection, goToPrevSection, currentContent.type, cliState]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleFreeTextSubmit = (value: string) => {
    if (state.currentSection === 'reality-check') {
      setTaskToAutomate(value);
    } else if (state.currentSection === 'success-factors') {
      setBlocker(value);
    }
    setCliState('thinking');
    sendMessage(value);
  };

  const handleMultiSelectSubmit = (tools: string[]) => {
    setToolsTried(tools);
    setCliState('thinking');
    sendMessage(tools);
  };

  const handleOptionSelect = (option: Option) => {
    setSelectedPath(option.title);
    completeSection(state.currentSection);
    setCliState('complete');
  };

  const handleCommandComplete = useCallback(() => {
    setCommandComplete(true);
  }, []);

  return (
    <div ref={containerRef} className="h-full flex flex-col bg-[#0d0d0d] border-l border-[var(--border)] font-mono text-sm">
      {/* Header - FINN branded */}
      <div className="px-4 py-4 border-b border-[var(--border)]">
        <pre className="text-[var(--accent-finn)] text-[10px] leading-tight font-bold">
{`███████ ██ ███    ██ ███    ██
██      ██ ████   ██ ████   ██
█████   ██ ██ ██  ██ ██ ██  ██
██      ██ ██  ██ ██ ██  ██ ██
██      ██ ██   ████ ██   ████`}
        </pre>
        <div className="text-[10px] text-[var(--text-dim)] mt-2 tracking-wider uppercase">
          ai companion
        </div>
        <div className="mt-3 text-xs text-[var(--text-dim)] flex flex-wrap gap-x-3 gap-y-1">
          <span><span className="text-[var(--text-muted)]">↑↓</span> nav</span>
          <span><span className="text-[var(--text-muted)]">↵</span> next</span>
          <span><span className="text-[var(--text-muted)]">⌘K</span> focus</span>
        </div>
      </div>

      {/* Content */}
      <div ref={contentRef} className="flex-1 overflow-y-auto p-5 space-y-6">
        {/* History of previous interactions */}
        {history.map((entry) => (
          <div key={entry.id} className="space-y-2 opacity-60 border-b border-[var(--border)]/30 pb-4">
            <div className="text-[var(--text-dim)]">$ {entry.command}</div>
            {entry.content}
          </div>
        ))}

        {/* Current command line with typewriter */}
        <TypewriterCommand
          key={currentCommand}
          text={currentCommand}
          onComplete={handleCommandComplete}
        />

        <ThinkingSpinner isActive={cliState === 'thinking'} />

        {/* Welcome message */}
        {currentContent.type === 'welcome' && commandComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="text-[var(--text-primary)]">
              Welcome. I&apos;ll guide you through this memo.
            </div>
            <div className="text-[var(--text-muted)]">
              Scroll down to begin →
            </div>
          </motion.div>
        )}

        {/* Reading mode */}
        {currentContent.type === 'reading' && commandComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="text-[var(--text-muted)]">
              Take your time with this section...
            </div>
          </motion.div>
        )}

        {/* Free-text question + response */}
        {currentContent.type === 'free-text' && (cliState === 'question' || cliState === 'thinking' || cliState === 'streaming' || cliState === 'complete') && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-5"
          >
            <div className="text-[var(--text-primary)] leading-relaxed">
              <TypewriterText
                text={currentContent.question || ''}
                speed={20}
                onComplete={() => setQuestionReady(true)}
              />
            </div>
            {questionReady && cliState === 'question' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <FreeTextInput
                  placeholder="Type your answer..."
                  onSubmit={handleFreeTextSubmit}
                  disabled={isLoading}
                />
              </motion.div>
            )}
            {(cliState === 'streaming' || cliState === 'complete') && (response || persistedResponse) && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                <div className="text-[var(--text-dim)]">$ response</div>
                <StreamingText text={response || persistedResponse || ''} isComplete={cliState === 'complete'} />
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Multi-select question + response */}
        {currentContent.type === 'multi-select' && (cliState === 'question' || cliState === 'thinking' || cliState === 'streaming' || cliState === 'complete') && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-5"
          >
            <div className="text-[var(--text-primary)] leading-relaxed">
              <TypewriterText
                text={currentContent.question || ''}
                speed={20}
                onComplete={() => setQuestionReady(true)}
              />
            </div>
            {questionReady && cliState === 'question' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <MultiSelect onSubmit={handleMultiSelectSubmit} disabled={isLoading} />
              </motion.div>
            )}
            {(cliState === 'streaming' || cliState === 'complete') && (response || persistedResponse) && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                <div className="text-[var(--text-dim)]">$ response</div>
                <StreamingText text={response || persistedResponse || ''} isComplete={cliState === 'complete'} />
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Context demo */}
        {currentContent.type === 'context-demo' && commandComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <ContextDemo />
          </motion.div>
        )}

        {/* Options */}
        {currentContent.type === 'options' && options.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-5"
          >
            <div className="text-[var(--text-primary)] leading-relaxed">
              {currentContent.question}
            </div>
            <OptionCards options={options} onSelect={handleOptionSelect} />
          </motion.div>
        )}

        {/* Generated prompt */}
        {currentContent.type === 'prompt' && state.generatedPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <GeneratedPrompt prompt={state.generatedPrompt} />
          </motion.div>
        )}
      </div>

      {/* Status Bar - Terminal style */}
      <div className="border-t border-[var(--border)]">
        <StatusBar />
      </div>
    </div>
  );
}
