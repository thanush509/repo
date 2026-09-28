import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Job } from '../types';
import { mockJobs } from '../data/mockJobs';

export interface JobFilters {
  search: string;
  role: string;
  location: string;
  workMode: string;
  experience: string;
  minSalary: number;
  maxSalary: number;
  minMatchScore: number;
}

const DEFAULT_FILTERS: JobFilters = {
  search: '',
  role: 'all',
  location: 'all',
  workMode: 'all',
  experience: 'all',
  minSalary: 0,
  maxSalary: 25,
  minMatchScore: 0,
};

interface JobState {
  jobs: Job[];
  selectedJob: Job | null;
  filters: JobFilters;
  isDiscovering: boolean;
  discoveryStep: number;
  discoveryLogs: string[];
  lastDiscoveredCount: number;
  showDiscoveryModal: boolean;
  setFilters: (filters: Partial<JobFilters>) => void;
  resetFilters: () => void;
  setSelectedJob: (job: Job | null) => void;
  setJobs: (jobs: Job[]) => void;
  setDiscovering: (
    isDiscovering: boolean,
    step?: number,
    logs?: string[],
    count?: number
  ) => void;
  setShowDiscoveryModal: (show: boolean) => void;
  resetJobs: () => void;
}

export const useJobStore = create<JobState>()(
  persist(
    (set) => ({
      jobs: mockJobs,
      selectedJob: null,
      filters: DEFAULT_FILTERS,
      isDiscovering: false,
      discoveryStep: 0,
      discoveryLogs: [],
      lastDiscoveredCount: 0,
      showDiscoveryModal: false,
      setFilters: (newFilters) =>
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        })),
      resetFilters: () => set({ filters: DEFAULT_FILTERS }),
      setSelectedJob: (job) => set({ selectedJob: job }),
      setJobs: (jobs) => set({ jobs }),
      setDiscovering: (isDiscovering, step = 0, logs = [], count = 0) =>
        set({
          isDiscovering,
          discoveryStep: step,
          discoveryLogs: logs,
          lastDiscoveredCount: count,
        }),
      setShowDiscoveryModal: (showDiscoveryModal) => set({ showDiscoveryModal }),
      resetJobs: () => set({ jobs: mockJobs }),
    }),
    {
      name: 'jobpilot-jobs-storage',
    }
  )
);
