'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

export interface SectionData {
  userInput: string | string[];
  aiResponse: string;
}

export interface SessionState {
  taskToAutomate: string;
  blocker: string;
  toolsTried: string[];
  selectedPath: string;
  generatedPrompt: string;
  completedSections: string[];
  visitedSections: string[]; // Tracks order of visited sections (append-only)
  tokensUsed: number;
  currentSection: string;
  sectionResponses: Record<string, SectionData>;
}

interface SessionContextType {
  state: SessionState;
  setTaskToAutomate: (task: string) => void;
  setBlocker: (blocker: string) => void;
  setToolsTried: (tools: string[]) => void;
  setSelectedPath: (path: string) => void;
  setGeneratedPrompt: (prompt: string) => void;
  completeSection: (section: string) => void;
  addVisitedSection: (section: string) => void;
  addTokens: (count: number) => void;
  setCurrentSection: (section: string) => void;
  setSectionResponse: (section: string, data: SectionData) => void;
  clearSectionResponse: (section: string) => void;
  reset: () => void;
}

const initialState: SessionState = {
  taskToAutomate: '',
  blocker: '',
  toolsTried: [],
  selectedPath: '',
  generatedPrompt: '',
  completedSections: [],
  visitedSections: ['hero'], // Start with hero
  tokensUsed: 0,
  currentSection: 'hero',
  sectionResponses: {},
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SessionState>(initialState);

  const setTaskToAutomate = useCallback((task: string) => {
    setState(prev => ({ ...prev, taskToAutomate: task }));
  }, []);

  const setBlocker = useCallback((blocker: string) => {
    setState(prev => ({ ...prev, blocker }));
  }, []);

  const setToolsTried = useCallback((tools: string[]) => {
    setState(prev => ({ ...prev, toolsTried: tools }));
  }, []);

  const setSelectedPath = useCallback((path: string) => {
    setState(prev => ({ ...prev, selectedPath: path }));
  }, []);

  const setGeneratedPrompt = useCallback((prompt: string) => {
    setState(prev => ({ ...prev, generatedPrompt: prompt }));
  }, []);

  const completeSection = useCallback((section: string) => {
    setState(prev => ({
      ...prev,
      completedSections: prev.completedSections.includes(section)
        ? prev.completedSections
        : [...prev.completedSections, section],
    }));
  }, []);

  const addVisitedSection = useCallback((section: string) => {
    setState(prev => ({
      ...prev,
      visitedSections: prev.visitedSections.includes(section)
        ? prev.visitedSections
        : [...prev.visitedSections, section],
    }));
  }, []);

  const addTokens = useCallback((count: number) => {
    setState(prev => ({ ...prev, tokensUsed: prev.tokensUsed + count }));
  }, []);

  const setCurrentSection = useCallback((section: string) => {
    setState(prev => ({ ...prev, currentSection: section }));
  }, []);

  const setSectionResponse = useCallback((section: string, data: SectionData) => {
    setState(prev => ({
      ...prev,
      sectionResponses: { ...prev.sectionResponses, [section]: data },
    }));
  }, []);

  const clearSectionResponse = useCallback((section: string) => {
    setState(prev => {
      const newResponses = { ...prev.sectionResponses };
      delete newResponses[section];
      return {
        ...prev,
        sectionResponses: newResponses,
        completedSections: prev.completedSections.filter(s => s !== section),
      };
    });
  }, []);

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  return (
    <SessionContext.Provider
      value={{
        state,
        setTaskToAutomate,
        setBlocker,
        setToolsTried,
        setSelectedPath,
        setGeneratedPrompt,
        completeSection,
        addVisitedSection,
        addTokens,
        setCurrentSection,
        setSectionResponse,
        clearSectionResponse,
        reset,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}
