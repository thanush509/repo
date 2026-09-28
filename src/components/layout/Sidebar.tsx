import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Compass,
  FileText,
  LayoutDashboard,
  Send,
  Settings,
  Sliders,
  Sparkles,
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useApplicationStore } from '../../stores/useApplicationStore';
import { usePreferenceStore } from '../../stores/usePreferenceStore';

interface SidebarProps {
  className?: string;
  onNavigate?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ className, onNavigate }) => {
  const location = useLocation();
  const applications = useApplicationStore((state) => state.applications);
  const preferences = usePreferenceStore((state) => state.preferences);

  const readyCount = applications.filter((a) => a.status === 'READY').length;

  const mainNavItems = [
    {
      name: 'Overview',
      path: '/dashboard',
      icon: LayoutDashboard,
      shortcut: 'g d',
    },
    {
      name: 'Discover',
      path: '/discover',
      icon: Compass,
      shortcut: 'g j',
    },
    {
      name: 'Applications',
      path: '/applications',
      icon: Send,
      shortcut: 'g a',
      badge: readyCount > 0 ? `${readyCount}` : undefined,
    },
    {
      name: 'Resume',
      path: '/resume',
      icon: FileText,
      shortcut: 'g r',
    },
    {
      name: 'Preferences',
      path: '/preferences',
      icon: Sliders,
    },
  ];

  const bottomNavItems = [
    {
      name: 'Settings',
      path: '/settings',
      icon: Settings,
    },
  ];

  return (
    <aside
      className={cn(
        'w-60 h-screen bg-white border-r border-zinc-200/80 flex flex-col justify-between shrink-0 select-none transition-all duration-200 z-30',
        className
      )}
    >
      {/* Top Header & Logo */}
      <div>
        <div className="h-14 px-5 flex items-center gap-2.5 border-b border-zinc-100">
          <div className="w-6 h-6 rounded-md bg-zinc-900 flex items-center justify-center text-white shadow-xs">
            <span className="text-[11px] font-bold tracking-tighter">JP</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-sm tracking-tight text-zinc-900">
              JobPilot
            </span>
            <span className="text-[10px] px-1.5 py-0.2 bg-zinc-100 border border-zinc-200/70 text-zinc-600 rounded font-mono">
              Agent
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="px-3 py-4 space-y-1">
          <div className="px-2 pb-1.5 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
            Workspace
          </div>
          {mainNavItems.map((item) => {
            const isActive =
              location.pathname === item.path ||
              (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onNavigate}
                className={cn(
                  'flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors group',
                  isActive
                    ? 'bg-zinc-100 text-zinc-900 font-semibold'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
                )}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={cn(
                      'w-4 h-4 transition-colors',
                      isActive ? 'text-zinc-900' : 'text-zinc-400 group-hover:text-zinc-700'
                    )}
                  />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] px-1.5 py-0.2 bg-zinc-900 text-white rounded-full font-medium">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Bottom Section: Agent Status & Settings */}
      <div className="p-3 border-t border-zinc-100 space-y-2">
        {/* Agent Active Pill */}
        <div className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-200/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <div>
              <div className="text-[11px] font-semibold text-zinc-800 leading-tight">
                {preferences.applicationMode} Mode
              </div>
              <div className="text-[10px] text-zinc-500">Autonomous Agent</div>
            </div>
          </div>
          <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
        </div>

        {bottomNavItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onNavigate}
              className={cn(
                'flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors group',
                isActive
                  ? 'bg-zinc-100 text-zinc-900 font-semibold'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
              )}
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  className={cn(
                    'w-4 h-4 transition-colors',
                    isActive ? 'text-zinc-900' : 'text-zinc-400 group-hover:text-zinc-700'
                  )}
                />
                <span>{item.name}</span>
              </div>
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
};
