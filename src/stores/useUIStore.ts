import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { NotificationItem } from '../types';

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: '4 new jobs match your preferences',
    description: 'Found high-match openings at ABC Healthcare Global and CarePulse Health.',
    time: '10m ago',
    read: false,
    type: 'match',
    link: '/discover',
  },
  {
    id: 'notif-2',
    title: 'Resume tailored for HCC Coder',
    description: 'Version 2 created with emphasized risk adjustment metrics (94% match).',
    time: '1h ago',
    read: false,
    type: 'tailor',
    link: '/resume',
  },
  {
    id: 'notif-3',
    title: 'Interview invitation received',
    description: 'CarePulse Health invited you for technical screening with Lead Risk Auditor.',
    time: '3h ago',
    read: false,
    type: 'application',
    link: '/applications/app-2',
  },
  {
    id: 'notif-4',
    title: '1 application needs your input',
    description: 'Confirm MS-DRG experience for Global Revenue Cycle Partners role.',
    time: '5h ago',
    read: true,
    type: 'application',
    link: '/applications/app-6',
  },
];

interface UIState {
  isSearchOpen: boolean;
  isNotificationOpen: boolean;
  notifications: NotificationItem[];
  toggleSearch: (open?: boolean) => void;
  toggleNotifications: (open?: boolean) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  addNotification: (
    item: Omit<NotificationItem, 'id' | 'time' | 'read'>
  ) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      isSearchOpen: false,
      isNotificationOpen: false,
      notifications: INITIAL_NOTIFICATIONS,
      toggleSearch: (open) =>
        set((state) => ({ isSearchOpen: open !== undefined ? open : !state.isSearchOpen })),
      toggleNotifications: (open) =>
        set((state) => ({
          isNotificationOpen:
            open !== undefined ? open : !state.isNotificationOpen,
        })),
      markNotificationRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        })),
      markAllNotificationsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        })),
      addNotification: (item) => {
        const newNotif: NotificationItem = {
          ...item,
          id: `notif-${Date.now()}`,
          time: 'Just now',
          read: false,
        };
        set((state) => ({
          notifications: [newNotif, ...state.notifications],
        }));
      },
    }),
    {
      name: 'jobpilot-ui-storage',
    }
  )
);
