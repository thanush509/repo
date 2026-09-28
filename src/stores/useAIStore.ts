import { create } from 'zustand';
import type { CoverLetter, CoverLetterLength, CoverLetterTone, ResumeVersion } from '../types';

interface AIState {
  isTailoring: boolean;
  tailoringProgress: number; // 0 to 100
  tailoringStage: string;
  tailoringStagesCompleted: string[];
  latestTailoredResume: ResumeVersion | null;
  isGeneratingCoverLetter: boolean;
  coverLetterTone: CoverLetterTone;
  coverLetterLength: CoverLetterLength;
  latestCoverLetter: CoverLetter | null;
  showTailorModal: boolean;
  setTailoringState: (
    isTailoring: boolean,
    progress?: number,
    stage?: string,
    completed?: string[]
  ) => void;
  setLatestTailoredResume: (version: ResumeVersion | null) => void;
  setCoverLetterSettings: (tone: CoverLetterTone, length: CoverLetterLength) => void;
  setGeneratingCoverLetter: (isGenerating: boolean) => void;
  setLatestCoverLetter: (cl: CoverLetter | null) => void;
  setShowTailorModal: (show: boolean) => void;
  resetAIState: () => void;
}

export const useAIStore = create<AIState>((set) => ({
  isTailoring: false,
  tailoringProgress: 0,
  tailoringStage: 'Analyzing job',
  tailoringStagesCompleted: [],
  latestTailoredResume: null,
  isGeneratingCoverLetter: false,
  coverLetterTone: 'Professional',
  coverLetterLength: 'Medium',
  latestCoverLetter: null,
  showTailorModal: false,
  setTailoringState: (
    isTailoring,
    progress = 0,
    stage = 'Analyzing job',
    completed = []
  ) =>
    set({
      isTailoring,
      tailoringProgress: progress,
      tailoringStage: stage,
      tailoringStagesCompleted: completed,
    }),
  setLatestTailoredResume: (latestTailoredResume) => set({ latestTailoredResume }),
  setCoverLetterSettings: (coverLetterTone, coverLetterLength) =>
    set({ coverLetterTone, coverLetterLength }),
  setGeneratingCoverLetter: (isGeneratingCoverLetter) =>
    set({ isGeneratingCoverLetter }),
  setLatestCoverLetter: (latestCoverLetter) => set({ latestCoverLetter }),
  setShowTailorModal: (showTailorModal) => set({ showTailorModal }),
  resetAIState: () =>
    set({
      isTailoring: false,
      tailoringProgress: 0,
      tailoringStage: 'Analyzing job',
      tailoringStagesCompleted: [],
      latestTailoredResume: null,
      isGeneratingCoverLetter: false,
      latestCoverLetter: null,
      showTailorModal: false,
    }),
}));
