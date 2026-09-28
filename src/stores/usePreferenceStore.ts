import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { JobPreferences } from '../types';

interface PreferenceState {
  preferences: JobPreferences;
  updatePreferences: (partial: Partial<JobPreferences>) => void;
  resetPreferences: () => void;
}

export const DEFAULT_PREFERENCES: JobPreferences = {
  roles: ['Medical Coder', 'HCC Coder', 'Risk Adjustment Coder'],
  locations: ['Chennai', 'Bangalore', 'Remote'],
  experienceYears: 1,
  salaryMin: 4,
  salaryMax: 8,
  workModes: ['Remote', 'Hybrid', 'On-site'],
  employmentTypes: ['Full-time'],
  applicationMode: 'ASSISTED',
  minMatchScore: 70,
  dailyApplicationLimit: 20,
  requireReviewForUncertain: true,
};

export const usePreferenceStore = create<PreferenceState>()(
  persist(
    (set) => ({
      preferences: DEFAULT_PREFERENCES,
      updatePreferences: (partial) => {
        set((state) => ({
          preferences: { ...state.preferences, ...partial },
        }));
      },
      resetPreferences: () => {
        set({ preferences: DEFAULT_PREFERENCES });
      },
    }),
    {
      name: 'jobpilot-preferences-storage',
    }
  )
);
