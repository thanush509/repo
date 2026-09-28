import { useAuthStore } from '../stores/useAuthStore';

export const authService = {
  login: async (email: string, name?: string, startOnboarding = false) => {
    // Simulate brief network latency
    await new Promise((resolve) => setTimeout(resolve, 400));
    useAuthStore.getState().login(email, name, startOnboarding);
    return useAuthStore.getState().user;
  },

  logout: async () => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    useAuthStore.getState().logout();
  },

  getCurrentUser: () => {
    return useAuthStore.getState().user;
  },

  completeOnboarding: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    useAuthStore.getState().completeOnboarding();
  },
};
