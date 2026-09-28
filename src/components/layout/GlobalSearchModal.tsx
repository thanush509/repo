import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Compass,
  FileText,
  LayoutDashboard,
  Search,
  Sliders,
  Sparkles,
} from 'lucide-react';
import { useUIStore } from '../../stores/useUIStore';
import { useJobStore } from '../../stores/useJobStore';
import { useApplicationStore } from '../../stores/useApplicationStore';
import { cn } from '../../utils/cn';

export const GlobalSearchModal: React.FC = () => {
  const isSearchOpen = useUIStore((state) => state.isSearchOpen);
  const toggleSearch = useUIStore((state) => state.toggleSearch);
  const jobs = useJobStore((state) => state.jobs);
  const applications = useApplicationStore((state) => state.applications);

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSearchOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  // Static navigation routes
  const navItems = [
    { id: 'nav-1', title: 'Dashboard', subtitle: 'Command Center & Activity', path: '/dashboard', icon: LayoutDashboard },
    { id: 'nav-2', title: 'Discover Jobs', subtitle: 'Browse matching opportunities', path: '/discover', icon: Compass },
    { id: 'nav-3', title: 'Applications', subtitle: 'Track application pipeline', path: '/applications', icon: Briefcase },
    { id: 'nav-4', title: 'Resume & Versions', subtitle: 'Master resume & tailored versions', path: '/resume', icon: FileText },
    { id: 'nav-5', title: 'Preferences', subtitle: 'Job criteria & automation rules', path: '/preferences', icon: Sliders },
  ];

  // Filtered jobs
  const matchingJobs = jobs
    .filter(
      (j) =>
        j.title.toLowerCase().includes(query.toLowerCase()) ||
        j.company.toLowerCase().includes(query.toLowerCase()) ||
        j.skills.some((s) => s.toLowerCase().includes(query.toLowerCase()))
    )
    .slice(0, 4);

  // Filtered applications
  const matchingApps = applications
    .filter(
      (a) =>
        a.job.title.toLowerCase().includes(query.toLowerCase()) ||
        a.job.company.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, 3);

  // Filtered navigation
  const matchingNav = navItems.filter(
    (n) =>
      n.title.toLowerCase().includes(query.toLowerCase()) ||
      n.subtitle.toLowerCase().includes(query.toLowerCase())
  );

  const allResults = [
    ...matchingNav.map((n) => ({ type: 'nav', ...n })),
    ...matchingJobs.map((j) => ({
      type: 'job',
      id: j.id,
      title: j.title,
      subtitle: `${j.company} · ${j.location} · ${j.matchScore}% Match`,
      path: `/jobs/${j.id}`,
      icon: Sparkles,
    })),
    ...matchingApps.map((a) => ({
      type: 'app',
      id: a.id,
      title: `${a.job.title} — ${a.job.company}`,
      subtitle: `Status: ${a.status} · Mode: ${a.mode}`,
      path: `/applications/${a.id}`,
      icon: Briefcase,
    })),
  ];

  const handleSelect = (item: (typeof allResults)[0]) => {
    toggleSearch(false);
    navigate(item.path);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isSearchOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, allResults.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev === 0 ? Math.max(0, allResults.length - 1) : prev - 1
        );
      } else if (e.key === 'Enter' && allResults[selectedIndex]) {
        e.preventDefault();
        handleSelect(allResults[selectedIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, selectedIndex, allResults]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-zinc-950/40 backdrop-blur-xs transition-opacity"
        onClick={() => toggleSearch(false)}
      />

      {/* Search Palette */}
      <div className="relative w-full max-w-xl bg-white border border-zinc-200 rounded-xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-zinc-100 gap-3">
          <Search className="w-4 h-4 text-zinc-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search jobs, applications, companies, or commands..."
            className="w-full bg-transparent text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
          />
          <kbd className="kbd-shortcut text-[10px]">ESC</kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-zinc-50">
          {allResults.length === 0 ? (
            <div className="py-8 text-center text-xs text-zinc-500">
              No results found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            <div className="space-y-0.5">
              {allResults.map((item, index) => {
                const isSelected = index === selectedIndex;
                const Icon = item.icon;

                return (
                  <button
                    key={`${item.type}-${item.id}`}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={cn(
                      'w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors cursor-pointer',
                      isSelected ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-700 hover:bg-zinc-50'
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={cn(
                          'w-7 h-7 rounded-md flex items-center justify-center shrink-0 text-xs border',
                          isSelected
                            ? 'bg-white border-zinc-300 text-zinc-900'
                            : 'bg-zinc-50 border-zinc-200/60 text-zinc-500'
                        )}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-medium text-zinc-900 truncate">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-zinc-500 truncate">
                          {item.subtitle}
                        </div>
                      </div>
                    </div>
                    {isSelected && (
                      <span className="text-[10px] text-zinc-400 shrink-0 font-mono">
                        ↵ Enter
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 bg-zinc-50 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-400">
          <div className="flex items-center gap-3">
            <span><kbd className="kbd-shortcut mr-1">↑</kbd><kbd className="kbd-shortcut mr-1">↓</kbd> Navigate</span>
            <span><kbd className="kbd-shortcut mr-1">↵</kbd> Select</span>
          </div>
          <span><kbd className="kbd-shortcut mr-1">/</kbd> to open anywhere</span>
        </div>
      </div>
    </div>
  );
};
