import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, CheckCheck, Sparkles, X } from 'lucide-react';
import { useUIStore } from '../../stores/useUIStore';
import { cn } from '../../utils/cn';

export const NotificationPanel: React.FC = () => {
  const isNotificationOpen = useUIStore((state) => state.isNotificationOpen);
  const toggleNotifications = useUIStore((state) => state.toggleNotifications);
  const notifications = useUIStore((state) => state.notifications);
  const markNotificationRead = useUIStore((state) => state.markNotificationRead);
  const markAllNotificationsRead = useUIStore((state) => state.markAllNotificationsRead);
  const navigate = useNavigate();

  if (!isNotificationOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-zinc-950/20 backdrop-blur-xs transition-opacity"
        onClick={() => toggleNotifications(false)}
      />

      {/* Slide-over Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-sm w-full bg-white border-l border-zinc-200 shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-zinc-700" />
            <h3 className="text-sm font-semibold text-zinc-900">Activity & Alerts</h3>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => markAllNotificationsRead()}
              title="Mark all as read"
              className="text-xs text-zinc-500 hover:text-zinc-900 p-1.5 rounded-md hover:bg-zinc-100 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Read all</span>
            </button>
            <button
              onClick={() => toggleNotifications(false)}
              className="text-zinc-400 hover:text-zinc-700 p-1.5 rounded-md hover:bg-zinc-100 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto divide-y divide-zinc-100 p-2">
          {notifications.length === 0 ? (
            <div className="py-16 text-center text-xs text-zinc-400">
              No recent notifications
            </div>
          ) : (
            notifications.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  markNotificationRead(item.id);
                  if (item.link) {
                    toggleNotifications(false);
                    navigate(item.link);
                  }
                }}
                className={cn(
                  'p-3 rounded-lg text-left transition-colors cursor-pointer relative group',
                  item.read ? 'hover:bg-zinc-50 opacity-80' : 'bg-zinc-50/60 hover:bg-zinc-100/80'
                )}
              >
                {!item.read && (
                  <span className="absolute top-3.5 right-3 w-1.5 h-1.5 rounded-full bg-zinc-900" />
                )}
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded bg-white border border-zinc-200 flex items-center justify-center shrink-0 mt-0.5 text-zinc-600">
                    <Sparkles className="w-3 h-3" />
                  </div>
                  <div className="min-w-0 pr-2">
                    <div className="text-xs font-semibold text-zinc-900 leading-snug">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed">
                      {item.description}
                    </div>
                    <div className="text-[10px] text-zinc-400 mt-1 font-mono">
                      {item.time}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
