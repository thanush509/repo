import type { JobPreferences } from '../types';
import { usePreferenceStore } from '../stores/usePreferenceStore';
import { useUIStore } from '../stores/useUIStore';

export const preferenceService = {
  getPreferences: (): JobPreferences => {
    return usePreferenceStore.getState().preferences;
  },

  updatePreferences: async (partial: Partial<JobPreferences>): Promise<JobPreferences> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    usePreferenceStore.getState().updatePreferences(partial);

    useUIStore.getState().addNotification({
      title: 'Preferences updated',
      description: 'Job discovery parameters and application automation rules saved.',
      type: 'system',
    });

    return usePreferenceStore.getState().preferences;
  },

  resetPreferences: () => {
    usePreferenceStore.getState().resetPreferences();
  },
};
