'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useSession } from '@/context/SessionContext';
import { useChat } from '@/hooks/useChat';
import { ThinkingSpinner } from './ThinkingSpinner';
import { StatusBar } from './StatusBar';
import { StreamingText } from './StreamingText';
import { FreeTextInput } from './FreeTextInput';
import { MultiSelect } from './MultiSelect';
import { OptionCards, Option } from './OptionCards';
import { GeneratedPrompt } from './GeneratedPrompt';

interface SectionConfig {
  command: string;
  question?: string;
  type: 'welcome' | 'reading' | 'free-text' | 'multi-select' | 'options' | 'prompt';
}

const sectionConfig: Record<string, SectionConfig> = {
  hero: {
    command: 'finn-ai --init',
    type: 'welcome',
  },
  'exec-summary': {
    command: 'cat summary.md',
    type: 'reading',
  },
  'reality-check': {
    command: 'finn-ai reality-check',
    question: 'What task takes you 3+ hours that AI could help with?',
    type: 'free-text',
  },
  'success-factors': {
    command: 'finn-ai diagnose --blockers',
    question: 'What is stopping you from trying AI more?',
    type: 'free-text',
  },
  'tools-primer': {
    command: 'finn-ai tools --inventory',
    question: 'Which AI tools have you tried?',
    type: 'multi-select',
  },
  'context-game': {
    command: 'finn-ai learn --goal',
    question: 'What do you want AI to learn about your work, or what do you want to build?',
    type: 'free-text',
  },
  examples: {
    command: 'finn-ai suggest --personalized',
    question: 'Based on your answers, try one of these:',
    type: 'options',
  },
  'what-this-means': {
    command: 'finn-ai generate --prompt',
    type: 'prompt',
  },
  'practical-guide': {
    command: 'cat instructions.md',
    type: 'reading',
  },
  appendices: {
    command: 'ls ./appendices/',
    type: 'reading',
  },
};

// Single section entry in the terminal
function TerminalSection({
  sectionId,
  config,
  isNew,
  onSubmitFreeText,
  onSubmitMultiSelect,
  onSelectOption,
  onPromptGenerated,
}: {
  sectionId: string;
  config: SectionConfig;
  isNew: boolean;
  onSubmitFreeText: (section: string, value: string) => void;
  onSubmitMultiSelect: (section: string, tools: string[]) => void;
  onSelectOption: (section: string, option: Option) => void;
  onPromptGenerated?: (prompt: string) => void;
}) {
  const { state } = useSession();
  const savedResponse = state.sectionResponses[sectionId];
  const isCompleted = state.completedSections.includes(sectionId);

  // For options section
  const [options, setOptions] = useState<Option[]>([]);
  const [hasTriggered, setHasTriggered] = useState(false);
  const { sendMessage, response, isLoading } = useChat({
    section: sectionId === 'what-this-means' ? 'practical-guide' : sectionId,
    onComplete: (fullResponse) => {
      if (sectionId === 'examples') {
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
      } else if (sectionId === 'what-this-means') {
        onPromptGenerated?.(fullResponse);
      }
    },
  });

  // Auto-trigger for options and prompt sections (only once)
  useEffect(() => {
    if (isNew && !isCompleted && !hasTriggered) {
      if (sectionId === 'examples') {
        setHasTriggered(true);
        sendMessage('generate options');
      } else if (sectionId === 'what-this-means') {
        setHasTriggered(true);
        sendMessage('generate prompt');
      }
    }
  }, [sectionId, isNew, isCompleted, hasTriggered, sendMessage]);

  const handleFreeTextSubmit = (value: string) => {
    onSubmitFreeText(sectionId, value);
  };

  const handleMultiSelectSubmit = (tools: string[]) => {
    onSubmitMultiSelect(sectionId, tools);
  };

  const handleOptionSelect = (option: Option) => {
    onSelectOption(sectionId, option);
  };

  return (
    <motion.div
      initial={isNew ? { opacity: 0, y: 20 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-3 pb-6 border-b border-[var(--border)]/30 last:border-0"
    >
      {/* Command */}
      <div className="text-[var(--text-dim)]">$ {config.command}</div>

      {/* Welcome */}
      {config.type === 'welcome' && (
        <div className="space-y-2">
          <div className="text-[var(--text-primary)]">Welcome. I&apos;ll guide you through this memo.</div>
          <div className="text-[var(--text-muted)]">Scroll down to begin →</div>
        </div>
      )}

      {/* Reading */}
      {config.type === 'reading' && (
        <div className="text-[var(--text-muted)]">Reading section...</div>
      )}

      {/* Free-text input */}
      {config.type === 'free-text' && (
        <div className="space-y-3">
          <div className="text-[var(--text-primary)]">{config.question}</div>
          <FreeTextInput
            placeholder="Type your answer..."
            onSubmit={handleFreeTextSubmit}
            disabled={isLoading}
            section={sectionId}
          />
        </div>
      )}

      {/* Multi-select input */}
      {config.type === 'multi-select' && (
        <div className="space-y-3">
          <div className="text-[var(--text-primary)]">{config.question}</div>
          <MultiSelect onSubmit={handleMultiSelectSubmit} disabled={isLoading} section={sectionId} />
        </div>
      )}

      {/* Options */}
      {config.type === 'options' && (
        <div className="space-y-3">
          {/* Personalized context summary */}
          <div className="text-[var(--text-muted)] text-xs space-y-1">
            {state.taskToAutomate && (
              <div>→ task: <span className="text-[var(--text-primary)]">{state.taskToAutomate}</span></div>
            )}
            {state.blocker && (
              <div>→ blocker: <span className="text-[var(--text-primary)]">{state.blocker}</span></div>
            )}
            {state.toolsTried.length > 0 && (
              <div>→ tools: <span className="text-[var(--text-primary)]">{state.toolsTried.join(', ')}</span></div>
            )}
            {state.learningGoal && (
              <div>→ goal: <span className="text-[var(--text-primary)]">{state.learningGoal}</span></div>
            )}
          </div>
          <div className="text-[var(--text-primary)] mt-2">{config.question}</div>
          {isLoading && <ThinkingSpinner isActive />}
          {options.length > 0 && !isCompleted && (
            <OptionCards options={options} onSelect={handleOptionSelect} />
          )}
          {isCompleted && savedResponse && (
            <div className="text-[var(--accent-finn)] bg-[var(--bg-card)] px-3 py-2 rounded text-sm">
              Selected: {savedResponse.userInput}
            </div>
          )}
        </div>
      )}

      {/* Generated prompt */}
      {config.type === 'prompt' && (
        <div className="space-y-3">
          {isLoading && <ThinkingSpinner isActive />}
          {!isLoading && state.generatedPrompt && (
            <GeneratedPrompt prompt={state.generatedPrompt} />
          )}
        </div>
      )}
    </motion.div>
  );
}

export function AICli() {
  const {
    state,
    setTaskToAutomate,
    setBlocker,
    setToolsTried,
    setLearningGoal,
    setSelectedPath,
    completeSection,
    setGeneratedPrompt,
    setSectionResponse,
  } = useSession();

  const contentRef = useRef<HTMLDivElement>(null);
  const prevVisitedCountRef = useRef(state.visitedSections.length);

  // Chat hook for free-text and multi-select submissions
  const { sendMessage } = useChat({
    section: state.currentSection,
    onComplete: (fullResponse) => {
      const section = state.currentSection;
      let userInput: string | string[] = '';

      if (section === 'reality-check') {
        userInput = state.taskToAutomate;
      } else if (section === 'success-factors') {
        userInput = state.blocker;
      } else if (section === 'tools-primer') {
        userInput = state.toolsTried;
      }

      if (userInput) {
        setSectionResponse(section, { userInput, aiResponse: fullResponse });
      }
      completeSection(section);
    },
  });

  const handlePromptGenerated = useCallback((prompt: string) => {
    setGeneratedPrompt(prompt);
  }, [setGeneratedPrompt]);

  // Auto-scroll when new sections are added (not on backward navigation)
  useEffect(() => {
    if (state.visitedSections.length > prevVisitedCountRef.current) {
      // New section added - scroll to bottom
      if (contentRef.current) {
        contentRef.current.scrollTop = contentRef.current.scrollHeight;
      }
    }
    prevVisitedCountRef.current = state.visitedSections.length;
  }, [state.visitedSections.length]);

  const handleSubmitFreeText = useCallback((section: string, value: string) => {
    if (section === 'reality-check') {
      setTaskToAutomate(value);
    } else if (section === 'success-factors') {
      setBlocker(value);
    } else if (section === 'context-game') {
      setLearningGoal(value);
    }
    sendMessage(value);
  }, [setTaskToAutomate, setBlocker, setLearningGoal, sendMessage]);

  const handleSubmitMultiSelect = useCallback((section: string, tools: string[]) => {
    setToolsTried(tools);
    sendMessage(tools);
  }, [setToolsTried, sendMessage]);

  const handleSelectOption = useCallback((section: string, option: Option) => {
    setSelectedPath(option.title);
    setSectionResponse(section, { userInput: option.title, aiResponse: '' });
    completeSection(section);
  }, [setSelectedPath, setSectionResponse, completeSection]);

  return (
    <div className="h-full flex flex-col bg-[#0d0d0d] border-l border-[var(--border)] font-mono text-sm">
      {/* Header */}
      <div className="px-4 py-4 border-b border-[var(--border)] shrink-0">
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
        </div>
      </div>

      {/* Content - Append-only log */}
      <div ref={contentRef} className="flex-1 overflow-y-auto p-5 space-y-6">
        {state.visitedSections.map((sectionId, index) => {
          const config = sectionConfig[sectionId];
          if (!config) return null;

          const isNew = index === state.visitedSections.length - 1;

          return (
            <TerminalSection
              key={sectionId}
              sectionId={sectionId}
              config={config}
              isNew={isNew}
              onSubmitFreeText={handleSubmitFreeText}
              onSubmitMultiSelect={handleSubmitMultiSelect}
              onSelectOption={handleSelectOption}
              onPromptGenerated={handlePromptGenerated}
            />
          );
        })}
      </div>

      {/* Status Bar */}
      <div className="border-t border-[var(--border)] shrink-0">
        <StatusBar />
      </div>
    </div>
  );
}
