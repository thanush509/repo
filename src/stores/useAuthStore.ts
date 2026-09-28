import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, name?: string, startOnboarding?: boolean) => void;
  logout: () => void;
  completeOnboarding: () => void;
}

const DEFAULT_USER: User = {
  id: 'usr-keerthick-1',
  name: 'Keerthick R',
  email: 'keerthick.work@example.com',
  role: 'Medical Coder / Risk Adjustment Specialist',
  onboardingCompleted: true,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: DEFAULT_USER,
      isAuthenticated: true,
      login: (email, name = 'Keerthick R', startOnboarding = false) => {
        set({
          user: {
            id: `usr-${Date.now()}`,
            name: name || email.split('@')[0],
            email,
            role: 'Medical Coding Professional',
            onboardingCompleted: !startOnboarding,
          },
          isAuthenticated: true,
        });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      completeOnboarding: () => {
        set((state) => ({
          user: state.user ? { ...state.user, onboardingCompleted: true } : null,
        }));
      },
    }),
    {
      name: 'jobpilot-auth-storage',
    }
  )
);
