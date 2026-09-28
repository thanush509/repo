import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Resume, ResumeVersion } from '../types';
import { mockDefaultResume } from '../data/mockResumes';

interface ResumeState {
  resume: Resume;
  selectedVersionId: string | null;
  isUploading: boolean;
  uploadStatus: 'idle' | 'uploading' | 'parsing' | 'ready';
  setResume: (resume: Resume) => void;
  addResumeVersion: (version: ResumeVersion) => void;
  setSelectedVersionId: (id: string | null) => void;
  setUploading: (isUploading: boolean, status?: 'idle' | 'uploading' | 'parsing' | 'ready') => void;
  replaceResumeFile: (fileName: string, fileSize: string) => void;
  resetResume: () => void;
}

export const useResumeStore = create<ResumeState>()(
  persist(
    (set) => ({
      resume: mockDefaultResume,
      selectedVersionId: null,
      isUploading: false,
      uploadStatus: 'idle',
      setResume: (resume) => set({ resume }),
      addResumeVersion: (version) => {
        set((state) => ({
          resume: {
            ...state.resume,
            versions: [version, ...state.resume.versions.filter((v) => v.id !== version.id)],
          },
          selectedVersionId: version.id,
        }));
      },
      setSelectedVersionId: (id) => set({ selectedVersionId: id }),
      setUploading: (isUploading, status = 'idle') =>
        set({ isUploading, uploadStatus: status }),
      replaceResumeFile: (fileName, fileSize) => {
        set((state) => ({
          resume: {
            ...state.resume,
            fileName,
            fileSize,
            uploadedAt: new Date().toISOString(),
            parsed: true,
          },
        }));
      },
      resetResume: () => set({ resume: mockDefaultResume, selectedVersionId: null }),
    }),
    {
      name: 'jobpilot-resume-storage',
    }
  )
);
