import React from 'react';
import { Outlet } from 'react-router-dom';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#18181B] flex flex-col justify-center items-center p-4 sm:p-6 antialiased selection:bg-zinc-900 selection:text-white">
      <div className="w-full max-w-md my-auto">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-7 h-7 rounded-lg bg-zinc-900 flex items-center justify-center text-white font-bold text-xs shadow-xs">
            JP
          </div>
          <span className="font-semibold text-lg tracking-tight text-zinc-900">
            JobPilot
          </span>
        </div>
        <Outlet />
      </div>
    </div>
  );
};
