import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  LogOut,
  Menu,
  Search,
  Settings,
  Sliders,
  User,
} from 'lucide-react';
import { useAuthStore } from '../../stores/useAuthStore';
import { useUIStore } from '../../stores/useUIStore';

interface TopbarProps {
  onToggleSidebar?: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onToggleSidebar }) => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const toggleSearch = useUIStore((state) => state.toggleSearch);
  const toggleNotifications = useUIStore((state) => state.toggleNotifications);
  const notifications = useUIStore((state) => state.notifications);
  const navigate = useNavigate();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-14 bg-white border-b border-zinc-200/80 px-4 md:px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Left: Mobile Toggle & Global Search trigger */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-1.5 rounded-md text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Bar (Trigger) */}
        <button
          onClick={() => toggleSearch(true)}
          className="flex items-center gap-2 px-3 py-1.5 bg-zinc-50 hover:bg-zinc-100/80 border border-zinc-200/80 rounded-lg text-xs text-zinc-400 hover:text-zinc-600 transition-all cursor-pointer w-48 sm:w-64 justify-between"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-zinc-400" />
            <span>Search jobs, apps...</span>
          </div>
          <kbd className="kbd-shortcut">/</kbd>
        </button>
      </div>

      {/* Right: Notifications & User Profile Menu */}
      <div className="flex items-center gap-2.5">
        {/* Notification Bell */}
        <button
          onClick={() => toggleNotifications(true)}
          className="relative p-2 rounded-lg text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer"
          title="Activity & Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-zinc-900" />
          )}
        </button>

        {/* User Profile Menu */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-2 p-1 pl-2 rounded-lg hover:bg-zinc-100 transition-colors cursor-pointer"
          >
            <div className="hidden sm:block text-right">
              <div className="text-xs font-semibold text-zinc-900 leading-tight">
                {user?.name || 'Keerthick R'}
              </div>
              <div className="text-[10px] text-zinc-400 leading-tight truncate max-w-[120px]">
                Medical Coder
              </div>
            </div>
            <div className="w-7 h-7 rounded-full bg-zinc-900 text-white flex items-center justify-center text-xs font-semibold shadow-xs">
              {user?.name ? user.name.charAt(0) : 'K'}
            </div>
          </button>

          {/* Dropdown menu */}
          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-zinc-200 rounded-xl shadow-lg p-1.5 z-30 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-2.5 py-2 border-b border-zinc-100 sm:hidden">
                <div className="text-xs font-semibold text-zinc-900">
                  {user?.name || 'Keerthick R'}
                </div>
                <div className="text-[10px] text-zinc-500 truncate">
                  {user?.email || 'keerthick.work@example.com'}
                </div>
              </div>

              <button
                onClick={() => {
                  setIsUserMenuOpen(false);
                  navigate('/preferences');
                }}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50 cursor-pointer"
              >
                <Sliders className="w-3.5 h-3.5 text-zinc-400" />
                <span>Job Preferences</span>
              </button>

              <button
                onClick={() => {
                  setIsUserMenuOpen(false);
                  navigate('/settings');
                }}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50 cursor-pointer"
              >
                <Settings className="w-3.5 h-3.5 text-zinc-400" />
                <span>Settings</span>
              </button>

              <div className="my-1 border-t border-zinc-100" />

              <button
                onClick={() => {
                  setIsUserMenuOpen(false);
                  logout();
                  navigate('/login');
                }}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs text-red-600 hover:bg-red-50 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5 text-red-500" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
