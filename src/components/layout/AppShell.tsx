import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { GlobalSearchModal } from './GlobalSearchModal';
import { NotificationPanel } from './NotificationPanel';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Activate global keyboard shortcuts (/ and g d, g j, g a, g r, ESC)
  useKeyboardShortcuts();

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#18181B] flex flex-col antialiased">
      {/* Search and Notification Overlays */}
      <GlobalSearchModal />
      <NotificationPanel />

      <div className="flex flex-1 min-h-screen">
        {/* Desktop Sidebar */}
        <Sidebar className="hidden md:flex sticky top-0" />

        {/* Mobile Sidebar Overlay */}
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <div
              className="fixed inset-0 bg-zinc-950/40 backdrop-blur-xs"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
            <Sidebar
              className="relative z-10 w-64 flex"
              onNavigate={() => setIsMobileSidebarOpen(false)}
            />
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <Topbar onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1200px] w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};
